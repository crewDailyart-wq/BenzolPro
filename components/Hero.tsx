"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import PlateLookup from "./PlateLookup";
import { ArrowRight, TruckIcon, BoltIcon, LockIcon } from "./icons";

export default function Hero() {
  const { t } = useI18n();

  const trust = [
    { icon: TruckIcon, label: t("hero.trust1") },
    { icon: BoltIcon, label: t("hero.trust2") },
    { icon: LockIcon, label: t("hero.trust3") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:44px_44px] opacity-[0.15]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-radial-neon opacity-70" />

      <div className="section-pad relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="chip animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-5 animate-fade-up animate-delay-1 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.title")}
            <br />
            <span className="text-neon text-glow">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-5 max-w-lg animate-fade-up animate-delay-2 text-base text-zinc-400 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex animate-fade-up animate-delay-3 flex-wrap gap-3">
            <Link href="#plate" className="btn-neon">
              {t("hero.ctaFind")} <ArrowRight width={18} height={18} />
            </Link>
            <Link href="/products" className="btn-ghost">
              {t("hero.ctaShop")}
            </Link>
          </div>

          <ul className="mt-10 grid animate-fade-up animate-delay-4 gap-3 sm:grid-cols-3">
            {trust.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-zinc-300">
                <item.icon width={18} height={18} className="shrink-0 text-neon" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up animate-delay-2">
          <PlateLookup />
        </div>
      </div>
    </section>
  );
}
