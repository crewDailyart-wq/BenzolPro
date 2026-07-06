"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Toestemmingsstatus voor analytische cookies. "unset" = nog geen keuze gemaakt
// (dan tonen we de melding). We bewaren dit in localStorage, niet in een cookie —
// het is functionele opslag en vereist zelf geen toestemming.
export type Consent = "granted" | "denied" | "unset";

const STORAGE_KEY = "benzolpro.consent";

interface ConsentValue {
  consent: Consent;
  /** true zodra we localStorage hebben gelezen (voorkomt flikkering bij hydratie). */
  ready: boolean;
  accept: () => void;
  reject: () => void;
  /** Heropen de keuze (bijv. via "Cookievoorkeuren" in de footer). */
  reset: () => void;
}

const ConsentContext = createContext<ConsentValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>("unset");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") setConsent(stored);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((value: Consent) => {
    setConsent(value);
    try {
      if (value === "unset") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    // Geef Google Consent Mode direct de nieuwe status door (indien geladen).
    try {
      const w = window as any;
      if (typeof w.gtag === "function") {
        w.gtag("consent", "update", {
          analytics_storage: value === "granted" ? "granted" : "denied",
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ConsentValue>(
    () => ({
      consent,
      ready,
      accept: () => persist("granted"),
      reject: () => persist("denied"),
      reset: () => persist("unset"),
    }),
    [consent, ready, persist],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
