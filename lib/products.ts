import type { Product, Viscosity } from "./types";

/**
 * Sample Benzol catalog.
 *
 * PRIJZEN PER MAAT: elke maat heeft zijn eigen vaste prijs in het `prices`-veld
 * (sleutel = aantal liter), bijv. `prices: { 1: 14.95, 5: 65.78, 20: 239.2, ... }`.
 * Er wordt niets meer automatisch uit de 1L-prijs berekend — je past gewoon per
 * maat het getal aan. Een "was"-prijs (doorgestreept) zet je optioneel per maat
 * in `compareAtPrices` in dezelfde vorm. Het losse `price`/`compareAtPrice`-veld
 * blijft als referentie voor de standaardmaat (en moet gelijk zijn aan de
 * eerste maat in `prices`).
 *
 * Eigen productfoto's toevoegen: elk product hieronder heeft al een `images`-
 * veld met 3 bestandsnamen (voorkant / achterkant / zijkant) die verwijzen
 * naar `/products/<slug>.jpg`, `/products/<slug>-achterkant.jpg` en
 * `/products/<slug>-zijkant.jpg`. Zet simpelweg foto's met exact die
 * bestandsnamen in `public/products/` — geen code aanpassen nodig. Zodra 2
 * of meer van de 3 foto's van een product écht bestaan, verschijnt op de
 * productpagina automatisch een galerij met grote pijlknoppen en
 * miniaturen om te wisselen. Ontbrekende foto's worden gewoon overgeslagen
 * (en als er geen enkele overblijft, valt de site terug op de gegenereerde
 * flesillustratie — nooit een kapot plaatje).
 *
 * Het volledige overzicht van alle bestandsnamen per product staat in
 * `public/products/LEES-MIJ.txt` en in README.md → "Eigen productfoto's
 * toevoegen". Wil je meer of andere hoeken? Voeg gewoon extra regels toe
 * aan de array van dat product.
 */
export const PRODUCTS: Product[] = [
  {
    id: "p-ultra-0w20",
    slug: "benzol-ultra-0w20",
    name: "Benzol Modern Drive 0W20",
    viscosity: "0W20",
    category: "fullSynthetic",
    tagline: "hybridReady",
    specs: ["API SP", "ACEA C5", "Low-SAPS"],
    sizesLiter: [1, 5, 20, 60, 200],
    price: 16.95,
    compareAtPrice: 19.95,
    prices: { 1: 9.99, 5: 24.99, 20: 79.99, 60: 199.99, 200: 699.99 },
    compareAtPrices: { 1: 15.00, 5: 34.99, 20: 99.99, 60: 250.00, 208: 800 },
    rating: 4.9,
    reviews: 1,
    bestFor: ["petrol", "modern", "winter"],
    accent: "#f6d989",
    badge: "new",
    stock: 42,
    images: [
      "/products/benzol-0w20.jpg",
      "/products/benzol-ultra-0w20-achterkant.jpg",
      "/products/benzol-ultra-0w20-zijkant.jpg",
    ],
  },
  {
    id: "p-eco-0w30",
    slug: "benzol-eco-0w30",
    name: "Benzol Modern Drive 0W30",
    viscosity: "0W30",
    category: "fullSynthetic",
    tagline: "maxEfficiency",
    specs: ["API SP", "ACEA C2"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 17.5,
    prices: { 1: 17.5, 5: 77, 20: 280, 60: 756, 208: 2256.8 },
    rating: 4.8,
    reviews: 168,
    bestFor: ["petrol", "diesel", "modern", "winter"],
    accent: "#e8d9a0",
    stock: 30,
    images: [
      "/products/benzol-eco-0w30.jpg",
      "/products/benzol-eco-0w30-achterkant.jpg",
      "/products/benzol-eco-0w30-zijkant.jpg",
    ],
  },
  {
    id: "p-prime-5w30",
    slug: "benzol-prime-5w30",
    name: "Benzol Modern Drive 5W30",
    viscosity: "5W30",
    category: "fullSynthetic",
    tagline: "everydayHero",
    specs: ["API SN/CF", "ACEA A3/B4", "MB 229.5", "VW 502.00/505.00", "BMW LL-01", "RN 0700/0710"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 14.95,
    compareAtPrice: 17.95,
    prices: { 1: 9.99, 5: 24.99, 20: 79.99, 60: 199.99, 200: 699.99 },
    compareAtPrices: { 1: 17.95, 5: 78.98, 20: 287.2, 60: 775.44, 208: 2314.83 },
    rating: 4.9,
    reviews: 512,
    bestFor: ["petrol", "diesel", "modern"],
    accent: "#e7b53c",
    badge: "bestseller",
    stock: 120,
    fitsNote: "Geschikt voor ruim 50% van de Nederlandse auto's",
    images: [
      "/products/benzol-prime-5w30.jpg",
      "/products/benzol-prime-5w30-achterkant.jpg",
      "/products/benzol-prime-5w30-zijkant.jpg",
    ],
  },
  {
    id: "p-diesel-5w30",
    slug: "benzol-dpf-5w30",
    name: "Benzol Modern Drive 5W30 GF-7A",
    viscosity: "5W30",
    category: "fullSynthetic",
    tagline: "dpfSafe",
    specs: ["API SQ", "ILSAC GF-7A"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 15.5,
    prices: { 1: 15.5, 5: 68.2, 20: 248, 60: 669.6, 208: 1998.88 },
    rating: 4.8,
    reviews: 289,
    bestFor: ["diesel", "modern"],
    accent: "#5aa9d1",
    badge: "pro",
    stock: 64,
    images: [
      "/products/benzol-dpf-5w30.jpg",
      "/products/benzol-dpf-5w30-achterkant.jpg",
      "/products/benzol-dpf-5w30-zijkant.jpg",
    ],
  },
  {
    id: "p-synth-5w40",
    slug: "benzol-synth-5w40",
    name: "Benzol Modern Drive 5W40",
    viscosity: "5W40",
    category: "fullSynthetic",
    tagline: "allRound",
    specs: ["API SP", "ACEA A3/B4"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 13.95,
    compareAtPrice: 16.5,
    prices: { 1: 13.95, 5: 61.38, 20: 223.2, 60: 602.64, 208: 1798.99 },
    compareAtPrices: { 1: 16.5, 5: 72.6, 20: 264, 60: 712.8, 208: 2127.84 },
    rating: 4.9,
    reviews: 638,
    bestFor: ["petrol", "diesel", "lpg", "performance"],
    accent: "#e7b53c",
    badge: "bestseller",
    stock: 156,
    images: [
      "/products/benzol-synth-5w40.jpg",
      "/products/benzol-synth-5w40-achterkant.jpg",
      "/products/benzol-synth-5w40-zijkant.jpg",
    ],
  },
  {
    id: "p-turbo-5w40",
    slug: "benzol-turbo-5w40",
    name: "Benzol Modern Drive 5W40 Sport",
    viscosity: "5W40",
    category: "fullSynthetic",
    tagline: "turboProtect",
    specs: ["API SP", "ACEA A3/B4"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 15.95,
    prices: { 1: 15.95, 5: 70.18, 20: 255.2, 60: 689.04, 208: 2056.91 },
    rating: 4.7,
    reviews: 174,
    bestFor: ["petrol", "performance", "lpg"],
    accent: "#e08a3d",
    stock: 48,
    images: [
      "/products/benzol-turbo-5w40.jpg",
      "/products/benzol-turbo-5w40-achterkant.jpg",
      "/products/benzol-turbo-5w40-zijkant.jpg",
    ],
  },
  {
    id: "p-classic-10w40",
    slug: "benzol-classic-10w40",
    name: "Benzol Efficient Drive 10W40",
    viscosity: "10W40",
    category: "syntheticBlend",
    tagline: "highMileage",
    specs: ["API SL/CF", "ACEA A3/B4"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 9.95,
    compareAtPrice: 12.95,
    prices: { 1: 9.95, 5: 43.78, 20: 159.2, 60: 429.84, 208: 1283.15 },
    compareAtPrices: { 1: 12.95, 5: 56.98, 20: 207.2, 60: 559.44, 208: 1670.03 },
    rating: 4.7,
    reviews: 421,
    bestFor: ["petrol", "diesel", "highMileage"],
    accent: "#b8873f",
    badge: "sale",
    stock: 200,
    images: [
      "/products/benzol-classic-10w40.jpg",
      "/products/benzol-classic-10w40-achterkant.jpg",
      "/products/benzol-classic-10w40-zijkant.jpg",
    ],
  },
  {
    id: "p-guard-10w40",
    slug: "benzol-guard-10w40",
    name: "Benzol Efficient Drive 10W40 Plus",
    viscosity: "10W40",
    category: "syntheticBlend",
    tagline: "sealCare",
    specs: ["API SL/CF", "ACEA A3/B4"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 10.5,
    prices: { 1: 10.5, 5: 46.2, 20: 168, 60: 453.6, 208: 1354.08 },
    rating: 4.6,
    reviews: 133,
    bestFor: ["petrol", "diesel", "highMileage", "lpg"],
    accent: "#a678e0",
    stock: 88,
    images: [
      "/products/benzol-guard-10w40.jpg",
      "/products/benzol-guard-10w40-achterkant.jpg",
      "/products/benzol-guard-10w40-zijkant.jpg",
    ],
  },
  {
    id: "p-race-10w60",
    slug: "benzol-race-10w60",
    name: "Benzol Modern Drive 10W60",
    viscosity: "10W60",
    category: "racing",
    tagline: "trackReady",
    specs: ["API SN/CF", "ACEA A3/B4"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 22.95,
    prices: { 1: 22.95, 5: 100.98, 20: 367.2, 60: 991.44, 208: 2959.63 },
    rating: 5.0,
    reviews: 97,
    bestFor: ["petrol", "performance"],
    accent: "#e0455e",
    badge: "pro",
    stock: 26,
    images: [
      "/products/benzol-race-10w60.jpg",
      "/products/benzol-race-10w60-achterkant.jpg",
      "/products/benzol-race-10w60-zijkant.jpg",
    ],
  },
  {
    id: "p-work-15w40",
    slug: "benzol-work-15w40",
    name: "Benzol SHPD Fleet Turbo 15W40",
    viscosity: "15W40",
    category: "mineral",
    tagline: "heavyDuty",
    specs: ["API CK-4/SN", "ACEA E9/E11"],
    sizesLiter: [5],
    price: 34.95,
    prices: { 5: 34.95, 20: 111.84, 60: 301.97, 208: 901.43 },
    rating: 4.8,
    reviews: 61,
    bestFor: ["diesel", "highMileage"],
    accent: "#8a8f98",
    stock: 34,
    images: [
      "/products/benzol-work-15w40.jpg",
      "/products/benzol-work-15w40-achterkant.jpg",
      "/products/benzol-work-15w40-zijkant.jpg",
    ],
  },
];

// Work oil is already primarily sold in bulk — extend it with drum sizes too.
const work = PRODUCTS.find((p) => p.id === "p-work-15w40");
if (work) work.sizesLiter = [5, 20, 60, 208];

/** Product taglines (short marketing lines). Kept here so they can be localized later. */
export const TAGLINES: Record<string, Record<string, string>> = {
  hybridReady: { nl: "Voor moderne hybrides", en: "For modern hybrids", pl: "Do nowoczesnych hybryd", ar: "للسيارات الهجينة الحديثة", tr: "Modern hibritler için" },
  maxEfficiency: { nl: "Maximale brandstofbesparing", en: "Maximum fuel efficiency", pl: "Maksymalna oszczędność paliwa", ar: "أقصى توفير للوقود", tr: "Maksimum yakıt verimliliği" },
  everydayHero: { nl: "De alleskunner voor elke dag", en: "The everyday all-rounder", pl: "Codzienny wszechstronny wybór", ar: "الخيار اليومي متعدد الاستخدامات", tr: "Her güne uygun çok yönlü" },
  dpfSafe: { nl: "Beschermt je roetfilter", en: "Protects your DPF", pl: "Chroni filtr DPF", ar: "يحمي فلتر DPF", tr: "DPF'nizi korur" },
  allRound: { nl: "Sterke bescherming, altijd", en: "Strong protection, always", pl: "Zawsze mocna ochrona", ar: "حماية قوية دائمًا", tr: "Her zaman güçlü koruma" },
  turboProtect: { nl: "Gemaakt voor turbomotoren", en: "Made for turbo engines", pl: "Stworzony do silników turbo", ar: "مصمم لمحركات التيربو", tr: "Turbo motorlar için" },
  highMileage: { nl: "Voor hoge kilometerstanden", en: "For high mileage", pl: "Do wysokich przebiegów", ar: "للمسافات العالية", tr: "Yüksek kilometreler için" },
  sealCare: { nl: "Verzorgt oudere afdichtingen", en: "Cares for older seals", pl: "Dba o starsze uszczelnienia", ar: "يعتني بموانع التسرب القديمة", tr: "Eski contaları korur" },
  trackReady: { nl: "Klaar voor het circuit", en: "Ready for the track", pl: "Gotowy na tor", ar: "جاهز للحلبة", tr: "Piste hazır" },
  heavyDuty: { nl: "Voor zwaar werk", en: "For heavy-duty work", pl: "Do ciężkiej pracy", ar: "للأعمال الشاقة", tr: "Ağır işler için" },
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByViscosity(v: Viscosity): Product[] {
  return PRODUCTS.filter((p) => p.viscosity === v);
}

export interface BrandRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

/**
 * Merk-brede beoordeling, afgeleid uit alle productratings (het aantal reviews
 * per product weegt mee). Voedt de `AggregateRating` in de Organization-
 * structured-data zodat er sterren in de zoekresultaten kunnen verschijnen.
 */
export function getBrandAggregateRating(): BrandRating {
  const reviewCount = PRODUCTS.reduce((s, p) => s + p.reviews, 0);
  const weighted = PRODUCTS.reduce((s, p) => s + p.rating * p.reviews, 0);
  const ratingValue = reviewCount > 0 ? Math.round((weighted / reviewCount) * 10) / 10 : 0;
  return { ratingValue, reviewCount, bestRating: 5, worstRating: 1 };
}

export const ALL_VISCOSITIES: Viscosity[] = ["0W20", "0W30", "5W30", "5W40", "10W40", "10W60", "15W40"];
