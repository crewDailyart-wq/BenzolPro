"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { PRODUCTS } from "@/lib/products";
import PlateLookup from "./PlateLookup";
import BestsellerSpotlight from "./BestsellerSpotlight";
import DrivingCar from "./DrivingCar";
import { ArrowRight, TruckIcon, BoltIcon, LockIcon } from "./icons";

export default function Hero() {
  const { t } = useI18n();
  const bestseller = PRODUCTS.find((p) => p.badge === "bestseller") ?? PRODUCTS[0];

  const trust = [
    { icon: TruckIcon, label: t("hero.trust1") },
    { icon: BoltIcon, label: t("hero.trust2") },
    { icon: LockIcon, label: t("hero.trust3") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:44px_44px] opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-radial-neon opacity-70" />

      {/* driving car across the top */}
      <div className="relative h-0">
        <DrivingCar className="top-4 hidden sm:block" />
      </div>

      <div className="section-pad relative pt-16 pb-14 lg:pt-20 lg:pb-20">
        {/* headline */}
        <div className="max-w-2xl">
          <span className="chip animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-5 animate-fade-up animate-delay-1 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.title")}{" "}
            <span className="text-gold-metal">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-5 max-w-lg animate-fade-up animate-delay-2 text-base text-zinc-400 sm:text-lg">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* searcher + bestseller side by side */}
        <div className="mt-10 grid animate-fade-up animate-delay-3 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <PlateLookup />
          <BestsellerSpotlight product={bestseller} />
        </div>

        {/* trust row */}
        <ul className="mt-10 grid animate-fade-up animate-delay-4 gap-3 sm:grid-cols-3">
          {trust.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 rounded-xl border border-ink-line bg-ink-card/60 px-4 py-3 text-sm text-zinc-300"
            >
              <item.icon width={18} height={18} className="shrink-0 text-neon" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="btn-neon">
            {t("hero.ctaShop")} <ArrowRight width={18} height={18} />
          </Link>
          <Link href="#bundels" className="btn-ghost">
            {t("bundle.nav")}
          </Link>
        </div>
      </div>
    </section>
  );
}
