"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { CartIcon, MenuIcon, CloseIcon, CarIcon } from "./icons";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n/provider";

export default function Header() {
  const { count, setOpen } = useCart();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "/products", label: t("nav.products") },
    { href: "/#plate", label: t("nav.findOil") },
    { href: "/#why", label: t("nav.how") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/80 backdrop-blur-xl">
      <div className="section-pad flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition hover:text-neon"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-ink-line text-zinc-200 transition hover:border-neon hover:text-neon"
            aria-label={t("nav.cart")}
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-neon px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-zinc-200 md:hidden"
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-line bg-ink md:hidden">
          <nav className="section-pad flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2 py-3 text-base font-medium text-zinc-200 transition hover:bg-ink-card hover:text-neon"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#plate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-neon px-4 py-3 text-sm font-bold text-ink"
            >
              <CarIcon width={18} height={18} />
              {t("nav.findOil")}
            </Link>
            <div className="mt-3">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
