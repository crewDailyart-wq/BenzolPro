"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { euro } from "@/lib/format";
import { getProductById } from "@/lib/products";
import {
  bundleOriginalPrice,
  getBundleGalleryImages,
  GIFT_LABEL,
  BADGE_LABEL,
  type Bundle,
} from "@/lib/bundles";
import ProductGallery from "./ProductGallery";
import ProductVisual from "./ProductVisual";
import {
  CheckIcon,
  TruckIcon,
  ShieldIcon,
  ArrowRight,
  CartIcon,
  BoltIcon,
  PackageIcon,
  SparkIcon,
} from "./icons";

export default function BundleDetail({ bundle }: { bundle: Bundle }) {
  const { t, locale } = useI18n();
  const { addLine, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  const name = bundle.name[locale] ?? bundle.name.nl;
  const desc = bundle.desc[locale] ?? bundle.desc.nl;
  const original = bundleOriginalPrice(bundle);
  const savings = Math.round((original - bundle.price) * 100) / 100;
  const savingsPct = original > 0 ? Math.round((savings / original) * 100) : 0;
  const galleryImages = getBundleGalleryImages(bundle);

  const items = bundle.items
    .map((it) => ({ product: getProductById(it.productId), it }))
    .filter((x) => x.product);

  function addBundle(quantity: number) {
    addLine({
      productId: bundle.id,
      slug: bundle.slug,
      name,
      viscosity: "SET",
      sizeLiter: 0,
      price: bundle.price,
      qty: quantity,
      accent: bundle.accent,
      alwaysFreeShip: true,
      isBundle: true,
    });
  }

  return (
    <div className="section-pad py-8">
      <Link href="/bundels" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-azure">
        <ArrowRight width={16} height={16} className="rotate-180 rtl:rotate-0" /> {t("bundle.detailBack")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* visual */}
        <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-b from-ink-soft to-ink p-6 sm:p-10">
          <div className="absolute inset-0 bg-grid-neon [background-size:28px_28px] opacity-30" />
          <div className="absolute inset-x-0 top-0 h-64 bg-radial-azure opacity-60" />
          <div className="relative">
            <ProductGallery
              images={galleryImages}
              name={name}
              accent={bundle.accent}
              viscosity="SET"
              imageClassName="drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>

        {/* info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-azure/50 bg-azure/10 text-azure">
              <PackageIcon width={13} height={13} /> {t("bundle.detailBadge")}
            </span>
            {bundle.badge && (
              <span className="chip">{BADGE_LABEL[bundle.badge]?.[locale] ?? bundle.badge}</span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{name}</h1>
          <p className="mt-2 text-zinc-400">{desc}</p>

          {/* price */}
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neon">{euro(bundle.price)}</span>
              <span className="text-sm text-zinc-600 line-through">{euro(original)}</span>
              {savingsPct > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                  −{savingsPct}%
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="mt-1 text-sm text-neon">
                {t("bundle.save")} {euro(savings)}
              </p>
            )}
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-400">
              <TruckIcon width={15} height={15} /> {t("bundle.alwaysFree")}
            </p>
          </div>

          {/* contents */}
          <div className="mt-6 rounded-2xl border border-azure/30 bg-azure/5 p-4">
            <p className="text-sm font-semibold text-azure">{t("bundle.included")}</p>
            <ul className="mt-3 space-y-2">
              {items.map(({ product, it }, i) => (
                <li key={i}>
                  <Link
                    href={`/product/${product!.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-ink-line bg-ink-card p-2.5 transition hover:border-azure/50"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-ink-soft p-1">
                      <ProductVisual product={product!} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold transition group-hover:text-azure">
                        {it.qty > 1 ? `${it.qty}× ` : ""}
                        {it.sizeLiter} {t("product.liter")} {product!.name}
                      </p>
                      <span className="text-[11px] text-zinc-500">{t("bundle.perProductLink")}</span>
                    </div>
                    <ArrowRight width={15} height={15} className="shrink-0 text-zinc-500 transition group-hover:text-azure" />
                  </Link>
                </li>
              ))}
            </ul>
            {bundle.gift && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-neon">
                <SparkIcon width={14} height={14} /> {GIFT_LABEL[bundle.gift]?.[locale] ?? ""}
              </p>
            )}
          </div>

          {/* qty + add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-ink-line">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">−</button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">+</button>
            </div>
            <button type="button" onClick={() => addBundle(qty)} className="btn-neon flex-1">
              <CartIcon width={18} height={18} /> {t("bundle.add")} · {euro(bundle.price * qty)}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addBundle(qty);
              setOpen(true);
            }}
            className="btn-ghost mt-3 w-full"
          >
            <BoltIcon width={18} height={18} /> {t("product.quickBuy")}
          </button>

          {/* trust row */}
          <div className="mt-6 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
            <span className="flex items-center gap-2"><TruckIcon width={18} height={18} className="text-emerald-400" /> {t("bundle.alwaysFree")}</span>
            <span className="flex items-center gap-2"><ShieldIcon width={18} height={18} className="text-neon" /> {t("product.guarantee")}</span>
            <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-neon" /> {t("product.freeReturns")}</span>
            <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-azure" /> {t("hero.trust2")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
