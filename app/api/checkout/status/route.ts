import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPayment } from "@/lib/mollie";
import { notifyPaid } from "@/lib/orderNotify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Vertelt de bedankpagina wat de status van de laatste betaling is. De betaal-id
 * komt uit de httpOnly-cookie die bij het afrekenen is gezet (niet uit de URL).
 * Dient ook als vangnet voor de bevestigingsmail wanneer de webhook niet kon
 * afgaan (bijv. lokaal draaien zonder publieke URL).
 */
export async function GET() {
  const id = cookies().get("bp_pay")?.value;
  if (!id) {
    return NextResponse.json({ status: "unknown" }, { status: 200 });
  }

  try {
    const payment = await getPayment(id);
    if (payment.status === "paid") {
      await notifyPaid(payment);
    }
    const m = (payment.metadata ?? {}) as Record<string, any>;
    return NextResponse.json({
      status: payment.status,
      orderId: m.orderId ?? null,
      email: m.email ?? null,
      total: typeof m.total === "number" ? m.total : Number(payment.amount?.value ?? 0),
    });
  } catch (err) {
    console.error("[checkout status] fout:", err);
    return NextResponse.json({ status: "unknown" }, { status: 200 });
  }
}
