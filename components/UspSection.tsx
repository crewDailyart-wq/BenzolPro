"use client";

import { useI18n } from "@/lib/i18n/provider";
import { CarIcon, BoltIcon, SlidersIcon, ShieldIcon } from "./icons";

export default function UspSection() {
  const { t } = useI18n();

  const items = [
    { icon: CarIcon, title: t("usp.item1Title"), body: t("usp.item1Body") },
    { icon: BoltIcon, title: t("usp.item2Title"), body: t("usp.item2Body") },
    { icon: SlidersIcon, title: t("usp.item3Title"), body: t("usp.item3Body") },
    { icon: ShieldIcon, title: t("usp.item4Title"), body: t("usp.item4Body") },
  ];

  return (
    <section id="why" className="section-pad scroll-mt-20 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">{t("usp.title")}</h2>
        <p className="mt-3 text-zinc-400">{t("usp.subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="group card-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-neon/50"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-neon/10 text-neon transition group-hover:bg-neon group-hover:text-ink">
              <item.icon width={24} height={24} />
            </div>
            <h3 className="mt-4 font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
