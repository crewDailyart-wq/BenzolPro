// Data voor de viscositeit-vergelijkpagina's ("5W30 of 5W40?" enz.). Bewust
// generiek en inhoudelijk (geen dunne per-auto-pagina's): elk paar krijgt een
// echte beslisgids. Voeg gerust paren toe — pagina, sitemap en links volgen.
import type { Viscosity } from "./types";

export interface ViscosityInfo {
  /** korte samenvatting van het karakter */
  summary: string;
  /** koude-start / dunheid bij kou (lager = beter bij kou) */
  koudestart: string;
  /** waar deze olie het best bij past */
  bestVoor: string[];
}

export const VISCOSITY_INFO: Record<Viscosity, ViscosityInfo> = {
  "0W20": {
    summary: "Zeer dunne, volsynthetische olie voor moderne, zuinige benzine- en hybride motoren.",
    koudestart: "Uitstekend — stroomt direct bij strenge vorst.",
    bestVoor: ["Moderne hybrides", "Zuinige benzinemotoren", "Fabrikanten die 0W20 voorschrijven (o.a. Toyota, Honda)"],
  },
  "0W30": {
    summary: "Dunne volsynthetische olie met brede geschiktheid en topprestaties bij kou.",
    koudestart: "Uitstekend — ideaal voor koude ochtenden.",
    bestVoor: ["Moderne benzine- en dieselmotoren", "Auto's met roetfilter (mits juiste norm)", "Wie maximale koude-bescherming wil"],
  },
  "5W30": {
    summary: "De meest voorkomende moderne viscositeit — een goede balans tussen zuinigheid en bescherming.",
    koudestart: "Zeer goed bij normale Nederlandse winters.",
    bestVoor: ["De meeste moderne benzine- en dieselauto's", "Auto's met roetfilter (DPF)", "Dagelijks gebruik"],
  },
  "5W40": {
    summary: "Iets dikkere volsynthetische olie met een sterkere smeerfilm bij hoge temperaturen.",
    koudestart: "Goed bij normale winters.",
    bestVoor: ["Krachtigere en oudere motoren", "Turbo/diesel met hogere belasting", "Wie extra bescherming bij warmte wil"],
  },
  "10W40": {
    summary: "Semi-synthetische olie voor oudere motoren met meer kilometers.",
    koudestart: "Redelijk — minder geschikt voor strenge vorst.",
    bestVoor: ["Oudere auto's (grofweg 2000–2010)", "Motoren met meer slijtage", "Wie een voordelige semi-synthetische zoekt"],
  },
  "10W60": {
    summary: "Zeer dikke, hoogwaardige olie voor sport- en high-performance motoren.",
    koudestart: "Beperkt — bedoeld voor prestatie, niet voor kou.",
    bestVoor: ["Sportmotoren (o.a. BMW M)", "Circuitgebruik", "Motoren die 10W60 voorschrijven"],
  },
  "15W40": {
    summary: "Robuuste, vaak minerale olie voor oudere en zwaardere (diesel)motoren.",
    koudestart: "Beperkt bij vorst.",
    bestVoor: ["Klassiekers en oldtimers", "Bestel- en vrachtwagens", "Oudere dieselmotoren"],
  },
};

export interface ComparePair {
  slug: string;
  a: Viscosity;
  b: Viscosity;
  /** korte intro + kernverschil */
  intro: string;
  /** eindoordeel: welke voor de meeste mensen, en waarom */
  verdict: string;
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    slug: "5w30-of-5w40",
    a: "5W30",
    b: "5W40",
    intro:
      "5W30 en 5W40 gedragen zich bij kou vrijwel gelijk (de ‘5W’), maar 5W40 is bij bedrijfstemperatuur iets dikker en houdt daardoor een sterkere smeerfilm vast.",
    verdict:
      "Voor de meeste moderne auto’s is 5W30 het juiste antwoord — mits de fabrikant dat voorschrijft. Kies 5W40 bij oudere, krachtigere of zwaarder belaste motoren, of als je handboek dat aangeeft.",
  },
  {
    slug: "0w20-of-5w30",
    a: "0W20",
    b: "5W30",
    intro:
      "0W20 is dunner dan 5W30 en start bij kou nog vlotter — ontworpen voor zuinigheid in moderne motoren. 5W30 is universeler en iets steviger.",
    verdict:
      "Schrijft je fabrikant 0W20 voor (veel moderne hybrides en zuinige benzinemotoren)? Gebruik dan géén 5W30. Voor de bredere middenmoot van moderne auto’s is 5W30 juist de norm. De fabrieksnorm is altijd leidend.",
  },
  {
    slug: "5w40-of-10w40",
    a: "5W40",
    b: "10W40",
    intro:
      "Beide zijn ‘40’ bij warmte, maar 5W40 (volsynthetisch) stroomt bij kou veel beter dan 10W40 (meestal semi-synthetisch).",
    verdict:
      "Voor nieuwere auto’s en koude winters wint 5W40. 10W40 is een prima, voordeliger keuze voor oudere motoren met meer kilometers waar de fabrikant geen volsynthetisch vereist.",
  },
  {
    slug: "0w30-of-5w30",
    a: "0W30",
    b: "5W30",
    intro:
      "0W30 en 5W30 zijn bij bedrijfstemperatuur gelijk; het verschil zit in de koude start — 0W30 stroomt bij strenge vorst nog sneller.",
    verdict:
      "Woon of rijd je waar het echt koud wordt, dan geeft 0W30 een streepje extra bescherming bij de start. Anders is 5W30 prima en meestal voordeliger. Volg de voorgeschreven norm.",
  },
  {
    slug: "10w40-of-15w40",
    a: "10W40",
    b: "15W40",
    intro:
      "15W40 is bij kou dikker dan 10W40 en vaak mineraal; 10W40 is doorgaans semi-synthetisch en start bij kou wat vlotter.",
    verdict:
      "Voor oudere personenauto’s is 10W40 meestal de betere keuze. 15W40 past bij klassiekers, oudere diesels en zwaarder materieel — of waar het handboek dit aangeeft.",
  },
  {
    slug: "5w40-of-10w60",
    a: "5W40",
    b: "10W60",
    intro:
      "10W60 is een uitgesproken sport-olie met een zeer dikke smeerfilm bij hitte; 5W40 is de veelzijdige straatkeuze.",
    verdict:
      "Gebruik 10W60 alléén als je (sport)motor dat expliciet voorschrijft, bijvoorbeeld een BMW M. Voor vrijwel al het overige straatgebruik is 5W40 de juiste, veiligere keuze.",
  },
];

export function getComparePair(slug: string): ComparePair | undefined {
  return COMPARE_PAIRS.find((p) => p.slug === slug);
}
