"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolve(dict: unknown, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key; // fall back to the key so missing copy is visible
    }
  }
  return typeof current === "string" ? current : key;
}

/**
 * The shop is Dutch-only by product decision (no visible language switcher).
 * The dictionary/translation architecture is kept intact under the hood so a
 * language switcher can be reintroduced later without a rewrite.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = DEFAULT_LOCALE;

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = resolve(DICTIONARIES[locale], key);
      if (str === key) str = resolve(DICTIONARIES[DEFAULT_LOCALE], key);
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, dir: "ltr", t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
