"use client";

import { useState } from "react";

/**
 * Brede, smalle "merkenstrip"-banner voor bovenaan de productenpagina — bedoeld
 * voor één lange afbeelding met veel automerk-logo's naast elkaar.
 *
 * Drop-in, net als hero-bg.jpg en logo.png: zet een afbeelding neer in
 * public/ met de naam `merken-banner.png` (of geef een eigen `src` mee) en de
 * strip verschijnt automatisch. Ontbreekt het bestand, dan wordt er niets
 * getoond — nooit een kapot plaatje.
 *
 * Tip: gebruik een brede, lage afbeelding (bijv. 1600×200 px). Een PNG met
 * transparante achtergrond staat het mooist op de donkere achtergrond.
 */
export default function BrandStrip({
  src = "/merken-banner.png",
  alt = "Geschikt voor alle bekende automerken",
}: {
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-ink-line bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onError={() => setFailed(true)}
        className="h-28 w-full object-cover object-center sm:h-32 md:h-40"
      />
    </div>
  );
}
