// Server-only Mollie-client (dependency-vrij, via de REST-API). Alleen importeren
// vanuit route handlers — bevat de geheime MOLLIE_API_KEY.
//
// Zet in productie:
//   MOLLIE_API_KEY   – live_xxx (of test_xxx voor testbetalingen), van https://mollie.com
// De sleutel bepaalt automatisch of het een test- of live-betaling is.

const MOLLIE_API = "https://api.mollie.com/v2";

export function mollieConfigured(): boolean {
  return Boolean(process.env.MOLLIE_API_KEY);
}

export function mollieMode(): "live" | "test" | "none" {
  const key = process.env.MOLLIE_API_KEY ?? "";
  if (key.startsWith("live_")) return "live";
  if (key.startsWith("test_")) return "test";
  return "none";
}

function apiKey(): string {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) throw new Error("MOLLIE_API_KEY ontbreekt — betalingen zijn niet geconfigureerd.");
  return key;
}

async function mollieFetch(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${MOLLIE_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data?.detail ?? res.statusText;
    throw new Error(`Mollie ${res.status}: ${detail}`);
  }
  return data;
}

/** Mollie-betaalmethoden die we mappen vanuit de UI-keuze. */
export type MollieMethod = "ideal" | "creditcard" | "applepay" | "paypal" | "bancontact";

export interface CreatePaymentInput {
  /** bedrag in euro, bijv. 69.95 */
  amount: number;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  /** vrije metadata die op de webhook weer beschikbaar is (max ~1 kB) */
  metadata?: Record<string, unknown>;
  /** optioneel vooraf gekozen methode; weglaten = Mollie toont alle methoden */
  method?: MollieMethod;
}

export interface MolliePayment {
  id: string;
  status: string;
  checkoutUrl: string | null;
  amount: { value: string; currency: string };
  metadata: Record<string, unknown> | null;
}

function toEuroString(amount: number): string {
  return amount.toFixed(2);
}

export async function createPayment(input: CreatePaymentInput): Promise<MolliePayment> {
  const body: Record<string, unknown> = {
    amount: { currency: "EUR", value: toEuroString(input.amount) },
    description: input.description,
    redirectUrl: input.redirectUrl,
    metadata: input.metadata ?? {},
  };
  if (input.webhookUrl && !input.webhookUrl.includes("localhost") && !input.webhookUrl.includes("127.0.0.1")) {
    // Mollie kan geen localhost bereiken; laat de webhook dan weg (status wordt
    // op de bedankpagina alsnog live opgehaald).
    body.webhookUrl = input.webhookUrl;
  }
  if (input.method) body.method = input.method;

  const data = await mollieFetch("/payments", { method: "POST", body: JSON.stringify(body) });
  return {
    id: data.id,
    status: data.status,
    checkoutUrl: data._links?.checkout?.href ?? null,
    amount: data.amount,
    metadata: data.metadata ?? null,
  };
}

export async function getPayment(id: string): Promise<MolliePayment> {
  const data = await mollieFetch(`/payments/${encodeURIComponent(id)}`);
  return {
    id: data.id,
    status: data.status,
    checkoutUrl: data._links?.checkout?.href ?? null,
    amount: data.amount,
    metadata: data.metadata ?? null,
  };
}
