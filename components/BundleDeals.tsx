"use client";

import { useState } from "react";
import { BUNDLES, bundleOriginalPrice, type Bundle } from "@/lib/bundles";
import { getProductById } from "@/lib/products";
import { useI18n } from "@/lib/i18n/provider";
import { useCart } from "@/lib/cart";
import { euro } from "@/lib/format";
import type { CartLine } from "@/lib/types";
import OilBottle from "./OilBottle";
import { TruckIcon, CheckIcon, PackageIcon, BoltIcon, SparkIcon } from "./icons";

const BADGE_LABEL: Record<string, Record<string, string>> = {
  popular: { nl: "Populair", en: "Popular", pl: "Popularne", ar: "شائع", tr: "Popüler" },
  value: { nl: "Voordeel", en: "Best value", pl: "Najlepsza cena", ar: "أفضل قيمة", tr: "En avantajlı" },
  garage: { nl: "Voor garages", en: "For garages", pl: "Dla warsztatów", ar: "للورش", tr: "Servisler için" },
  performance: { nl: "Performance", en: "Performance", pl: "Performance", ar: "أداء", tr: "Performans" },
};

const GIFT_LABEL: Record<string, Record<string, string>> = {
  funnel: { nl: "Gratis trechter", en: "Free funnel", pl: "Lejek gratis", ar: "قمع مجاني", tr: "Ücretsiz huni" },
  gloves: { nl: "Gratis handschoenen", en: "Free gloves", pl: "Rękawice gratis", ar: "قفازات مجانية", tr: "Ücretsiz eldiven" },
  drainpan: { nl: "Gratis opvangbak", en: "Free drain pan", pl: "Miska gratis", ar: "حوض تصريف مجاني", tr: "Ücretsiz tava" },
  cap: { nl: "Gratis Benzol-cap", en: "Free Benzol cap", pl: "Czapka gratis", ar: "قبعة مجانية", tr: "Ücretsiz şapka" },
};

export default function BundleDeals() {
  const { t } = useI18n();

  return (
    <section id="bundels" className="section-pad scroll-mt-20 py-16">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="chip"><PackageIcon width={14} height={14} className="text-neon" /> {t("bundle.badge")}</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("bundle.title")}</h2>
          <p className="mt-2 max-w-xl text-zinc-400">{t("bundle.subtitle")}</p>
        </div>
        <div className="blue-sheen flex items-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-4 py-2 text-sm font-semibold text-azure shadow-azure">
          <TruckIcon width={18} height={18} /> {t("bundle.alwaysFree")}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BUNDLES.map((b) => (
          <BundleCard key={b.id} bundle={b} />
        ))}
      </div>
    </section>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const { t, locale } = useI18n();
  const { addLine } = useCart();
  const [added, setAdded] = useState(false);

  const original = bundleOriginalPrice(bundle);
  const savings = Math.round((original - bundle.price) * 100) / 100;
  const savingsPct = original > 0 ? Math.round((savings / original) * 100) : 0;

  const items = bundle.items
    .map((it) => ({ product: getProductById(it.productId), it }))
    .filter((x) => x.product);

  function addBundle() {
    const line: CartLine = {
      productId: bundle.id,
      slug: bundle.slug,
      name: bundle.name[locale] ?? bundle.name.nl,
      viscosity: "SET",
      sizeLiter: 0,
      price: bundle.price,
      qty: 1,
      accent: bundle.accent,
      alwaysFreeShip: true,
      isBundle: true,
    };
    addLine(line);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="group card-surface relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-neon/50 hover:shadow-neon">
      {/* badges */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3">
        {bundle.badge && (
          <span className="rounded-full bg-neon px-2.5 py-1 text-[11px] font-bold text-ink">
            {BADGE_LABEL[bundle.badge]?.[locale] ?? bundle.badge}
          </span>
        )}
        {savingsPct > 0 && (
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
            −{savingsPct}%
          </span>
        )}
      </div>

      {/* visual: mini bottles */}
      <div className="relative flex h-40 items-end justify-center gap-1 overflow-hidden bg-gradient-to-b from-ink-soft to-ink px-4 pt-8">
        <div className="absolute inset-0 bg-grid-neon [background-size:20px_20px] opacity-30" />
        {items.map(({ product, it }, i) => (
          <div
            key={i}
            className="relative h-32 w-16 transition duration-500 group-hover:scale-105"
            style={{ zIndex: 10 - i }}
          >
            <OilBottle accent={product!.accent} viscosity={product!.viscosity} className="h-full w-full" />
            {it.qty > 1 && (
              <span className="absolute -right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-neon px-1 text-[10px] font-bold text-ink">
                ×{it.qty}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-tight transition group-hover:text-neon">{bundle.name[locale] ?? bundle.name.nl}</h3>
        <p className="mt-1 text-xs text-zinc-500">{bundle.desc[locale] ?? bundle.desc.nl}</p>

        <ul className="mt-3 space-y-1 text-xs text-zinc-400">
          <li className="flex items-center gap-1.5"><TruckIcon width={13} height={13} className="text-neon" /> {t("bundle.freeShip")}</li>
          {bundle.gift && (
            <li className="flex items-center gap-1.5"><SparkIcon width={13} height={13} className="text-neon" /> {GIFT_LABEL[bundle.gift]?.[locale] ?? ""}</li>
          )}
        </ul>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-neon">{euro(bundle.price)}</span>
            <span className="text-sm text-zinc-600 line-through">{euro(original)}</span>
          </div>
          {savings > 0 && (
            <p className="text-[11px] text-neon">{t("bundle.save")} {euro(savings)}</p>
          )}
          <button type="button" onClick={addBundle} className="btn-neon mt-3 w-full">
            {added ? (
              <>
                <CheckIcon width={18} height={18} /> {t("product.added")}
              </>
            ) : (
              <>
                <BoltIcon width={18} height={18} /> {t("bundle.add")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
