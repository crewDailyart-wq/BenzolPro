"use client";

import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n/provider";

// Leaflet touches window/document, so load it client-side only.
const GarageLeafletMap = dynamic(() => import("./GarageLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[440px] w-full animate-pulse place-items-center bg-ink-soft text-sm text-zinc-500">
      Kaart laden…
    </div>
  ),
});

/** Garages section map — a real OpenStreetMap (CARTO dark tiles) with a pin per garage. */
export default function GarageMap() {
  const { t } = useI18n();

  return (
    <div className="section-pad mt-14">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold">{t("garages.mapTitle")}</h3>
        <p className="mt-1 text-sm text-zinc-400">{t("garages.mapSubtitle")}</p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-ink-line">
        <GarageLeafletMap />
      </div>

      {/* legend */}
      <div className="mx-auto mt-3 flex max-w-4xl items-center justify-center gap-5 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-azure-soft shadow-[0_0_8px_2px_rgba(143,199,255,0.7)]" />
          {t("garages.countryNL")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_8px_2px_rgba(246,217,137,0.6)]" />
          {t("garages.countryBE")}
        </span>
      </div>
    </div>
  );
}
