"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CarIcon, ShieldIcon } from "./icons";

/**
 * Full-width showcase band for a luxury-car photo.
 *
 * EIGEN AFBEELDING TOEVOEGEN: zet gewoon een foto met exact deze bestandsnaam
 * in de map `public/`:
 *
 *   public/luxury-car.jpg
 *
 * Geen code aanpassen nodig — zodra het bestand bestaat verschijnt jouw foto
 * hier automatisch (met een nette donkere overlay eroverheen zodat de tekst
 * altijd leesbaar blijft). Bestaat het bestand nog niet? Dan valt de sectie
 * terug op een stijlvolle geanimeerde placeholder, dus de site blijft altijd
 * heel. Wil je een andere bestandsnaam of ander formaat (bijv. .png/.webp)?
 * Pas dan alleen de constante `LUXURY_IMAGE` hieronder aan.
 */
const LUXURY_IMAGE = "/luxury-car.jpg";

export default function LuxuryShowcase() {
  // Preload in JS so we only render the <img> once it truly loads — this avoids
  // both a broken-image flash and the hydration race where a server-rendered
  // <img>'s error event fires before React attaches an onError handler.
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = LUXURY_IMAGE;
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-card shadow-neon">
        <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LUXURY_IMAGE}
              alt="Luxe auto, beschermd door Benzol-motorolie"
              className="h-full w-full object-cover"
            />
          ) : (
            // Stijlvolle placeholder zolang er nog geen eigen foto staat.
            <div className="relative h-full w-full bg-gradient-to-br from-ink via-ink-soft to-black">
              <div className="absolute inset-0 bg-grid-neon [background-size:26px_26px] opacity-30" />
              <div className="absolute inset-0 bg-radial-azure" />
              <CarIcon className="absolute bottom-6 right-6 h-32 w-32 text-azure/25 sm:h-48 sm:w-48" />
            </div>
          )}

          {/* leesbaarheids-overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-azure">
              <ShieldIcon className="h-4 w-4" /> Premium bescherming
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight sm:text-4xl">
              Gemaakt voor <span className="text-gold-metal">wat je het liefste rijdt</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-300 sm:text-base">
              Van je dagelijkse kilometers tot je droomauto — Benzol houdt elke
              motor soepel, stil en optimaal beschermd.
            </p>
            <Link href="/products" className="btn-neon mt-5">
              Bekijk de olie <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
