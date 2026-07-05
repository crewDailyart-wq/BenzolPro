import Link from "next/link";
import type { Viscosity } from "@/lib/types";
import { viscosityReason, pickProductForViscosity } from "@/lib/carModels";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { GUIDES } from "@/lib/guides";
import ProductVisual from "./ProductVisual";
import { CheckIcon, TruckIcon, ArrowRight, CarIcon } from "./icons";

/** Vaste selectie gidsen die op elke auto-pagina relevant is. */
const RELATED_GUIDE_SLUGS = ["5w30-of-5w40-verschil", "hoe-vaak-motorolie-verversen", "wat-betekent-motorolie-viscositeit"];

/**
 * Gedeelde weergave voor de "welke olie"-advies-pagina's (zowel per model als
 * per generatie). Toont de intro, het aanbevolen product met koopknop, de
 * kenteken-CTA en de onderbouwing. Server component.
 */
export default function OilAdviceBody({
  subject,
  era,
  fuel,
  viscosity,
}: {
  subject: string; // bijv. "Volkswagen Golf 7"
  era?: string;
  fuel: string;
  viscosity: Viscosity;
}) {
  const product = pickProductForViscosity(viscosity);
  const price = product ? euro(sizePrice(product, defaultSize(product.sizesLiter))) : null;

  return (
    <>
      <p className="speakable-answer mt-3 max-w-3xl text-lg leading-relaxed text-zinc-300">
        Voor de <strong>{subject}</strong>
        {era ? ` (${era}, ${fuel})` : ` (${fuel})`} adviseren wij{" "}
        <strong className="text-neon">Benzol {viscosity}</strong> motorolie — {viscosityReason(viscosity)}.
      </p>

      {product && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Onze aanbeveling</h2>
          <div className="card-surface mt-3 flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
            <div className="h-28 w-28 shrink-0 self-center rounded-xl bg-ink-soft p-2">
              <ProductVisual product={product} className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold">{product.name}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{product.specs.slice(0, 4).join(" · ")}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xl font-extrabold text-neon">{price}</span>
                <span className="rounded-full border border-azure/40 bg-azure/10 px-2 py-0.5 text-[11px] font-bold text-azure">
                  {viscosity}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TruckIcon width={13} height={13} /> Altijd gratis verzending
                </span>
              </div>
            </div>
            <Link href={`/product/${product.slug}`} className="btn-neon shrink-0 self-stretch sm:self-center">
              Bekijk &amp; bestel <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 max-w-3xl">
        <div className="card-surface flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-zinc-300">
            <CarIcon width={20} height={20} className="text-azure" />
            Niet zeker welke uitvoering of motor je hebt? Check je kenteken voor een advies op maat.
          </p>
          <Link href="/" className="btn-azure shrink-0">
            Kenteken checken <ArrowRight width={18} height={18} />
          </Link>
        </div>
      </div>

      <div className="mt-8 max-w-3xl rounded-2xl border border-ink-line bg-ink-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Waarom {viscosity} voor deze auto?</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> {viscosityReason(viscosity)}.</li>
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Voldoet aan de officiële ACEA-, API- en OEM-specificaties.</li>
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Altijd gratis verzending, voor 22:00 besteld is morgen in huis.</li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Let op: dit is een algemeen advies op basis van bouwjaar en brandstof. Controleer altijd je instructieboekje of
          de olievuldop voor de exacte fabrieksnorm van jouw specifieke uitvoering.
        </p>
      </div>

      <div className="mt-8 max-w-3xl">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Meer weten over motorolie?</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {GUIDES.filter((g) => RELATED_GUIDE_SLUGS.includes(g.slug)).map((g) => (
            <li key={g.slug}>
              <Link
                href={`/gids/${g.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
              >
                {g.title} <ArrowRight width={14} height={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
