import type { Product, Viscosity } from "./types";
import { PRODUCTS } from "./products";

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
}

export interface CarModel {
  model: string;
  /** periode van het (nieuwste) model, bijv. "2012–heden" */
  era?: string;
  viscosity: Viscosity;
  fuel: FuelLabel;
  /** optionele generaties met elk een eigen advies + eigen pagina */
  generations?: Generation[];
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
        generations: [
          { slug: "golf-4", name: "Golf 4 (IV)", era: "1997–2003", viscosity: "10W40", fuel: "benzine & diesel" },
          { slug: "golf-5", name: "Golf 5 (V)", era: "2003–2008", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "golf-6", name: "Golf 6 (VI)", era: "2008–2012", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "golf-7", name: "Golf 7 (VII)", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "golf-8", name: "Golf 8 (VIII)", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      {
        model: "Polo",
        era: "2009–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        generations: [
          { slug: "polo-4", name: "Polo 4 (9N)", era: "2001–2009", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "polo-5", name: "Polo 5 (6R/6C)", era: "2009–2017", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "polo-6", name: "Polo 6 (AW)", era: "2017–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "Passat", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Tiguan", era: "2016–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "Touran", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "corsa-c", name: "Corsa C", era: "2000–2006", viscosity: "10W40", fuel: "petrol" },
          { slug: "corsa-d", name: "Corsa D", era: "2006–2014", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "corsa-e", name: "Corsa E", era: "2014–2019", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "corsa-f", name: "Corsa F", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      {
        model: "Astra",
        era: "2015–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        generations: [
          { slug: "astra-g", name: "Astra G", era: "1998–2009", viscosity: "10W40", fuel: "benzine & diesel" },
          { slug: "astra-h", name: "Astra H", era: "2004–2014", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "astra-j", name: "Astra J", era: "2009–2015", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "astra-k", name: "Astra K", era: "2015–2021", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "Insignia", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "fiesta-mk6", name: "Fiesta Mk6", era: "2002–2008", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "fiesta-mk7", name: "Fiesta Mk7", era: "2008–2017", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "fiesta-mk8", name: "Fiesta Mk8", era: "2017–heden", viscosity: "5W30", fuel: "petrol" },
        ],
      },
      {
        model: "Focus",
        era: "2011–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        generations: [
          { slug: "focus-mk2", name: "Focus Mk2", era: "2004–2011", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "focus-mk3", name: "Focus Mk3", era: "2011–2018", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "focus-mk4", name: "Focus Mk4", era: "2018–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "Kuga", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "clio-2", name: "Clio 2", era: "1998–2005", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "clio-3", name: "Clio 3", era: "2005–2014", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "clio-4", name: "Clio 4", era: "2012–2019", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "clio-5", name: "Clio 5", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "208-1", name: "208 I", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "208-2", name: "208 II", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "308", era: "2013–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "corolla-e12", name: "Corolla E12", era: "2001–2007", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "corolla-e15", name: "Corolla E15", era: "2007–2013", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "corolla-e21", name: "Corolla E21", era: "2019–heden", viscosity: "0W20", fuel: "hybride" },
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
        generations: [
          { slug: "a3-8p", name: "A3 8P", era: "2003–2012", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "a3-8v", name: "A3 8V", era: "2012–2020", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "a3-8y", name: "A3 8Y", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      {
        model: "A4",
        era: "2015–heden",
        viscosity: "5W30",
        fuel: "benzine & diesel",
        generations: [
          { slug: "a4-b7", name: "A4 B7", era: "2004–2008", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "a4-b8", name: "A4 B8", era: "2008–2015", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "a4-b9", name: "A4 B9", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "A1", era: "2010–heden", viscosity: "5W30", fuel: "petrol" },
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
        generations: [
          { slug: "3-serie-e46", name: "3-serie E46", era: "1998–2006", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "3-serie-e90", name: "3-serie E90", era: "2005–2013", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "3-serie-f30", name: "3-serie F30", era: "2012–2019", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "3-serie-g20", name: "3-serie G20", era: "2019–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "1-serie", era: "2011–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "5-serie", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "X1", era: "2015–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "X3", era: "2010–heden", viscosity: "5W30", fuel: "benzine & diesel" },
      { model: "M3 / M4", era: "2014–heden", viscosity: "10W60", fuel: "petrol" },
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
        generations: [
          { slug: "c-klasse-w203", name: "C-Klasse W203", era: "2000–2007", viscosity: "5W40", fuel: "benzine & diesel" },
          { slug: "c-klasse-w204", name: "C-Klasse W204", era: "2007–2014", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "c-klasse-w205", name: "C-Klasse W205", era: "2014–2021", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "c-klasse-w206", name: "C-Klasse W206", era: "2021–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "A-Klasse", era: "2012–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
        generations: [
          { slug: "octavia-2", name: "Octavia 2 (1Z)", era: "2004–2013", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "octavia-3", name: "Octavia 3 (5E)", era: "2013–2020", viscosity: "5W30", fuel: "benzine & diesel" },
          { slug: "octavia-4", name: "Octavia 4 (NX)", era: "2020–heden", viscosity: "5W30", fuel: "benzine & diesel" },
        ],
      },
      { model: "Fabia", era: "2014–heden", viscosity: "5W30", fuel: "benzine & diesel" },
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
