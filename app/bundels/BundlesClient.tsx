"use client";

import { useI18n } from "@/lib/i18n/provider";
import BundleGrid from "@/components/BundleGrid";
import { TruckIcon, PackageIcon } from "@/components/icons";

export default function BundlesClient() {
  const { t } = useI18n();

  return (
    <div className="section-pad py-10">
      <span className="chip"><PackageIcon width={14} height={14} className="text-neon" /> {t("bundle.badge")}</span>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">{t("bundle.pageTitle")}</h1>
      <p className="mt-2 max-w-xl text-zinc-400">{t("bundle.pageSubtitle")}</p>

      <div className="blue-sheen mt-4 inline-flex items-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-4 py-2 text-sm font-semibold text-azure shadow-azure">
        <TruckIcon width={18} height={18} /> {t("bundle.alwaysFree")}
      </div>

      <div className="mt-8">
        <BundleGrid />
      </div>
    </div>
  );
}
