"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { useAudience } from "@/lib/audience";
import { TAGLINES } from "@/lib/products";
import OilBottle from "./OilBottle";
import PriceTag from "./PriceTag";
import { StarIcon, BoltIcon, CheckIcon, ArrowRight } from "./icons";

export default function BestsellerSpotlight({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const { add } = useCart();
  const { price } = useAudience();
  const [added, setAdded] = useState(false);

  const tagline = TAGLINES[product.tagline]?.[locale] ?? "";

  function quickBuy() {
    add(product, product.sizesLiter[0], 1, price(product.price));
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="relative">
      {/* floating badge */}
      <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-neon">
          <StarIcon width={13} height={13} /> {t("spotlight.badge")}
        </span>
      </div>

      <div className="card-surface relative overflow-hidden p-6 shadow-card sm:p-8">
        {/* animated aura */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-radial-neon opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:26px_26px] opacity-30" />

        <div className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          {/* floating bottle */}
          <div className="relative mx-auto h-56 w-full max-w-[220px]">
            <div className="absolute inset-x-6 bottom-3 h-6 rounded-[50%] bg-black/60 blur-md" />
            <div className="animate-float h-full w-full">
              <OilBottle
                accent={product.accent}
                viscosity={product.viscosity}
                className="h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* info */}
          <div className="text-center sm:text-start">
            <div className="flex items-center justify-center gap-1 text-xs text-zinc-400 sm:justify-start">
              <StarIcon width={13} height={13} className="text-neon" />
              <span className="font-semibold text-zinc-100">{product.rating.toFixed(1)}</span>
              <span>({product.reviews})</span>
            </div>
            <h3 className="mt-1 text-2xl font-extrabold">{product.name}</h3>
            {tagline && <p className="text-sm text-zinc-400">{tagline}</p>}

            <div className="mt-3 flex flex-wrap justify-center gap-1 sm:justify-start">
              {product.specs.slice(0, 3).map((s) => (
                <span key={s} className="rounded bg-ink-soft px-2 py-0.5 text-[11px] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-center sm:justify-start">
              <PriceTag base={product.price} compareAt={product.compareAtPrice} size="md" />
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={quickBuy} className="btn-neon flex-1">
                {added ? (
                  <>
                    <CheckIcon width={18} height={18} /> {t("product.added")}
                  </>
                ) : (
                  <>
                    <BoltIcon width={18} height={18} /> {t("product.quickBuy")}
                  </>
                )}
              </button>
              <Link href={`/product/${product.slug}`} className="btn-ghost">
                {t("plate.viewProduct")}
              </Link>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500 sm:justify-start">
              <CheckIcon width={13} height={13} className="text-neon" /> {t("hero.trust2")}
            </p>
          </div>
        </div>

        <Link
          href="/products?sort=popular"
          className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-neon hover:underline"
        >
          {t("spotlight.seeAll")} <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}
