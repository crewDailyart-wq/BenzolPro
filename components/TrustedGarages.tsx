"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { useAudience } from "@/lib/audience";
import { GARAGES, getGarages, garageInitials, type Garage } from "@/lib/garages";
import GarageMap from "./GarageMap";
import { WrenchIcon, StarIcon, ShieldIcon, TruckIcon, ArrowRight, ClipboardIcon } from "./icons";

/** Small logo (from public/garages/) or a lettered badge fallback. */
function GarageLogo({ garage, size = 28 }: { garage: Garage; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (garage.logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local, user-provided garage logos
      <img
        src={`/garages/${garage.logo}`}
        alt={garage.name}
        width={size}
        height={size}
        className="shrink-0 rounded object-contain"
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
        ref={(el) => {
          if (el && el.complete && el.naturalWidth === 0) setFailed(true);
        }}
      />
    );
  }
  return (
    <span
      className="grid shrink-0 place-items-center rounded bg-neon/15 text-[10px] font-extrabold text-neon"
      style={{ width: size, height: size }}
    >
      {garageInitials(garage.name)}
    </span>
  );
}

export default function TrustedGarages() {
  const { t } = useI18n();
  const { setAudience, isGarage } = useAudience();

  const stats = [
    { icon: WrenchIcon, value: "NL & BE", label: t("garages.stat1") },
    { icon: StarIcon, value: "4.9", label: t("garages.stat2") },
    { icon: TruckIcon, value: "18k L", label: t("garages.stat3") },
    { icon: ShieldIcon, value: "100%", label: t("garages.stat4") },
  ];

  // marquee row (doubled for a seamless loop)
  const row = [...GARAGES, ...GARAGES];
  const nl = getGarages("NL");
  const be = getGarages("BE");

  return (
    <section id="garages" className="scroll-mt-20 border-y border-ink-line bg-ink-soft py-16">
      <div className="section-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mx-auto w-fit"><WrenchIcon width={14} height={14} className="text-neon" /> {t("garages.badge")}</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("garages.title")}</h2>
          <p className="mt-2 text-zinc-400">{t("garages.subtitle")}</p>
        </div>

        {/* stats */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-surface p-5 text-center">
              <s.icon width={22} height={22} className="mx-auto text-neon" />
              <p className="mt-2 text-2xl font-extrabold text-gold-metal">{s.value}</p>
              <p className="text-xs text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* marquee */}
      <div className="marquee-mask relative mt-12 flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 pe-3">
          {row.map((g, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-ink-line bg-ink-card px-4 py-2 text-sm font-semibold text-zinc-300"
            >
              <GarageLogo garage={g} size={22} />
              {g.name}
            </span>
          ))}
        </div>
      </div>

      {/* map with a pin for every garage */}
      <GarageMap />

      {/* full editable list, grouped by country */}
      <div className="section-pad mt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-bold">{t("garages.listTitle")}</h3>
          <p className="mt-1 text-sm text-zinc-400">{t("garages.listSubtitle")}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {[
            { flag: "🇳🇱", label: t("garages.countryNL"), list: nl },
            { flag: "🇧🇪", label: t("garages.countryBE"), list: be },
          ].map((group) => (
            <div key={group.label} className="card-surface p-5 sm:p-6">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
                <span aria-hidden>{group.flag}</span> {group.label}
                <span className="ms-auto rounded-full bg-ink-soft px-2 py-0.5 text-[11px] font-semibold text-zinc-400">
                  {group.list.length}
                </span>
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {group.list.map((g) => (
                  <li
                    key={`${g.name}-${g.city}`}
                    className="flex items-center gap-2.5 rounded-xl border border-ink-line bg-ink-card px-3 py-2"
                  >
                    <GarageLogo garage={g} size={26} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-zinc-100">{g.name}</span>
                      <span className="block truncate text-[11px] text-zinc-500">{g.city}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* garage CTA */}
      <div className="section-pad mt-12">
        <div className="card-surface relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-radial-neon opacity-60" />
          <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{t("garages.ctaTitle")}</h3>
              <p className="mt-1 max-w-lg text-sm text-zinc-400">{t("garages.ctaBody")}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setAudience("garage")}
                className="btn-azure"
                disabled={isGarage}
              >
                {isGarage ? t("garages.ctaActive") : t("garages.ctaButton")}
                {!isGarage && <ArrowRight width={18} height={18} />}
              </button>
              <Link href="/offerte" className="btn-ghost border-azure/40 text-azure hover:border-azure hover:text-azure">
                <ClipboardIcon width={18} height={18} /> {t("nav.quote")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
