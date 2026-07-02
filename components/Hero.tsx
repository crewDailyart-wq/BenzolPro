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
    { icon: TruckIcon, label: t("hero.trust1"), blue: false },
    { icon: BoltIcon, label: t("hero.trust2"), blue: false },
    { icon: LockIcon, label: t("hero.trust3"), blue: true },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* driving car, continuously cruising across the top */}
      <div className="relative h-0">
        <DrivingCar className="top-1 sm:top-3" />
      </div>

      <div className="section-pad relative pt-12 pb-14 lg:pt-16 lg:pb-20">
        {/* searcher + bigger bestseller, right at the top */}
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* left: compact headline + plate searcher */}
          <div className="flex flex-col">
            <span className="chip animate-fade-up w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-4 animate-fade-up animate-delay-1 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")} <span className="text-gold-metal">{t("hero.titleAccent")}</span>
            </h1>
            <p className="mt-4 max-w-md animate-fade-up animate-delay-2 text-base text-zinc-400 sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 flex flex-1 animate-fade-up animate-delay-3">
              <PlateLookup className="w-full" />
            </div>
          </div>

          {/* right: enlarged bestseller filling the space */}
          <BestsellerSpotlight product={bestseller} large className="mt-4 animate-fade-up animate-delay-2 lg:mt-0" />
        </div>

        {/* trust row */}
        <ul className="mt-10 grid animate-fade-up animate-delay-4 gap-3 sm:grid-cols-3">
          {trust.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 rounded-xl border border-ink-line bg-ink-card/60 px-4 py-3 text-sm text-zinc-300"
            >
              <item.icon width={18} height={18} className={`shrink-0 ${item.blue ? "text-azure" : "text-neon"}`} />
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
