import type { Product, Viscosity } from "./types";
import { PRODUCTS } from "./products";

/**
 * Curated database van populaire auto's in Nederland/België met een verantwoorde
 * aanbevolen viscositeit per model. Hiermee genereert de site automatisch
 * "Welke motorolie voor [merk] [model]?"-landingspagina's (programmatic SEO) —
 * precies de zoekopdrachten die automobilisten intypen.
 *
 * ⚠️ De aanbeveling is een algemeen advies op basis van bouwjaar/brandstof.
 * Voeg gerust modellen toe of pas een viscositeit aan; de site pikt het
 * automatisch op. Op elke pagina staat de disclaimer dat het instructieboekje
 * / de olievuldop leidend is voor de exacte fabrieksnorm.
 */
export interface CarModel {
  model: string;
  /** korte periode-aanduiding, bijv. "2012–2020" */
  era?: string;
  viscosity: Viscosity;
  /** globale brandstof waar dit advies op mikt */
  fuel: "petrol" | "diesel" | "hybride" | "benzine & diesel";
}

export interface CarMake {
  name: string;
  models: CarModel[];
}

export const CAR_MAKES: CarMake[] = [
  {
    name: "Volkswagen",
    models: [
      { model: "Golf", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Polo", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Passat", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Tiguan", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Up", era: "2011–2023", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Opel",
    models: [
      { model: "Corsa", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Astra", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Insignia", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Zafira", era: "2005–2014", viscosity: "10W40", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Ford",
    models: [
      { model: "Fiesta", era: "2013–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Focus", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Kuga", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Mondeo", era: "2007–2022", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Renault",
    models: [
      { model: "Clio", era: "2012–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Mégane", era: "2015–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Captur", era: "2013–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Scénic", era: "2009–2022", viscosity: "5W40", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Peugeot",
    models: [
      { model: "208", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "308", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "2008", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "3008", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Toyota",
    models: [
      { model: "Yaris", era: "2020–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Corolla", era: "2019–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "C-HR", era: "2016–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "RAV4", era: "2019–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Aygo", era: "2014–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Audi",
    models: [
      { model: "A1", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "A3", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "A4", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Q3", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "BMW",
    models: [
      { model: "1-serie", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "3-serie", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "5-serie", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "X1", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      { model: "A-Klasse", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "B-Klasse", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "C-Klasse", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "E-Klasse", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Kia",
    models: [
      { model: "Picanto", era: "2011–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Rio", era: "2011–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Ceed", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Sportage", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Hyundai",
    models: [
      { model: "i10", era: "2013–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "i20", era: "2014–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "i30", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Tucson", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Škoda",
    models: [
      { model: "Fabia", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Octavia", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Superb", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Kamiq", era: "2019–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Volvo",
    models: [
      { model: "V40", era: "2012–2019", viscosity: "0W30", fuel: "benzine & diesel" },
      { model: "V60", era: "2018–heden", viscosity: "0W20", fuel: "benzine & diesel" },
      { model: "XC40", era: "2017–heden", viscosity: "0W20", fuel: "petrol" },
      { model: "V70", era: "2007–2016", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Nissan",
    models: [
      { model: "Micra", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Qashqai", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Juke", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Fiat",
    models: [
      { model: "500", era: "2007–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Panda", era: "2011–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Punto", era: "2005–2018", viscosity: "10W40", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Citroën",
    models: [
      { model: "C1", era: "2014–2022", viscosity: "5W30", fuel: "petrol" },
      { model: "C3", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "C4", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Berlingo", era: "2008–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
];

/** URL-veilige slug van een merk- of modelnaam. */
export function carSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface MakeEntry {
  slug: string;
  make: CarMake;
}
export interface ModelEntry {
  makeSlug: string;
  modelSlug: string;
  make: CarMake;
  model: CarModel;
}

export function getMakeEntries(): MakeEntry[] {
  return CAR_MAKES.map((make) => ({ slug: carSlug(make.name), make }));
}

export function getMakeBySlug(slug: string): CarMake | undefined {
  return CAR_MAKES.find((m) => carSlug(m.name) === slug);
}

export function getModelBySlug(makeSlug: string, modelSlug: string): ModelEntry | undefined {
  const make = getMakeBySlug(makeSlug);
  if (!make) return undefined;
  const model = make.models.find((m) => carSlug(m.model) === modelSlug);
  if (!model) return undefined;
  return { makeSlug, modelSlug, make, model };
}

export function getAllModelEntries(): ModelEntry[] {
  return CAR_MAKES.flatMap((make) =>
    make.models.map((model) => ({
      makeSlug: carSlug(make.name),
      modelSlug: carSlug(model.model),
      make,
      model,
    })),
  );
}

/** Korte, begrijpelijke onderbouwing per viscositeit. */
export function viscosityReason(v: Viscosity): string {
  switch (v) {
    case "0W20":
      return "een dunne, brandstofzuinige olie die past bij moderne (hybride) motoren met een lage koude-startweerstand";
    case "0W30":
      return "een lichte, zuinige olie voor moderne motoren die een snelle smering bij koude start nodig hebben";
    case "5W30":
      return "de meest gangbare keuze voor moderne benzine- en dieselmotoren, ook met roetfilter";
    case "5W40":
      return "een robuuste olie die goede bescherming biedt, ook bij zwaardere belasting en warmere motoren";
    case "10W40":
      return "een olie voor oudere motoren en hogere kilometerstanden, met extra afdichtende bescherming";
    case "10W60":
      return "een olie met hoge filmsterkte voor sportieve, hoogtoerige motoren";
    case "15W40":
      return "een stevige olie voor zwaar werk en oudere diesels";
    default:
      return "de aanbevolen viscositeit voor dit model";
  }
}

/**
 * Kies het best passende Benzol-product voor een viscositeit — bij voorkeur een
 * niet-racing product dat op voorraad is; anders het eerste met die viscositeit.
 */
export function pickProductForViscosity(v: Viscosity): Product | undefined {
  const candidates = PRODUCTS.filter((p) => p.viscosity === v);
  return (
    candidates.find((p) => p.category !== "racing" && p.stock > 0) ??
    candidates.find((p) => p.stock > 0) ??
    candidates[0]
  );
}
