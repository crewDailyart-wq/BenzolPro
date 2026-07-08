import { NextResponse } from "next/server";
import { listSubscriptions, wasSentRecently, markSent } from "@/lib/garageStore";
import { daysUntil } from "@/lib/garage";
import { sendMail, emailShell, esc } from "@/lib/notify";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Dagelijkse cron (Vercel Cron → vercel.json) die onderhoudsherinneringen
 * verstuurt: APK die binnenkort verloopt en olie die toe is. Beveiligd met
 * CRON_SECRET (Vercel stuurt die als Authorization-header mee). Idempotent per
 * auto/type via een 40-daagse 'sent'-markering in KV.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const today = new Date();
  const subs = await listSubscriptions();
  let sent = 0;

  for (const sub of subs) {
    for (const car of sub.cars) {
      const name = car.name || car.plate;

      const apkDays = daysUntil(car.apkExpiry, today);
      if (apkDays != null && apkDays >= -3 && apkDays <= 14 && !(await wasSentRecently(sub.email, car.plate, "apk"))) {
        await sendMail({
          to: sub.email,
          subject: `🔔 APK van je ${name} verloopt ${apkDays <= 0 ? "nu" : `over ${apkDays} dagen`}`,
          html: emailShell(
            "APK-herinnering",
            `<p style="color:#c9c9cf">De APK van je <strong>${esc(name)}</strong> (${esc(car.plate)}) verloopt ${apkDays <= 0 ? "nu" : `over ${apkDays} dagen`} (${esc(car.apkExpiry)}).</p>
             <p style="color:#c9c9cf">Plan de keuring op tijd en combineer het met een olieverversing.</p>
             <p><a href="${SITE_URL}/kenteken-check" style="color:#e7b53c">Bekijk de juiste olie voor je auto →</a></p>`,
          ),
        });
        await markSent(sub.email, car.plate, "apk", car.apkExpiry ?? "");
        sent++;
      }

      const oilDays = daysUntil(car.oilDue, today);
      if (oilDays != null && oilDays >= -7 && oilDays <= 14 && !(await wasSentRecently(sub.email, car.plate, "olie"))) {
        await sendMail({
          to: sub.email,
          subject: `🛢️ Tijd voor een olieverversing van je ${name}`,
          html: emailShell(
            "Olie-herinnering",
            `<p style="color:#c9c9cf">Je <strong>${esc(name)}</strong> (${esc(car.plate)}) is toe aan een olieverversing.</p>
             <p><a href="${SITE_URL}/kenteken-check" style="color:#e7b53c">Bestel de juiste olie →</a></p>`,
          ),
        });
        await markSent(sub.email, car.plate, "olie", car.oilDue ?? "");
        sent++;
      }
    }
  }

  return NextResponse.json({ ok: true, checked: subs.length, sent });
}
