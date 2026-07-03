"use client";

import { useI18n } from "@/lib/i18n/provider";
import { WrenchIcon, CheckIcon, ShieldIcon, StarIcon } from "./icons";

/**
 * "De keuze van de monteur" band — a premium gold banner making it clear that
 * Benzol is the choice of professional mechanics. Shown on the homepage.
 */
export default function MechanicChoice() {
  const { t } = useI18n();

  const points = [
    { icon: WrenchIcon, title: t("monteur.point1Title"), body: t("monteur.point1Body") },
    { icon: ShieldIcon, title: t("monteur.point2Title"), body: t("monteur.point2Body") },
    { icon: StarIcon, title: t("monteur.point3Title"), body: t("monteur.point3Body") },
  ];

  return (
    <section id="monteurskeuze" className="section-pad scroll-mt-20 py-14">
      <div className="relative overflow-hidden rounded-3xl border border-neon/30 bg-gradient-to-br from-[#1a1509] via-ink-card to-ink p-7 sm:p-10">
        {/* gold aura + subtle grid */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-radial-neon opacity-70" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-radial-azure opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:26px_26px] opacity-20" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-neon px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-neon">
            <WrenchIcon width={14} height={14} /> {t("monteur.badge")}
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            <span className="text-gold-metal">{t("monteur.title")}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-300">{t("monteur.subtitle")}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-ink-line bg-ink/50 p-5 backdrop-blur">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-neon/15 text-neon">
                  <p.icon width={22} height={22} />
                </span>
                <h3 className="mt-3 flex items-center gap-1.5 font-bold">
                  <CheckIcon width={15} height={15} className="text-neon" /> {p.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
