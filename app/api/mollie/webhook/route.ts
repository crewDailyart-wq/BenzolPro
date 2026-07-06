import { NextResponse } from "next/server";
import { getPayment } from "@/lib/mollie";
import { notifyPaid } from "@/lib/orderNotify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mollie-webhook. Mollie POST'et hier alleen de betaal-id; we halen de actuele
 * status zelf op (nooit vertrouwen op de body). Antwoord altijd met 200, anders
 * blijft Mollie het opnieuw proberen.
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const id = String(form.get("id") ?? "");
    if (!id) return new NextResponse("missing id", { status: 200 });

    const payment = await getPayment(id);
    if (payment.status === "paid") {
      await notifyPaid(payment);
    }
  } catch (err) {
    // Log, maar geef 200 terug zodat Mollie niet in een retry-lus blijft hangen
    // op een fout die wij toch niet oplossen door te herhalen.
    console.error("[mollie webhook] fout:", err);
  }
  return new NextResponse("ok", { status: 200 });
}
