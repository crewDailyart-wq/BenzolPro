"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product } from "./types";
import { priceForSize } from "./format";

export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_COST = 4.95;

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, sizeLiter: number, qty?: number, unitPrice?: number) => void;
  addLine: (line: CartLine) => void;
  remove: (productId: string, sizeLiter: number) => void;
  setQty: (productId: string, sizeLiter: number, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "benzolpro.cart";

function lineKey(id: string, size: number) {
  return `${id}__${size}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(JSON.parse(stored) as CartLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const add = useCallback((product: Product, sizeLiter: number, qty = 1, unitPrice?: number) => {
    setLines((prev) => {
      const key = lineKey(product.id, sizeLiter);
      const existing = prev.find((l) => lineKey(l.productId, l.sizeLiter) === key);
      const price = unitPrice ?? priceForSize(product.price, product.sizesLiter[0], sizeLiter);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.productId, l.sizeLiter) === key ? { ...l, qty: l.qty + qty, price } : l,
        );
      }
      const line: CartLine = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        viscosity: product.viscosity,
        sizeLiter,
        price,
        qty,
        accent: product.accent,
      };
      return [...prev, line];
    });
    setOpen(true);
  }, []);

  const addLine = useCallback((line: CartLine) => {
    setLines((prev) => {
      const key = lineKey(line.productId, line.sizeLiter);
      const existing = prev.find((l) => lineKey(l.productId, l.sizeLiter) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.productId, l.sizeLiter) === key ? { ...l, qty: l.qty + line.qty } : l,
        );
      }
      return [...prev, line];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((productId: string, sizeLiter: number) => {
    const key = lineKey(productId, sizeLiter);
    setLines((prev) => prev.filter((l) => lineKey(l.productId, l.sizeLiter) !== key));
  }, []);

  const setQty = useCallback((productId: string, sizeLiter: number, qty: number) => {
    const key = lineKey(productId, sizeLiter);
    setLines((prev) =>
      prev
        .map((l) => (lineKey(l.productId, l.sizeLiter) === key ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const hasFreeShipLine = useMemo(() => lines.some((l) => l.alwaysFreeShip), [lines]);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || hasFreeShipLine ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const value = useMemo<CartContextValue>(
    () => ({ lines, count, subtotal, shipping, total, isOpen, setOpen, add, addLine, remove, setQty, clear }),
    [lines, count, subtotal, shipping, total, isOpen, add, addLine, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
