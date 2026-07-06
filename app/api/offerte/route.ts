import { NextResponse } from "next/server";
import { sendMail, merchantEmail, emailShell, esc } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const company = String(body?.company ?? "").trim();
  const contact = String(body?.contact ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const volume = String(body?.volume ?? "").trim();

  if (!company || !contact || !volume || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Vul de verplichte velden correct in." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Bedrijf", company],
    ["Contactpersoon", contact],
    ["E-mail", email],
    ["Telefoon", String(body?.phone ?? "")],
    ["KvK", String(body?.kvk ?? "")],
    ["Geschat volume (L/jaar)", volume],
    ["Producten", String(body?.products ?? "")],
    ["Bericht", String(body?.message ?? "")],
  ];

  const table = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8a8a8f;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`,
    )
    .join("");

  const result = await sendMail({
    to: merchantEmail(),
    replyTo: email,
    subject: `📋 Nieuwe offerte-aanvraag — ${company}`,
    html: emailShell(
      "Nieuwe offerte-aanvraag (garage)",
      `<table style="width:100%;border-collapse:collapse;font-size:14px">${table}</table>`,
    ),
  });

  // De aanvraag is geldig ontvangen; ook als het e-mailkanaal (nog) niet is
  // geconfigureerd geven we succes terug zodat de garage geen foutmelding ziet —
  // de melding is dan wel gelogd zodat je niets mist.
  return NextResponse.json({ ok: true, delivered: result.ok });
}
