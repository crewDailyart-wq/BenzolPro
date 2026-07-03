"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import BundleGrid from "./BundleGrid";
import { TruckIcon, PackageIcon, ArrowRight } from "./icons";

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

      <div className="mt-8">
        <BundleGrid />
      </div>

      <Link
        href="/bundels"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon hover:underline"
      >
        {t("bundle.pageTitle")} <ArrowRight width={16} height={16} />
      </Link>
    </section>
  );
}
