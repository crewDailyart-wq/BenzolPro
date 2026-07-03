"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { TruckIcon, PackageIcon, CheckIcon, ArrowRight } from "./icons";

/**
 * Homepage section explaining the two delivery options: always-free home
 * delivery, or pick up at a collection point for a discount. The actual
 * choice (and discount) is applied at checkout.
 */
export default function ShippingInfo() {
  const { t } = useI18n();

  return (
    <section id="verzending" className="section-pad scroll-mt-20 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip mx-auto w-fit border-azure/40 bg-azure/10 text-azure">
          <TruckIcon width={14} height={14} /> {t("shippingInfo.badge")}
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("shippingInfo.title")}</h2>
        <p className="mt-2 text-zinc-400">{t("shippingInfo.subtitle")}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
        {/* home delivery */}
        <div className="card-surface relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-radial-neon opacity-50" />
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <TruckIcon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-xl font-bold">{t("shippingInfo.homeTitle")}</h3>
            <p className="mt-1 text-sm text-zinc-400">{t("shippingInfo.homeBody")}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
              <CheckIcon width={13} height={13} /> {t("shippingInfo.homeBadge")}
            </span>
          </div>
        </div>

        {/* pickup */}
        <div className="card-surface blue-sheen relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-radial-azure opacity-70" />
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-azure/15 text-azure">
              <PackageIcon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-xl font-bold">{t("shippingInfo.pickupTitle")}</h3>
            <p className="mt-1 text-sm text-zinc-400">{t("shippingInfo.pickupBody")}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
              <CheckIcon width={13} height={13} /> {t("shippingInfo.pickupBadge")}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-zinc-500">{t("shippingInfo.note")}</p>
        <Link href="/products" className="btn-azure">
          {t("hero.ctaShop")} <ArrowRight width={17} height={17} />
        </Link>
      </div>
    </section>
  );
}
