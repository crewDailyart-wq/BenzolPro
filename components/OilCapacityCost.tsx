import Link from "next/link";
import type { Viscosity } from "@/lib/types";
import { estimateOilChangeCost, FILTER_COST_EUR, LABOUR_COST_EUR } from "@/lib/carModels";
import { euro } from "@/lib/format";
import { DropIcon, WrenchIcon } from "./icons";

/**
 * Antwoord-eerst blok voor de auto-pagina's: beantwoordt "hoeveel liter olie
 * heeft de [auto] nodig?" en "wat kost een olieverversing?" — precies de
 * featured-snippet-queries. De inhoud/kosten zijn indicaties (advies).
 * Server component.
 */
export default function OilCapacityCost({
  subject,
  viscosity,
  capacityL,
}: {
  subject: string; // bijv. "Volkswagen Golf 1.4 TSI"
  viscosity: Viscosity;
  capacityL: number;
}) {
  const cost = estimateOilChangeCost(viscosity, capacityL);
  const liters = capacityL.toLocaleString("nl-NL", { maximumFractionDigits: 2 });

  return (
    <div className="mt-8 max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* hoeveel liter */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
            <DropIcon width={16} height={16} className="text-azure" /> Hoeveel liter olie?
          </div>
          <p className="mt-2 text-3xl font-extrabold text-neon">
            ± {liters} L
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            De <strong>{subject}</strong> heeft bij een verversing (inclusief filter) circa {liters} liter{" "}
            <strong>{viscosity}</strong> motorolie nodig.
          </p>
        </div>

        {/* wat kost het */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
            <WrenchIcon width={16} height={16} className="text-azure" /> Wat kost verversen?
          </div>
          <table className="mt-2 w-full text-sm">
            <tbody className="text-zinc-300">
              <tr className="border-b border-ink-line/60">
                <td className="py-1.5">Olie (± {liters} L {viscosity})</td>
                <td className="py-1.5 text-right font-semibold">{euro(cost.oilEur)}</td>
              </tr>
              <tr className="border-b border-ink-line/60">
                <td className="py-1.5">Oliefilter (indicatie)</td>
                <td className="py-1.5 text-right font-semibold">± {euro(FILTER_COST_EUR)}</td>
              </tr>
              <tr className="border-b border-ink-line/60">
                <td className="py-1.5 font-semibold text-zinc-100">Zelf verversen</td>
                <td className="py-1.5 text-right font-extrabold text-neon">± {euro(cost.diyEur)}</td>
              </tr>
              <tr>
                <td className="py-1.5">Bij de garage (incl. arbeid ± {euro(LABOUR_COST_EUR)})</td>
                <td className="py-1.5 text-right font-semibold text-zinc-100">± {euro(cost.garageEur)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Indicatie op basis van onze {viscosity}-olie ({euro(cost.perLiterEur)}/L) en gemiddelde tarieven — geen offerte.
        Wil je het laten doen?{" "}
        <Link href="/#garages" className="font-semibold text-neon hover:underline">
          Vind een Benzol-garage bij jou in de buurt
        </Link>.
      </p>
    </div>
  );
}
