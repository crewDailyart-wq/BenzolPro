"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { euro } from "@/lib/format";
import { CheckIcon, TruckIcon, ArrowRight, LockIcon } from "./icons";

interface LastOrder {
  orderId: string;
  email: string;
  total: number;
}

type PayState = "loading" | "paid" | "pending" | "failed";

// Mollie-statussen die als "gelukt" tellen.
const PAID = new Set(["paid", "authorized"]);
const PENDING = new Set(["open", "pending"]);

export default function OrderSuccess() {
  const { t } = useI18n();
  const { clear } = useCart();
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [state, setState] = useState<PayState>("loading");

  useEffect(() => {
    // Toon meteen wat we lokaal weten (voor een vlotte eerste render).
    try {
      const raw = localStorage.getItem("benzolpro.pendingOrder");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }

    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/checkout/status", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (data.orderId || typeof data.total === "number") {
          setOrder((prev) => ({
            orderId: data.orderId ?? prev?.orderId ?? "",
            email: data.email ?? prev?.email ?? "",
            total: typeof data.total === "number" ? data.total : prev?.total ?? 0,
          }));
        }

        const status = String(data.status ?? "unknown");
        if (PAID.has(status)) {
          setState("paid");
          clear();
          try {
            localStorage.removeItem("benzolpro.pendingOrder");
          } catch {
            /* ignore */
          }
        } else if (PENDING.has(status)) {
          setState("pending");
        } else if (status === "unknown") {
          // Geen betaal-id bekend (bijv. direct bezoek) — toon neutraal succes.
          setState("paid");
        } else {
          setState("failed");
        }
      } catch {
        if (!cancelled) setState("pending");
      }
    }
    check();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === "failed") {
    return (
      <div className="section-pad flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-red-500/15 text-red-400">
          <LockIcon width={40} height={40} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">{t("confirm.failedTitle")}</h1>
        <p className="mt-3 max-w-md text-zinc-400">{t("confirm.failedBody")}</p>
        <Link href="/checkout" className="btn-neon mt-8">
          {t("confirm.retry")} <ArrowRight width={18} height={18} />
        </Link>
      </div>
    );
  }

  const pending = state === "pending";

  return (
    <div className="section-pad flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div
        className={`animate-fade-up grid h-20 w-20 place-items-center rounded-full ${
          pending ? "bg-azure/15 text-azure" : "bg-neon text-ink shadow-neon-lg"
        }`}
      >
        {pending ? (
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-azure border-t-transparent" />
        ) : (
          <CheckIcon width={44} height={44} strokeWidth={2.5} />
        )}
      </div>

      <h1 className="mt-6 animate-fade-up animate-delay-1 text-3xl font-extrabold sm:text-4xl">
        {pending ? t("confirm.pendingTitle") : t("confirm.title")}
      </h1>
      <p className="mt-3 max-w-md animate-fade-up animate-delay-2 text-zinc-400">
        {pending ? t("confirm.pendingBody") : t("confirm.subtitle")}
      </p>

      <div className="mt-8 w-full max-w-md animate-fade-up animate-delay-3 card-surface p-6 text-start">
        {order && order.orderId && (
          <>
            <div className="flex items-center justify-between border-b border-ink-line pb-3">
              <span className="text-sm text-zinc-400">{t("confirm.order")}</span>
              <span className="font-mono font-bold text-neon">{order.orderId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-ink-line py-3">
              <span className="text-sm text-zinc-400">{t("cart.total")}</span>
              <span className="font-bold">{euro(order.total)}</span>
            </div>
            {order.email && <p className="pt-3 text-sm text-zinc-400">{t("confirm.emailed", { email: order.email })}</p>}
          </>
        )}
        {!pending && (
          <p className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
            <TruckIcon width={18} height={18} className="text-neon" /> {t("confirm.delivery")}
          </p>
        )}
      </div>

      <Link href="/products" className="btn-neon mt-8 animate-fade-up animate-delay-4">
        {t("confirm.continue")} <ArrowRight width={18} height={18} />
      </Link>
    </div>
  );
}
