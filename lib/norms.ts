// Olie-norm-encyclopedie: een gestructureerde, citeerbare kennisbank van de
// belangrijkste ACEA-, API- en fabrieksnormen (OEM). Elke norm koppelt terug naar
// (a) welke auto's in onze database hem nodig hebben en (b) welke Benzol-olie
// eraan voldoet — beide afgeleid uit de bestaande data (geen dubbel onderhoud).
import { getAllModelEntries, resolveSpec } from "./carModels";
import { PRODUCTS } from "./products";
import type { Product } from "./types";

export type NormCategory = "ACEA" | "API" | "OEM";
export type Saps = "low" | "mid" | "full";

export interface Norm {
  slug: string;
  code: string; // weergavenaam, bijv. "VW 504.00 / 507.00"
  issuer: string; // uitgever, bijv. "Volkswagen Group"
  category: NormCategory;
  /** substrings die in auto-/productspecs voorkomen (bijv. "504.00") */
  aliases: string[];
  saps?: Saps;
  /** typische viscositeiten */
  viscosities?: string[];
  short: string; // one-liner (voor kaart + samenvatting)
  long: string; // uitleg
  related?: string[]; // slugs van verwante normen
  faq: { q: string; a: string }[];
}

const SAPS_LABEL: Record<Saps, string> = {
  low: "Low-SAPS (weinig as/fosfor/zwavel — beschermt roetfilter)",
  mid: "Mid-SAPS (gemiddeld — geschikt voor de meeste roetfilters)",
  full: "Full-SAPS (hoog additiefgehalte — niet voor moderne roetfilters)",
};

export function sapsLabel(s?: Saps): string | undefined {
  return s ? SAPS_LABEL[s] : undefined;
}

export const NORMS: Norm[] = [
  // ---------------- ACEA ----------------
  {
    slug: "acea-a3-b4",
    code: "ACEA A3/B4",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["A3/B4"],
    saps: "full",
    viscosities: ["5W40", "10W40", "0W40"],
    short: "Stabiele full-SAPS olie voor krachtige benzine- en dieselmotoren zonder roetfilter.",
    long: "ACEA A3/B4 is een beproefde full-SAPS-klasse met een hoge, stabiele smeerfilm (HTHS ≥ 3,5). Geschikt voor krachtigere en oudere benzine- en dieselmotoren zonder roetfilter (DPF). Niet gebruiken waar een low-SAPS-norm (C-klasse) wordt voorgeschreven.",
    related: ["acea-a5-b5", "api-sn"],
    faq: [
      { q: "Waarvoor gebruik je ACEA A3/B4?", a: "Voor krachtige of oudere benzine- en dieselmotoren zonder roetfilter die een dikke, stabiele smeerfilm nodig hebben (HTHS ≥ 3,5)." },
      { q: "Mag ACEA A3/B4 in een auto met roetfilter?", a: "Nee, gebruik dan een low- of mid-SAPS C-klasse (bijv. ACEA C3). A3/B4 kan een DPF verstoppen." },
    ],
  },
  {
    slug: "acea-a5-b5",
    code: "ACEA A5/B5",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["A5/B5"],
    saps: "full",
    viscosities: ["5W30", "0W30"],
    short: "Brandstofbesparende full-SAPS olie met lagere wrijving (lagere HTHS).",
    long: "ACEA A5/B5 lijkt op A3/B4 maar heeft een lagere HTHS-viscositeit (2,9–3,5) voor minder wrijving en lager verbruik. Bedoeld voor motoren die specifiek op deze dunne olie zijn ontworpen — gebruik hem niet als de fabrikant A3/B4 vereist.",
    related: ["acea-a3-b4", "ford-wss-m2c913"],
    faq: [
      { q: "Wat is het verschil tussen A3/B4 en A5/B5?", a: "A5/B5 is dunner (lagere HTHS) en zuiniger, maar alleen geschikt voor motoren die daarvoor zijn ontworpen." },
    ],
  },
  {
    slug: "acea-c1",
    code: "ACEA C1",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["C1", "ACEA C1"],
    saps: "low",
    viscosities: ["5W30"],
    short: "Zeer laag-as (low-SAPS) olie met lage HTHS, o.a. voor Ford en Jaguar/Land Rover.",
    long: "ACEA C1 is de meest as-arme low-SAPS-klasse met een lage HTHS-viscositeit. Beschermt roetfilters maximaal en bespaart brandstof. Vooral voorgeschreven door Ford en Jaguar/Land Rover. Gebruik alleen als de fabrikant C1 vraagt.",
    related: ["acea-c2", "acea-c3", "jlr-stjlr"],
    faq: [
      { q: "Waarvoor is ACEA C1?", a: "Voor motoren met roetfilter die een zeer as-arme, dunne olie vereisen — met name bepaalde Ford- en Land Rover-modellen." },
    ],
  },
  {
    slug: "acea-c2",
    code: "ACEA C2",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["C2", "ACEA C2"],
    saps: "mid",
    viscosities: ["0W30", "5W30"],
    short: "Mid-SAPS, brandstofbesparende olie voor moderne motoren met roetfilter.",
    long: "ACEA C2 is een mid-SAPS-klasse met lagere HTHS (≥ 2,9) voor minder wrijving. Veel toegepast door Franse en Aziatische merken op motoren met roetfilter. Compatibel met DPF en katalysator.",
    related: ["acea-c3", "acea-c5", "psa-b71-2312"],
    faq: [
      { q: "Wat betekent mid-SAPS?", a: "Een gemiddeld gehalte aan sulfaatas, fosfor en zwavel — genoeg bescherming voor de motor én veilig voor de meeste roetfilters." },
    ],
  },
  {
    slug: "acea-c3",
    code: "ACEA C3",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["C3", "ACEA C3"],
    saps: "mid",
    viscosities: ["5W30", "5W40", "0W30"],
    short: "De meest voorkomende moderne norm: mid-SAPS met hoge HTHS, voor auto's met roetfilter.",
    long: "ACEA C3 is waarschijnlijk de meest voorgeschreven moderne klasse: mid-SAPS met een hoge, stabiele HTHS (≥ 3,5). Beschermt zowel de motor als het roetfilter en is de basis onder veel OEM-normen (VW 504.00/507.00, BMW LL-04, MB 229.51/229.52).",
    related: ["acea-c2", "acea-c5", "vw-504-507", "bmw-ll-04", "mb-229-51"],
    faq: [
      { q: "Is ACEA C3 geschikt voor mijn auto?", a: "Voor de meeste moderne benzine- en dieselauto's met roetfilter is C3 de juiste basis. Controleer of de fabrikant een specifieke OEM-norm vraagt die op C3 is gebaseerd." },
      { q: "5W30 of 5W40 bij ACEA C3?", a: "Beide bestaan als C3. Kies de viscositeit die de fabrikant voorschrijft; bij twijfel checkt je onze kentekencheck." },
    ],
  },
  {
    slug: "acea-c4",
    code: "ACEA C4",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["C4", "ACEA C4"],
    saps: "low",
    viscosities: ["5W30"],
    short: "Low-SAPS met hoge HTHS, vooral voorgeschreven door Renault en Nissan.",
    long: "ACEA C4 combineert een zeer laag asgehalte (low-SAPS) met een hoge HTHS (≥ 3,5). Voornamelijk voorgeschreven door Renault (RN0720) en Nissan voor motoren met roetfilter.",
    related: ["acea-c3", "renault-rn17"],
    faq: [
      { q: "Wat is het verschil tussen C3 en C4?", a: "Beide hebben een hoge HTHS, maar C4 is nog as-armer (low-SAPS). C4 is voorgeschreven door o.a. Renault en Nissan." },
    ],
  },
  {
    slug: "acea-c5",
    code: "ACEA C5",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["C5", "ACEA C5"],
    saps: "low",
    viscosities: ["0W20", "5W30"],
    short: "Dunne, brandstofbesparende low-SAPS olie voor moderne benzine- en hybridemotoren.",
    long: "ACEA C5 heeft een lage HTHS (2,6–2,9) voor maximale brandstofbesparing, met een laag asgehalte voor het roetfilter. Veel toegepast op moderne, zuinige benzine- en hybridemotoren (o.a. Toyota, Honda, Mazda). Alleen gebruiken als de fabrikant C5 voorschrijft.",
    related: ["acea-c2", "acea-c3", "api-sp"],
    faq: [
      { q: "Mag ik C5 vervangen door C3?", a: "Niet zomaar: C5 is dunner (lagere HTHS). Vervang alleen door de norm die de fabrikant voorschrijft." },
    ],
  },
  {
    slug: "acea-e9",
    code: "ACEA E9/E11",
    issuer: "ACEA",
    category: "ACEA",
    aliases: ["E9", "E9/E11", "E11"],
    saps: "mid",
    viscosities: ["10W40", "15W40", "5W30"],
    short: "Zware-dieselnorm voor vrachtwagens en bestelbussen met roetfilter.",
    long: "ACEA E9 (en de nieuwere E11) is bedoeld voor zware dieselmotoren, zoals in vrachtwagens en bestelbussen, met roetfilter. Geoptimaliseerd voor lange verversingsintervallen onder zware belasting.",
    related: ["api-ck4"],
    faq: [
      { q: "Waarvoor is ACEA E9?", a: "Voor zware dieselmotoren (trucks, bestelbussen) met roetfilter die lange intervallen en hoge belasting aankunnen." },
    ],
  },
  // ---------------- API / ILSAC ----------------
  {
    slug: "api-sp",
    code: "API SP",
    issuer: "API",
    category: "API",
    aliases: ["API SP", "SP"],
    viscosities: ["0W20", "5W30"],
    short: "De actuele Amerikaanse benzinenorm (2020) met LSPI- en kettingslijtagebescherming.",
    long: "API SP is de huidige API-benzineklasse (sinds 2020). Voegt bescherming toe tegen LSPI (Low Speed Pre-Ignition) bij moderne turbomotoren en tegen distributieketting-slijtage. Achterwaarts compatibel met SN. Vaak gecombineerd met ILSAC GF-6.",
    related: ["api-sq", "api-sn", "ilsac-gf6"],
    faq: [
      { q: "Wat is LSPI?", a: "Ongewenste zelfontbranding bij lage toeren in moderne turbobenzinemotoren. API SP-olie beschermt hiertegen." },
      { q: "Mag API SP in plaats van API SN?", a: "Ja, API SP is achterwaarts compatibel en vervangt SN volledig." },
    ],
  },
  {
    slug: "api-sq",
    code: "API SQ",
    issuer: "API",
    category: "API",
    aliases: ["API SQ", "SQ"],
    viscosities: ["0W20", "0W16", "5W30"],
    short: "De nieuwste generatie benzinenorm, opvolger van API SP (samen met ILSAC GF-7).",
    long: "API SQ is de nieuwste API-benzineklasse, de opvolger van SP, geïntroduceerd samen met ILSAC GF-7. Verdere verbeteringen op het gebied van slijtage, afzettingen en brandstofbesparing voor de allernieuwste motoren. Achterwaarts compatibel met SP.",
    related: ["api-sp", "ilsac-gf6"],
    faq: [
      { q: "Is API SQ beter dan SP?", a: "SQ is de nieuwere generatie met verdere verbeteringen. Hij is achterwaarts compatibel, dus geschikt waar SP wordt gevraagd." },
    ],
  },
  {
    slug: "api-sn",
    code: "API SN",
    issuer: "API",
    category: "API",
    aliases: ["API SN", "SN/CF", "SN"],
    viscosities: ["5W30", "5W40", "10W40"],
    short: "Vorige-generatie benzinenorm (2010), inmiddels opgevolgd door SP.",
    long: "API SN was jarenlang de standaard benzineklasse (vanaf 2010), met goede bescherming tegen afzettingen en oxidatie. Voor moderne motoren wordt SP of SQ aanbevolen; SN blijft prima voor oudere benzinemotoren.",
    related: ["api-sp", "api-sl"],
    faq: [{ q: "Is API SN nog goed?", a: "Voor oudere benzinemotoren prima. Nieuwere motoren vragen om API SP of SQ." }],
  },
  {
    slug: "api-sl",
    code: "API SL/CF",
    issuer: "API",
    category: "API",
    aliases: ["API SL", "SL/CF", "SL"],
    viscosities: ["10W40", "15W40"],
    short: "Oudere benzine-/dieselnorm (2001) voor klassiekers en oudere motoren.",
    long: "API SL (vaak met CF voor diesel) is een oudere klasse uit 2001. Geschikt voor oudere benzine- en dieselmotoren en klassiekers waar geen moderne norm nodig is.",
    related: ["api-sn", "acea-a3-b4"],
    faq: [{ q: "Waarvoor gebruik je API SL/CF?", a: "Voor oudere auto's en klassiekers die geen moderne API SP/SQ vereisen." }],
  },
  {
    slug: "api-ck4",
    code: "API CK-4",
    issuer: "API",
    category: "API",
    aliases: ["API CK-4", "CK-4"],
    viscosities: ["15W40", "10W40", "5W30"],
    short: "Zware-dieselnorm voor moderne vrachtwagen- en busmotoren.",
    long: "API CK-4 is de zware-dieselklasse voor moderne trucks en bussen, met betere bescherming tegen oxidatie en aeratie dan zijn voorgangers. Vaak gecombineerd met ACEA E9/E11.",
    related: ["acea-e9"],
    faq: [{ q: "Waarvoor is API CK-4?", a: "Voor zware dieselmotoren (vrachtwagens/bussen), meestal in 15W40 of 10W40." }],
  },
  {
    slug: "ilsac-gf6",
    code: "ILSAC GF-6 / GF-7",
    issuer: "ILSAC",
    category: "API",
    aliases: ["ILSAC GF-6", "GF-6", "ILSAC GF-7", "GF-7", "GF-7A"],
    viscosities: ["0W20", "0W16", "5W30"],
    short: "Brandstofbesparingsnorm die hoort bij dunne API-oliën (0W20 e.d.).",
    long: "ILSAC GF-6 (en de nieuwere GF-7) is de Amerikaanse/Japanse brandstofbesparingsnorm die samen met API SP/SQ wordt gebruikt voor dunne, zuinige oliën (0W20, 0W16). Vereist voor veel moderne benzine- en hybridemotoren.",
    related: ["api-sp", "api-sq", "acea-c5"],
    faq: [{ q: "Wat is ILSAC GF-6?", a: "Een brandstofbesparingsstandaard voor dunne benzineoliën, meestal gecombineerd met API SP." }],
  },
  // ---------------- OEM ----------------
  {
    slug: "vw-504-507",
    code: "VW 504.00 / 507.00",
    issuer: "Volkswagen Group",
    category: "OEM",
    aliases: ["504.00", "507.00", "504 00", "507 00"],
    saps: "mid",
    viscosities: ["5W30", "0W30"],
    short: "De longlife-norm van VW/Audi/Škoda/SEAT: 504.00 (benzine) en 507.00 (diesel met DPF).",
    long: "VW 504.00 (benzine) en 507.00 (diesel) zijn de gecombineerde longlife-normen van de Volkswagen Group, gebaseerd op ACEA C3. Geschikt voor motoren met roetfilter en lange verversingsintervallen (WIV/longlife). Eén 5W30-olie met deze goedkeuring dekt vrijwel de hele moderne VW/Audi/Škoda/SEAT/Cupra-vloot.",
    related: ["acea-c3", "vw-502-505"],
    faq: [
      { q: "Wat is het verschil tussen VW 504.00 en 507.00?", a: "504.00 is voor benzinemotoren, 507.00 voor dieselmotoren met roetfilter. De meeste 5W30-oliën met deze goedkeuring voldoen aan beide." },
      { q: "Welke olie voor mijn Volkswagen?", a: "Meestal een 5W30 met VW 504.00/507.00-goedkeuring. Check je kenteken voor zekerheid." },
    ],
  },
  {
    slug: "vw-502-505",
    code: "VW 502.00 / 505.00",
    issuer: "Volkswagen Group",
    category: "OEM",
    aliases: ["502.00", "505.00", "505.01"],
    saps: "full",
    viscosities: ["5W40", "5W30"],
    short: "Oudere VW-norm (full-SAPS) voor benzine (502.00) en diesel zonder DPF (505.00).",
    long: "VW 502.00 (benzine) en 505.00 (diesel) zijn de oudere, full-SAPS normen voor motoren zónder roetfilter, meestal in 5W40. Gebruik deze niet op moderne DPF-motoren die 504.00/507.00 vereisen.",
    related: ["vw-504-507", "acea-a3-b4"],
    faq: [{ q: "Mag VW 502.00 op een moderne TDI met roetfilter?", a: "Nee, die vereist 507.00 (low/mid-SAPS). 505.00/502.00 is voor motoren zonder roetfilter." }],
  },
  {
    slug: "mb-229-51",
    code: "MB 229.51 / 229.52",
    issuer: "Mercedes-Benz",
    category: "OEM",
    aliases: ["229.51", "229.52"],
    saps: "mid",
    viscosities: ["5W30", "0W30"],
    short: "Mercedes low-/mid-SAPS normen voor motoren met roetfilter; 229.52 is de zuinigere.",
    long: "MB 229.51 en 229.52 zijn de moderne Mercedes-Benz normen op basis van ACEA C3, voor benzine- en dieselmotoren met roetfilter. 229.52 stelt strengere eisen aan brandstofbesparing en oxidatiestabiliteit dan 229.51 en vervangt hem in nieuwere modellen.",
    related: ["acea-c3", "mb-229-5"],
    faq: [{ q: "Verschil MB 229.51 en 229.52?", a: "229.52 is nieuwer en zuiniger, met strengere eisen. Waar 229.52 is toegestaan, mag je meestal ook 229.51 gebruiken — check je handboek." }],
  },
  {
    slug: "mb-229-5",
    code: "MB 229.5",
    issuer: "Mercedes-Benz",
    category: "OEM",
    aliases: ["MB 229.5", "229.5 ", "229.5/"],
    saps: "full",
    viscosities: ["5W40", "0W40"],
    short: "Oudere Mercedes full-SAPS longlife-norm voor motoren zonder roetfilter.",
    long: "MB 229.5 is de oudere full-SAPS longlife-norm van Mercedes-Benz (meestal 5W40), voor benzine- en dieselmotoren zonder roetfilter. Voor DPF-motoren geldt 229.51/229.52.",
    related: ["mb-229-51", "acea-a3-b4"],
    faq: [{ q: "Is MB 229.5 geschikt voor een roetfilter?", a: "Nee, gebruik dan MB 229.51 of 229.52 (low/mid-SAPS)." }],
  },
  {
    slug: "bmw-ll-04",
    code: "BMW Longlife-04",
    issuer: "BMW",
    category: "OEM",
    aliases: ["LL-04", "LL04", "Longlife-04"],
    saps: "mid",
    viscosities: ["5W30", "0W30"],
    short: "De Europese BMW-norm (mid-SAPS, ACEA C3) voor motoren met roetfilter.",
    long: "BMW Longlife-04 (LL-04) is de Europese BMW/MINI-norm op basis van ACEA C3, voor benzine- en dieselmotoren met roetfilter. De standaardkeuze voor de meeste moderne BMW's en MINI's, meestal in 5W30.",
    related: ["acea-c3", "bmw-ll-01"],
    faq: [{ q: "Welke olie voor mijn BMW?", a: "Meestal een 5W30 met BMW Longlife-04 (LL-04). Sport- en oudere modellen kunnen afwijken — check je kenteken." }],
  },
  {
    slug: "bmw-ll-01",
    code: "BMW Longlife-01",
    issuer: "BMW",
    category: "OEM",
    aliases: ["LL-01", "LL01", "Longlife-01"],
    saps: "full",
    viscosities: ["5W30", "0W40", "5W40"],
    short: "Oudere BMW full-SAPS longlife-norm voor benzinemotoren zonder roetfilter.",
    long: "BMW Longlife-01 (LL-01) is de oudere full-SAPS-norm voor BMW-benzinemotoren zonder roetfilter. Voor moderne modellen met DPF geldt LL-04.",
    related: ["bmw-ll-04", "acea-a3-b4"],
    faq: [{ q: "Mag LL-01 op een moderne BMW?", a: "Alleen als de fabrikant LL-01 voorschrijft. Moderne diesels/benzines met roetfilter vragen LL-04." }],
  },
  {
    slug: "renault-rn17",
    code: "Renault RN17 / RN0720",
    issuer: "Renault / Dacia",
    category: "OEM",
    aliases: ["RN17", "RN0720", "RN 0720"],
    saps: "low",
    viscosities: ["5W30", "0W20"],
    short: "De moderne Renault/Dacia-norm voor motoren met roetfilter (opvolger van RN0700/0710).",
    long: "RN17 is de actuele Renault/Dacia-norm en vervangt RN0700/RN0710. RN0720 is de bijbehorende norm voor dieselmotoren met roetfilter (op basis van ACEA C4). Samen dekken ze de moderne Renault-, Dacia- en Alpine-vloot.",
    related: ["renault-rn0700", "acea-c4"],
    faq: [{ q: "Welke olie voor een moderne Renault?", a: "Meestal een 5W30 met RN17 (en RN0720 voor diesel). Check je kenteken voor de juiste keuze." }],
  },
  {
    slug: "renault-rn0700",
    code: "Renault RN0700 / RN0710",
    issuer: "Renault",
    category: "OEM",
    aliases: ["RN0700", "RN0710", "RN 0700", "RN 0710", "0700/0710"],
    saps: "full",
    viscosities: ["5W40", "5W30"],
    short: "Oudere Renault-normen: RN0700 (benzine) en RN0710 (krachtige/dieselmotoren).",
    long: "RN0700 en RN0710 zijn de oudere Renault-normen. RN0700 voor benzinemotoren, RN0710 voor krachtige benzine- en dieselmotoren zonder roetfilter. Voor moderne Renaults geldt RN17.",
    related: ["renault-rn17"],
    faq: [{ q: "Verschil RN0700 en RN0710?", a: "RN0710 is voor krachtiger belaste en dieselmotoren; RN0700 voor gewone benzinemotoren." }],
  },
  {
    slug: "psa-b71-2312",
    code: "PSA/Stellantis B71 2312",
    issuer: "Peugeot / Citroën / DS / Opel",
    category: "OEM",
    aliases: ["B71 2312", "B712312", "2312"],
    saps: "mid",
    viscosities: ["0W30", "5W30"],
    short: "De moderne Stellantis-norm (PSA) voor benzine- en dieselmotoren met roetfilter.",
    long: "PSA B71 2312 is de moderne norm voor Peugeot, Citroën, DS en veel nieuwere Opels, op basis van ACEA C2/C3. Geschikt voor benzine- en dieselmotoren met roetfilter. B71 2290 is de oudere full-SAPS variant.",
    related: ["psa-b71-2290", "acea-c2", "acea-c3"],
    faq: [{ q: "Welke olie voor een Peugeot of Citroën?", a: "Meestal een 0W30 of 5W30 met PSA B71 2312. Check je kenteken voor de exacte norm." }],
  },
  {
    slug: "psa-b71-2290",
    code: "PSA B71 2290",
    issuer: "Peugeot / Citroën",
    category: "OEM",
    aliases: ["B71 2290", "2290"],
    saps: "full",
    viscosities: ["5W40", "5W30"],
    short: "Oudere PSA full-SAPS norm voor motoren zonder roetfilter.",
    long: "PSA B71 2290 is de oudere, full-SAPS norm voor Peugeot- en Citroën-motoren zonder roetfilter. Moderne modellen met DPF vragen B71 2312.",
    related: ["psa-b71-2312"],
    faq: [{ q: "Is B71 2290 nog actueel?", a: "Voor oudere PSA-motoren zonder roetfilter wel. Nieuwere modellen vragen B71 2312." }],
  },
  {
    slug: "dexos2",
    code: "GM dexos2 / dexosD",
    issuer: "General Motors / Opel",
    category: "OEM",
    aliases: ["dexos2", "dexosD"],
    saps: "mid",
    viscosities: ["5W30"],
    short: "De Europese GM/Opel-norm (ACEA C3) voor benzine- en dieselmotoren met roetfilter.",
    long: "GM dexos2 is de Europese GM/Opel-norm op basis van ACEA C3, voor benzine- en dieselmotoren met roetfilter. dexosD is de nieuwere dieselvariant. Voor oudere en Amerikaanse GM-benzinemotoren geldt dexos1.",
    related: ["dexos1", "acea-c3"],
    faq: [{ q: "Welke olie voor een oudere Opel?", a: "Vaak een 5W30 met GM dexos2. Nieuwere Opels (Stellantis) gebruiken PSA-normen." }],
  },
  {
    slug: "dexos1",
    code: "GM dexos1 Gen2/Gen3",
    issuer: "General Motors",
    category: "OEM",
    aliases: ["dexos1", "dexos1 Gen2", "dexos1 Gen3"],
    viscosities: ["0W20", "5W30"],
    short: "GM-benzinenorm met LSPI-bescherming, vooral voor Amerikaanse GM/Chevrolet-motoren.",
    long: "GM dexos1 (Gen2/Gen3) is de benzinenorm van General Motors met sterke LSPI-bescherming, meestal in dunne viscositeiten zoals 0W20/5W30. Vooral op Chevrolet en Amerikaanse GM-modellen.",
    related: ["dexos2", "api-sp"],
    faq: [{ q: "Waarvoor is dexos1?", a: "Voor GM-benzinemotoren (o.a. Chevrolet), met LSPI-bescherming en meestal een dunne 0W20/5W30." }],
  },
  {
    slug: "ford-wss-m2c948",
    code: "Ford WSS-M2C948-B",
    issuer: "Ford",
    category: "OEM",
    aliases: ["WSS-M2C948-B", "M2C948", "948-B"],
    saps: "mid",
    viscosities: ["0W30", "5W20"],
    short: "Moderne Ford-norm (mid-SAPS) voor EcoBoost-benzine en diesels met roetfilter.",
    long: "Ford WSS-M2C948-B is de moderne Ford-norm op basis van ACEA C2, voor EcoBoost-benzinemotoren en diesels met roetfilter. Meestal een dunne 0W30/5W20.",
    related: ["ford-wss-m2c913", "acea-c2"],
    faq: [{ q: "Welke olie voor een moderne Ford?", a: "Vaak WSS-M2C948-B (0W30). Oudere modellen gebruiken WSS-M2C913-D." }],
  },
  {
    slug: "ford-wss-m2c913",
    code: "Ford WSS-M2C913-D",
    issuer: "Ford",
    category: "OEM",
    aliases: ["WSS-M2C913-D", "M2C913", "913-D"],
    saps: "full",
    viscosities: ["5W30"],
    short: "Ford low-friction norm (ACEA A5/B5) voor veel benzine- en dieselmotoren.",
    long: "Ford WSS-M2C913-D is de veelgebruikte Ford-norm op basis van ACEA A5/B5, voor een breed scala benzine- en dieselmotoren. Meestal een 5W30.",
    related: ["ford-wss-m2c948", "acea-a5-b5"],
    faq: [{ q: "Welke olie voor mijn Ford Focus of Fiesta?", a: "Vaak een 5W30 met Ford WSS-M2C913-C/D. Check je kenteken voor de exacte norm." }],
  },
  {
    slug: "fiat-955535",
    code: "Fiat 9.55535",
    issuer: "Fiat / Alfa Romeo / Jeep",
    category: "OEM",
    aliases: ["9.55535", "955535"],
    viscosities: ["5W30", "5W40", "0W20"],
    short: "De normfamilie van Fiat/Alfa Romeo/Jeep (S1, S2, S3, GH2 …) per motortype.",
    long: "Fiat 9.55535 is een familie normen (o.a. -S1, -S2, -S3, -GH2) voor Fiat, Alfa Romeo, Lancia en Jeep. De suffix bepaalt het type: -S1 is een dunne mid-SAPS (C2), -S3 een full-SAPS A3/B4. Kies exact de suffix die je handboek voorschrijft.",
    related: ["chrysler-ms6395", "acea-c2", "acea-a3-b4"],
    faq: [{ q: "Wat betekent de -S1 of -S3 achter 9.55535?", a: "De suffix bepaalt het olietype: -S1 is dun en mid-SAPS, -S3 is een full-SAPS A3/B4. Volg je instructieboekje." }],
  },
  {
    slug: "chrysler-ms6395",
    code: "Chrysler MS-6395",
    issuer: "Stellantis (Chrysler / Jeep)",
    category: "OEM",
    aliases: ["MS-6395", "MS6395", "6395"],
    viscosities: ["5W20", "0W20", "5W30"],
    short: "Amerikaanse Chrysler/Jeep-benzinenorm, meestal in dunne viscositeiten.",
    long: "Chrysler MS-6395 is de benzinenorm voor veel Chrysler-, Jeep- en Dodge-modellen, meestal in dunne viscositeiten (0W20/5W20). Vaak gecombineerd met een Fiat 9.55535-goedkeuring.",
    related: ["fiat-955535"],
    faq: [{ q: "Welke olie voor een Jeep?", a: "Vaak MS-6395 (5W20/0W20), soms met 9.55535. Check je kenteken/handboek." }],
  },
  {
    slug: "volvo-rbs0-2ae",
    code: "Volvo VCC RBS0-2AE",
    issuer: "Volvo",
    category: "OEM",
    aliases: ["RBS0-2AE", "VCC RBS0-2AE", "RBS0"],
    saps: "low",
    viscosities: ["0W20"],
    short: "Volvo's eigen 0W20 low-SAPS specificatie voor moderne Drive-E motoren.",
    long: "Volvo VCC RBS0-2AE is de eigen Volvo-specificatie voor een dunne 0W20 low-SAPS olie, voor de moderne Drive-E benzine- en dieselmotoren met roetfilter. Vaak gecombineerd met ACEA C5.",
    related: ["acea-c5", "acea-c3"],
    faq: [{ q: "Welke olie voor een moderne Volvo?", a: "Meestal een 0W20 met Volvo VCC RBS0-2AE. Oudere Volvo's kunnen ACEA C3/5W30 vragen." }],
  },
  {
    slug: "jlr-stjlr",
    code: "Jaguar / Land Rover STJLR",
    issuer: "Jaguar Land Rover",
    category: "OEM",
    aliases: ["STJLR", "ACEA C1 / STJLR"],
    saps: "low",
    viscosities: ["0W20", "5W30"],
    short: "De eigen Jaguar/Land Rover specificaties (o.a. op basis van ACEA C1/C5).",
    long: "Jaguar Land Rover hanteert eigen STJLR-specificaties (bijv. STJLR.03.5006, STJLR.51.5122), vaak op basis van ACEA C1 of C5. Kies exact de specificatie en viscositeit uit je handboek.",
    related: ["acea-c1", "acea-c5"],
    faq: [{ q: "Welke olie voor een Land Rover?", a: "Een olie met de juiste STJLR-specificatie (vaak 0W20 of 5W30). Controleer je handboek/kenteken." }],
  },
];

// ---------------------------------------------------------------------------
// Matching + omgekeerde index
// ---------------------------------------------------------------------------

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Komt een norm-alias voor in een spec-string? (met cijfer-grens tegen false hits) */
function specMatches(spec: string, aliases: string[]): boolean {
  return aliases.some((a) => new RegExp(escapeRegex(a.trim()) + "(?!\\d)", "i").test(spec));
}

export function getNorm(slug: string): Norm | undefined {
  return NORMS.find((n) => n.slug === slug);
}

export function getAllNorms(): Norm[] {
  return NORMS;
}

export function normsByCategory(): { category: NormCategory; norms: Norm[] }[] {
  const cats: NormCategory[] = ["OEM", "ACEA", "API"];
  return cats.map((category) => ({ category, norms: NORMS.filter((n) => n.category === category) }));
}

export interface NormCar {
  makeName: string;
  modelName: string;
  makeSlug: string;
  modelSlug: string;
}

/** Auto's uit onze database die deze norm (gangbaar) vereisen — de omgekeerde index. */
export function carsForNorm(norm: Norm): NormCar[] {
  const seen = new Set<string>();
  const out: NormCar[] = [];
  for (const e of getAllModelEntries()) {
    const spec = resolveSpec(e.make.name, e.model);
    if (!spec || !specMatches(spec, norm.aliases)) continue;
    const key = `${e.makeSlug}/${e.modelSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ makeName: e.make.name, modelName: e.model.model, makeSlug: e.makeSlug, modelSlug: e.modelSlug });
  }
  return out.sort((a, b) => (a.makeName + a.modelName).localeCompare(b.makeName + b.modelName));
}

/** Benzol-producten die aan deze norm voldoen (op basis van hun specs). */
export function productsForNorm(norm: Norm): Product[] {
  return PRODUCTS.filter((p) => specMatches(p.specs.join(" "), norm.aliases));
}

/**
 * Producten om te tonen bij een norm. `exact` = de norm staat écht op het
 * productetiket. Anders vallen we terug op producten met de juiste viscositeit
 * (zachter geformuleerd op de pagina — we claimen dan geen certificering).
 */
export function suggestedProductsForNorm(norm: Norm): { products: Product[]; exact: boolean } {
  const exact = productsForNorm(norm);
  if (exact.length) return { products: exact, exact: true };
  const vis = new Set(norm.viscosities ?? []);
  const byVis = PRODUCTS.filter((p) => vis.has(p.viscosity) && p.category !== "racing");
  return { products: byVis.slice(0, 4), exact: false };
}

/** Vind de norm-pagina die bij een spec-string hoort (voor het linken op auto-pagina's). */
export function normForSpec(spec?: string): Norm | undefined {
  if (!spec) return undefined;
  return NORMS.find((n) => specMatches(spec, n.aliases));
}
