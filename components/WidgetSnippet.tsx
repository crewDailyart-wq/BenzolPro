"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";
import EmbedPlateChecker from "./EmbedPlateChecker";
import { CheckIcon } from "./icons";

/**
 * Live preview + kopieerbare insluitcode voor de gratis kentekencheck-widget.
 * De code bevat bewust ook een zichtbare creditlink BUITEN de iframe — die staat
 * in de HTML van de host-site en levert zo een echte backlink op.
 */
export default function WidgetSnippet() {
  const [copied, setCopied] = useState(false);

  const snippet = `<!-- Gratis BenzolPro motorolie-kentekencheck -->
<iframe src="${SITE_URL}/embed/kenteken"
        width="100%" height="520"
        style="border:0;max-width:440px;width:100%"
        title="Motorolie kentekencheck" loading="lazy"></iframe>
<p style="font-size:12px;color:#666;max-width:440px">
  Gratis <a href="${SITE_URL}/kenteken-check" target="_blank" rel="noopener">motorolie-kentekencheck</a> door BenzolPro
</p>`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* live preview */}
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Live voorbeeld</p>
        <EmbedPlateChecker />
      </div>

      {/* code */}
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Insluitcode</p>
        <div className="relative">
          <pre className="overflow-x-auto rounded-2xl border border-ink-line bg-ink-soft p-4 text-xs leading-relaxed text-zinc-300">
            <code>{snippet}</code>
          </pre>
          <button
            type="button"
            onClick={copy}
            className="btn-neon absolute right-3 top-3 px-3 py-1.5 text-xs"
          >
            {copied ? (
              <><CheckIcon width={14} height={14} /> Gekopieerd</>
            ) : (
              "Kopieer code"
            )}
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-400">
          Plak deze code op je eigen website. De check werkt direct en verwijst je bezoekers naar het juiste
          Benzol-product — jij hoeft niets te onderhouden.
        </p>
      </div>
    </div>
  );
}
