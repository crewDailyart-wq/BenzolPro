import type { Product, Viscosity } from "./types";

/**
 * Sample Benzol catalog. Prices are for the first (default) size in `sizesLiter`;
 * other sizes (including bulk drums for garages: 20L / 60L / 208L) are derived
 * with tiered per-litre discounts — see `priceForSize` in lib/format.ts.
 *
 * Eigen productfoto's toevoegen: zet een afbeelding (bijv. .jpg of .png) in
 * de map `public/products/`, en voeg op het product hieronder een regel toe:
 *   image: "/products/<bestandsnaam>.jpg"
 * Zonder dit veld wordt automatisch de gegenereerde flesillustratie getoond.
 * Zie ook README.md → "Eigen productfoto's toevoegen".
 */
export const PRODUCTS: Product[] = [
  {
    id: "p-ultra-0w20",
    slug: "benzol-ultra-0w20",
    name: "Benzol Ultra 0W20",
    viscosity: "0W20",
    category: "fullSynthetic",
    tagline: "hybridReady",
    specs: ["ACEA C5", "API SP", "Honda / Toyota HV"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 16.95,
    compareAtPrice: 19.95,
    rating: 4.9,
    reviews: 214,
    bestFor: ["petrol", "modern", "winter"],
    accent: "#f6d989",
    badge: "new",
    stock: 42,
  },
  {
    id: "p-eco-0w30",
    slug: "benzol-eco-0w30",
    name: "Benzol Eco 0W30",
    viscosity: "0W30",
    category: "fullSynthetic",
    tagline: "maxEfficiency",
    specs: ["ACEA C2", "API SN", "PSA B71 2312"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 17.5,
    rating: 4.8,
    reviews: 168,
    bestFor: ["petrol", "diesel", "modern", "winter"],
    accent: "#e8d9a0",
    stock: 30,
  },
  {
    id: "p-prime-5w30",
    slug: "benzol-prime-5w30",
    name: "Benzol Prime 5W30",
    viscosity: "5W30",
    category: "fullSynthetic",
    tagline: "everydayHero",
    specs: ["ACEA C3", "API SN", "VW 504.00/507.00", "MB 229.51"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 14.95,
    compareAtPrice: 17.95,
    rating: 4.9,
    reviews: 512,
    bestFor: ["petrol", "diesel", "modern"],
    accent: "#e7b53c",
    badge: "bestseller",
    stock: 120,
  },
  {
    id: "p-diesel-5w30",
    slug: "benzol-dpf-5w30",
    name: "Benzol DPF 5W30",
    viscosity: "5W30",
    category: "fullSynthetic",
    tagline: "dpfSafe",
    specs: ["ACEA C3", "API CF", "BMW LL-04", "dexos2"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 15.5,
    rating: 4.8,
    reviews: 289,
    bestFor: ["diesel", "modern"],
    accent: "#5aa9d1",
    badge: "pro",
    stock: 64,
  },
  {
    id: "p-synth-5w40",
    slug: "benzol-synth-5w40",
    name: "Benzol Synth 5W40",
    viscosity: "5W40",
    category: "fullSynthetic",
    tagline: "allRound",
    specs: ["ACEA A3/B4", "API SN/CF", "VW 502.00/505.00", "MB 229.5"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 13.95,
    compareAtPrice: 16.5,
    rating: 4.9,
    reviews: 638,
    bestFor: ["petrol", "diesel", "lpg", "performance"],
    accent: "#e7b53c",
    badge: "bestseller",
    stock: 156,
  },
  {
    id: "p-turbo-5w40",
    slug: "benzol-turbo-5w40",
    name: "Benzol Turbo 5W40",
    viscosity: "5W40",
    category: "fullSynthetic",
    tagline: "turboProtect",
    specs: ["ACEA A3/B4", "API SP", "Porsche A40", "RN0710"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 15.95,
    rating: 4.7,
    reviews: 174,
    bestFor: ["petrol", "performance", "lpg"],
    accent: "#e08a3d",
    stock: 48,
  },
  {
    id: "p-classic-10w40",
    slug: "benzol-classic-10w40",
    name: "Benzol Classic 10W40",
    viscosity: "10W40",
    category: "syntheticBlend",
    tagline: "highMileage",
    specs: ["ACEA A3/B4", "API SL/CF", "MB 229.1"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 9.95,
    compareAtPrice: 12.95,
    rating: 4.7,
    reviews: 421,
    bestFor: ["petrol", "diesel", "highMileage"],
    accent: "#b8873f",
    badge: "sale",
    stock: 200,
  },
  {
    id: "p-guard-10w40",
    slug: "benzol-guard-10w40",
    name: "Benzol Guard 10W40",
    viscosity: "10W40",
    category: "syntheticBlend",
    tagline: "sealCare",
    specs: ["ACEA A3/B3", "API SL", "High-mileage additive"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 10.5,
    rating: 4.6,
    reviews: 133,
    bestFor: ["petrol", "diesel", "highMileage", "lpg"],
    accent: "#a678e0",
    stock: 88,
  },
  {
    id: "p-race-10w60",
    slug: "benzol-race-10w60",
    name: "Benzol Race 10W60",
    viscosity: "10W60",
    category: "racing",
    tagline: "trackReady",
    specs: ["ACEA A3/B4", "API SN", "BMW M-Power", "Ester tech"],
    sizesLiter: [1, 5, 20, 60, 208],
    price: 22.95,
    rating: 5.0,
    reviews: 97,
    bestFor: ["petrol", "performance"],
    accent: "#e0455e",
    badge: "pro",
    stock: 26,
  },
  {
    id: "p-work-15w40",
    slug: "benzol-work-15w40",
    name: "Benzol Work 15W40",
    viscosity: "15W40",
    category: "mineral",
    tagline: "heavyDuty",
    specs: ["ACEA E7", "API CI-4", "MB 228.3"],
    sizesLiter: [5],
    price: 34.95,
    rating: 4.8,
    reviews: 61,
    bestFor: ["diesel", "highMileage"],
    accent: "#8a8f98",
    stock: 34,
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

export const ALL_VISCOSITIES: Viscosity[] = ["0W20", "0W30", "5W30", "5W40", "10W40", "10W60", "15W40"];
