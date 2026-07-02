"use client";

import { useI18n } from "@/lib/i18n/provider";
import { useAudience } from "@/lib/audience";
import { WrenchIcon, StarIcon, ShieldIcon, TruckIcon, ArrowRight } from "./icons";

const GARAGES = [
  "AutoService Jansen",
  "GarageBox Amsterdam",
  "PitStop Rotterdam",
  "De Vries Automotive",
  "TurboTech Utrecht",
  "Garage El Amrani",
  "Van Dijk Onderhoud",
  "Motoreske Eindhoven",
  "Kaya Auto",
  "Noord Garage",
  "SpeedFix Den Haag",
  "Benzine & Co",
];

export default function TrustedGarages() {
  const { t } = useI18n();
  const { setAudience, isGarage } = useAudience();

  const stats = [
    { icon: WrenchIcon, value: "240+", label: t("garages.stat1") },
    { icon: StarIcon, value: "4.9", label: t("garages.stat2") },
    { icon: TruckIcon, value: "18k L", label: t("garages.stat3") },
    { icon: ShieldIcon, value: "100%", label: t("garages.stat4") },
  ];

  const row = [...GARAGES, ...GARAGES];

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
          {row.map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-ink-line bg-ink-card px-5 py-2.5 text-sm font-semibold text-zinc-300"
            >
              <WrenchIcon width={14} height={14} className="text-neon" />
              {name}
            </span>
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
            <button
              type="button"
              onClick={() => setAudience("garage")}
              className="btn-neon shrink-0"
              disabled={isGarage}
            >
              {isGarage ? t("garages.ctaActive") : t("garages.ctaButton")}
              {!isGarage && <ArrowRight width={18} height={18} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
