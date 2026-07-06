import { NextResponse } from "next/server";
import { validateOrder, orderNumberFrom, summarizeLines } from "@/lib/orders";
import { createPayment, mollieConfigured } from "@/lib/mollie";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const METHOD_MAP: Record<string, "ideal" | "creditcard" | "applepay" | "paypal"> = {
  ideal: "ideal",
  card: "creditcard",
  applepay: "applepay",
  paypal: "paypal",
};

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const email = String(body?.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
  }

  const deliveryMethod = body?.deliveryMethod === "pickup" ? "pickup" : "home";

  let order;
  try {
    order = validateOrder(body?.lines, deliveryMethod);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Ongeldige bestelling." }, { status: 400 });
  }

  if (!mollieConfigured()) {
    return NextResponse.json(
      {
        error:
          "Betalingen zijn nog niet geconfigureerd. Zet MOLLIE_API_KEY in de omgevingsvariabelen om betalingen te activeren.",
        code: "payments-not-configured",
      },
      { status: 503 },
    );
  }

  const customer = body?.customer ?? {};
  const name = `${String(customer.firstName ?? "").trim()} ${String(customer.lastName ?? "").trim()}`.trim();
  const orderId = orderNumberFrom(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
  const summary = summarizeLines(order.lines);

  const metadata = {
    orderId,
    email,
    name,
    deliveryMethod,
    pickupPoint: deliveryMethod === "pickup" ? String(body?.pickupPoint ?? "") : "",
    address:
      deliveryMethod === "home"
        ? `${customer.address ?? ""}, ${customer.postal ?? ""} ${customer.city ?? ""}`.trim()
        : "",
    phone: String(customer.phone ?? ""),
    itemCount: order.itemCount,
    total: order.total,
    summary: summary.slice(0, 700),
  };

  const method = METHOD_MAP[String(body?.method ?? "")];

  let payment;
  try {
    payment = await createPayment({
      amount: order.total,
      description: `${SITE_NAME} bestelling ${orderId}`,
      redirectUrl: `${SITE_URL}/checkout/success?order=${encodeURIComponent(orderId)}`,
      webhookUrl: `${SITE_URL}/api/mollie/webhook`,
      metadata,
      method,
    });
  } catch (err) {
    console.error("[checkout] Mollie-fout:", err);
    return NextResponse.json({ error: "Betaling kon niet worden gestart. Probeer het opnieuw." }, { status: 502 });
  }

  if (!payment.checkoutUrl) {
    return NextResponse.json({ error: "Geen betaal-URL ontvangen van Mollie." }, { status: 502 });
  }

  const res = NextResponse.json({ checkoutUrl: payment.checkoutUrl, orderId });
  // Bewaar de betaal-id httpOnly zodat de bedankpagina de status veilig kan
  // opvragen zonder de id in de URL te tonen. Lax laat de cookie meekomen bij de
  // top-level terugkeer vanaf Mollie.
  res.cookies.set("bp_pay", payment.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: SITE_URL.startsWith("https"),
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}
