"use client";

import { useState } from "react";

/**
 * Brede merk-/hero-banner (donker, zwart-goud) voor bovenaan de productenpagina.
 * Toont de HELE afbeelding (niets bijgesneden) zodat logo, claim, trust-badges,
 * merklogo's en productfoto allemaal zichtbaar blijven.
 *
 * Drop-in, net als hero-bg.jpg/logo.png: zet public/brand-banner.png neer (of
 * geef een eigen `src` mee) en de banner verschijnt automatisch. Ontbreekt het
 * bestand, dan wordt niets getoond — nooit een kapot plaatje.
 *
 * Tip: gebruik een brede afbeelding met donkere achtergrond (bijv. ~1800×900 px,
 * verhouding rond 2:1) zodat hij naadloos in de zwart-goud stijl past.
 */
export default function BrandBanner({
  src = "/brand-banner.jpg",
  alt = "Benzol — premium olie, maximale prestaties. Geschikt voor alle bekende automerken.",
}: {
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-ink-line shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onError={() => setFailed(true)}
        className="block h-auto w-full"
      />
    </div>
  );
}
