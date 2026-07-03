"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { euro } from "@/lib/format";
import { CheckIcon, TruckIcon, ArrowRight } from "./icons";

interface LastOrder {
  orderId: string;
  email: string;
  total: number;
}

export default function OrderSuccess() {
  const { t } = useI18n();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("benzolpro.lastOrder");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="section-pad flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="animate-fade-up grid h-20 w-20 place-items-center rounded-full bg-neon text-ink shadow-neon-lg">
        <CheckIcon width={44} height={44} strokeWidth={2.5} />
      </div>

      <h1 className="mt-6 animate-fade-up animate-delay-1 text-3xl font-extrabold sm:text-4xl">{t("confirm.title")}</h1>
      <p className="mt-3 max-w-md animate-fade-up animate-delay-2 text-zinc-400">{t("confirm.subtitle")}</p>

      <div className="mt-8 w-full max-w-md animate-fade-up animate-delay-3 card-surface p-6 text-start">
        {order && (
          <>
            <div className="flex items-center justify-between border-b border-ink-line pb-3">
              <span className="text-sm text-zinc-400">{t("confirm.order")}</span>
              <span className="font-mono font-bold text-neon">{order.orderId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-ink-line py-3">
              <span className="text-sm text-zinc-400">{t("cart.total")}</span>
              <span className="font-bold">{euro(order.total)}</span>
            </div>
            <p className="pt-3 text-sm text-zinc-400">{t("confirm.emailed", { email: order.email })}</p>
          </>
        )}
        <p className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
          <TruckIcon width={18} height={18} className="text-neon" /> {t("confirm.delivery")}
        </p>
      </div>

      <Link href="/products" className="btn-neon mt-8 animate-fade-up animate-delay-4">
        {t("confirm.continue")} <ArrowRight width={18} height={18} />
      </Link>
    </div>
  );
}
