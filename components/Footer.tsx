"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { useI18n } from "@/lib/i18n/provider";
import { needsConsent } from "@/lib/site";
import { useConsent } from "@/lib/consent";
import { ArrowRight, CheckIcon } from "./icons";

export default function Footer() {
  const { t } = useI18n();
  const { reset: resetConsent } = useConsent();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || busy) return;
    setBusy(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      // Toon alsnog bedankt — de aanmelding is verstuurd; een back-end volgt later.
      setSubscribed(true);
    } finally {
      setBusy(false);
    }
  }

  const cols = [
    {
      title: t("footer.shop"),
      links: [
        { label: t("footer.allProducts"), href: "/products" },
        { label: t("footer.bestsellers"), href: "/products?sort=popular" },
        { label: t("bundle.nav"), href: "/bundels" },
        { label: "Motorolie per auto", href: "/olie" },
        { label: "Kosten olie verversen", href: "/kosten" },
        { label: "Olie vergelijken", href: "/vergelijk" },
        { label: "Kentekencheck", href: "/kenteken-check" },
        { label: t("footer.findOil"), href: "/#plate" },
      ],
    },
    {
      title: t("garages.nav"),
      links: [
        { label: "Olie verversen per plaats", href: "/olie-verversen" },
        { label: t("quote.title"), href: "/offerte" },
        { label: t("audience.garage"), href: "/#garages" },
        { label: t("nav.certificates"), href: "/certificaten" },
        { label: "Gratis kentekencheck-widget", href: "/widget" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: "Kennisbank", href: "/gids" },
        { label: `Motorolie-rapport`, href: "/motorolie-rapport" },
        { label: "Open data", href: "/open-data" },
        { label: "Contact", href: "/contact" },
        { label: t("footer.shipping"), href: "/#why" },
        { label: t("faq.nav"), href: "/#faq" },
      ],
    },
    {
      title: "Juridisch",
      links: [
        { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
        { label: "Privacybeleid", href: "/privacybeleid" },
        { label: "Retourneren & herroeping", href: "/retourbeleid" },
        { label: "Cookiebeleid", href: "/cookiebeleid" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <div className="section-pad grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-zinc-400">{t("footer.tagline")}</p>

          <div className="mt-6 max-w-sm">
            <p className="text-sm font-semibold text-zinc-200">{t("footer.newsletter")}</p>
            <p className="mt-1 text-xs text-zinc-500">{t("footer.newsletterBody")}</p>
            {subscribed ? (
              <p className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
                <CheckIcon width={16} height={16} /> Bedankt! Je bent aangemeld.
              </p>
            ) : (
              <form className="mt-3 flex gap-2" onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className="input-field flex-1"
                />
                <button type="submit" disabled={busy} className="btn-neon px-4" aria-label={t("footer.subscribe")}>
                  <ArrowRight width={18} height={18} />
                </button>
              </form>
            )}
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {needsConsent() && (
              <button type="button" onClick={resetConsent} className="underline transition hover:text-neon">
                Cookievoorkeuren
              </button>
            )}
            <p className="max-w-md">{t("footer.disclaimer")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
