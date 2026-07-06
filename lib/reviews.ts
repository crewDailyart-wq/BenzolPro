// Server-side opslag voor productbeoordelingen via een KV-store (Vercel KV of
// Upstash Redis, beide via dezelfde REST-API). Env-gated: zonder KV valt de site
// terug op lokale opslag in de browser (zoals voorheen). Zet in productie:
//   KV_REST_API_URL   – bijv. https://xxx.upstash.io
//   KV_REST_API_TOKEN – bijbehorend token
// (Op Vercel krijg je deze automatisch bij het toevoegen van "KV" aan je project.)

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

const MAX_PER_SCOPE = 100; // bewaar hooguit de laatste 100 reviews per product

export interface StoredReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export function kvConfigured(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

/** Voer één Redis-commando uit via de Upstash/Vercel KV REST-API. */
async function kv(command: (string | number)[]): Promise<any> {
  const res = await fetch(KV_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV ${res.status}`);
  const data = await res.json();
  return data.result;
}

function keyFor(scope: string): string {
  // Alleen veilige tekens in de sleutel.
  return `reviews:${scope.replace(/[^a-z0-9_-]/gi, "").slice(0, 80)}`;
}

/** Haal de reviews voor een scope op (nieuwste eerst). */
export async function getReviews(scope: string): Promise<StoredReview[]> {
  if (!kvConfigured()) return [];
  try {
    const raw: string[] = (await kv(["LRANGE", keyFor(scope), 0, MAX_PER_SCOPE - 1])) ?? [];
    return raw
      .map((s) => {
        try {
          return JSON.parse(s) as StoredReview;
        } catch {
          return null;
        }
      })
      .filter((r): r is StoredReview => r != null);
  } catch (err) {
    console.error("[reviews] ophalen mislukt:", err);
    return [];
  }
}

/** Voeg een review toe (vooraan) en kap de lijst af op MAX_PER_SCOPE. */
export async function addReview(scope: string, review: StoredReview): Promise<boolean> {
  if (!kvConfigured()) return false;
  try {
    const key = keyFor(scope);
    await kv(["LPUSH", key, JSON.stringify(review)]);
    await kv(["LTRIM", key, 0, MAX_PER_SCOPE - 1]);
    return true;
  } catch (err) {
    console.error("[reviews] opslaan mislukt:", err);
    return false;
  }
}
