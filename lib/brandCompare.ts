// Merk-vs-merk vergelijkingen ("Benzol vs [concurrent]") om zoekverkeer met
// koopintentie te onderscheppen. Bewust EERLIJK: neutrale, feitelijke omschrijving
// van het concurrentmerk, en positionering van Benzol op échte verschillen
// (gratis bezorging, gratis kentekenadvies, DTC-prijs, bulk voor garages) — geen
// onterechte kwaliteitsclaims. Voeg gerust merken toe; pagina/sitemap volgen.

export interface BrandCompare {
  slug: string; // pad onder /vs, bijv. "kroon-oil"
  competitor: string; // "Kroon-Oil"
  /** korte, neutrale omschrijving van het concurrentmerk */
  competitorNote: string;
  /** waar het concurrentmerk sterk in is (eerlijk erkend) */
  competitorEdge: string[];
  /** échte voordelen van Benzol/BenzolPro (waar we op winnen) */
  benzolEdge: string[];
  /** eerlijke eindconclusie */
  verdict: string;
  faq: { q: string; a: string }[];
}

const BASE_FAQ = (competitor: string): { q: string; a: string }[] => [
  {
    q: `Is Benzol net zo goed als ${competitor}?`,
    a: `Benzol-motorolie voldoet aan dezelfde moderne normen (ACEA, API en de relevante fabrieksnormen) als de grote merken. Het verschil zit vooral in het model: Benzol verkoopt rechtstreeks online, met gratis bezorging en gratis kentekenadvies, waardoor je vaak voordeliger uit bent.`,
  },
  {
    q: `Kan ik ${competitor} vervangen door Benzol?`,
    a: `Zolang de olie dezelfde viscositeit en de door je fabrikant vereiste norm heeft, kun je merken vrij afwisselen — je hoeft niet bij één merk te blijven. Twijfel je? Check je kenteken voor het juiste advies.`,
  },
];

export const BRAND_COMPARES: BrandCompare[] = [
  {
    slug: "kroon-oil",
    competitor: "Kroon-Oil",
    competitorNote:
      "Kroon-Oil is een bekende Nederlandse smeermiddelenfabrikant met een breed assortiment en veel fabrieksgoedkeuringen.",
    competitorEdge: ["Lange historie en breed assortiment", "Veel OEM-goedkeuringen", "Verkrijgbaar via garages en winkels"],
    benzolEdge: [
      "Altijd gratis verzending, morgen in huis",
      "Gratis kentekenadvies via de officiële RDW-data",
      "Scherpe prijs — direct van de bron, zonder winkelmarge",
      "Staffelprijzen en offerte voor garages",
    ],
    verdict:
      "Beide zijn degelijke keuzes die aan de moderne normen voldoen. Zoek je gemak en scherpe prijs met gratis bezorging én gratis advies op kenteken, dan is Benzol via BenzolPro de logische keuze.",
    faq: BASE_FAQ("Kroon-Oil"),
  },
  {
    slug: "castrol",
    competitor: "Castrol",
    competitorNote:
      "Castrol is een wereldwijd bekend oliemerk met een sterke reputatie en bekende productlijnen zoals Edge en Magnatec.",
    competitorEdge: ["Sterk wereldmerk", "Racing- en performance-erfenis", "Breed verkrijgbaar"],
    benzolEdge: [
      "Vergelijkbare normen (ACEA/API/OEM) voor een scherpere prijs",
      "Altijd gratis bezorging",
      "Gratis olie-advies op kenteken (RDW)",
      "Bulkmaten en staffelkorting voor garages",
    ],
    verdict:
      "Castrol is een premiummerk met naam; Benzol biedt olie die aan dezelfde moderne normen voldoet, maar dan voordeliger en met gratis bezorging en advies. Voor de meeste auto's een uitstekende, scherp geprijsde keuze.",
    faq: BASE_FAQ("Castrol"),
  },
  {
    slug: "total-energies",
    competitor: "TotalEnergies",
    competitorNote:
      "TotalEnergies (Total/Elf) is een groot internationaal merk met veel samenwerkingen met autofabrikanten.",
    competitorEdge: ["Groot internationaal merk", "Veel fabrieks-samenwerkingen", "Breed verkrijgbaar"],
    benzolEdge: [
      "Zelfde moderne normen, voordeliger geprijsd",
      "Gratis verzending en gratis kentekenadvies",
      "Direct online bestellen, morgen in huis",
      "Garage-tarieven en offerte op maat",
    ],
    verdict:
      "TotalEnergies is een gevestigd merk; Benzol richt zich op gemak en prijs — dezelfde normen, gratis bezorgd, met advies op kenteken. Ideaal als je snel en voordelig de juiste olie wilt.",
    faq: BASE_FAQ("TotalEnergies"),
  },
  {
    slug: "mobil-1",
    competitor: "Mobil 1",
    competitorNote:
      "Mobil 1 is een bekend premium volsynthetisch merk met een sterke reputatie op het gebied van prestaties.",
    competitorEdge: ["Premium performance-reputatie", "Motorsport-erfenis", "Wereldwijd bekend"],
    benzolEdge: [
      "Volsynthetische olie met dezelfde normen, scherper geprijsd",
      "Altijd gratis bezorging",
      "Gratis kentekenadvies (RDW)",
      "Bulk voor garages met staffelkorting",
    ],
    verdict:
      "Mobil 1 staat bekend om performance; Benzol biedt volsynthetische olie die aan dezelfde specificaties voldoet, voor een lagere prijs en met gratis bezorging. Voor dagelijks gebruik een slimme, voordelige keuze.",
    faq: BASE_FAQ("Mobil 1"),
  },
  {
    slug: "motul",
    competitor: "Motul",
    competitorNote:
      "Motul is een merk met een sterke motorsport- en performance-reputatie en een premium positionering.",
    competitorEdge: ["Motorsport-erfenis", "Premium performance-lijnen", "Populair bij liefhebbers"],
    benzolEdge: [
      "Zelfde normen voor dagelijks gebruik, voordeliger",
      "Gratis verzending en advies op kenteken",
      "Ook performance-viscositeiten (bijv. 10W60) beschikbaar",
      "Scherpe garage-tarieven",
    ],
    verdict:
      "Motul is populair bij liefhebbers en op het circuit. Voor de gemiddelde auto biedt Benzol dezelfde normen voordeliger, met gratis bezorging — en voor sportmotoren is er ook een 10W60.",
    faq: BASE_FAQ("Motul"),
  },
  {
    slug: "liqui-moly",
    competitor: "Liqui Moly",
    competitorNote:
      "Liqui Moly is een Duits merk dat bekendstaat om zijn brede assortiment olie en additieven.",
    competitorEdge: ["Breed assortiment en additieven", "Sterke reputatie in Duitsland", "Veel goedkeuringen"],
    benzolEdge: [
      "Vergelijkbare normen, scherpere prijs",
      "Gratis bezorging, morgen in huis",
      "Gratis kentekenadvies (RDW)",
      "Bulkmaten voor garages",
    ],
    verdict:
      "Liqui Moly heeft een breed assortiment en goede naam; Benzol focust op de juiste olie tegen een scherpe prijs, gratis bezorgd en met advies op kenteken. Voor de meeste auto's een prima, voordelig alternatief.",
    faq: BASE_FAQ("Liqui Moly"),
  },
  {
    slug: "shell-helix",
    competitor: "Shell Helix",
    competitorNote:
      "Shell Helix is de personenauto-olielijn van Shell, een groot internationaal merk met breed bereik.",
    competitorEdge: ["Groot internationaal merk", "Breed verkrijgbaar", "Veel goedkeuringen"],
    benzolEdge: [
      "Dezelfde moderne normen, voordeliger",
      "Altijd gratis verzending",
      "Gratis olie-advies op kenteken",
      "Garage-staffelprijzen",
    ],
    verdict:
      "Shell Helix is breed verkrijgbaar en gevestigd; Benzol biedt olie met dezelfde normen tegen een scherpere prijs, gratis bezorgd en met kentekenadvies. Handig als je online snel de juiste olie wilt.",
    faq: BASE_FAQ("Shell Helix"),
  },
  {
    slug: "eurol",
    competitor: "Eurol",
    competitorNote:
      "Eurol is een Nederlandse smeermiddelenproducent met een breed assortiment voor auto en industrie.",
    competitorEdge: ["Nederlandse fabrikant", "Breed assortiment", "Veel goedkeuringen"],
    benzolEdge: [
      "Zelfde normen, scherp geprijsd online",
      "Gratis verzending en kentekenadvies",
      "Direct bestellen, morgen in huis",
      "Bulk en offerte voor garages",
    ],
    verdict:
      "Eurol is een solide Nederlandse fabrikant; Benzol onderscheidt zich met de online-aanpak: gratis bezorging, gratis advies op kenteken en scherpe prijzen. Beide voldoen aan de moderne normen.",
    faq: BASE_FAQ("Eurol"),
  },
];

export function getBrandCompare(slug: string): BrandCompare | undefined {
  return BRAND_COMPARES.find((b) => b.slug === slug);
}

// Vaste vergelijkingsdimensies (Benzol vs concurrent, generiek maar eerlijk).
export interface CompareRow {
  label: string;
  benzol: string;
  benzolYes: boolean;
  competitor: string;
  competitorYes: boolean;
}

export function compareRows(competitor: string): CompareRow[] {
  return [
    { label: "Voldoet aan moderne normen (ACEA/API/OEM)", benzol: "Ja", benzolYes: true, competitor: "Ja", competitorYes: true },
    { label: "Altijd gratis verzending", benzol: "Ja, op elke bestelling", benzolYes: true, competitor: "Afhankelijk van verkoper", competitorYes: false },
    { label: "Gratis kentekenadvies (RDW)", benzol: "Ja, direct het juiste advies", benzolYes: true, competitor: "Meestal niet", competitorYes: false },
    { label: "Prijs", benzol: "Scherp — direct van de bron", benzolYes: true, competitor: "Merk-/winkelprijs", competitorYes: false },
    { label: "Bulk & staffelkorting voor garages", benzol: "Ja, met offerte op maat", benzolYes: true, competitor: "Meestal via groothandel", competitorYes: false },
    { label: "Morgen in huis", benzol: "Ja", benzolYes: true, competitor: "Afhankelijk van verkoper", competitorYes: false },
    { label: "Bekend, breed verkrijgbaar merk", benzol: "Online (BenzolPro)", benzolYes: false, competitor: `Ja — ${competitor}`, competitorYes: true },
  ];
}
