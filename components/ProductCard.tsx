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
import { StarIcon, BoltIcon, CheckIcon, TruckIcon, PackageIcon } from "./icons";

const BADGE_STYLE: Record<string, string> = {
  bestseller: "bg-neon text-ink",
  new: "bg-white text-ink",
  sale: "bg-red-500 text-white",
  pro: "border border-neon text-neon",
};

export default function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const { add } = useCart();
  const { price } = useAudience();
  const [justAdded, setJustAdded] = useState(false);

  const badgeLabel: Record<string, string> = {
    bestseller: "★ Bestseller",
    new: "New",
    sale: "Sale",
    pro: "Pro",
  };

  function quickAdd() {
    add(product, product.sizesLiter[0], 1, price(product.price));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  const tagline = TAGLINES[product.tagline]?.[locale] ?? "";

  return (
    <div className="group card-surface relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-neon/50 hover:shadow-neon">
      {/* stretched link overlay: clicking anywhere on the card opens the product page */}
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={product.name}
      />

      {product.badge && (
        <span
          className={`absolute start-3 top-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-bold ${BADGE_STYLE[product.badge]}`}
        >
          {badgeLabel[product.badge]}
        </span>
      )}
      {product.compareAtPrice && !product.badge && (
        <span className="absolute start-3 top-3 z-20 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
          -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
        </span>
      )}

      <div className="relative block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-ink-soft to-ink">
          <div className="absolute inset-0 bg-grid-neon [background-size:22px_22px] opacity-40" />
          {/* photo fills the whole tile (no letterbox borders); the card's
              rounded top corners clip it. SVG-bottle fallback stays contained. */}
          <div className="relative h-full w-full transition duration-500 group-hover:scale-105">
            <ProductVisual product={product} cover className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <StarIcon width={13} height={13} className="text-neon" />
          <span className="font-semibold text-zinc-200">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
          <span className="ms-auto chip !px-2 !py-0.5">{product.viscosity}</span>
        </div>

        <h3 className="mt-2 font-bold leading-tight transition group-hover:text-neon">{product.name}</h3>
        {tagline && <p className="mt-0.5 text-xs text-zinc-500">{tagline}</p>}

        {product.fitsNote && (
          <p className="mt-1 text-[11px] font-semibold text-gold-metal">★ {product.fitsNote}</p>
        )}

        <div className="mt-2 flex flex-wrap gap-1">
          {product.specs.slice(0, 2).map((s) => (
            <span key={s} className="rounded bg-ink-soft px-1.5 py-0.5 text-[10px] text-zinc-400">
              {s}
            </span>
          ))}
        </div>

        <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <TruckIcon width={13} height={13} /> {t("product.freeShipBadge")}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-[11px] text-zinc-500">{t("product.from")}</p>
            <PriceTag base={product.price} compareAt={product.compareAtPrice} size="sm" />
          </div>
          <button
            type="button"
            onClick={quickAdd}
            className={`relative z-20 grid h-11 w-11 place-items-center rounded-full transition active:scale-90 ${
              justAdded ? "bg-neon text-ink" : "bg-ink-soft text-neon hover:bg-neon hover:text-ink"
            }`}
            aria-label={t("product.quickBuy")}
          >
            {justAdded ? <CheckIcon width={20} height={20} /> : <BoltIcon width={20} height={20} />}
          </button>
        </div>

        <Link
          href="/bundels"
          className="relative z-20 mt-2 flex items-center justify-center gap-1.5 rounded-full border border-azure/40 bg-azure/5 py-2 text-xs font-semibold text-azure transition hover:bg-azure/15"
        >
          <PackageIcon width={14} height={14} /> {t("product.bundleCta")}
        </Link>
      </div>
    </div>
  );
}
