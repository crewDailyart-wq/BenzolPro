"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { getProductBySlug } from "@/lib/products";
import { formatPlate, isPlausiblePlate, normalizePlate } from "@/lib/rdw";
import type { OilRecommendation } from "@/lib/types";
import { euro } from "@/lib/format";
import OilBottle from "./OilBottle";
import { ArrowRight, CarIcon, CheckIcon, BoltIcon } from "./icons";

type Status = "idle" | "loading" | "done" | "error" | "invalid" | "notfound";

export default function PlateLookup() {
  const { t } = useI18n();
  const { add } = useCart();
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<OilRecommendation | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePlate(plate);
    if (!isPlausiblePlate(normalized)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch(`/api/rdw?plate=${normalized}`);
      if (res.status === 404) {
        setStatus("notfound");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = (await res.json()) as OilRecommendation;
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const product = result?.productSlug ? getProductBySlug(result.productSlug) : undefined;

  return (
    <div id="plate" className="scroll-mt-24">
      <div className="card-surface relative overflow-hidden p-6 shadow-card sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-radial-neon opacity-60" />

        <div className="relative">
          <span className="chip"><CarIcon width={14} height={14} /> RDW</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{t("plate.title")}</h2>
          <p className="mt-1 text-sm text-zinc-400">{t("plate.subtitle")}</p>

          <form onSubmit={lookup} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="plate flex items-center gap-2 px-4 py-2 sm:min-w-[240px]">
              <span className="hidden text-xs font-bold text-ink/70 sm:block">NL</span>
              <input
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder={t("plate.placeholder")}
                aria-label="Kenteken"
                maxLength={8}
                className="w-full bg-transparent text-center text-xl font-extrabold uppercase tracking-widest text-ink placeholder:text-ink/40 outline-none"
              />
            </div>
            <button type="submit" className="btn-neon flex-1 sm:flex-none" disabled={status === "loading"}>
              {status === "loading" ? t("plate.loading") : t("plate.button")}
              {status !== "loading" && <ArrowRight width={18} height={18} />}
            </button>
          </form>

          {/* messages */}
          {status === "invalid" && <p className="mt-3 text-sm text-red-400">{t("plate.invalid")}</p>}
          {status === "notfound" && <p className="mt-3 text-sm text-red-400">{t("plate.notFound")}</p>}
          {status === "error" && <p className="mt-3 text-sm text-red-400">{t("plate.error")}</p>}

          {status === "loading" && (
            <div className="mt-6 flex items-center gap-3 text-sm text-zinc-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-neon border-t-transparent" />
              {t("plate.loading")}
            </div>
          )}

          {/* result */}
          {status === "done" && result && (
            <div className="mt-6 animate-fade-up rounded-2xl border border-ink-line bg-ink-soft p-5">
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                <span className="plate px-2 py-0.5 text-xs">{formatPlate(result.vehicle.plate)}</span>
                <span className="font-semibold text-zinc-100">
                  {result.vehicle.make} {result.vehicle.model}
                </span>
                {result.vehicle.year ? <span className="text-zinc-500">· {result.vehicle.year}</span> : null}
                {result.vehicle.fuel ? <span className="text-zinc-500">· {result.vehicle.fuel}</span> : null}
              </div>

              {result.isElectric ? (
                <p className="mt-4 flex items-start gap-2 text-sm text-zinc-300">
                  <BoltIcon width={18} height={18} className="mt-0.5 shrink-0 text-neon" />
                  {t("plate.electricNote")}
                </p>
              ) : (
                <>
                  <p className="mt-3 flex items-start gap-2 text-sm text-zinc-400">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-neon" />
                    {t(result.reasonKey)}
                  </p>

                  {product && (
                    <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-ink-line bg-ink p-4 sm:flex-row">
                      <div className="h-24 w-24 shrink-0">
                        <OilBottle accent={product.accent} viscosity={product.viscosity} className="h-full w-full" />
                      </div>
                      <div className="flex-1 text-center sm:text-start">
                        <p className="text-xs uppercase tracking-wide text-neon">{t("plate.recommendedOil")}</p>
                        <p className="text-lg font-bold">{product.name}</p>
                        <p className="text-sm text-zinc-400">{product.specs.slice(0, 3).join(" · ")}</p>
                        <p className="mt-1 text-lg font-bold text-neon">{euro(product.price)}</p>
                      </div>
                      <div className="flex w-full flex-col gap-2 sm:w-auto">
                        <button
                          type="button"
                          onClick={() => add(product, product.sizesLiter[0], 1)}
                          className="btn-neon"
                        >
                          {t("product.quickBuy")}
                        </button>
                        <Link href={`/product/${product.slug}`} className="btn-ghost">
                          {t("plate.viewProduct")}
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/products?v=${result.viscosity}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neon hover:underline"
                  >
                    {t("plate.shopAll")} <ArrowRight width={16} height={16} />
                  </Link>
                </>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-zinc-600">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
