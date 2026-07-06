// Verstuurt de e-mails zodra een betaling daadwerkelijk betaald is. Wordt zowel
// vanuit de Mollie-webhook als (als vangnet) vanuit de status-route aangeroepen.
// Een in-memory Set voorkomt dubbele mails binnen dezelfde serverinstantie.
import type { MolliePayment } from "./mollie";
import { sendMail, merchantEmail, emailShell, esc } from "./notify";
import { euro } from "./format";
import { SITE_NAME, COMPANY } from "./site";

const notified = new Set<string>();

export function alreadyNotified(paymentId: string): boolean {
  return notified.has(paymentId);
}

/**
 * Stuur de winkelier- en klantbevestiging voor een betaalde bestelling. Idempotent
 * binnen de serverinstantie (Set-guard). Doet niets als de betaling niet "paid" is.
 */
export async function notifyPaid(payment: MolliePayment): Promise<void> {
  if (payment.status !== "paid") return;
  if (notified.has(payment.id)) return;
  notified.add(payment.id);

  const m = (payment.metadata ?? {}) as Record<string, any>;
  const orderId = String(m.orderId ?? payment.id);
  const email = String(m.email ?? "");
  const total = typeof m.total === "number" ? m.total : Number(payment.amount?.value ?? 0);
  const isPickup = m.deliveryMethod === "pickup";

  const detailRows = `
    <tr><td style="padding:4px 0;color:#8a8a8f">Ordernummer</td><td style="padding:4px 0;text-align:right;font-weight:700;color:#e7b53c">${esc(orderId)}</td></tr>
    <tr><td style="padding:4px 0;color:#8a8a8f">Totaal</td><td style="padding:4px 0;text-align:right;font-weight:700">${esc(euro(total))}</td></tr>
    <tr><td style="padding:4px 0;color:#8a8a8f">${isPickup ? "Afhalen" : "Bezorgen"}</td><td style="padding:4px 0;text-align:right">${esc(isPickup ? m.pickupPoint || "Afhaalpunt" : m.address || "-")}</td></tr>`;

  const itemsHtml = `<p style="margin:0 0 8px;color:#c9c9cf">${esc(m.summary ?? "")}</p>`;

  // 1) Winkelier
  await sendMail({
    to: merchantEmail(),
    replyTo: email || undefined,
    subject: `✅ Nieuwe betaalde bestelling ${orderId} — ${euro(total)}`,
    html: emailShell(
      `Nieuwe betaalde bestelling`,
      `${itemsHtml}
       <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:14px">${detailRows}
         <tr><td style="padding:4px 0;color:#8a8a8f">Klant</td><td style="padding:4px 0;text-align:right">${esc(m.name || "-")}</td></tr>
         <tr><td style="padding:4px 0;color:#8a8a8f">E-mail</td><td style="padding:4px 0;text-align:right">${esc(email)}</td></tr>
         <tr><td style="padding:4px 0;color:#8a8a8f">Telefoon</td><td style="padding:4px 0;text-align:right">${esc(m.phone || "-")}</td></tr>
       </table>`,
    ),
  });

  // 2) Klant (alleen als we een adres hebben)
  if (email) {
    await sendMail({
      to: email,
      subject: `Bevestiging van je bestelling ${orderId} — ${SITE_NAME}`,
      html: emailShell(
        `Bedankt voor je bestelling!`,
        `<p style="margin:0 0 12px;color:#c9c9cf">We hebben je betaling ontvangen en gaan direct voor je aan de slag.</p>
         ${itemsHtml}
         <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:14px">${detailRows}</table>
         <p style="margin:16px 0 0;color:#8a8a8f;font-size:13px">Vragen? Mail ons op ${esc(COMPANY.email)}.</p>`,
      ),
    });
  }
}
