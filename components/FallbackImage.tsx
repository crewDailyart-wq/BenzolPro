"use client";

import { useState } from "react";

const FALLBACK_EXTS = ["jpg", "png", "webp", "jpeg"];

/**
 * Bouwt geordende bestandsnaam-kandidaten door de extensie te wisselen, zodat
 * een foto die als .jpg, .png of .webp is neergezet allemaal automatisch werkt
 * — zonder de bestandsnaam in lib/products.ts aan te passen. De opgegeven
 * extensie wordt als eerste geprobeerd (dus houd .jpg in de code als je JPG's
 * gebruikt: dan is er geen enkele extra mislukte poging).
 */
export function extensionCandidates(src: string): string[] {
  const m = src.match(/^(.*)\.([a-zA-Z0-9]+)$/);
  if (!m) return [src];
  const base = m[1];
  const ext = m[2].toLowerCase();
  const rest = FALLBACK_EXTS.filter((e) => e !== ext);
  return [src, ...rest.map((e) => `${base}.${e}`)];
}

/**
 * <img> die bij een laadfout automatisch de volgende extensie probeert
 * (.jpg → .png → .webp → .jpeg). Pas als álle varianten falen wordt
 * `onExhausted` aangeroepen (waarmee de aanroeper kan terugvallen op een
 * placeholder / de foto kan overslaan). Zo verschijnt er nooit een kapot
 * plaatje, ongeacht in welk formaat de winkeleigenaar de foto opslaat.
 */
export default function FallbackImage({
  src,
  onExhausted,
  ...imgProps
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  onExhausted?: () => void;
}) {
  const candidates = extensionCandidates(src);
  const [i, setI] = useState(0);

  function advanceOrFail() {
    setI((cur) => {
      if (cur < candidates.length - 1) return cur + 1;
      onExhausted?.();
      return cur;
    });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- lokale, door de eigenaar aangeleverde foto's
    <img
      {...imgProps}
      ref={(el) => {
        // Server-rendered <img> begint al te laden vóór hydratie; is de load
        // dan al mislukt, dan miste de onError. Deze check vangt dat op mount.
        if (el && el.complete && el.naturalWidth === 0) advanceOrFail();
      }}
      src={candidates[i]}
      onError={advanceOrFail}
    />
  );
}
