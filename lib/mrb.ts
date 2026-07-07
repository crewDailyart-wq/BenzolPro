// Grove INDICATIE van de motorrijtuigenbelasting (wegenbelasting) voor een
// personenauto. De echte MRB hangt af van gewicht, brandstof én de provinciale
// opcenten en verandert per jaar — dit is uitdrukkelijk een schatting met een
// link naar de officiële Belastingdienst-tool. Bewust conservatief en transparant.
import type { FuelClass } from "./rdwVehicle";

export const MRB_YEAR = 2025;

// Provinciale opcenten (%) — indicatief, wijzigt jaarlijks. Bron: provincies.
export const OPCENTEN: Record<string, number> = {
  Groningen: 95.8,
  Fryslân: 87.0,
  Drenthe: 92.0,
  Overijssel: 79.9,
  Flevoland: 82.3,
  Gelderland: 89.2,
  Utrecht: 74.5,
  "Noord-Holland": 68.2,
  "Zuid-Holland": 90.4,
  Zeeland: 89.1,
  "Noord-Brabant": 78.0,
  Limburg: 78.6,
};

export const PROVINCES = Object.keys(OPCENTEN);
const AVG_OPCENTEN = 83.0;

// Indicatief kwartaalbedrag voor een BENZINE-personenauto bij gemiddelde opcenten,
// per gewichtsklasse (massa ledig voertuig, kg). Grove staffel.
function petrolBaseQuarter(weightKg: number): number {
  const w = Math.max(700, Math.min(2400, weightKg));
  // ~ €11 per 100 kg boven 700 kg, plus een basis.
  return 44 + ((w - 700) / 100) * 11;
}

// Brandstof-toeslagfactoren t.o.v. benzine (indicatief).
const FUEL_FACTOR: Record<FuelClass, number> = {
  petrol: 1,
  hybrid: 1, // veel hybrides betalen als benzine
  lpg: 1.6,
  diesel: 2.6,
  electric: 0.25, // EV's betalen (2025) een sterk verlaagd tarief
  other: 1.2,
};

export interface MrbIndication {
  quarterLow: number;
  quarterHigh: number;
  yearLow: number;
  yearHigh: number;
  province: string;
  opcenten: number;
  note?: string;
}

/** Rond af op €5 voor een eerlijke "indicatie"-uitstraling. */
function round5(n: number): number {
  return Math.round(n / 5) * 5;
}

export function computeMrb(weightKg: number | undefined, fuel: FuelClass, province: string): MrbIndication | null {
  const opcenten = OPCENTEN[province];
  if (opcenten == null || !weightKg) return null;

  const base = petrolBaseQuarter(weightKg) * (FUEL_FACTOR[fuel] ?? 1);
  // Provinciale correctie: schaal een deel van het bedrag met de opcenten.
  const provinceAdj = base * (0.55 + 0.45 * (opcenten / AVG_OPCENTEN));
  const mid = provinceAdj;

  const quarterLow = round5(mid * 0.9);
  const quarterHigh = round5(mid * 1.1);

  return {
    quarterLow,
    quarterHigh,
    yearLow: quarterLow * 4,
    yearHigh: quarterHigh * 4,
    province,
    opcenten,
    note:
      fuel === "electric"
        ? "Elektrische auto's betalen in 2025 een sterk verlaagd tarief; vanaf 2026 verandert dit. Controleer het exacte bedrag bij de Belastingdienst."
        : undefined,
  };
}
