// Server-only module: alleen importeren vanuit route handlers / server components.
// Bevat geheimen (API-sleutels) uit process.env — nooit vanuit een client component
// importeren, anders lekken die naar de browserbundle.
import { COMPANY, SITE_NAME } from "./site";

/**
 * Server-side notificatielaag — stuurt bestellingen, offerte-aanvragen en
 * nieuwsbrief-aanmeldingen naar de winkelier (en optioneel een bevestiging naar
 * de klant). Volledig dependency-vrij: gebruikt de Resend REST-API als
 * `RESEND_API_KEY` is gezet, anders een generieke webhook (`ORDER_WEBHOOK_URL`).
 * Is geen van beide gezet, dan wordt de melding gelogd en overgeslagen — de site
 * blijft werken, je mist alleen de e-mail tot je een kanaal configureert.
 *
 * Benodigde omgevingsvariabelen (zie `.env.example`):
 *   RESEND_API_KEY   – API-sleutel van https://resend.com
 *   MAIL_FROM        – geverifieerd afzenderadres, bijv. "BenzolPro <orders@benzolpro.nl>"
 *   ORDER_EMAIL      – waar bestellingen/offertes heen moeten (winkelier)
 *   ORDER_WEBHOOK_URL – alternatief: POST de payload naar deze URL (Zapier/Make/eigen)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM ?? `${SITE_NAME} <onboarding@resend.dev>`;
const ORDER_EMAIL = process.env.ORDER_EMAIL ?? COMPANY.email;
const ORDER_WEBHOOK_URL = process.env.ORDER_WEBHOOK_URL;

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export type NotifyResult =
  | { ok: true; channel: "resend" | "webhook" }
  | { ok: false; channel: "none"; reason: string };

/** Verstuur één e-mail via Resend. Gooit bij een echte API-fout. */
async function sendViaResend(mail: MailInput): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/**
 * Stuur een e-mail via het geconfigureerde kanaal. Faalt nooit hard richting de
 * aanroeper: bij een ontbrekende configuratie of fout wordt er gelogd en een
 * `ok:false` teruggegeven, zodat een bestelling of offerte niet stukloopt op de
 * e-mail. (De betaling zelf is leidend; de e-mail is de notificatie.)
 */
export async function sendMail(mail: MailInput): Promise<NotifyResult> {
  try {
    if (RESEND_API_KEY) {
      await sendViaResend(mail);
      return { ok: true, channel: "resend" };
    }
    if (ORDER_WEBHOOK_URL) {
      await postWebhook({ type: "email", ...mail });
      return { ok: true, channel: "webhook" };
    }
    console.warn(
      `[notify] Geen e-mailkanaal geconfigureerd — melding overgeslagen: "${mail.subject}". ` +
        `Zet RESEND_API_KEY of ORDER_WEBHOOK_URL om meldingen te ontvangen.`,
    );
    return { ok: false, channel: "none", reason: "not-configured" };
  } catch (err) {
    console.error("[notify] versturen mislukt:", err);
    return { ok: false, channel: "none", reason: String(err) };
  }
}

/** POST een willekeurige payload naar de geconfigureerde webhook. */
export async function postWebhook(payload: unknown): Promise<void> {
  if (!ORDER_WEBHOOK_URL) return;
  await fetch(ORDER_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/** Het adres van de winkelier waar bestellingen/offertes naartoe gaan. */
export function merchantEmail(): string {
  return ORDER_EMAIL;
}

/** Nette HTML-wrapper voor uitgaande e-mails, in de huisstijl. */
export function emailShell(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#0a0a0b;font-family:Arial,Helvetica,sans-serif;color:#e5e5e5;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#141416;border:1px solid #2a2a2e;border-radius:16px;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #2a2a2e">
      <span style="font-size:20px;font-weight:800;color:#e7b53c">${SITE_NAME}</span>
    </div>
    <div style="padding:24px">
      <h1 style="margin:0 0 16px;font-size:18px;color:#fff">${title}</h1>
      ${bodyHtml}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #2a2a2e;font-size:12px;color:#8a8a8f">
      ${COMPANY.legalName} · ${COMPANY.email}
    </div>
  </div></body></html>`;
}

/** Ontsnap tekst voor veilige interpolatie in HTML-e-mails. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
