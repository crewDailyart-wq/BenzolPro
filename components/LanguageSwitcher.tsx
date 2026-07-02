"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { GlobeIcon, ChevronDown } from "./icons";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-ink-line px-3 py-2 text-sm text-zinc-200 transition hover:border-neon hover:text-neon"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <GlobeIcon width={16} height={16} />
        <span className="uppercase">{compact ? locale : LOCALE_META[locale].label}</span>
        <ChevronDown width={14} height={14} className={open ? "rotate-180 transition" : "transition"} />
      </button>

      {open && (
        <ul
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-line bg-ink-card p-1 shadow-card"
          role="listbox"
        >
          {LOCALES.map((l: Locale) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-ink-soft ${
                  l === locale ? "text-neon" : "text-zinc-200"
                }`}
                role="option"
                aria-selected={l === locale}
              >
                <span aria-hidden>{LOCALE_META[l].flag}</span>
                {LOCALE_META[l].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
