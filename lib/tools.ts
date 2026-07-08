// Registry van de gratis RDW-kentekentools. Eén bron voor de hub-pagina, de
// sitemap, de footer en de onderlinge links. Voeg een tool toe → alles volgt.

export type ToolVariant = "apk" | "info" | "milieu" | "waarde" | "mrb";
export type ToolIcon = "shield" | "clipboard" | "spark" | "file" | "wrench";

export interface ToolDef {
  slug: string; // pad onder /tools
  variant: ToolVariant;
  icon: ToolIcon;
  /** korte naam (kaart/nav) */
  name: string;
  /** H1 op de pagina */
  h1: string;
  /** <title> */
  title: string;
  /** meta description + kaart-omschrijving */
  description: string;
  /** intro-alinea onder de H1 */
  intro: string;
  /** korte call-to-action op de knop */
  cta: string;
  /** FAQ voor structured data + zichtbaar blok */
  faq: { q: string; a: string }[];
}

export const TOOLS: ToolDef[] = [
  {
    slug: "apk-check",
    variant: "apk",
    icon: "shield",
    name: "APK-check",
    h1: "APK-check: wanneer moet mijn auto APK?",
    title: "APK-check: wanneer is mijn auto APK? (gratis kentekencheck)",
    description:
      "Check gratis wanneer je auto APK moet. Voer je kenteken in en zie direct de APK-vervaldatum uit de officiële RDW-data, plus hoeveel dagen je nog hebt.",
    intro:
      "Voer je kenteken in en zie direct wanneer je auto weer APK moet — met de officiële RDW-vervaldatum en het aantal dagen dat je nog hebt.",
    cta: "Check APK",
    faq: [
      {
        q: "Hoe weet ik wanneer mijn auto APK moet?",
        a: "Vul hierboven je kenteken in. We tonen de APK-vervaldatum die de RDW registreert en berekenen hoeveel dagen je nog hebt tot de APK verloopt.",
      },
      {
        q: "Hoe vaak moet een auto APK?",
        a: "Een personenauto op benzine moet na 4 jaar voor het eerst APK, daarna bij 6 en 7 jaar, en vanaf 8 jaar elk jaar. Diesel- en LPG-auto's hebben een strenger schema (vaak vanaf 3 jaar jaarlijks).",
      },
      {
        q: "Wat kost het als mijn APK verlopen is?",
        a: "Rijden met een verlopen APK kan een boete opleveren. Plan de keuring op tijd — en combineer het gelijk met een olieverversing.",
      },
    ],
  },
  {
    slug: "voertuiggegevens",
    variant: "info",
    icon: "clipboard",
    name: "Kentekencheck",
    h1: "Kentekencheck: alle voertuiggegevens opvragen",
    title: "Kentekencheck: alle voertuiggegevens gratis opvragen (RDW)",
    description:
      "Vraag gratis alle voertuiggegevens op met je kenteken: merk, model, bouwjaar, kleur, gewicht, brandstof, vermogen en meer. Direct uit de officiële RDW-database.",
    intro:
      "Voer een Nederlands kenteken in en zie alle geregistreerde gegevens: merk, model, bouwjaar, kleur, gewicht, brandstof, vermogen en meer — rechtstreeks uit de RDW.",
    cta: "Bekijk gegevens",
    faq: [
      {
        q: "Welke gegevens kan ik opvragen met een kenteken?",
        a: "Onder meer merk, model, bouwjaar, kleur, brandstof, aantal cilinders, cilinderinhoud, vermogen, gewicht, aantal zitplaatsen en de APK-vervaldatum — allemaal openbaar bij de RDW.",
      },
      {
        q: "Is een kentekencheck gratis?",
        a: "Ja. Deze check gebruikt de openbare RDW Open Data en is volledig gratis.",
      },
      {
        q: "Van wie is de auto?",
        a: "Persoonsgegevens van de eigenaar zijn niet openbaar en tonen we niet. Alleen de technische voertuiggegevens zijn beschikbaar.",
      },
    ],
  },
  {
    slug: "co2-uitstoot",
    variant: "milieu",
    icon: "spark",
    name: "CO₂ & verbruik",
    h1: "CO₂-uitstoot en verbruik per kenteken",
    title: "CO₂-uitstoot & brandstofverbruik checken per kenteken",
    description:
      "Check de CO₂-uitstoot, het brandstofverbruik en het energielabel van je auto op kenteken. Gratis, met officiële RDW-data.",
    intro:
      "Benieuwd naar de CO₂-uitstoot, het verbruik of het energielabel van je auto? Voer je kenteken in voor de officiële RDW-cijfers.",
    cta: "Check uitstoot",
    faq: [
      {
        q: "Hoeveel CO₂ stoot mijn auto uit?",
        a: "Vul je kenteken in; we tonen de gecombineerde CO₂-uitstoot (g/km) zoals geregistreerd bij de RDW, plus het brandstofverbruik en energielabel indien bekend.",
      },
      {
        q: "Wat betekent het energielabel van een auto?",
        a: "Het zuinigheidslabel (A t/m G) geeft aan hoe zuinig een auto is ten opzichte van vergelijkbare modellen. A is het zuinigst.",
      },
    ],
  },
  {
    slug: "cataloguswaarde",
    variant: "waarde",
    icon: "file",
    name: "Cataloguswaarde & BPM",
    h1: "Cataloguswaarde en BPM per kenteken",
    title: "Cataloguswaarde & BPM opvragen per kenteken (gratis)",
    description:
      "Vraag de oorspronkelijke cataloguswaarde en de bruto BPM van je auto op met het kenteken. Handig voor bijtelling en verzekering. Gratis via RDW.",
    intro:
      "Bekijk de oorspronkelijke cataloguswaarde en de bruto BPM van je auto — handig voor bijtelling, verzekering of verkoop. Voer je kenteken in.",
    cta: "Bekijk waarde",
    faq: [
      {
        q: "Wat is de cataloguswaarde van mijn auto?",
        a: "De cataloguswaarde is de oorspronkelijke nieuwprijs inclusief btw en BPM. De RDW registreert deze; vul je kenteken in om hem te zien.",
      },
      {
        q: "Is de cataloguswaarde hetzelfde als de dagwaarde?",
        a: "Nee. De cataloguswaarde is de nieuwprijs; de dagwaarde (huidige marktwaarde) ligt meestal een stuk lager en hangt af van leeftijd, kilometerstand en staat.",
      },
    ],
  },
  {
    slug: "wegenbelasting",
    variant: "mrb",
    icon: "wrench",
    name: "Wegenbelasting",
    h1: "Wegenbelasting berekenen per kenteken (indicatie)",
    title: "Wegenbelasting berekenen per kenteken — gratis indicatie",
    description:
      "Bereken een indicatie van je wegenbelasting (motorrijtuigenbelasting) op kenteken. Op basis van gewicht, brandstof en provincie. Gratis schatting.",
    intro:
      "Krijg een indicatie van je wegenbelasting op basis van gewicht, brandstof en jouw provincie. Voer je kenteken in en kies je provincie.",
    cta: "Bereken indicatie",
    faq: [
      {
        q: "Hoeveel wegenbelasting betaal ik?",
        a: "De motorrijtuigenbelasting hangt af van het gewicht, de brandstof en je provincie (opcenten). We geven een indicatie; het exacte bedrag bereken je bij de Belastingdienst.",
      },
      {
        q: "Waarom verschilt de wegenbelasting per provincie?",
        a: "Elke provincie heft eigen 'opcenten' bovenop het rijksdeel. Daardoor betaal je in de ene provincie meer dan in de andere voor dezelfde auto.",
      },
    ],
  },
];

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
