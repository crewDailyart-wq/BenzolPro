import { NextResponse } from "next/server";
import { saveSubscription, kvConfigured, type GarageCar } from "@/lib/garageStore";
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

  const cars: GarageCar[] = Array.isArray(body?.cars)
    ? body.cars.slice(0, 20).map((c: any) => ({
        plate: String(c?.plate ?? "").slice(0, 8),
        name: String(c?.name ?? "").slice(0, 80),
        apkExpiry: c?.apkExpiry ? String(c.apkExpiry).slice(0, 10) : undefined,
        oilDue: c?.oilDue ? String(c.oilDue).slice(0, 10) : undefined,
      }))
    : [];

  const stored = await saveSubscription({ email, cars, updated: new Date().toISOString().slice(0, 10) });

  // Bevestiging naar de klant (indien e-mailkanaal geconfigureerd) + seintje naar winkelier.
  await sendMail({
    to: email,
    subject: "Je bent aangemeld voor onderhoudsherinneringen — BenzolPro",
    html: emailShell(
      "Herinneringen ingesteld ✅",
      `<p style="color:#c9c9cf">We houden je APK-datum en olieverversing in de gaten en sturen je op tijd een seintje.</p>
       <p style="color:#8a8a8f;font-size:13px">Auto's: ${esc(cars.map((c) => c.name || c.plate).join(", ") || "—")}</p>`,
    ),
  });
  await sendMail({
    to: merchantEmail(),
    subject: `🔔 Nieuwe garage-aanmelding — ${email}`,
    html: emailShell("Nieuwe onderhoudsherinnering-aanmelding", `<p>${esc(email)} · ${esc(cars.length)} auto(‘s)</p>`),
  });

  return NextResponse.json({ ok: true, stored: stored && kvConfigured() });
}
