"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product } from "./types";
import { sizePrice } from "./format";

// Shipping is always free on every order — no minimum. Kept as constants so
// any older references still resolve; both are effectively "always free" now.
export const FREE_SHIPPING_THRESHOLD = 0;
export const SHIPPING_COST = 0;

/** Flat discount when the customer picks up at a collection point instead of home delivery. */
export const PICKUP_DISCOUNT = 2.5;

export type DeliveryMethod = "home" | "pickup";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  discount: number;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
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
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home");

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
      const price = unitPrice ?? sizePrice(product, sizeLiter);
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
  // Every order ships free, always. Picking up at a collection point instead
  // of home delivery gives a small discount.
  const shipping = 0;
  const discount = deliveryMethod === "pickup" && subtotal > 0 ? PICKUP_DISCOUNT : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const value = useMemo<CartContextValue>(
    () => ({ lines, count, subtotal, shipping, discount, deliveryMethod, setDeliveryMethod, total, isOpen, setOpen, add, addLine, remove, setQty, clear }),
    [lines, count, subtotal, shipping, discount, deliveryMethod, total, isOpen, add, addLine, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
