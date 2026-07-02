"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { euro, priceForSize } from "@/lib/format";
import { TAGLINES } from "@/lib/products";
import OilBottle from "./OilBottle";
import ProductCard from "./ProductCard";
import { StarIcon, CheckIcon, TruckIcon, ShieldIcon, ArrowRight, BoltIcon, CartIcon } from "./icons";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useI18n();
  const { add, setOpen } = useCart();
  const [size, setSize] = useState(product.sizesLiter[0]);
  const [qty, setQty] = useState(1);

  const price = priceForSize(product.price, product.sizesLiter[0], size);
  const tagline = TAGLINES[product.tagline]?.[locale] ?? "";

  const stockLabel =
    product.stock === 0 ? t("product.outOfStock") : product.stock <= 10 ? t("product.lowStock") : t("product.inStock");

  return (
    <div className="section-pad py-8">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-neon">
        <ArrowRight width={16} height={16} className="rotate-180 rtl:rotate-0" /> {t("product.back")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* visual */}
        <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-b from-ink-soft to-ink">
          <div className="absolute inset-0 bg-grid-neon [background-size:28px_28px] opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 bg-radial-neon opacity-60" />
          <div className="relative mx-auto aspect-square max-w-md p-10">
            <OilBottle accent={product.accent} viscosity={product.viscosity} className="h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]" />
          </div>
        </div>

        {/* info */}
        <div>
          <div className="flex items-center gap-2">
            <span className="chip">{product.viscosity}</span>
            <span className="chip">{t(`category.${product.category}`)}</span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          {tagline && <p className="mt-1 text-zinc-400">{tagline}</p>}

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex text-neon">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} width={16} height={16} className={i < Math.round(product.rating) ? "" : "opacity-25"} />
              ))}
            </span>
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-zinc-500">
              ({product.reviews} {t("product.reviews")})
            </span>
          </div>

          {/* price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-neon">{euro(price)}</span>
            {product.compareAtPrice && size === product.sizesLiter[0] && (
              <span className="text-lg text-zinc-600 line-through">{euro(product.compareAtPrice)}</span>
            )}
          </div>

          {/* size selector */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-zinc-300">{t("product.size")}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizesLiter.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-xl border px-5 py-3 text-sm font-bold transition ${
                    size === s
                      ? "border-neon bg-neon text-ink"
                      : "border-ink-line bg-ink-card text-zinc-200 hover:border-neon/60"
                  }`}
                >
                  {s} {t("product.liter")}
                </button>
              ))}
            </div>
          </div>

          {/* qty + add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-ink-line">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">−</button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">+</button>
            </div>
            <button
              type="button"
              onClick={() => add(product, size, qty)}
              disabled={product.stock === 0}
              className="btn-neon flex-1"
            >
              <CartIcon width={18} height={18} /> {t("product.addToCart")} · {euro(price * qty)}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              add(product, size, qty);
              setOpen(true);
            }}
            disabled={product.stock === 0}
            className="btn-ghost mt-3 w-full"
          >
            <BoltIcon width={18} height={18} /> {t("product.quickBuy")}
          </button>

          <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
            <span className={`h-2 w-2 rounded-full ${product.stock === 0 ? "bg-red-500" : "bg-neon"}`} />
            {stockLabel}
          </p>

          {/* trust row */}
          <div className="mt-6 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
            <span className="flex items-center gap-2"><TruckIcon width={18} height={18} className="text-neon" /> {t("hero.trust2")}</span>
            <span className="flex items-center gap-2"><ShieldIcon width={18} height={18} className="text-neon" /> {t("product.guarantee")}</span>
            <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-neon" /> {t("product.freeReturns")}</span>
            <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-neon" /> {t("hero.trust3")}</span>
          </div>

          {/* specs */}
          <div className="mt-8 rounded-2xl border border-ink-line bg-ink-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">{t("product.specs")}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.specs.map((s) => (
                <li key={s} className="rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200">{s}</li>
              ))}
            </ul>

            <h2 className="mt-5 text-sm font-bold uppercase tracking-wide text-zinc-300">{t("product.bestFor")}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.bestFor.map((b) => (
                <li key={b} className="chip">{t(`bestFor.${b}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold">{t("product.related")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
