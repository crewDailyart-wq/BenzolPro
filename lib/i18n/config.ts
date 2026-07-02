export const LOCALES = ["nl", "en", "pl", "ar", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "nl";

export const RTL_LOCALES: Locale[] = ["ar"];

export const LOCALE_META: Record<Locale, { label: string; flag: string; dir: "ltr" | "rtl" }> = {
  nl: { label: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  en: { label: "English", flag: "🇬🇧", dir: "ltr" },
  pl: { label: "Polski", flag: "🇵🇱", dir: "ltr" },
  ar: { label: "العربية", flag: "🇸🇦", dir: "rtl" },
  tr: { label: "Türkçe", flag: "🇹🇷", dir: "ltr" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
