/**
 * Centrale site-instellingen voor SEO (canonical-URLs, sitemap, structured data,
 * social previews). Zet in productie de echte domeinnaam via de omgevingsvariabele
 * NEXT_PUBLIC_SITE_URL (bijv. "https://www.benzolpro.nl"). Zonder die variabele
 * wordt onderstaande standaard gebruikt.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.benzolpro.nl").replace(/\/+$/, "");
export const SITE_NAME = "BenzolPro";
export const SITE_TAGLINE = "Premium motorolie, direct de juiste keuze";
export const CONTACT_EMAIL = "hallo@benzolpro.nl";

/** Maak van een pad ("/product/x") een volledige absolute URL. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
