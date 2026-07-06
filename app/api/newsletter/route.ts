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

  const email = String(body?.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
  }

  // Stuur de aanmelding door naar de winkelier. Wil je later een echte
  // mailinglijst (bijv. Mailchimp/Brevo)? Vervang deze e-mail door een API-call.
  const result = await sendMail({
    to: merchantEmail(),
    replyTo: email,
    subject: `✉️ Nieuwe nieuwsbrief-aanmelding — ${email}`,
    html: emailShell("Nieuwe nieuwsbrief-aanmelding", `<p style="color:#c9c9cf">${esc(email)}</p>`),
  });

  return NextResponse.json({ ok: true, delivered: result.ok });
}
