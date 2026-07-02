"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, isLocale, LOCALE_META, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "benzolpro.locale";

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

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from storage / browser preference on mount
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored && isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "";
    if (isLocale(nav)) setLocaleState(nav);
  }, []);

  // Keep <html lang/dir> in sync
  useEffect(() => {
    const meta = LOCALE_META[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = resolve(DICTIONARIES[locale], key);
      if (str === key) str = resolve(DICTIONARIES[DEFAULT_LOCALE], key); // graceful fallback to Dutch
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dir: LOCALE_META[locale].dir, setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
