"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { useAudience } from "@/lib/audience";
import { euro, sizePrice, sizeCompareAt, sizeNote, defaultSize } from "@/lib/format";
import { TAGLINES, getProductById } from "@/lib/products";
import { getBundlesForProduct, getBundleGalleryImages, bundleOriginalPrice, GIFT_LABEL, type Bundle } from "@/lib/bundles";
import { resolveImages, sizeImageCandidates } from "@/lib/media";
import ProductVisual from "./ProductVisual";
import ProductGallery from "./ProductGallery";
import BrandCompatibility from "./BrandCompatibility";
import Reviews from "./Reviews";
import PriceTag from "./PriceTag";
import {
  StarIcon,
  CheckIcon,
  TruckIcon,
  ShieldIcon,
  ArrowRight,
  BoltIcon,
  CartIcon,
  PackageIcon,
  SparkIcon,
  WrenchIcon,
} from "./icons";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useI18n();
  const { add, addLine, setOpen } = useCart();
  const { price: audiencePrice, isGarage } = useAudience();
  const [size, setSize] = useState(defaultSize(product.sizesLiter));
  const [qty, setQty] = useState(1);
  const [previewBundle, setPreviewBundle] = useState<Bundle | null>(null);

  const basePrice = sizePrice(product, size);
  const compareAtForSize = sizeCompareAt(product, size);
  const price = audiencePrice(basePrice, qty);
  const tagline = TAGLINES[product.tagline]?.[locale] ?? "";
  const hasBulkSizes = product.sizesLiter.some((s) => s >= 20);

  const matchingBundles = useMemo(() => getBundlesForProduct(product.id), [product.id]);
  const bundleName = previewBundle ? previewBundle.name[locale] ?? previewBundle.name.nl : null;
  const bundleDesc = previewBundle ? previewBundle.desc[locale] ?? previewBundle.desc.nl : null;
  const bundleOriginal = previewBundle ? bundleOriginalPrice(previewBundle) : 0;
  const bundleSavings = previewBundle ? Math.round((bundleOriginal - previewBundle.price) * 100) / 100 : 0;

  // When a bulk size (20/60/208 L) is selected, show its own photo first (e.g.
  // the 4-bottle box for 20 L), then the normal product photos. If that size
  // photo hasn't been uploaded yet the gallery just skips it — never breaks.
  const productImages = [...sizeImageCandidates(product.slug, size), ...resolveImages(product)];
  const galleryImages = previewBundle ? getBundleGalleryImages(previewBundle) : productImages;

  const stockLabel =
    product.stock === 0 ? t("product.outOfStock") : product.stock <= 10 ? t("product.lowStock") : t("product.inStock");

  function toggleBundle(bundle: Bundle) {
    setPreviewBundle((current) => (current?.id === bundle.id ? null : bundle));
  }

  function addBundleToCart(bundle: Bundle, quantity: number) {
    addLine({
      productId: bundle.id,
      slug: bundle.slug,
      name: bundle.name[locale] ?? bundle.name.nl,
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
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-neon">
        <ArrowRight width={16} height={16} className="rotate-180 rtl:rotate-0" /> {t("product.back")}
      </Link>

      {/* main content (left) + related products beside it (right, sticky) */}
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* visual: gallery with arrows; swaps to the bundle's photos in preview mode */}
          <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-b from-ink-soft to-ink p-6 sm:p-10">
            <div className="absolute inset-0 bg-grid-neon [background-size:28px_28px] opacity-30" />
            <div
              className={`absolute inset-x-0 top-0 h-64 opacity-60 transition-colors ${
                previewBundle ? "bg-radial-azure" : "bg-radial-neon"
              }`}
            />
            <div className="relative">
              <ProductGallery
                images={galleryImages}
                name={bundleName ?? product.name}
                accent={previewBundle ? previewBundle.accent : product.accent}
                viscosity={product.viscosity}
                imageClassName="drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {!previewBundle && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink shadow-neon">
                  <WrenchIcon width={13} height={13} /> {t("monteur.badge")}
                </span>
              )}
              <span className="chip">{product.viscosity}</span>
              <span className="chip">{t(`category.${product.category}`)}</span>
              {previewBundle && (
                <span className="chip border-azure/50 bg-azure/10 text-azure">
                  <PackageIcon width={13} height={13} /> {t("bundle.badge")}: {bundleName}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
            <p className="mt-1 text-zinc-400">{previewBundle ? bundleDesc : tagline}</p>
            {!previewBundle && product.fitsNote && (
              <p className="mt-2 text-sm font-bold text-gold-metal">★ {product.fitsNote}</p>
            )}

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
            <div className="mt-6">
              {previewBundle ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-neon">{euro(previewBundle.price)}</span>
                    <span className="text-sm text-zinc-600 line-through">{euro(bundleOriginal)}</span>
                  </div>
                  {bundleSavings > 0 && (
                    <p className="mt-1 text-sm text-neon">
                      {t("bundle.save")} {euro(bundleSavings)}
                    </p>
                  )}
                </>
              ) : (
                <PriceTag
                  base={basePrice}
                  compareAt={compareAtForSize}
                  size="lg"
                />
              )}
              {isGarage && !previewBundle && <p className="mt-1 text-xs text-zinc-500">{t("audience.bulkHint")}</p>}
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                <TruckIcon width={15} height={15} />
                {previewBundle ? t("bundle.alwaysFree") : t("product.freeShipBadge")}
              </p>
            </div>

            {/* size selector (product mode) OR bundle contents (bundle mode) */}
            {previewBundle ? (
              <div className="mt-6 rounded-2xl border border-azure/30 bg-azure/5 p-4">
                <p className="text-sm font-semibold text-azure">{t("bundle.contains")}</p>
                <ul className="mt-2 space-y-1 text-sm text-zinc-200">
                  {previewBundle.items.map((it, i) => {
                    const p = getProductById(it.productId);
                    return (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckIcon width={14} height={14} className="text-azure" />
                        {it.qty > 1 ? `${it.qty}× ` : ""}
                        {it.sizeLiter} {t("product.liter")} {p?.name ?? it.productId}
                      </li>
                    );
                  })}
                </ul>
                {previewBundle.gift && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-neon">
                    <SparkIcon width={14} height={14} /> {GIFT_LABEL[previewBundle.gift]?.[locale] ?? ""}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-zinc-300">
                  {t("product.size")}
                  {hasBulkSizes && <span className="ms-2 text-xs font-normal text-azure">· {t("product.bulkTitle")}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizesLiter.map((s) => {
                    const note = sizeNote(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`flex flex-col items-center rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
                          size === s
                            ? "border-neon bg-neon text-ink"
                            : s >= 20
                              ? "border-azure/40 bg-azure/5 text-azure hover:border-azure/70"
                              : "border-ink-line bg-ink-card text-zinc-200 hover:border-neon/60"
                        }`}
                      >
                        <span>
                          {s} {t("product.liter")}
                        </span>
                        {note && (
                          <span
                            className={`mt-0.5 text-[10px] font-medium ${
                              size === s ? "text-ink/70" : "text-zinc-500"
                            }`}
                          >
                            {note}
                          </span>
                        )}
                        {s === 20 && (
                          <span
                            className={`mt-0.5 text-[10px] font-bold ${
                              size === s ? "text-emerald-800" : "text-emerald-400"
                            }`}
                          >
                            {t("product.valueChoice")}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* bundle toggle — prominent, right beside the size/quantity controls */}
            {matchingBundles.length === 1 && (
              <button
                type="button"
                onClick={() => toggleBundle(matchingBundles[0])}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 px-5 py-3.5 text-sm font-bold transition ${
                  previewBundle
                    ? "border-neon bg-neon text-ink"
                    : "border-azure bg-azure/15 text-azure shadow-azure hover:bg-azure/25"
                }`}
              >
                <PackageIcon width={18} height={18} />
                {previewBundle ? t("product.backToProduct") : t("product.bundleCta")}
              </button>
            )}
            {matchingBundles.length > 1 && (
              <div className="mt-3">
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-azure">
                  <PackageIcon width={15} height={15} /> {t("product.bundleCta")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchingBundles.map((b) => {
                    const active = previewBundle?.id === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => toggleBundle(b)}
                        className={`rounded-full border-2 px-4 py-2 text-xs font-bold transition ${
                          active
                            ? "border-neon bg-neon text-ink"
                            : "border-azure/50 bg-azure/10 text-azure hover:bg-azure/20"
                        }`}
                      >
                        {b.name[locale] ?? b.name.nl}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* qty + add */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-ink-line">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">−</button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg text-zinc-300 hover:text-neon">+</button>
              </div>
              {previewBundle ? (
                <button
                  type="button"
                  onClick={() => addBundleToCart(previewBundle, qty)}
                  className="btn-neon flex-1"
                >
                  <CartIcon width={18} height={18} /> {t("bundle.add")} · {euro(previewBundle.price * qty)}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => add(product, size, qty, price)}
                  disabled={product.stock === 0}
                  className="btn-neon flex-1"
                >
                  <CartIcon width={18} height={18} /> {t("product.addToCart")} · {euro(price * qty)}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (previewBundle) addBundleToCart(previewBundle, qty);
                else add(product, size, qty, price);
                setOpen(true);
              }}
              disabled={!previewBundle && product.stock === 0}
              className="btn-ghost mt-3 w-full"
            >
              <BoltIcon width={18} height={18} /> {t("product.quickBuy")}
            </button>

            {!previewBundle && (
              <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                <span className={`h-2 w-2 rounded-full ${product.stock === 0 ? "bg-red-500" : "bg-neon"}`} />
                {stockLabel}
              </p>
            )}

            {/* trust row */}
            <div className="mt-6 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
              <span className="flex items-center gap-2"><TruckIcon width={18} height={18} className="text-emerald-400" /> {t("hero.trust2")}</span>
              <span className="flex items-center gap-2"><ShieldIcon width={18} height={18} className="text-neon" /> {t("product.guarantee")}</span>
              <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-neon" /> {t("product.freeReturns")}</span>
              <span className="flex items-center gap-2"><CheckIcon width={18} height={18} className="text-azure" /> {t("hero.trust3")}</span>
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

        {/* related products: beside the product, not below */}
        {related.length > 0 && (
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">{t("product.related")}</h2>
            <div className="mt-4 space-y-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group block rounded-2xl border border-ink-line bg-ink-card p-3.5 transition hover:border-neon/50 hover:shadow-neon"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-20 w-20 shrink-0 rounded-xl bg-ink-soft p-1.5">
                      <ProductVisual product={p} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight transition group-hover:text-neon">{p.name}</p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
                        <span className="flex text-neon">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} width={11} height={11} className={i < Math.round(p.rating) ? "" : "opacity-25"} />
                          ))}
                        </span>
                        <span className="font-semibold text-zinc-200">{p.rating.toFixed(1)}</span>
                        <span>({p.reviews})</span>
                      </div>
                      <span className="mt-1 inline-block chip !px-2 !py-0.5 !text-[10px]">{p.viscosity}</span>
                    </div>
                  </div>

                  {/* a couple of key specs so each card carries more info */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {p.specs.slice(0, 3).map((s) => (
                      <span key={s} className="rounded bg-ink-soft px-1.5 py-0.5 text-[10px] text-zinc-400">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <PriceTag base={sizePrice(p, defaultSize(p.sizesLiter))} size="xs" />
                    <span className="flex items-center gap-1 text-[11px] font-medium text-azure transition group-hover:gap-1.5">
                      {t("plate.viewProduct")} <ArrowRight width={12} height={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* full-width band below — fills the space under the product and shows
          which car brands the oil is approved for (editable in lib/carBrands.ts) */}
      <BrandCompatibility />

      {/* reviews for this specific product */}
      <Reviews scope={product.slug} seedRating={product.rating} seedCount={product.reviews} />
    </div>
  );
}
