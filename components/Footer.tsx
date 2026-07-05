"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useI18n } from "@/lib/i18n/provider";
import { ArrowRight } from "./icons";

export default function Footer() {
  const { t } = useI18n();

  const cols = [
    {
      title: t("footer.shop"),
      links: [
        { label: t("footer.allProducts"), href: "/products" },
        { label: t("footer.bestsellers"), href: "/products?sort=popular" },
        { label: t("bundle.nav"), href: "/bundels" },
        { label: "Motorolie per auto", href: "/olie" },
        { label: t("footer.findOil"), href: "/#plate" },
      ],
    },
    {
      title: t("garages.nav"),
      links: [
        { label: t("quote.title"), href: "/offerte" },
        { label: t("audience.garage"), href: "/#garages" },
        { label: t("nav.certificates"), href: "/certificaten" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.shipping"), href: "/#why" },
        { label: t("faq.nav"), href: "/#faq" },
        { label: t("footer.terms"), href: "/#why" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <div className="section-pad grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-zinc-400">{t("footer.tagline")}</p>

          <div className="mt-6 max-w-sm">
            <p className="text-sm font-semibold text-zinc-200">{t("footer.newsletter")}</p>
            <p className="mt-1 text-xs text-zinc-500">{t("footer.newsletterBody")}</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder={t("footer.emailPlaceholder")}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-neon px-4" aria-label={t("footer.subscribe")}>
                <ArrowRight width={18} height={18} />
              </button>
            </form>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-zinc-200">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition hover:text-neon">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-line">
        <div className="section-pad flex flex-col items-start justify-between gap-2 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} BenzolPro. {t("footer.rights")}</p>
          <p className="max-w-md">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
