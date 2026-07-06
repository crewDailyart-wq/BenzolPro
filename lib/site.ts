/**
 * Centrale site-instellingen voor SEO (canonical-URLs, sitemap, structured data,
 * social previews). Zet in productie de echte domeinnaam via de omgevingsvariabele
 * NEXT_PUBLIC_SITE_URL (bijv. "https://www.benzolpro.nl"). Zonder die variabele
 * wordt onderstaande standaard gebruikt.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.benzolpro.nl").replace(/\/+$/, "");
export const SITE_NAME = "BenzolPro";
export const SITE_TAGLINE = "Premium motorolie, direct de juiste keuze";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hallo@benzolpro.nl";

/**
 * Wettelijke bedrijfsgegevens — vereist voor de juridische pagina's (algemene
 * voorwaarden, privacybeleid, contact) én voor de LocalBusiness/Organization
 * structured data. Vul de echte gegevens in via omgevingsvariabelen in productie
 * (zie `.env.example`); zonder die variabelen worden onderstaande placeholders
 * gebruikt — herkenbaar aan "VUL_IN" zodat je niet per ongeluk met dummydata live gaat.
 */
export const COMPANY = {
  legalName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Benzol Lubricants B.V.",
  kvk: process.env.NEXT_PUBLIC_COMPANY_KVK ?? "VUL_IN_KVK",
  vat: process.env.NEXT_PUBLIC_COMPANY_VAT ?? "VUL_IN_BTW",
  iban: process.env.NEXT_PUBLIC_COMPANY_IBAN ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hallo@benzolpro.nl",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+31 (0)20 000 0000",
  street: process.env.NEXT_PUBLIC_COMPANY_STREET ?? "VUL_IN_straat en huisnummer",
  postal: process.env.NEXT_PUBLIC_COMPANY_POSTAL ?? "1000 AA",
  city: process.env.NEXT_PUBLIC_COMPANY_CITY ?? "Amsterdam",
  country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY ?? "NL",
} as const;

/** true wanneer een gegeven nog een placeholder is (nog niet ingevuld). */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("VUL_IN");
}

/** Toon "—" in plaats van een ruwe placeholder-waarde op klantgerichte pagina's. */
export function shown(value: string): string {
  return isPlaceholder(value) ? "—" : value;
}

/** Datum waarop de juridische documenten voor het laatst zijn bijgewerkt. */
export const LEGAL_UPDATED = process.env.NEXT_PUBLIC_LEGAL_UPDATED ?? "2026-07-06";

/** Maak van een pad ("/product/x") een volledige absolute URL. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
