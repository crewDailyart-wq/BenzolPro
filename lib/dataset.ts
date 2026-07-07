// Bouwt een open, citeerbare dataset + eerlijke statistieken uit de eigen
// auto-oliedatabase (lib/carModels.ts). Gebruikt door de open-data-pagina, de
// JSON/CSV-endpoints én het Motorolie-rapport. Alle cijfers zijn berekend uit de
// database (geen verzonnen getallen) — de bron is dus altijd verifieerbaar.
import type { Viscosity } from "./types";
import {
  CAR_MAKES,
  carSlug,
  resolveSpec,
  resolveOilCapacity,
  getMakeEntries,
  getAllModelEntries,
  getAllGenerationEntries,
  getAllEngineEntries,
} from "./carModels";
import { absoluteUrl } from "./site";

export interface DatasetRow {
  merk: string;
  model: string;
  uitvoering: string; // generatie- of motornaam, of "basis"
  periode: string;
  brandstof: string;
  viscositeit: Viscosity;
  norm: string; // ACEA/OEM-norm of "-"
  olie_inhoud_liter: number;
  inhoud_geschat: boolean;
  url: string;
}

/** Alle auto-uitvoeringen als platte rijen — het meest specifieke niveau eerst. */
export function buildDataset(): DatasetRow[] {
  const rows: DatasetRow[] = [];

  for (const make of CAR_MAKES) {
    const makeSlug = carSlug(make.name);
    for (const model of make.models) {
      const modelSlug = carSlug(model.model);
      const base = `/olie/${makeSlug}/${modelSlug}`;
      const generations = model.generations ?? [];
      const engines = model.engines ?? [];

      // Als er generaties/motoren zijn, gebruiken we die als de rijen; anders het model.
      if (generations.length === 0 && engines.length === 0) {
        const cap = resolveOilCapacity(model.oilCapacityL, model.fuel);
        rows.push({
          merk: make.name,
          model: model.model,
          uitvoering: "basis",
          periode: model.era ?? "",
          brandstof: model.fuel,
          viscositeit: model.viscosity,
          norm: resolveSpec(make.name, model) ?? "-",
          olie_inhoud_liter: cap.liters,
          inhoud_geschat: cap.estimated,
          url: absoluteUrl(base),
        });
      }

      for (const g of generations) {
        const cap = resolveOilCapacity(g.oilCapacityL, g.fuel);
        rows.push({
          merk: make.name,
          model: model.model,
          uitvoering: g.name,
          periode: g.era,
          brandstof: g.fuel,
          viscositeit: g.viscosity,
          norm: resolveSpec(make.name, model, g) ?? "-",
          olie_inhoud_liter: cap.liters,
          inhoud_geschat: cap.estimated,
          url: absoluteUrl(`${base}/${g.slug}`),
        });
      }

      for (const e of engines) {
        const cap = resolveOilCapacity(e.oilCapacityL, e.fuel);
        rows.push({
          merk: make.name,
          model: model.model,
          uitvoering: e.name,
          periode: model.era ?? "",
          brandstof: e.fuel,
          viscositeit: e.viscosity,
          norm: resolveSpec(make.name, model, undefined, e) ?? "-",
          olie_inhoud_liter: cap.liters,
          inhoud_geschat: cap.estimated,
          url: absoluteUrl(`${base}/motor/${e.slug}`),
        });
      }
    }
  }

  return rows;
}

export interface Distribution {
  label: string;
  count: number;
  pct: number; // 0-100, afgerond op 1 decimaal
}

export interface DatasetStats {
  makes: number;
  models: number;
  generations: number;
  engines: number;
  variants: number; // aantal rijen in de dataset
  viscosityDistribution: Distribution[]; // gesorteerd, meest voorkomend eerst
  fuelDistribution: Distribution[];
  avgCapacity: number;
  minCapacity: number;
  maxCapacity: number;
  topNorms: Distribution[]; // top-6 fabrieksnormen
  exactCapacityShare: number; // % rijen met een exacte (niet-geschatte) inhoud
}

function distribution(values: string[], limit?: number): Distribution[] {
  const total = values.length || 1;
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const list = [...counts.entries()]
    .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);
  return limit ? list.slice(0, limit) : list;
}

export function datasetStats(rows: DatasetRow[] = buildDataset()): DatasetStats {
  const caps = rows.map((r) => r.olie_inhoud_liter);
  const exact = rows.filter((r) => !r.inhoud_geschat).length;
  return {
    makes: getMakeEntries().length,
    models: getAllModelEntries().length,
    generations: getAllGenerationEntries().length,
    engines: getAllEngineEntries().length,
    variants: rows.length,
    viscosityDistribution: distribution(rows.map((r) => r.viscositeit)),
    fuelDistribution: distribution(rows.map((r) => r.brandstof)),
    avgCapacity: Math.round((caps.reduce((s, n) => s + n, 0) / (caps.length || 1)) * 10) / 10,
    minCapacity: Math.min(...caps),
    maxCapacity: Math.max(...caps),
    topNorms: distribution(rows.map((r) => r.norm).filter((n) => n !== "-"), 6),
    exactCapacityShare: Math.round((exact / (rows.length || 1)) * 1000) / 10,
  };
}

/** Datum van de laatste dataupdate (voor schema.org/Dataset). Vast, geen Date.now. */
export const DATASET_UPDATED = "2026-07-06";
export const DATASET_LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";
export const DATASET_LICENSE_NAME = "CC BY 4.0";
