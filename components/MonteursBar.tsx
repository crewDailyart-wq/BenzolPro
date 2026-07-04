"use client";

import { useI18n } from "@/lib/i18n/provider";
import { WrenchIcon, StarIcon } from "./icons";

/** Slim, eye-catching gold bar making the "monteurskeuze" claim prominent. */
export default function MonteursBar() {
  const { t } = useI18n();
  return (
    <div className="blue-sheen relative overflow-hidden border-y border-neon/30 bg-gradient-to-r from-[#2a2109] via-[#3a2e0c] to-[#2a2109]">
      <div className="section-pad flex items-center justify-center gap-2.5 py-2.5 text-center">
        <WrenchIcon width={16} height={16} className="shrink-0 text-neon" />
        <p className="text-sm font-bold text-gold-metal">{t("monteur.bar")}</p>
        <StarIcon width={15} height={15} className="hidden shrink-0 text-neon sm:block" />
      </div>
    </div>
  );
}
