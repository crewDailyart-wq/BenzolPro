"use client";

import Link from "next/link";
import { needsConsent } from "@/lib/site";
import { useConsent } from "@/lib/consent";

/**
 * AVG-cookiemelding. Verschijnt alleen wanneer er een toestemming-vereisende
 * tracker (GA4) is geconfigureerd én de bezoeker nog geen keuze heeft gemaakt.
 * Zonder analytics-configuratie is er niets te vragen en blijft de balk weg.
 */
export default function CookieBanner() {
  const { consent, ready, accept, reject } = useConsent();

  if (!needsConsent()) return null; // geen tracker die toestemming vereist
  if (!ready || consent !== "unset") return null; // keuze al gemaakt of nog aan het laden

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
      role="dialog"
      aria-live="polite"
      aria-label="Cookievoorkeuren"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-ink-line bg-ink-card/95 p-5 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold text-zinc-100">🍪 Cookies & privacy</p>
        <p className="mt-2 text-sm text-zinc-400">
          We gebruiken alleen noodzakelijke opslag om de winkelwagen en het afrekenen te laten werken. Met jouw
          toestemming plaatsen we ook analytische cookies om de website te verbeteren. Lees meer in ons{" "}
          <Link href="/cookiebeleid" className="text-neon underline">
            cookiebeleid
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={reject}
            className="rounded-xl border border-ink-line px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500"
          >
            Alleen noodzakelijk
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-neon px-5 py-2.5 text-sm"
          >
            Alles accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
