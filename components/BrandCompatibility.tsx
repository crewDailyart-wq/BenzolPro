"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { CAR_BRANDS } from "@/lib/carBrands";
import { CarIcon } from "./icons";

/**
 * "Geschikt voor deze merken" band. Shows an editable list of car brands
 * (lib/carBrands.ts) with their official spec + trim. If a brand has a logo
 * file in public/merken/ it's shown; otherwise the brand name stands in, so
 * there's never a broken image.
 */
function BrandLogo({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false);
  if (logo && !failed) {
    // eslint-disable-next-line @next/next/no-img-element -- local, user-provided brand logos
    return (
      <img
        src={`/merken/${logo}`}
        alt={name}
        className="h-9 w-9 shrink-0 object-contain"
        onError={() => setFailed(true)}
        ref={(el) => {
          if (el && el.complete && el.naturalWidth === 0) setFailed(true);
        }}
      />
    );
  }
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-soft text-azure">
      <CarIcon width={18} height={18} />
    </span>
  );
}

export default function BrandCompatibility() {
  const { t } = useI18n();

  return (
    <section className="mt-10 rounded-3xl border border-ink-line bg-ink-card p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="chip border-azure/40 bg-azure/10 text-azure">
          <CarIcon width={14} height={14} /> {t("brands.title")}
        </span>
      </div>
      <p className="mt-3 max-w-xl text-sm text-zinc-400">{t("brands.subtitle")}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAR_BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-soft p-3 transition hover:border-azure/50"
          >
            <BrandLogo name={brand.name} logo={brand.logo} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{brand.name}</p>
              <p className="truncate text-[11px] text-zinc-400">
                <span className="text-zinc-500">{t("brands.specLabel")}:</span> {brand.spec}
              </p>
              {brand.uitvoering && (
                <p className="truncate text-[11px] text-zinc-400">
                  <span className="text-zinc-500">{t("brands.versionLabel")}:</span> {brand.uitvoering}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-zinc-500">{t("brands.disclaimer")}</p>
    </section>
  );
}
