"use client";

import Link from "next/link";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { useI18n } from "@/lib/i18n/provider";
import { euro } from "@/lib/format";
import OilBottle from "./OilBottle";
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon, BoltIcon, ArrowRight } from "./icons";

export default function CartDrawer() {
  const { lines, subtotal, shipping, total, isOpen, setOpen, remove, setQty } = useCart();
  const { t } = useI18n();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside
        className={`fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col border-s border-ink-line bg-ink shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
        role="dialog"
        aria-label={t("cart.title")}
      >
        <div className="flex items-center justify-between border-b border-ink-line p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <BoltIcon width={18} height={18} className="text-neon" />
            {t("cart.title")}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink-line text-zinc-300 hover:text-neon"
            aria-label={t("common.close")}
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-lg font-semibold">{t("cart.empty")}</p>
            <p className="max-w-xs text-sm text-zinc-500">{t("cart.emptyBody")}</p>
            <Link href="/products" onClick={() => setOpen(false)} className="btn-neon">
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="border-b border-ink-line p-5">
              <p className="mb-2 text-xs text-zinc-400">
                {remaining > 0 ? t("cart.freeShipHint", { amount: euro(remaining) }) : t("cart.freeShipDone")}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-card">
                <div className="h-full rounded-full bg-neon transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {lines.map((line) => (
                <div key={`${line.productId}-${line.sizeLiter}`} className="flex gap-3 rounded-xl border border-ink-line bg-ink-card p-3">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-ink-soft p-1">
                    <OilBottle accent={line.accent} viscosity={line.viscosity} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold leading-tight">{line.name}</p>
                        <p className="text-xs text-zinc-500">
                          {line.isBundle ? (
                            <span className="text-neon">{t("bundle.badge")} · {t("cart.free")} ✈</span>
                          ) : (
                            <>
                              {line.sizeLiter} {t("product.liter")}
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.productId, line.sizeLiter)}
                        className="text-zinc-500 transition hover:text-red-400"
                        aria-label={t("cart.remove")}
                      >
                        <TrashIcon width={16} height={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-ink-line">
                        <button
                          type="button"
                          onClick={() => setQty(line.productId, line.sizeLiter, line.qty - 1)}
                          className="grid h-7 w-7 place-items-center text-zinc-300 hover:text-neon"
                          aria-label="-"
                        >
                          <MinusIcon width={14} height={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.productId, line.sizeLiter, line.qty + 1)}
                          className="grid h-7 w-7 place-items-center text-zinc-300 hover:text-neon"
                          aria-label="+"
                        >
                          <PlusIcon width={14} height={14} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-neon">{euro(line.price * line.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink-line p-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>{t("cart.subtotal")}</span>
                  <span className="text-zinc-100">{euro(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t("cart.shipping")}</span>
                  <span className="text-zinc-100">{shipping === 0 ? t("cart.free") : euro(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-ink-line pt-2 text-base font-bold">
                  <span>{t("cart.total")}</span>
                  <span className="text-neon">{euro(total)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn-neon mt-4 w-full"
              >
                {t("cart.checkout")} <ArrowRight width={18} height={18} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2 w-full text-center text-sm text-zinc-500 hover:text-neon"
              >
                {t("cart.continue")}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
