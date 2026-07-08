// Server-side opslag voor "Mijn Garage"-e-mailherinneringen via Vercel KV /
// Upstash Redis (REST). Env-gated: zonder KV worden aanmeldingen niet bewaard
// (de UI toont dan alsnog een bevestiging, maar er gaan geen mails uit).
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export function kvConfigured(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

async function kv(command: (string | number)[]): Promise<any> {
  const res = await fetch(KV_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV ${res.status}`);
  return (await res.json()).result;
}

export interface GarageCar {
  plate: string;
  name?: string;
  apkExpiry?: string; // ISO
  oilDue?: string; // ISO
}
export interface GarageSubscription {
  email: string;
  cars: GarageCar[];
  updated: string;
}

const SUBS_SET = "garage:subs";
function subKey(email: string): string {
  return `garage:sub:${email.toLowerCase().replace(/[^a-z0-9._@+-]/gi, "")}`;
}

export async function saveSubscription(sub: GarageSubscription): Promise<boolean> {
  if (!kvConfigured()) return false;
  try {
    await kv(["SET", subKey(sub.email), JSON.stringify(sub)]);
    await kv(["SADD", SUBS_SET, sub.email.toLowerCase()]);
    return true;
  } catch (err) {
    console.error("[garage] opslaan aanmelding mislukt:", err);
    return false;
  }
}

export async function listSubscriptions(): Promise<GarageSubscription[]> {
  if (!kvConfigured()) return [];
  try {
    const emails: string[] = (await kv(["SMEMBERS", SUBS_SET])) ?? [];
    const out: GarageSubscription[] = [];
    for (const email of emails) {
      const raw = await kv(["GET", subKey(email)]);
      if (raw) {
        try {
          out.push(JSON.parse(raw) as GarageSubscription);
        } catch {
          /* skip */
        }
      }
    }
    return out;
  } catch (err) {
    console.error("[garage] ophalen aanmeldingen mislukt:", err);
    return [];
  }
}

/** Voorkom dubbele mails: true als we dit type recent al stuurden. */
export async function wasSentRecently(email: string, plate: string, type: "apk" | "olie"): Promise<boolean> {
  if (!kvConfigured()) return true;
  try {
    const key = `garage:sent:${email.toLowerCase()}:${plate}:${type}`;
    return Boolean(await kv(["GET", key]));
  } catch {
    return true; // bij twijfel niet mailen
  }
}

export async function markSent(email: string, plate: string, type: "apk" | "olie", date: string): Promise<void> {
  if (!kvConfigured()) return;
  try {
    const key = `garage:sent:${email.toLowerCase()}:${plate}:${type}`;
    await kv(["SET", key, date, "EX", 60 * 60 * 24 * 40]); // 40 dagen niet opnieuw
  } catch {
    /* ignore */
  }
}
