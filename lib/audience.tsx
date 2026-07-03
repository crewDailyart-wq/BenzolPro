"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Audience = "customer" | "garage";

/** Base discount garages get on every single item vs. consumer price. */
export const GARAGE_DISCOUNT = 0.18;

/** Extra bulk tiers for garages (per single-item quantity). */
export const GARAGE_BULK_TIERS = [
  { minQty: 6, extra: 0.05 },
  { minQty: 12, extra: 0.1 },
  { minQty: 24, extra: 0.15 },
];

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/** Price for a single unit given the audience and (optional) quantity for bulk tiers. */
export function unitPriceFor(base: number, audience: Audience, qty = 1): number {
  if (audience !== "garage") return base;
  let discount = GARAGE_DISCOUNT;
  for (const tier of GARAGE_BULK_TIERS) {
    if (qty >= tier.minQty) discount = GARAGE_DISCOUNT + tier.extra;
  }
  return round2(base * (1 - discount));
}

interface AudienceContextValue {
  audience: Audience;
  isGarage: boolean;
  setAudience: (a: Audience) => void;
  toggle: () => void;
  /** consumer discount percentage as a whole number (for badges) */
  garageDiscountPct: number;
  price: (base: number, qty?: number) => number;
}

const AudienceContext = createContext<AudienceContextValue | null>(null);
const STORAGE_KEY = "benzolpro.audience";

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("customer");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "garage" || stored === "customer") setAudienceState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.audience = audience;
  }, [audience]);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    try {
      window.localStorage.setItem(STORAGE_KEY, a);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setAudience(audience === "garage" ? "customer" : "garage");
  }, [audience, setAudience]);

  const value = useMemo<AudienceContextValue>(
    () => ({
      audience,
      isGarage: audience === "garage",
      setAudience,
      toggle,
      garageDiscountPct: Math.round(GARAGE_DISCOUNT * 100),
      price: (base: number, qty = 1) => unitPriceFor(base, audience, qty),
    }),
    [audience, setAudience, toggle],
  );

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience(): AudienceContextValue {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
