"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { ChevronDown, ChatIcon } from "./icons";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"];

export default function FaqSection() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>("q1");

  return (
    <section id="faq" className="section-pad scroll-mt-20 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="chip">?</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t("faq.title")}</h2>
          <p className="mt-2 text-zinc-400">{t("faq.subtitle")}</p>
          <div className="mt-6 hidden rounded-2xl border border-ink-line bg-ink-card p-5 lg:block">
            <p className="text-sm font-semibold">{t("faq.helpTitle")}</p>
            <p className="mt-1 text-sm text-zinc-400">{t("faq.helpBody")}</p>
            <a href="mailto:hallo@benzolpro.nl" className="btn-azure mt-4 w-full">
              <ChatIcon width={17} height={17} /> {t("faq.contactButton")}
            </a>
            <a href="mailto:hallo@benzolpro.nl" className="mt-3 inline-block text-sm font-medium text-neon hover:underline">
              hallo@benzolpro.nl
            </a>
          </div>
        </div>

        <div className="space-y-3">
          {FAQ_KEYS.map((key) => {
            const isOpen = open === key;
            return (
              <div key={key} className="card-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{t(`faq.${key}.q`)}</span>
                  <ChevronDown
                    width={20}
                    height={20}
                    className={`shrink-0 text-neon transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-zinc-400">{t(`faq.${key}.a`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
