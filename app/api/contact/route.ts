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

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Vul je naam, een geldig e-mailadres en een bericht in." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Naam", name],
    ["E-mail", email],
    ["Onderwerp", subject],
    ["Bericht", message],
  ];

  const table = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8a8a8f;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");

  const result = await sendMail({
    to: merchantEmail(),
    replyTo: email,
    subject: `✉️ Nieuw contactbericht${subject ? ` — ${subject}` : ""} (van ${name})`,
    html: emailShell(
      "Nieuw bericht via het contactformulier",
      `<table style="width:100%;border-collapse:collapse;font-size:14px">${table}</table>`,
    ),
  });

  // Het bericht is geldig ontvangen; ook als het e-mailkanaal (nog) niet is
  // geconfigureerd geven we succes terug zodat de bezoeker geen foutmelding ziet —
  // de melding is dan gelogd zodat je niets kwijtraakt zodra Resend is ingesteld.
  return NextResponse.json({ ok: true, delivered: result.ok });
}
