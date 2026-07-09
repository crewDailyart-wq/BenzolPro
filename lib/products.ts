import type { Product, Viscosity } from "./types";

/**
 * Benzol catalog — echte producten op basis van de officiële datasheets.
 *
 * PRIJZEN PER MAAT: elke maat heeft zijn eigen vaste prijs in het `prices`-veld
 * (sleutel = aantal liter), bijv. `prices: { 5: 24.99, 20: 89.99, ... }`. Er
 * wordt niets meer automatisch uit een basisprijs berekend — je past gewoon per
 * maat het getal aan. Een "was"-prijs (doorgestreept, voor de zomerkorting) zet
 * je per maat in `compareAtPrices` in dezelfde vorm. Het losse `price`/
 * `compareAtPrice`-veld blijft als referentie voor de standaardmaat (en is
 * gelijk aan de eerste maat in `prices`).
 *
 * De motoroliën worden verkocht in 5 / 20 / 60 / 208 L (geen losse 1 L-flessen
 * meer). De onderhoudsproducten (kind: "care") hebben hun eigen kleine maten in
 * liter — 0,3 = 300 ml, 0,4 = 400 ml, 0,5 = halve liter — die in de winkel
 * automatisch als "300 ml" enz. getoond worden (zie `formatBottleSize` in
 * lib/format.ts).
 *
 * Eigen productfoto's toevoegen: elk product heeft een `images`-veld met de
 * bestandsnamen (voorkant / achterkant / zijkant) die verwijzen naar
 * `/products/<slug>.jpg` enz. Zet foto's met exact die namen in
 * `public/products/` — geen code aanpassen nodig. Zie `public/products/LEES-MIJ.txt`.
 */
export const PRODUCTS: Product[] = [
  {
    id: "p-ultra-0w20",
    slug: "benzol-ultra-0w20",
    name: "Benzol Modern Drive 0W20",
    description:
      "BENZOL® Modern Drive 0W20 is een volsynthetische, op PAO (polyalfaolefine) gebaseerde motorolie van de nieuwste generatie. De extra dunne, brandstofbesparende formule (ACEA C5) verlaagt de weerstand en het CO₂-verbruik, beschermt vanaf de koude start met een sterke oliefilm en houdt de motor uitzonderlijk schoon. Ideaal voor moderne benzine- en hybridemotoren die een lichte 0W20 voorschrijven. Altijd gratis verzending, voor 22:00 besteld is morgen in huis.",
    viscosity: "0W20",
    category: "fullSynthetic",
    tagline: "hybridReady",
    specs: ["API SN/CF", "ACEA C5", "ILSAC GF-5", "BMW LL-14FE+", "Jaguar Land Rover STJLR.03.5004", "Low-SAPS"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L3.0" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8495 kg/L" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "8,50 cSt" },
      { label: "Viscositeit @ 40 °C", method: "ASTM D-445", value: "45,95 cSt" },
      { label: "Viscositeitsindex", method: "ASTM D-2270", value: "165" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "224 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−45 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
      { label: "TBN", method: "ASTM D-2896", value: "7,8 mg KOH/g" },
      { label: "CCS @ −35 °C", method: "ASTM D-5293", value: "5600 mPa·s" },
      { label: "Sulfaatas", method: "ASTM D-874", value: "0,78 massa%" },
      { label: "Zwavel", method: "ASTM D-4294", value: "0,28 massa%" },
      { label: "Fosfor (P)", method: "ASTM D-5185", value: "0,08 massa%" },
      { label: "HTHS @ 150 °C", method: "ASTM D-5481", value: "2,7 mPa·s" },
    ],
    sizesLiter: [5, 20, 60, 208],
    price: 29.99,
    compareAtPrice: 37.99,
    prices: { 5: 29.99, 20: 107.99, 60: 294.99, 208: 934.99 },
    compareAtPrices: { 5: 37.99, 20: 134.99, 60: 368.99, 208: 1168.99 },
    rating: 4.9,
    reviews: 46,
    bestFor: ["petrol", "modern", "winter"],
    accent: "#f6d989",
    badge: "new",
    stock: 42,
    images: [
      "/products/benzol-ultra-0w20.jpg",
      "/products/benzol-ultra-0w20-achterkant.jpg",
      "/products/benzol-ultra-0w20-zijkant.jpg",
      "/products/benzol-ultra-0w20-etiket.jpg",
      "/products/benzol-ultra-0w20-dop.jpg",
      "/products/benzol-ultra-0w20-detail.jpg",
      "/products/benzol-ultra-0w20-sfeer.jpg",
    ],
  },
  {
    id: "p-eco-0w30",
    slug: "benzol-eco-0w30",
    name: "Benzol Modern Drive 0W30",
    description:
      "BENZOL® Modern Drive 0W30 is een volsynthetische topkwaliteit motorolie (ACEA C2/C3) voor moderne benzine- en dieselmotoren. De lichte, zuinige formule smeert razendsnel bij een koude start, ruimt aanwezig slib op en beschermt dankzij het lage as-, zwavel- en fosforgehalte je roetfilter (DPF) en katalysator. Draagt echte goedkeuringen van o.a. VW 504.00/507.00, Mercedes-Benz 229.51/229.52, BMW LL-04 en Porsche C30. Altijd gratis verzending, morgen in huis.",
    viscosity: "0W30",
    category: "fullSynthetic",
    tagline: "maxEfficiency",
    specs: ["API SN/CF", "ACEA C2/C3", "VW 504.00/507.00", "MB 229.31", "MB 229.51/229.52", "BMW LL-04", "Porsche C30", "RN 0700/0710", "Chrysler MS-11106", "Fiat 9.55535-DS1/GS1", "Ford WSS-M2C90-A", "PSA B71 2390/2312"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L3.0" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8420 kg/L" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "11,35 cSt" },
      { label: "Viscositeit @ 40 °C", method: "ASTM D-445", value: "64,55 cSt" },
      { label: "Viscositeitsindex", method: "ASTM D-2270", value: "172" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "220 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−42 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
      { label: "TBN", method: "ASTM D-2896", value: "7,2 mg KOH/g" },
      { label: "CCS @ −35 °C", method: "ASTM D-5293", value: "5750 mPa·s" },
      { label: "Sulfaatas", method: "ASTM D-874", value: "0,80 massa%" },
      { label: "Zwavel", method: "ASTM D-4294", value: "0,25 massa%" },
      { label: "Fosfor (P)", method: "ASTM D-5185", value: "0,085 massa%" },
    ],
    sizesLiter: [5, 20, 60, 208],
    price: 29.99,
    compareAtPrice: 37.99,
    prices: { 5: 29.99, 20: 107.99, 60: 294.99, 208: 934.99 },
    compareAtPrices: { 5: 37.99, 20: 134.99, 60: 368.99, 208: 1168.99 },
    rating: 4.8,
    reviews: 168,
    bestFor: ["petrol", "diesel", "modern", "winter"],
    accent: "#e8d9a0",
    stock: 30,
    images: [
      "/products/benzol-eco-0w30.jpg",
      "/products/benzol-eco-0w30-achterkant.jpg",
      "/products/benzol-eco-0w30-zijkant.jpg",
      "/products/benzol-eco-0w30-etiket.jpg",
      "/products/benzol-eco-0w30-dop.jpg",
      "/products/benzol-eco-0w30-detail.jpg",
      "/products/benzol-eco-0w30-sfeer.jpg",
    ],
  },
  {
    id: "p-prime-5w30",
    slug: "benzol-prime-5w30",
    name: "Benzol Modern Drive 5W30",
    description:
      "Onze bestseller: BENZOL® Modern Drive 5W30 is een volsynthetische topkwaliteit motorolie, speciaal ontwikkeld om te voldoen aan de nieuwste eisen van moderne motoren. Geschikt voor stad, snelweg én extreme omstandigheden in alle seizoenen — voor benzine- en dieselmotoren, met of zonder turbo en directe inspuiting. Dankzij een laag as-, zwavel- en fosforgehalte beschermt hij het roetfilter (DPF) en de katalysator. Draagt echte goedkeuringen van o.a. VW 504.00/507.00, Mercedes-Benz 229.51/229.52, BMW LL-04, GM Dexos 2 en Porsche C30. Altijd gratis verzending, morgen in huis.",
    viscosity: "5W30",
    category: "fullSynthetic",
    tagline: "everydayHero",
    specs: ["API SN/CF", "ACEA C2/C3", "MB 229.51/229.52", "VW 504.00/507.00", "BMW LL-04", "GM dexos2", "Porsche C30", "RN 0700/0710", "Fiat 9.55535-S3", "Ford WSS-M2C917-A", "PSA B71 2290/2297"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L3.0" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8520 kg/L" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "11,25 cSt" },
      { label: "Viscositeit @ 40 °C", method: "ASTM D-445", value: "64,45 cSt" },
      { label: "Viscositeitsindex", method: "ASTM D-2270", value: "170" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "222 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−36 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
      { label: "TBN", method: "ASTM D-2896", value: "6,7 mg KOH/g" },
      { label: "CCS @ −30 °C", method: "ASTM D-5293", value: "6000 mPa·s" },
      { label: "Sulfaatas", method: "ASTM D-874", value: "0,79 massa%" },
      { label: "Zwavel", method: "ASTM D-4294", value: "0,25 massa%" },
      { label: "Fosfor (P)", method: "ASTM D-5185", value: "0,080 massa%" },
      { label: "HTHS @ 150 °C", method: "ASTM D-5481", value: "3,68 mPa·s" },
    ],
    sizesLiter: [5, 20, 60, 208],
    price: 24.99,
    compareAtPrice: 31.99,
    prices: { 5: 24.99, 20: 89.99, 60: 244.99, 208: 779.99 },
    compareAtPrices: { 5: 31.99, 20: 112.99, 60: 306.99, 208: 974.99 },
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
      "/products/benzol-prime-5w30-etiket.jpg",
      "/products/benzol-prime-5w30-dop.jpg",
      "/products/benzol-prime-5w30-detail.jpg",
      "/products/benzol-prime-5w30-sfeer.jpg",
    ],
  },
  {
    id: "p-synth-5w40",
    slug: "benzol-synth-5w40",
    name: "Benzol Modern Drive 5W40",
    description:
      "BENZOL® Modern Drive 5W40 is een volsynthetische motorolie (ACEA C2/C3) voor personenauto's en lichte bedrijfswagens. Geschikt voor benzine- en dieselmotoren met of zonder turbo en directe inspuiting, ook onder zwaardere belasting en hogere temperaturen. Het lage as-, zwavel- en fosforgehalte beschermt roetfilter (DPF) en katalysator. Draagt echte goedkeuringen van o.a. VW 502.00/505.00, Mercedes-Benz 229.51, BMW LL-04, GM Dexos 2 en Porsche A40. Altijd gratis verzending, morgen in huis.",
    viscosity: "5W40",
    category: "fullSynthetic",
    tagline: "allRound",
    specs: ["API SN/CF", "ACEA C2/C3", "MB 229.31/229.51/226.5", "VW 502.00/505.00", "BMW LL-04", "GM dexos2", "Porsche A40", "RN 0700/0710", "Fiat 9.55535-S2", "Ford WSS-M2C917-A"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L3.0" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8525 kg/L" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "14,35 cSt" },
      { label: "Viscositeit @ 40 °C", method: "ASTM D-445", value: "86,3 cSt" },
      { label: "Viscositeitsindex", method: "ASTM D-2270", value: "173" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "232 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−36 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
      { label: "TBN", method: "ASTM D-2896", value: "6,7 mg KOH/g" },
      { label: "CCS @ −30 °C", method: "ASTM D-5293", value: "6200 mPa·s" },
      { label: "Sulfaatas", method: "ASTM D-874", value: "0,76 massa%" },
      { label: "Zwavel", method: "ASTM D-4294", value: "0,25 massa%" },
      { label: "Fosfor (P)", method: "ASTM D-5185", value: "0,080 massa%" },
      { label: "HTHS @ 150 °C", method: "ASTM D-5481", value: "3,60 mPa·s" },
    ],
    sizesLiter: [5, 20, 60, 208],
    price: 24.99,
    compareAtPrice: 31.99,
    prices: { 5: 24.99, 20: 89.99, 60: 244.99, 208: 779.99 },
    compareAtPrices: { 5: 31.99, 20: 112.99, 60: 306.99, 208: 974.99 },
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
      "/products/benzol-synth-5w40-etiket.jpg",
      "/products/benzol-synth-5w40-dop.jpg",
      "/products/benzol-synth-5w40-detail.jpg",
      "/products/benzol-synth-5w40-sfeer.jpg",
    ],
  },
  {
    id: "p-classic-10w40",
    slug: "benzol-classic-10w40",
    name: "Benzol Efficient Drive 10W40",
    description:
      "BENZOL® Efficient Drive 10W40 is een deels synthetische (semi-synthetische) motorolie (ACEA A3/B4) voor personenauto's, lichte bedrijfswagens en viertakt-motorfietsen. Een betrouwbare alleskunner met uitstekende slijtagebescherming en goede eigenschappen bij lage temperatuur — ook onder zware en wisselende omstandigheden. Solide bescherming tegen een scherpe prijs. Altijd gratis verzending, morgen in huis.",
    viscosity: "10W40",
    category: "syntheticBlend",
    tagline: "highMileage",
    specs: ["API SL/CF", "ACEA A3/B4", "JASO MA2", "MB 228.1/229.1", "VW 501.00/505.00", "Fiat 9.55535-D2/G2", "RN 0700/0710", "PSA B71 2294"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L2.5" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8725 kg/L" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "14,60 cSt" },
      { label: "Viscositeit @ 40 °C", method: "ASTM D-445", value: "110,6 cSt" },
      { label: "Viscositeitsindex", method: "ASTM D-2270", value: "136" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "236 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−33 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
      { label: "TBN", method: "ASTM D-2896", value: "10,1 mg KOH/g" },
      { label: "CCS @ −25 °C", method: "ASTM D-5293", value: "6600 mPa·s" },
    ],
    sizesLiter: [5, 20, 60, 208],
    price: 23.99,
    compareAtPrice: 29.99,
    prices: { 5: 23.99, 20: 85.99, 60: 234.99, 208: 747.99 },
    compareAtPrices: { 5: 29.99, 20: 107.99, 60: 293.99, 208: 934.99 },
    rating: 4.7,
    reviews: 421,
    bestFor: ["petrol", "diesel", "highMileage", "lpg"],
    accent: "#b8873f",
    badge: "sale",
    stock: 200,
    images: [
      "/products/benzol-classic-10w40.jpg",
      "/products/benzol-classic-10w40-achterkant.jpg",
      "/products/benzol-classic-10w40-zijkant.jpg",
      "/products/benzol-classic-10w40-etiket.jpg",
      "/products/benzol-classic-10w40-dop.jpg",
      "/products/benzol-classic-10w40-detail.jpg",
      "/products/benzol-classic-10w40-sfeer.jpg",
    ],
  },
  {
    id: "p-injector-cleaner",
    slug: "benzol-injector-cleaner",
    name: "Benzol Fuel Injector Cleaner",
    kind: "care",
    productType: "Brandstofsysteemreiniger",
    description:
      "BENZOL® Fuel Injector Cleaner reinigt en onderhoudt de injectoren van benzine- én dieselmotoren. De krachtige detergent-additief lost vervuiling op die de verstuivers verstopt, houdt het inlaatsysteem schoon en voorkomt nieuwe afzettingen. Één tank-oplossing: vermindert rook en uitstoot, stabiliseert het brandstofverbruik en verbetert de aanpak, rijeigenschappen en motorgeluid. Geschikt voor alle diesel- en benzinebrandstoffen, inclusief ultralaagzwavelige diesel en biodieselmengsels. Doseren: 1 fles (300 ml) op maximaal een volle tank. Altijd gratis verzending, morgen in huis.",
    tagline: "injectorClean",
    specs: ["Benzine & diesel", "Reinigt injectoren", "Verlaagt uitstoot", "Biodiesel-geschikt", "300 ml"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Helder & helder" },
      { label: "Kleur", method: "ASTM D-1500", value: "L 0.5" },
      { label: "Dichtheid @ 15 °C", method: "ASTM D-1298", value: "0,8235 kg/L" },
      { label: "Vlampunt (COC)", method: "ASTM D-92", value: "75 °C" },
      { label: "Stolpunt", method: "ASTM D-97", value: "−18 °C" },
      { label: "Schuim I/II/III", method: "ASTM D-892", value: "0/0/0" },
    ],
    sizesLiter: [0.3],
    price: 9.99,
    compareAtPrice: 12.99,
    prices: { 0.3: 9.99 },
    compareAtPrices: { 0.3: 12.99 },
    rating: 4.8,
    reviews: 63,
    bestFor: ["petrol", "diesel"],
    accent: "#5aa9d1",
    badge: "sale",
    stock: 180,
    images: [
      "/products/benzol-injector-cleaner.jpg",
      "/products/benzol-injector-cleaner-achterkant.jpg",
      "/products/benzol-injector-cleaner-zijkant.jpg",
      "/products/benzol-injector-cleaner-etiket.jpg",
      "/products/benzol-injector-cleaner-dop.jpg",
      "/products/benzol-injector-cleaner-detail.jpg",
      "/products/benzol-injector-cleaner-sfeer.jpg",
    ],
  },
  {
    id: "p-brake-dot4",
    slug: "benzol-remvloeistof-dot4",
    name: "Benzol Brake Fluid DOT-4",
    kind: "care",
    productType: "Remvloeistof",
    description:
      "BENZOL® Brake Fluid DOT-4 is een hoogwaardige hydraulische remvloeistof voor rem- en koppelingssystemen van auto's, motoren en lichte bedrijfswagens. De unieke Low Moisture Activity (LMA)-formule biedt maximale bescherming van het natte kookpunt tegen damplock en remuitval, en zorgt voor superieure vloeibaarheid bij lage temperaturen voor een optimale remrespons. Geschikt voor volledige vervanging én bijvullen waar de fabrikant DOT-4 voorschrijft; mengbaar met conventionele remvloeistof. Altijd gratis verzending, morgen in huis.",
    tagline: "brakeSafe",
    specs: ["DOT-4", "SAE J1703 / J1704", "FMVSS 116 DOT 3 & 4 (Grade B)", "ISO 4925 Class 3/4", "LMA-formule"],
    techSpecs: [
      { label: "Uiterlijk", method: "Visueel", value: "Transparant" },
      { label: "Kookpunt droog (ERBP)", method: "FMVSS 116", value: "265 °C" },
      { label: "Kookpunt nat (WERBP)", method: "FMVSS 116", value: "165 °C" },
      { label: "Viscositeit @ 100 °C", method: "ASTM D-445", value: "2,10 cSt" },
      { label: "Viscositeit @ −40 °C", method: "ASTM D-445", value: "850 cSt" },
      { label: "pH", method: "FMVSS 116", value: "8,0" },
      { label: "Soortelijke massa @ 60 °F", method: "ASTM D-1298", value: "1,060" },
      { label: "Vlampunt", method: "ASTM D-92", value: "125 °C" },
    ],
    sizesLiter: [0.5, 1],
    price: 9.99,
    compareAtPrice: 12.99,
    prices: { 0.5: 9.99, 1: 14.99 },
    compareAtPrices: { 0.5: 12.99, 1: 18.99 },
    rating: 4.8,
    reviews: 54,
    bestFor: ["petrol", "diesel"],
    accent: "#d1a15a",
    stock: 140,
    images: [
      "/products/benzol-remvloeistof-dot4.jpg",
      "/products/benzol-remvloeistof-dot4-achterkant.jpg",
      "/products/benzol-remvloeistof-dot4-zijkant.jpg",
      "/products/benzol-remvloeistof-dot4-etiket.jpg",
      "/products/benzol-remvloeistof-dot4-dop.jpg",
      "/products/benzol-remvloeistof-dot4-detail.jpg",
      "/products/benzol-remvloeistof-dot4-sfeer.jpg",
    ],
  },
  {
    id: "p-antirust-spray",
    slug: "benzol-anti-roest-spray",
    name: "Benzol Anti-Rust Lubricant Spray",
    kind: "care",
    productType: "Multispray & kruipolie",
    description:
      "BENZOL® Anti-Rust Lubricant Spray is een veelzijdige multispray die roest omzet in een beschermende laag, metaal smeert en vocht verdrijft. Ideaal voor bouten, scharnieren, gereedschap, kettingen en elektrische contacten — in de auto, thuis, industrieel en maritiem. Voorkomt roest en corrosie, maakt vastgeroeste onderdelen weer los, bereikt moeilijk bereikbare plekken, stopt piepen en verwijdert teer en vet, met een schone, niet-plakkende afwerking. Handige aerosol voor brede, gelijkmatige dekking. Altijd gratis verzending, morgen in huis.",
    tagline: "rustProtect",
    specs: ["Anti-roest", "Smeert & beschermt", "Verdrijft vocht", "Kruipolie", "400 ml spuitbus"],
    sizesLiter: [0.4],
    price: 9.99,
    compareAtPrice: 12.99,
    prices: { 0.4: 9.99 },
    compareAtPrices: { 0.4: 12.99 },
    rating: 4.7,
    reviews: 38,
    bestFor: ["universeel"],
    accent: "#8a8f98",
    badge: "sale",
    stock: 160,
    images: [
      "/products/benzol-anti-roest-spray.jpg",
      "/products/benzol-anti-roest-spray-achterkant.jpg",
      "/products/benzol-anti-roest-spray-zijkant.jpg",
      "/products/benzol-anti-roest-spray-etiket.jpg",
      "/products/benzol-anti-roest-spray-dop.jpg",
      "/products/benzol-anti-roest-spray-detail.jpg",
      "/products/benzol-anti-roest-spray-sfeer.jpg",
    ],
  },
];

/** Product taglines (short marketing lines). Kept here so they can be localized later. */
export const TAGLINES: Record<string, Record<string, string>> = {
  hybridReady: { nl: "Voor moderne hybrides", en: "For modern hybrids", pl: "Do nowoczesnych hybryd", ar: "للسيارات الهجينة الحديثة", tr: "Modern hibritler için" },
  maxEfficiency: { nl: "Maximale brandstofbesparing", en: "Maximum fuel efficiency", pl: "Maksymalna oszczędność paliwa", ar: "أقصى توفير للوقود", tr: "Maksimum yakıt verimliliği" },
  everydayHero: { nl: "De alleskunner voor elke dag", en: "The everyday all-rounder", pl: "Codzienny wszechstronny wybór", ar: "الخيار اليومي متعدد الاستخدامات", tr: "Her güne uygun çok yönlü" },
  allRound: { nl: "Sterke bescherming, altijd", en: "Strong protection, always", pl: "Zawsze mocna ochrona", ar: "حماية قوية دائمًا", tr: "Her zaman güçlü koruma" },
  highMileage: { nl: "Voor hoge kilometerstanden", en: "For high mileage", pl: "Do wysokich przebiegów", ar: "للمسافات العالية", tr: "Yüksek kilometreler için" },
  injectorClean: { nl: "Schone injectoren, soepele motor", en: "Clean injectors, smooth engine", pl: "Czyste wtryskiwacze", ar: "حاقنات نظيفة", tr: "Temiz enjektörler" },
  brakeSafe: { nl: "Veilig remmen, hoog kookpunt", en: "Safe braking, high boiling point", pl: "Bezpieczne hamowanie", ar: "فرملة آمنة", tr: "Güvenli fren" },
  rustProtect: { nl: "Beschermt, smeert & ontroest", en: "Protects, lubricates & de-rusts", pl: "Chroni, smaruje i odrdzewia", ar: "يحمي ويزيل الصدأ", tr: "Korur ve pas söker" },
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Alle motoroliën (sluit onderhoudsproducten zoals remvloeistof/spray uit). */
export function getOilProducts(): Product[] {
  return PRODUCTS.filter((p) => p.kind !== "care");
}

/** Onderhoud & accessoires (geen motorolie). */
export function getCareProducts(): Product[] {
  return PRODUCTS.filter((p) => p.kind === "care");
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

/** Viscositeiten die we daadwerkelijk verkopen (voor de winkelfilters). */
export const ALL_VISCOSITIES: Viscosity[] = ["0W20", "0W30", "5W30", "5W40", "10W40"];

const POSITION_CATEGORY: Record<string, string> = {
  fullSynthetic: "Volsynthetisch",
  syntheticBlend: "Deels synthetisch",
  mineral: "Mineraal",
  racing: "Volsynthetisch racing",
};

/**
 * Korte positioneringslabels voor de titel/subtitel van een product, bijv.
 * ["Longlife", "Volsynthetisch", "ACEA C2"]. Voor onderhoudsproducten (geen
 * olie) tonen we het producttype. Longlife tonen we bij volsynthetische oliën;
 * de ACEA-klasse komt uit de specs (indien aanwezig).
 */
export function productPositioning(p: Product): string[] {
  if (p.kind === "care") {
    return [p.productType ?? "Onderhoud"];
  }
  const parts: string[] = [];
  if (p.category === "fullSynthetic") parts.push("Longlife");
  if (p.category) parts.push(POSITION_CATEGORY[p.category] ?? "");
  const acea = p.specs.find((s) => s.startsWith("ACEA"));
  if (acea) parts.push(acea);
  return parts.filter(Boolean);
}
