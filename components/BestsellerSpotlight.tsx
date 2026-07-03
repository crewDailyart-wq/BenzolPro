"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { useAudience } from "@/lib/audience";
import { TAGLINES } from "@/lib/products";
import ProductVisual from "./ProductVisual";
import PriceTag from "./PriceTag";
import { StarIcon, BoltIcon, CheckIcon, ArrowRight } from "./icons";

export default function BestsellerSpotlight({
  product,
  large = false,
  className = "",
}: {
  product: Product;
  large?: boolean;
  className?: string;
}) {
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
    <div className={`relative ${className}`}>
      {/* floating badges */}
      <div className="absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-neon">
          <StarIcon width={13} height={13} /> {t("spotlight.badge")}
        </span>
        <span className="hidden items-center gap-1 rounded-full border border-azure/50 bg-ink-card px-3 py-1.5 text-[11px] font-bold text-azure shadow-azure sm:inline-flex">
          ✦ {product.reviews}+ {t("product.reviews")}
        </span>
      </div>

      <div
        className={`blue-sheen card-surface relative flex h-full flex-col justify-center overflow-hidden shadow-card ${
          large ? "p-7 sm:p-12" : "p-6 sm:p-8"
        }`}
      >
        {/* gold + azure aura */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-radial-neon opacity-80" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-radial-azure opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:26px_26px] opacity-25" />
        {/* blue twinkle sparkles around the card */}
        <span className="animate-twinkle pointer-events-none absolute right-10 top-10 h-2 w-2 rounded-full bg-azure-soft shadow-[0_0_10px_2px_rgba(143,199,255,0.7)]" />
        <span className="animate-twinkle pointer-events-none absolute bottom-16 left-8 h-1.5 w-1.5 rounded-full bg-azure-soft shadow-[0_0_10px_2px_rgba(143,199,255,0.7)] [animation-delay:1.4s]" />
        <span className="animate-twinkle pointer-events-none absolute left-1/3 top-8 h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_10px_2px_rgba(246,217,137,0.6)] [animation-delay:0.7s]" />

        <div className="relative grid grow grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-8">
          {/* floating product visual, big and central — square frame so an
              uploaded photo fills it completely (rounded corners, no borders) */}
          <div className={`relative mx-auto aspect-square w-full ${large ? "max-w-[320px]" : "max-w-[240px]"}`}>
            {/* soft blue ring behind bottle, gently pulsing */}
            <div className="animate-pulse-glow absolute inset-6 rounded-full bg-radial-azure opacity-90" />
            <div className="animate-float relative h-full w-full overflow-hidden rounded-3xl">
              <ProductVisual
                product={product}
                cover
                className="h-full w-full drop-shadow-[0_22px_54px_rgba(0,0,0,0.8)]"
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
            <h3 className={`mt-1 font-extrabold ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{product.name}</h3>
            {tagline && <p className={large ? "text-base text-zinc-400" : "text-sm text-zinc-400"}>{tagline}</p>}
            {product.fitsNote && (
              <p className="mt-1.5 text-sm font-bold text-gold-metal">★ {product.fitsNote}</p>
            )}

            <div className="mt-3 flex flex-wrap justify-center gap-1 sm:justify-start">
              {product.specs.slice(0, 3).map((s) => (
                <span key={s} className="rounded bg-ink-soft px-2 py-0.5 text-[11px] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-center sm:justify-start">
              <PriceTag base={product.price} compareAt={product.compareAtPrice} size={large ? "lg" : "md"} />
            </div>
            <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-400 sm:justify-start">
              <CheckIcon width={13} height={13} /> {t("product.freeShipBadge")}
            </p>

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

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-500 sm:justify-start">
              <span className="flex items-center gap-1.5">
                <CheckIcon width={13} height={13} className="text-neon" /> {t("hero.trust2")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon width={13} height={13} className="text-azure" /> {t("hero.trust3")}
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/products?sort=popular"
          className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-neon hover:underline"
        >
          {t("spotlight.seeAll")} <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}
