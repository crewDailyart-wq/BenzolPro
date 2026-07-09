import type { Product, Viscosity } from "./types";
import { PRODUCTS } from "./products";
import { sizePrice, defaultSize } from "./format";

/**
 * Curated database van populaire auto's in Nederland/België met een verantwoorde
 * aanbevolen viscositeit per model (en optioneel per generatie). Hiermee genereert
 * de site automatisch "Welke motorolie voor [merk] [model]?"-landingspagina's
 * (programmatic SEO) — precies de zoekopdrachten die automobilisten intypen.
 *
 * ⚠️ De aanbeveling is een algemeen advies op basis van bouwjaar/brandstof.
 * Voeg gerust merken, modellen of generaties toe; pagina's, sitemap en interne
 * links volgen automatisch. Vuistregel voor de viscositeit:
 *   - moderne hybride                  → 0W20
 *   - modern (2015+) benzine/diesel    → 5W30
 *   - 2005–2015                        → 5W30 / 5W40
 *   - 1998–2005                        → 5W40
 *   - ouder / hoge km-stand            → 10W40 (heel oud/diesel: 15W40)
 *   - sportief, hoogtoerig             → 5W40 / 10W60
 * Op elke pagina staat de disclaimer dat het instructieboekje / de olievuldop
 * leidend is voor de exacte fabrieksnorm.
 */
export type FuelLabel = "petrol" | "diesel" | "hybride" | "benzine & diesel";

export interface Generation {
  /** URL-slug binnen het model, bijv. "golf-7" */
  slug: string;
  /** weergavenaam, bijv. "Golf 7 (VII)" */
  name: string;
  era: string;
  viscosity: Viscosity;
  fuel: FuelLabel;
  /** circa olie-inhoud incl. filter, in liters (voor "hoeveel liter"-advies) */
  oilCapacityL?: number;
  /** afwijkende fabrieksnorm voor deze generatie (overschrijft de merk-standaard) */
  spec?: string;
}

/**
 * Een concrete motoruitvoering binnen een model (bijv. "1.4 TSI"). Hiermee
 * genereert de site ultra-specifieke pagina's — precies de long-tail waar
 * automobilisten op zoeken ("welke olie golf 1.4 tsi", "hoeveel liter olie …").
 */
export interface Engine {
  /** URL-slug binnen het model, bijv. "1-4-tsi" */
  slug: string;
  /** weergavenaam, bijv. "1.4 TSI" */
  name: string;
  /** optioneel vermogen, bijv. "150 pk" */
  power?: string;
  fuel: FuelLabel;
  viscosity: Viscosity;
  /** circa olie-inhoud incl. filter, in liters */
  oilCapacityL?: number;
  /** de fabrieksnorm/specificatie, bijv. "VW 504.00 / 507.00" */
  spec?: string;
}

export interface CarModel {
  model: string;
  /** periode van het (nieuwste) model, bijv. "2012–heden" */
  era?: string;
  viscosity: Viscosity;
  fuel: FuelLabel;
  /** circa olie-inhoud incl. filter, in liters (voor "hoeveel liter"-advies) */
  oilCapacityL?: number;
  /** afwijkende fabrieksnorm voor dit model (overschrijft de merk-standaard) */
  spec?: string;
  /** optionele generaties met elk een eigen advies + eigen pagina */
  generations?: Generation[];
  /** optionele motoruitvoeringen met elk een eigen advies + eigen pagina */
  engines?: Engine[];
}

export interface CarMake {
  name: string;
  models: CarModel[];
}

export const CAR_MAKES: CarMake[] = [
  {
    name: "Volkswagen",
    models: [
      {
        model: "Golf",
        era: "2012–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.3,
        generations: [
          { slug: "golf-4", name: "Golf 4 (IV)", era: "1997–2003", viscosity: "10W40", fuel: "benzine & diesel", oilCapacityL: 4.5 },
          { slug: "golf-5", name: "Golf 5 (V)", era: "2003–2008", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "golf-6", name: "Golf 6 (VI)", era: "2008–2012", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "golf-7", name: "Golf 7 (VII)", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "golf-8", name: "Golf 8 (VIII)", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.5 },
        ],
        engines: [
          { slug: "1-0-tsi", name: "1.0 TSI", power: "110 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.0, spec: "VW 508.00 / 504.00" },
          { slug: "1-4-tsi", name: "1.4 TSI", power: "150 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 504.00" },
          { slug: "1-5-tsi", name: "1.5 TSI", power: "150 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 508.00 / 504.00" },
          { slug: "2-0-tdi", name: "2.0 TDI", power: "150 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 507.00" },
          { slug: "2-0-gti", name: "2.0 TSI GTI", power: "245 pk", fuel: "petrol", viscosity: "5W40", oilCapacityL: 5.7, spec: "VW 502.00" },
        ],
      },
      {
        model: "Polo",
        era: "2009–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 3.6,
        generations: [
          { slug: "polo-4", name: "Polo 4 (9N)", era: "2001–2009", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 3.2 },
          { slug: "polo-5", name: "Polo 5 (6R/6C)", era: "2009–2017", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 3.6 },
          { slug: "polo-6", name: "Polo 6 (AW)", era: "2017–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.0 },
        ],
        engines: [
          { slug: "1-0-mpi", name: "1.0 MPI", power: "80 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 3.6, spec: "VW 508.00 / 502.00" },
          { slug: "1-0-tsi", name: "1.0 TSI", power: "95–110 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.0, spec: "VW 508.00 / 504.00" },
          { slug: "1-6-tdi", name: "1.6 TDI", power: "95 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 507.00" },
        ],
      },
      { model: "Passat", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
      { model: "Tiguan", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
      { model: "Touran", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
      { model: "T-Roc", era: "2017–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Up", era: "2011–2023", viscosity: "5W30", fuel: "petrol" },
      { model: "Caddy", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Transporter T5/T6", era: "2003–heden", viscosity: "5W30", fuel: "diesel" },
    ],
  },
  {
    name: "Opel",
    models: [
      {
        model: "Corsa",
        era: "2014–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.0,
        generations: [
          { slug: "corsa-c", name: "Corsa C", era: "2000–2006", viscosity: "10W40", fuel: "petrol", oilCapacityL: 3.5 },
          { slug: "corsa-d", name: "Corsa D", era: "2006–2014", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.0 },
          { slug: "corsa-e", name: "Corsa E", era: "2014–2019", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.0 },
          { slug: "corsa-f", name: "Corsa F", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
        ],
        engines: [
          { slug: "1-2", name: "1.2", power: "70 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 3.5, spec: "dexos1 Gen2" },
          { slug: "1-2-turbo", name: "1.2 Turbo", power: "100–130 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.25, spec: "PSA B71 2312 / dexos" },
          { slug: "1-5-diesel", name: "1.5 Diesel", power: "102 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.0, spec: "PSA B71 2312" },
        ],
      },
      {
        model: "Astra",
        era: "2015–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.3,
        generations: [
          { slug: "astra-g", name: "Astra G", era: "1998–2009", viscosity: "10W40", fuel: "benzine & diesel", oilCapacityL: 3.5 },
          { slug: "astra-h", name: "Astra H", era: "2004–2014", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.0 },
          { slug: "astra-j", name: "Astra J", era: "2009–2015", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.5 },
          { slug: "astra-k", name: "Astra K", era: "2015–2021", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.0 },
        ],
        engines: [
          { slug: "1-4-turbo", name: "1.4 Turbo", power: "125–150 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.0, spec: "dexos2" },
          { slug: "1-6-cdti", name: "1.6 CDTI", power: "110–136 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.3, spec: "dexos2" },
          { slug: "1-2-turbo", name: "1.2 Turbo", power: "110–145 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.25, spec: "PSA B71 2312" },
        ],
      },
      { model: "Insignia", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.5 },
      { model: "Zafira", era: "2005–2019", viscosity: "10W40", fuel: "benzine & diesel" },
      { model: "Meriva", era: "2003–2017", viscosity: "10W40", fuel: "benzine & diesel" },
      { model: "Mokka", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Ford",
    models: [
      {
        model: "Fiesta",
        era: "2017–heden",
        viscosity: "5W30",
        fuel: "petrol",
        oilCapacityL: 4.1,
        generations: [
          { slug: "fiesta-mk6", name: "Fiesta Mk6", era: "2002–2008", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 3.8 },
          { slug: "fiesta-mk7", name: "Fiesta Mk7", era: "2008–2017", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 3.8 },
          { slug: "fiesta-mk8", name: "Fiesta Mk8", era: "2017–heden", viscosity: "5W30", fuel: "petrol", oilCapacityL: 4.1 },
        ],
        engines: [
          { slug: "1-0-ecoboost", name: "1.0 EcoBoost", power: "100–125 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.1, spec: "Ford WSS-M2C948-B" },
          { slug: "1-1-ti-vct", name: "1.1 Ti-VCT", power: "75 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 3.8, spec: "Ford WSS-M2C948-B" },
        ],
      },
      {
        model: "Focus",
        era: "2011–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.1,
        generations: [
          { slug: "focus-mk2", name: "Focus Mk2", era: "2004–2011", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.1 },
          { slug: "focus-mk3", name: "Focus Mk3", era: "2011–2018", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.1 },
          { slug: "focus-mk4", name: "Focus Mk4", era: "2018–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.1 },
        ],
        engines: [
          { slug: "1-0-ecoboost", name: "1.0 EcoBoost", power: "100–125 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.1, spec: "Ford WSS-M2C948-B" },
          { slug: "1-5-ecoboost", name: "1.5 EcoBoost", power: "150–182 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.1, spec: "Ford WSS-M2C948-B" },
          { slug: "1-5-tdci", name: "1.5 TDCi", power: "95–120 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 3.8, spec: "Ford WSS-M2C934-B" },
        ],
      },
      { model: "Kuga", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
      { model: "Puma", era: "2019–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Mondeo", era: "2007–2022", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Ka", era: "2008–2016", viscosity: "5W30", fuel: "petrol" },
      { model: "Transit", era: "2006–heden", viscosity: "5W30", fuel: "diesel" },
    ],
  },
  {
    name: "Renault",
    models: [
      {
        model: "Clio",
        era: "2012–heden",
        viscosity: "5W40",
        fuel: "benzine & diesel",
        oilCapacityL: 4.3,
        generations: [
          { slug: "clio-2", name: "Clio 2", era: "1998–2005", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 4.5 },
          { slug: "clio-3", name: "Clio 3", era: "2005–2014", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 4.5 },
          { slug: "clio-4", name: "Clio 4", era: "2012–2019", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "clio-5", name: "Clio 5", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
        ],
        engines: [
          { slug: "1-0-tce", name: "1.0 TCe", power: "90–100 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.3, spec: "RN17 / ACEA C3" },
          { slug: "0-9-tce", name: "0.9 TCe", power: "90 pk", fuel: "petrol", viscosity: "5W40", oilCapacityL: 4.3, spec: "RN0700" },
          { slug: "1-5-dci", name: "1.5 dCi", power: "85–115 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.5, spec: "RN0720 / ACEA C4" },
        ],
      },
      { model: "Mégane", era: "2015–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Captur", era: "2013–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Scénic", era: "2009–2022", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Twingo", era: "2007–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Kadjar", era: "2015–2022", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Peugeot",
    models: [
      {
        model: "208",
        era: "2012–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.25,
        generations: [
          { slug: "208-1", name: "208 I", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 3.75 },
          { slug: "208-2", name: "208 II", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.25 },
        ],
        engines: [
          { slug: "1-2-puretech", name: "1.2 PureTech", power: "75–130 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.25, spec: "PSA B71 2312" },
          { slug: "1-5-bluehdi", name: "1.5 BlueHDi", power: "100 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 3.75, spec: "PSA B71 2312" },
        ],
      },
      { model: "308", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.25 },
      { model: "2008", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "3008", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "206", era: "1998–2012", viscosity: "10W40", fuel: "benzine & diesel" },
      { model: "207", era: "2006–2014", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Partner", era: "2008–heden", viscosity: "5W30", fuel: "diesel" },
    ],
  },
  {
    name: "Toyota",
    models: [
      {
        model: "Corolla",
        era: "2019–heden",
        viscosity: "0W20",
        fuel: "hybride",
        oilCapacityL: 4.2,
        engines: [
          { slug: "1-8-hybrid", name: "1.8 Hybrid", power: "122 pk", fuel: "hybride", viscosity: "0W20", oilCapacityL: 4.2, spec: "API SP / ACEA C5" },
          { slug: "2-0-hybrid", name: "2.0 Hybrid", power: "184 pk", fuel: "hybride", viscosity: "0W20", oilCapacityL: 4.5, spec: "API SP / ACEA C5" },
        ],
        generations: [
          { slug: "corolla-e12", name: "Corolla E12", era: "2001–2007", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.2 },
          { slug: "corolla-e15", name: "Corolla E15", era: "2007–2013", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.2 },
          { slug: "corolla-e21", name: "Corolla E21", era: "2019–heden", viscosity: "0W20", fuel: "hybride", oilCapacityL: 4.2 },
        ],
      },
      { model: "Yaris", era: "2020–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "C-HR", era: "2016–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "RAV4", era: "2019–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Aygo", era: "2014–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Auris", era: "2007–2018", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Prius", era: "2009–heden", viscosity: "0W20", fuel: "hybride" },
    ],
  },
  {
    name: "Audi",
    models: [
      {
        model: "A3",
        era: "2012–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.3,
        generations: [
          { slug: "a3-8p", name: "A3 8P", era: "2003–2012", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "a3-8v", name: "A3 8V", era: "2012–2020", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "a3-8y", name: "A3 8Y", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.6 },
        ],
        engines: [
          { slug: "1-0-tfsi", name: "1.0 TFSI", power: "110 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.0, spec: "VW 508.00 / 504.00" },
          { slug: "1-5-tfsi", name: "1.5 TFSI", power: "150 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 508.00 / 504.00" },
          { slug: "2-0-tdi", name: "2.0 TDI", power: "150 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 507.00" },
        ],
      },
      {
        model: "A4",
        era: "2015–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 5.0,
        generations: [
          { slug: "a4-b7", name: "A4 B7", era: "2004–2008", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 4.6 },
          { slug: "a4-b8", name: "A4 B8", era: "2008–2015", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.6 },
          { slug: "a4-b9", name: "A4 B9", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.0 },
        ],
        engines: [
          { slug: "2-0-tfsi", name: "2.0 TFSI", power: "190–265 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 5.0, spec: "VW 504.00" },
          { slug: "2-0-tdi", name: "2.0 TDI", power: "150–190 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.5, spec: "VW 507.00" },
          { slug: "3-0-tdi", name: "3.0 TDI", power: "218–286 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 6.5, spec: "VW 507.00" },
        ],
      },
      { model: "A1", era: "2010–heden", viscosity: "5W30", fuel: "petrol", oilCapacityL: 4.0 },
      { model: "A6", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Q2", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Q3", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Q5", era: "2008–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "BMW",
    models: [
      {
        model: "3-serie",
        era: "2012–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 5.25,
        generations: [
          { slug: "3-serie-e46", name: "3-serie E46", era: "1998–2006", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 6.5 },
          { slug: "3-serie-e90", name: "3-serie E90", era: "2005–2013", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 6.5 },
          { slug: "3-serie-f30", name: "3-serie F30", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.25 },
          { slug: "3-serie-g20", name: "3-serie G20", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.25 },
        ],
        engines: [
          { slug: "320i", name: "320i", power: "184 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 5.25, spec: "BMW LL-01 / LL-04" },
          { slug: "318d", name: "318d / 320d", power: "150–190 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 5.25, spec: "BMW LL-04" },
          { slug: "330i", name: "330i", power: "258 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 5.25, spec: "BMW LL-01" },
        ],
      },
      { model: "1-serie", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.25 },
      { model: "5-serie", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "X1", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "X3", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "M3 / M4", era: "2014–heden", viscosity: "5W40", fuel: "petrol" },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      {
        model: "C-Klasse",
        era: "2014–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 6.5,
        generations: [
          { slug: "c-klasse-w203", name: "C-Klasse W203", era: "2000–2007", viscosity: "5W40", fuel: "benzine & diesel", oilCapacityL: 6.5 },
          { slug: "c-klasse-w204", name: "C-Klasse W204", era: "2007–2014", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 6.5 },
          { slug: "c-klasse-w205", name: "C-Klasse W205", era: "2014–2021", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 6.0 },
          { slug: "c-klasse-w206", name: "C-Klasse W206", era: "2021–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.5 },
        ],
        engines: [
          { slug: "c180-c200", name: "C180 / C200", power: "156–204 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 6.5, spec: "MB 229.51 / 229.71" },
          { slug: "c220d", name: "C220d", power: "194 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 5.5, spec: "MB 229.51 / 229.52" },
          { slug: "c300", name: "C300", power: "258 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 6.0, spec: "MB 229.51" },
        ],
      },
      { model: "A-Klasse", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 5.9 },
      { model: "B-Klasse", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "E-Klasse", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "GLA", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Sprinter", era: "2006–heden", viscosity: "5W30", fuel: "diesel" },
    ],
  },
  {
    name: "Kia",
    models: [
      { model: "Picanto", era: "2011–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Rio", era: "2011–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Ceed", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Sportage", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Niro", era: "2016–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Stonic", era: "2017–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Hyundai",
    models: [
      { model: "i10", era: "2013–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "i20", era: "2014–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "i30", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Tucson", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Kona", era: "2017–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "ix35", era: "2010–2015", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Škoda",
    models: [
      {
        model: "Octavia",
        era: "2013–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        oilCapacityL: 4.3,
        generations: [
          { slug: "octavia-2", name: "Octavia 2 (1Z)", era: "2004–2013", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "octavia-3", name: "Octavia 3 (5E)", era: "2013–2020", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.3 },
          { slug: "octavia-4", name: "Octavia 4 (NX)", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 4.5 },
        ],
        engines: [
          { slug: "1-0-tsi", name: "1.0 TSI", power: "110 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.0, spec: "VW 508.00 / 504.00" },
          { slug: "1-5-tsi", name: "1.5 TSI", power: "150 pk", fuel: "petrol", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 508.00 / 504.00" },
          { slug: "2-0-tdi", name: "2.0 TDI", power: "115–200 pk", fuel: "diesel", viscosity: "5W30", oilCapacityL: 4.3, spec: "VW 507.00" },
        ],
      },
      { model: "Fabia", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel", oilCapacityL: 3.6 },
      { model: "Superb", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Kamiq", era: "2019–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Karoq", era: "2017–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Citigo", era: "2011–2020", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "SEAT",
    models: [
      { model: "Ibiza", era: "2008–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "León", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Arona", era: "2017–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Ateca", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Mii", era: "2011–2021", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Cupra",
    models: [
      { model: "Formentor", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "León", era: "2020–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Ateca", era: "2018–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Volvo",
    models: [
      { model: "V40", era: "2012–2019", viscosity: "0W30", fuel: "benzine & diesel" },
      { model: "V60", era: "2018–heden", viscosity: "0W20", fuel: "benzine & diesel" },
      { model: "V70", era: "2007–2016", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "XC40", era: "2017–heden", viscosity: "0W20", fuel: "petrol" },
      { model: "XC60", era: "2008–heden", viscosity: "0W30", fuel: "benzine & diesel" },
      { model: "S60", era: "2010–heden", viscosity: "0W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Nissan",
    models: [
      { model: "Micra", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Qashqai", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Juke", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "X-Trail", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Note", era: "2006–2017", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Mazda",
    models: [
      { model: "2", era: "2007–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "3", era: "2009–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "6", era: "2008–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "CX-5", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "CX-30", era: "2019–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "MX-5", era: "2005–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Suzuki",
    models: [
      { model: "Swift", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Vitara", era: "2015–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Ignis", era: "2016–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "SX4 S-Cross", era: "2013–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Jimny", era: "1998–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Honda",
    models: [
      { model: "Jazz", era: "2008–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Civic", era: "2012–heden", viscosity: "0W20", fuel: "benzine & diesel" },
      { model: "CR-V", era: "2012–heden", viscosity: "0W20", fuel: "benzine & diesel" },
      { model: "HR-V", era: "2015–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Accord", era: "2008–2018", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Mitsubishi",
    models: [
      { model: "Space Star", era: "2013–heden", viscosity: "0W20", fuel: "petrol" },
      { model: "ASX", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Outlander", era: "2012–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "Colt", era: "2004–2013", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Dacia",
    models: [
      { model: "Sandero", era: "2012–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Duster", era: "2010–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Logan", era: "2004–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Spring", era: "2021–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Fiat",
    models: [
      { model: "500", era: "2007–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Panda", era: "2011–heden", viscosity: "5W40", fuel: "petrol" },
      { model: "Punto", era: "2005–2018", viscosity: "10W40", fuel: "benzine & diesel" },
      { model: "Tipo", era: "2015–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Ducato", era: "2006–heden", viscosity: "5W30", fuel: "diesel" },
    ],
  },
  {
    name: "Alfa Romeo",
    models: [
      { model: "Giulietta", era: "2010–2020", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "MiTo", era: "2008–2018", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Giulia", era: "2016–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Stelvio", era: "2017–heden", viscosity: "5W40", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Citroën",
    models: [
      { model: "C1", era: "2014–2022", viscosity: "5W30", fuel: "petrol" },
      { model: "C3", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "C4", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "C5 Aircross", era: "2018–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Berlingo", era: "2008–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "MINI",
    models: [
      { model: "Cooper (3-deurs)", era: "2007–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Countryman", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Clubman", era: "2007–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "MG",
    models: [
      { model: "ZS", era: "2019–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "MG3", era: "2013–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "HS", era: "2018–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Lexus",
    models: [
      { model: "CT 200h", era: "2011–2020", viscosity: "0W20", fuel: "hybride" },
      { model: "IS", era: "2013–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "NX", era: "2014–heden", viscosity: "0W20", fuel: "hybride" },
      { model: "UX", era: "2018–heden", viscosity: "0W20", fuel: "hybride" },
    ],
  },
  {
    name: "Subaru",
    models: [
      { model: "Impreza", era: "2007–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Forester", era: "2008–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "XV", era: "2012–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
  {
    name: "Jeep",
    models: [
      { model: "Renegade", era: "2014–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Compass", era: "2017–heden", viscosity: "5W40", fuel: "benzine & diesel" },
      { model: "Grand Cherokee", era: "2011–heden", viscosity: "5W40", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Land Rover",
    models: [
      { model: "Discovery", era: "2009–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Range Rover Evoque", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Defender", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Chevrolet",
    models: [
      { model: "Spark", era: "2010–2016", viscosity: "5W30", fuel: "petrol" },
      { model: "Aveo", era: "2008–2015", viscosity: "5W30", fuel: "petrol" },
      { model: "Cruze", era: "2009–2016", viscosity: "5W30", fuel: "benzine & diesel" },
    ],
  },
  {
    name: "Smart",
    models: [
      { model: "Fortwo", era: "2007–heden", viscosity: "5W30", fuel: "petrol" },
      { model: "Forfour", era: "2014–heden", viscosity: "5W30", fuel: "petrol" },
    ],
  },
];

/** URL-veilige slug van een merk- of modelnaam. */
export function carSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/ó/g, "o")
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
export interface GenerationEntry {
  makeSlug: string;
  modelSlug: string;
  genSlug: string;
  make: CarMake;
  model: CarModel;
  generation: Generation;
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

export function getAllGenerationEntries(): GenerationEntry[] {
  return CAR_MAKES.flatMap((make) =>
    make.models.flatMap((model) =>
      (model.generations ?? []).map((generation) => ({
        makeSlug: carSlug(make.name),
        modelSlug: carSlug(model.model),
        genSlug: generation.slug,
        make,
        model,
        generation,
      })),
    ),
  );
}

export function getGenerationBySlug(
  makeSlug: string,
  modelSlug: string,
  genSlug: string,
): GenerationEntry | undefined {
  const entry = getModelBySlug(makeSlug, modelSlug);
  if (!entry) return undefined;
  const generation = entry.model.generations?.find((g) => g.slug === genSlug);
  if (!generation) return undefined;
  return { makeSlug, modelSlug, genSlug, make: entry.make, model: entry.model, generation };
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
 * Gangbare fabrieksnorm (ACEA/OEM) per merk. Wordt gebruikt als standaard op de
 * model- en generatiepagina's zodat élke auto-pagina de vereiste norm toont, niet
 * alleen de viscositeit. Een model of generatie mag dit overschrijven via `spec`,
 * en een motoruitvoering heeft altijd zijn eigen `spec`. Dit is een gangbare
 * indicatie — het instructieboekje blijft leidend voor de exacte norm.
 */
export const BRAND_SPEC: Record<string, string> = {
  Volkswagen: "VW 504.00 / 507.00",
  Audi: "VW 504.00 / 507.00",
  Škoda: "VW 504.00 / 507.00",
  SEAT: "VW 504.00 / 507.00",
  Cupra: "VW 504.00 / 507.00",
  "Mercedes-Benz": "MB 229.51 / 229.52",
  Smart: "MB 229.51",
  BMW: "BMW LL-04",
  MINI: "BMW LL-04",
  Toyota: "API SP / ACEA C5",
  Lexus: "API SP / ACEA C5",
  Renault: "RN17 / RN0720",
  Dacia: "RN17 / RN0720",
  Peugeot: "PSA B71 2312",
  Citroën: "PSA B71 2312",
  Opel: "dexos2 / dexosD",
  Chevrolet: "dexos1 Gen2",
  Ford: "Ford WSS-M2C948-B / WSS-M2C913-D",
  Volvo: "ACEA C3 / VCC RBS0-2AE",
  Nissan: "ACEA C4 / Nissan",
  Mazda: "ACEA C5 / API SP",
  Suzuki: "ACEA C2 / C3",
  Honda: "API SP / ACEA C5",
  Mitsubishi: "ACEA C2 / C3",
  Fiat: "9.55535-S1 / S3",
  "Alfa Romeo": "9.55535-S1 / S3",
  Jeep: "MS-6395 / 9.55535",
  Kia: "API SP / ACEA C2/C3",
  Hyundai: "API SP / ACEA C2/C3",
  MG: "ACEA C3 / API SP",
  Subaru: "ACEA C3 / API SP",
  "Land Rover": "ACEA C1 / STJLR",
};

/**
 * De effectieve fabrieksnorm voor een auto-pagina: motoruitvoering > generatie >
 * model > merk-standaard. Geeft `undefined` als er (nog) geen norm bekend is.
 */
export function resolveSpec(
  makeName: string,
  model?: Pick<CarModel, "spec">,
  generation?: Pick<Generation, "spec">,
  engine?: Pick<Engine, "spec">,
): string | undefined {
  return engine?.spec ?? generation?.spec ?? model?.spec ?? BRAND_SPEC[makeName];
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

// ---------------------------------------------------------------------------
// Motoruitvoeringen (engines) — de ultra-specifieke long-tail
// ---------------------------------------------------------------------------

export interface EngineEntry {
  makeSlug: string;
  modelSlug: string;
  engineSlug: string;
  make: CarMake;
  model: CarModel;
  engine: Engine;
}

export function getAllEngineEntries(): EngineEntry[] {
  return CAR_MAKES.flatMap((make) =>
    make.models.flatMap((model) =>
      (model.engines ?? []).map((engine) => ({
        makeSlug: carSlug(make.name),
        modelSlug: carSlug(model.model),
        engineSlug: engine.slug,
        make,
        model,
        engine,
      })),
    ),
  );
}

export function getEngineBySlug(
  makeSlug: string,
  modelSlug: string,
  engineSlug: string,
): EngineEntry | undefined {
  const entry = getModelBySlug(makeSlug, modelSlug);
  if (!entry) return undefined;
  const engine = entry.model.engines?.find((e) => e.slug === engineSlug);
  if (!engine) return undefined;
  return { makeSlug, modelSlug, engineSlug, make: entry.make, model: entry.model, engine };
}

// ---------------------------------------------------------------------------
// Olie-inhoud & verversingskosten (voor "hoeveel liter" / "wat kost" queries)
// ---------------------------------------------------------------------------

/** Geschatte prijs van een oliefilter (advies-indicatie). */
export const FILTER_COST_EUR = 12;
/** Geschat arbeidsloon voor een verversbeurt bij de garage (advies-indicatie). */
export const LABOUR_COST_EUR = 35;

export interface OilChangeCost {
  product?: Product;
  /** olieprijs per liter bij de voordeligste consumentmaat */
  perLiterEur: number;
  /** olie voor de volledige inhoud */
  oilEur: number;
  filterEur: number;
  /** zelf verversen: olie + filter */
  diyEur: number;
  /** bij de garage: olie + filter + arbeid */
  garageEur: number;
  capacityL: number;
}

/**
 * Schat de kosten van een olieverversing voor een gegeven viscositeit en
 * olie-inhoud. Bewust conservatief en uitlegbaar — een indicatie, geen offerte.
 */
/** Redelijke standaard olie-inhoud als er geen exacte waarde bekend is (liters). */
export const DEFAULT_OIL_CAPACITY_L = 4.5;

/**
 * Effectieve olie-inhoud voor een auto-pagina: de exacte waarde als die er is,
 * anders een grove schatting op basis van de brandstof. `estimated` geeft aan of
 * het een schatting is, zodat de pagina de bewoording kan verzachten.
 */
export function resolveOilCapacity(
  explicit: number | undefined,
  fuel?: FuelLabel,
): { liters: number; estimated: boolean } {
  if (explicit != null) return { liters: explicit, estimated: false };
  const liters = fuel === "hybride" ? 4.2 : fuel === "diesel" ? 5.5 : DEFAULT_OIL_CAPACITY_L;
  return { liters, estimated: true };
}

export function estimateOilChangeCost(v: Viscosity, capacityL: number): OilChangeCost {
  const round = (n: number) => Math.round(n * 100) / 100;
  const product = pickProductForViscosity(v);
  const size = product ? defaultSize(product.sizesLiter) : 5;
  const perLiterEur = product ? sizePrice(product, size) / size : 0;
  const oilEur = round(perLiterEur * capacityL);
  const diyEur = round(oilEur + FILTER_COST_EUR);
  const garageEur = round(diyEur + LABOUR_COST_EUR);
  return { product, perLiterEur: round(perLiterEur), oilEur, filterEur: FILTER_COST_EUR, diyEur, garageEur, capacityL };
}

// ---------------------------------------------------------------------------
// RDW-koppeling — match een RDW-merk/model naar de bijbehorende /olie-pagina
// ---------------------------------------------------------------------------

export interface RdwCarMatch {
  makeSlug: string;
  modelSlug: string;
  make: CarMake;
  model: CarModel;
}

/**
 * Best-effort koppeling van een RDW-kentekenuitslag ("VOLKSWAGEN", "GOLF") naar
 * de bijbehorende auto-pagina in onze database. Geeft `null` als er geen
 * betrouwbare match is (dan tonen we simpelweg geen link).
 */
export function findCarPageByRdw(make?: string, model?: string): RdwCarMatch | null {
  if (!make || !model) return null;
  const makeSlug = carSlug(make);
  const foundMake = CAR_MAKES.find((m) => {
    const ms = carSlug(m.name);
    return ms === makeSlug || makeSlug.includes(ms) || ms.includes(makeSlug);
  });
  if (!foundMake) return null;

  const target = carSlug(model);
  let best: CarModel | undefined;
  for (const m of foundMake.models) {
    const ms = carSlug(m.model);
    if (ms.length < 2) continue;
    const hit =
      target === ms ||
      target.startsWith(`${ms}-`) ||
      target.includes(ms) ||
      ms.includes(target);
    if (hit && (!best || carSlug(m.model).length > carSlug(best.model).length)) best = m;
  }
  if (!best) return null;
  return { makeSlug: carSlug(foundMake.name), modelSlug: carSlug(best.model), make: foundMake, model: best };
}
