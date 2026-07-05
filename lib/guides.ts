import type { Viscosity } from "./types";

/**
 * Kennisbank / gidsen — informatieve SEO-artikelen die de veelgestelde vragen
 * beantwoorden die automobilisten intypen ("hoe vaak olie verversen",
 * "5W30 of 5W40", "wat betekent 5W30"...). Elk artikel genereert automatisch een
 * eigen pagina (/gids/[slug]), komt in de sitemap en krijgt Article- + FAQ-
 * structured data. Voeg gerust artikelen toe: pagina's en links volgen vanzelf.
 *
 * ⚠️ De inhoud is algemeen voorlichtend. Op elke pagina staat de disclaimer dat
 * het instructieboekje / de fabrieksnorm leidend is voor de exacte keuze.
 */

export interface GuideSection {
  /** kop van de paragraaf (wordt een <h2> met anchor + komt in de inhoudsopgave) */
  heading: string;
  /** een of meer alinea's platte tekst */
  body: string[];
  /** optionele opsomming onder de alinea's */
  bullets?: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  /** H1 + titel in de <title> en deelknoppen */
  title: string;
  /** korte samenvatting voor meta-description en de overzichtskaart */
  description: string;
  /** korte rubriek, bijv. "Onderhoud" of "Uitleg" */
  category: string;
  /** geschatte leestijd in minuten */
  readingMinutes: number;
  /** laatst bijgewerkt, ISO-datum (YYYY-MM-DD) — voor Article-schema */
  updated: string;
  /** zoekwoorden, puur voor eigen overzicht */
  keywords: string[];
  /** intro-alinea onder de H1 */
  intro: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  /** viscositeiten waarvoor we onderaan een productaanbeveling tonen */
  relatedViscosities?: Viscosity[];
}

export const GUIDES: Guide[] = [
  {
    slug: "hoe-vaak-motorolie-verversen",
    title: "Hoe vaak moet je motorolie verversen?",
    description:
      "Elke 15.000–30.000 km of één keer per jaar? Ontdek het juiste verversingsinterval voor jouw auto — en waarom korte ritten en diesels vaker om verse olie vragen.",
    category: "Onderhoud",
    readingMinutes: 5,
    updated: "2026-07-05",
    keywords: ["hoe vaak olie verversen", "verversingsinterval", "olie verversen km", "motorolie vervangen"],
    intro:
      "De meeste moderne auto's rijden 15.000 tot 30.000 kilometer of één jaar op een verse olievulling — afhankelijk van motor, rijstijl en het type olie. Wie veel korte ritjes maakt, mag eerder verversen. Hieronder lees je hoe je jouw interval bepaalt.",
    sections: [
      {
        heading: "Het advies van de fabrikant is leidend",
        body: [
          "Elke autofabrikant schrijft een eigen onderhoudsinterval voor. Je vindt het in het instructieboekje of het digitale onderhoudsschema. Moderne motoren met een longlife-olie halen vaak 30.000 km of twee jaar; oudere motoren zitten dichter bij 15.000 km of één jaar.",
          "Rijd je met een vaste onderhoudsbeurt bij de garage, dan wordt de olie meestal automatisch tijdens die beurt vervangen. Tussen de beurten door hoef je alleen het peil in de gaten te houden.",
        ],
      },
      {
        heading: "Wanneer je vaker moet verversen",
        body: [
          "Sommige rijomstandigheden belasten de olie extra. In die gevallen adviseren we het interval te halveren of minimaal één keer per jaar te verversen, ook als je weinig kilometers maakt:",
        ],
        bullets: [
          "Veel korte ritten waarbij de motor niet goed warm wordt (de olie verdunt door condens en brandstof).",
          "Veel stadsverkeer, aanhangers trekken of bergachtig rijden.",
          "Oudere motoren of een hoge kilometerstand.",
          "Diesels met een roetfilter (DPF), die de olie sneller vervuilen.",
        ],
      },
      {
        heading: "Waarom op tijd verversen loont",
        body: [
          "Olie veroudert: additieven raken uitgewerkt, de olie wordt vuiler en beschermt minder goed tegen slijtage. Te lang doorrijden op oude olie leidt tot afzettingen, meer motorslijtage en in het ergste geval dure schade aan de turbo of nokkenas.",
          "Verse olie van de juiste specificatie houdt de motor schoon, koelt beter en bespaart brandstof. De kosten van een olieverversing vallen in het niet bij de reparatie van een versleten motor.",
        ],
      },
      {
        heading: "Kies de juiste olie bij het verversen",
        body: [
          "Bij het verversen hoort altijd de juiste viscositeit en specificatie voor jouw motor. Twijfel je? Check je kenteken op de homepage voor een advies op maat, of zoek je auto op via 'Motorolie per auto'.",
        ],
      },
    ],
    faq: [
      {
        q: "Moet ik olie verversen op basis van kilometers of tijd?",
        a: "Wat het eerst komt. Rijd je weinig, ververs dan minstens één keer per jaar — ook onder de kilometergrens. Olie veroudert namelijk ook door tijd en korte ritten.",
      },
      {
        q: "Wat gebeurt er als ik te lang wacht met verversen?",
        a: "De olie wordt vuil en verliest bescherming. Dit leidt tot afzettingen, meer slijtage en op termijn kostbare motorschade. Op tijd verversen is de goedkoopste verzekering voor je motor.",
      },
      {
        q: "Moet ik ook het oliefilter vervangen?",
        a: "Ja, vervang het oliefilter altijd samen met de olie. Een vol filter laat vuil doorstromen en verkort de levensduur van de verse olie.",
      },
    ],
    relatedViscosities: ["5W30", "5W40"],
  },
  {
    slug: "5w30-of-5w40-verschil",
    title: "5W30 of 5W40: wat is het verschil?",
    description:
      "5W30 en 5W40 lijken op elkaar, maar het laatste getal maakt het verschil. Lees wanneer je welke kiest — en waarom de fabrieksnorm belangrijker is dan de viscositeit alleen.",
    category: "Uitleg",
    readingMinutes: 4,
    updated: "2026-07-05",
    keywords: ["5w30 of 5w40", "verschil 5w30 5w40", "welke olie 5w30", "5w40 dikker"],
    intro:
      "5W30 en 5W40 zijn allebei uitstekende, veelgebruikte motoroliën. Het verschil zit in het tweede getal: 5W40 is bij bedrijfstemperatuur iets dikker (viskeuzer) dan 5W30. Welke je nodig hebt, hangt af van wat de fabrikant voorschrijft.",
    sections: [
      {
        heading: "Wat betekenen de getallen?",
        body: [
          "Het eerste getal met de 'W' (Winter) zegt iets over de koude eigenschappen: hoe lager, hoe soepeler de olie bij lage temperaturen stroomt. 5W30 en 5W40 gedragen zich bij koude start dus identiek.",
          "Het tweede getal beschrijft de dikte bij bedrijfstemperatuur (100 °C). 5W40 blijft daar iets dikker dan 5W30 en houdt bij hoge temperaturen of zware belasting net wat meer filmsterkte over.",
        ],
      },
      {
        heading: "Wanneer kies je 5W30?",
        body: [
          "5W30 is vandaag de meest gangbare keuze voor moderne benzine- en dieselmotoren. Veel fabrikanten schrijven het voor omdat de dunnere olie zorgt voor minder wrijving en dus een lager verbruik. Rijd je een auto uit pakweg 2010 of later met roetfilter, dan is de kans groot dat 5W30 (in de juiste norm) de juiste keuze is.",
        ],
      },
      {
        heading: "Wanneer kies je 5W40?",
        body: [
          "5W40 is de robuustere keuze. Het wordt vaak geadviseerd voor iets oudere motoren, krachtige/turbogeladen motoren en auto's die zwaar belast worden (aanhanger, veel snelweg, warmere klimaten). De dikkere film beschermt goed bij hoge olietemperaturen.",
        ],
      },
      {
        heading: "Belangrijker dan het getal: de specificatie",
        body: [
          "De viscositeit is maar de helft van het verhaal. Minstens zo belangrijk is de goedkeuring — denk aan VW 504.00/507.00, MB 229.51 of ACEA C3. Een olie mét de juiste norm en een net afwijkende viscositeit is vaak beter dan een olie met de 'juiste' viscositeit maar zonder de goedkeuring.",
          "Kies daarom niet alleen op 5W30 of 5W40, maar controleer welke norm jouw motor vraagt. Zoek je auto op via 'Motorolie per auto' of check je kenteken voor een advies op maat.",
        ],
      },
    ],
    faq: [
      {
        q: "Mag ik 5W40 gebruiken als 5W30 is voorgeschreven (of andersom)?",
        a: "Alleen als de olie óók aan de door de fabrikant vereiste norm voldoet. Wijk niet zomaar af: op sommige moderne motoren (bijv. met specifieke roetfilters) is de dunnere olie bewust gekozen. Volg bij twijfel het instructieboekje.",
      },
      {
        q: "Is 5W40 beter dan 5W30?",
        a: "Niet 'beter', wel anders. 5W40 is dikker en robuuster bij hitte; 5W30 is dunner en zuiniger. De beste keuze is de olie die aan jouw fabrieksnorm voldoet.",
      },
      {
        q: "Gedragen 5W30 en 5W40 zich anders bij koude start?",
        a: "Nee. Beide hebben dezelfde 5W-koudeklasse en stromen bij een koude motor even soepel. Het verschil ontstaat pas bij bedrijfstemperatuur.",
      },
    ],
    relatedViscosities: ["5W30", "5W40"],
  },
  {
    slug: "wat-betekent-motorolie-viscositeit",
    title: "Wat betekent 5W30? Viscositeit uitgelegd",
    description:
      "0W20, 5W30, 10W40 — wat betekenen die cijfers en de W op je motorolie? Een heldere uitleg van viscositeit, koude- en warmklasse in gewone taal.",
    category: "Uitleg",
    readingMinutes: 4,
    updated: "2026-07-05",
    keywords: ["wat betekent 5w30", "viscositeit uitleg", "motorolie cijfers", "wat betekent 0w20"],
    intro:
      "De code op een fles motorolie (zoals 5W30) beschrijft de viscositeit: hoe dik of dun de olie is bij koude en warme temperaturen. Zodra je weet wat de getallen betekenen, snap je meteen welke olie bij welk gebruik past.",
    sections: [
      {
        heading: "De W: het koude gedrag",
        body: [
          "Het getal vóór de W staat voor Winter en beschrijft hoe soepel de olie bij lage temperaturen stroomt. Hoe lager het getal, hoe beter de olie bij een koude start rondgepompt wordt. Een 0W- of 5W-olie bereikt de motoronderdelen sneller in de winter dan een 10W- of 15W-olie.",
        ],
      },
      {
        heading: "Het tweede getal: het warme gedrag",
        body: [
          "Het getal na de W geeft de dikte bij bedrijfstemperatuur (100 °C) aan. Hoe hoger, hoe dikker de olie blijft als de motor warm is. Een 5W30 is bij hitte dunner dan een 5W40, en die is weer dunner dan een 10W60.",
        ],
      },
      {
        heading: "Welke viscositeit hoort bij welke auto?",
        body: ["Als vuistregel (het instructieboekje blijft leidend):"],
        bullets: [
          "0W20 — moderne, zuinige (hybride) motoren met lage koude-startweerstand.",
          "5W30 — de standaard voor moderne benzine- en dieselmotoren, ook met roetfilter.",
          "5W40 — robuuste keuze voor krachtige, oudere of zwaar belaste motoren.",
          "10W40 — oudere motoren en hogere kilometerstanden.",
          "10W60 — sportieve, hoogtoerige motoren.",
          "15W40 — zwaar werk en oudere diesels.",
        ],
      },
      {
        heading: "Viscositeit is niet alles",
        body: [
          "Naast de viscositeit telt de specificatie (ACEA, API en de OEM-normen van je merk) minstens zo zwaar. Die bepalen of de olie geschikt is voor bijvoorbeeld jouw roetfilter of turbo. Kies dus altijd op viscositeit én goedkeuring samen.",
        ],
      },
    ],
    faq: [
      {
        q: "Wat betekent de W in 5W30?",
        a: "De W staat voor Winter. Het getal ervoor geeft aan hoe goed de olie bij koude temperaturen stroomt — hoe lager, hoe soepeler bij een koude start.",
      },
      {
        q: "Is een lager getal altijd beter?",
        a: "Nee. Een lagere viscositeit is zuiniger maar niet voor elke motor geschikt. Gebruik de viscositeit die de fabrikant voorschrijft.",
      },
      {
        q: "Wat is het verschil tussen 5W30 en 10W40?",
        a: "5W30 stroomt beter bij koude start en is bij hitte dunner; 10W40 is dikker en bedoeld voor oudere motoren met meer speling. Volg het advies voor jouw model.",
      },
    ],
    relatedViscosities: ["0W20", "5W30", "10W40"],
  },
  {
    slug: "synthetische-vs-minerale-olie",
    title: "Synthetische, semi-synthetische of minerale olie?",
    description:
      "Wat is het verschil tussen volsynthetische, semi-synthetische en minerale motorolie — en welke past bij jouw auto en kilometerstand? Een praktische vergelijking.",
    category: "Uitleg",
    readingMinutes: 5,
    updated: "2026-07-05",
    keywords: ["synthetische olie", "minerale olie", "semi synthetisch", "verschil synthetische minerale olie"],
    intro:
      "Motorolie bestaat in drie hoofdsoorten: volsynthetisch, semi-synthetisch (synthetic blend) en mineraal. Ze verschillen in hoe ze gemaakt zijn en hoe goed ze presteren bij extreme temperaturen. Moderne motoren vragen bijna altijd om synthetisch.",
    sections: [
      {
        heading: "Volsynthetische olie",
        body: [
          "Volsynthetische olie is chemisch opgebouwd voor maximale prestatie. Ze blijft stabiel bij zowel extreme kou als hitte, beschermt uitstekend tegen slijtage en houdt de motor schoon. Voor moderne motoren met turbo, direct inspuiting of roetfilter is dit de standaard.",
        ],
      },
      {
        heading: "Semi-synthetische olie (blend)",
        body: [
          "Een semi-synthetische olie mengt minerale en synthetische basisoliën. Ze biedt een goede bescherming tegen een lagere prijs en past uitstekend bij oudere of hoger belopen motoren die geen volsynthetische specificatie eisen.",
        ],
      },
      {
        heading: "Minerale olie",
        body: [
          "Minerale olie wordt rechtstreeks uit ruwe aardolie geraffineerd. Ze is het goedkoopst en geschikt voor oudere motoren, klassiekers of zwaar materieel dat op een eenvoudige specificatie loopt. Voor moderne personenauto's is ze meestal niet toereikend.",
        ],
      },
      {
        heading: "Welke kies je?",
        body: ["Kort samengevat:"],
        bullets: [
          "Moderne auto (ca. 2010+), turbo of roetfilter → volsynthetisch.",
          "Oudere auto of hoge kilometerstand zonder strenge norm → semi-synthetisch.",
          "Klassieker, oude diesel of zwaar werk → mineraal, mits de norm klopt.",
        ],
      },
      {
        heading: "Let ook hier op de specificatie",
        body: [
          "Het type basisolie zegt nog niets over de goedkeuringen. Controleer altijd of de olie voldoet aan de ACEA/API- en merknorm van jouw motor. Zoek je auto op via 'Motorolie per auto' voor de juiste combinatie.",
        ],
      },
    ],
    faq: [
      {
        q: "Mag ik van minerale naar synthetische olie overstappen?",
        a: "In de meeste gevallen wel, mits de synthetische olie aan de vereiste norm voldoet. Synthetisch beschermt doorgaans beter. Bij zeer oude motoren met veel afzetting: laat je adviseren door een monteur.",
      },
      {
        q: "Is synthetische olie het geld waard?",
        a: "Voor moderne motoren zeker: ze beschermt beter, blijft langer stabiel en houdt de motor schoner. Bij veel oudere motoren volstaat semi-synthetisch of mineraal als de fabrikant dat toestaat.",
      },
      {
        q: "Mag ik synthetische en minerale olie mengen?",
        a: "Bijvullen met een andere soort in noodgevallen kan meestal geen kwaad, maar meng bij voorkeur niet structureel. Ververs zodra het kan met één olie van de juiste specificatie.",
      },
    ],
    relatedViscosities: ["5W30", "10W40", "15W40"],
  },
  {
    slug: "motorolie-bijvullen",
    title: "Motorolie bijvullen: zo doe je het goed",
    description:
      "Oliepeil controleren en bijvullen in vijf stappen. Lees hoeveel je mag bijvullen, welke olie je gebruikt en wat je doet bij een oliewaarschuwingslampje.",
    category: "Onderhoud",
    readingMinutes: 4,
    updated: "2026-07-05",
    keywords: ["motorolie bijvullen", "oliepeil controleren", "olie bijvullen hoeveel", "oliepeildipstick"],
    intro:
      "Een motor verbruikt een beetje olie — dat is normaal. Controleer het peil daarom regelmatig en vul op tijd bij met de juiste olie. Zo doe je het in vijf stappen, en dit betekent het oliewaarschuwingslampje.",
    sections: [
      {
        heading: "Het oliepeil controleren",
        body: [
          "Zet de auto op een vlakke ondergrond en wacht bij een warme motor een paar minuten zodat de olie is teruggezakt. Trek de peilstok eruit, veeg hem schoon, steek hem volledig terug en trek opnieuw. Het oliepeil hoort tussen de minimum- en maximummarkering te staan.",
          "Heeft je auto een elektronische oliemeter in het dashboard in plaats van een peilstok? Volg dan de aanwijzingen in het instructieboekje om het peil uit te lezen.",
        ],
      },
      {
        heading: "In vijf stappen bijvullen",
        body: [""],
        bullets: [
          "1. Controleer welke olie je auto nodig heeft (viscositeit én norm).",
          "2. Draai de olievuldop op de motor los — niet de peilstok.",
          "3. Vul in kleine beetjes bij, bijvoorbeeld 200–300 ml per keer.",
          "4. Wacht even, meet opnieuw en herhaal tot het peil richting maximum staat.",
          "5. Draai de dop goed vast en veeg gemorste olie weg.",
        ],
      },
      {
        heading: "Hoeveel mag je bijvullen?",
        body: [
          "Tussen minimum en maximum op de peilstok zit meestal ongeveer één liter. Vul dus nooit in één keer een hele liter bij zonder te meten, en vul nooit boven het maximum — te veel olie is net zo schadelijk als te weinig. Bij overvulling kan de olie gaan schuimen en de motor beschadigen.",
        ],
      },
      {
        heading: "Wat betekent het oliewaarschuwingslampje?",
        body: [
          "Gaat het rode oliedruklampje tijdens het rijden branden, stop dan zo snel mogelijk veilig en zet de motor uit. Dit wijst op te lage oliedruk en doorrijden kan de motor onherstelbaar beschadigen. Controleer het peil en vul bij; blijft het lampje branden, laat de auto dan wegslepen naar een garage.",
        ],
      },
    ],
    faq: [
      {
        q: "Welke olie gebruik ik om bij te vullen?",
        a: "Dezelfde viscositeit en specificatie als in de motor zit. Zoek je auto op via 'Motorolie per auto' of check je kenteken als je het niet zeker weet.",
      },
      {
        q: "Kan ik te veel olie bijvullen?",
        a: "Ja, en dat is schadelijk. Boven het maximum kan de olie gaan schuimen en de smering verstoren. Vul in kleine beetjes bij en meet steeds opnieuw.",
      },
      {
        q: "Mijn oliedruklampje brandt — mag ik doorrijden?",
        a: "Nee. Stop veilig, zet de motor uit en controleer het peil. Blijft het lampje branden na bijvullen, laat de auto dan naar de garage brengen. Doorrijden riskeert motorschade.",
      },
    ],
    relatedViscosities: ["5W30", "5W40"],
  },
  {
    slug: "acea-api-oem-normen-uitgelegd",
    title: "ACEA, API en OEM-normen uitgelegd",
    description:
      "ACEA C3, API SP, VW 504.00, MB 229.51 — wat betekenen die olienormen en waarom zijn ze belangrijker dan de viscositeit? Lees hoe je de juiste goedkeuring kiest.",
    category: "Uitleg",
    readingMinutes: 5,
    updated: "2026-07-05",
    keywords: ["acea c3", "api sp", "vw 504.00", "mb 229.51", "olie specificatie", "oem norm"],
    intro:
      "Naast de viscositeit (zoals 5W30) draagt elke motorolie specificaties: ACEA, API en vaak een OEM-goedkeuring van je automerk. Die normen bepalen of de olie geschikt is voor jouw motor, roetfilter en turbo — en zijn daarmee minstens zo belangrijk als de dikte.",
    sections: [
      {
        heading: "ACEA — de Europese norm",
        body: [
          "ACEA is de standaard van de Europese autofabrikanten. De letter geeft de motorsoort aan, het cijfer het prestatieniveau. Veelvoorkomend zijn de C-klassen (C2, C3, C5) voor motoren met roetfilter en katalysator, en de A/B-klassen voor benzine- en dieselmotoren zonder speciale nabehandeling.",
        ],
      },
      {
        heading: "API — de Amerikaanse norm",
        body: [
          "API is de Amerikaanse standaard, met twee letters. De eerste (S) staat voor benzinemotoren, de tweede loopt op met de generatie: hoe verder in het alfabet, hoe moderner en beter (bijv. API SP). Voor diesels begint de code met een C.",
        ],
      },
      {
        heading: "OEM-normen — de goedkeuring van je merk",
        body: [
          "Veel fabrikanten stellen bovenop ACEA en API hun eigen eisen. Voorbeelden zijn VW 504.00/507.00, Mercedes-Benz 229.51/229.52, BMW LL-04, dexos2 (Opel/GM), Renault RN17 en PSA B71. Staat zo'n norm in je instructieboekje, kies dan een olie die deze goedkeuring letterlijk vermeldt.",
        ],
      },
      {
        heading: "Waarom de norm vóór de viscositeit gaat",
        body: [
          "Een verkeerde specificatie kan je roetfilter verstoppen of de katalysator beschadigen, zelfs bij de juiste viscositeit. De juiste norm met een net afwijkende viscositeit is daarom meestal veiliger dan andersom. Controleer dus eerst de vereiste goedkeuring en pas daarna de viscositeit.",
          "Onze Benzol-oliën vermelden de relevante ACEA-, API- en OEM-normen op het etiket en de productpagina. Twijfel je welke jouw motor vraagt? Zoek je auto op via 'Motorolie per auto'.",
        ],
      },
    ],
    faq: [
      {
        q: "Wat is belangrijker: viscositeit of specificatie?",
        a: "Beide, maar de specificatie is kritisch. Een olie met de juiste OEM-norm en een licht afwijkende viscositeit is doorgaans veiliger dan een olie met de juiste viscositeit zonder de vereiste goedkeuring.",
      },
      {
        q: "Waar vind ik welke norm mijn auto nodig heeft?",
        a: "In het instructieboekje, vaak onder 'smeermiddelen' of 'motorolie', en soms op de olievuldop. Op onze auto-pagina's staat per merk de gangbare norm vermeld.",
      },
      {
        q: "Betekent ACEA C3 automatisch geschikt voor mijn diesel met roetfilter?",
        a: "ACEA C3 is een low-SAPS-olie die geschikt is voor veel motoren met roetfilter, maar controleer altijd of ook de specifieke OEM-norm van je merk vermeld staat.",
      },
    ],
    relatedViscosities: ["5W30", "5W40"],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Andere gidsen dan de opgegeven slug (voor "lees ook"-links). */
export function relatedGuides(slug: string, limit = 3): Guide[] {
  return GUIDES.filter((g) => g.slug !== slug).slice(0, limit);
}

/** Slug voor een anchor/inhoudsopgave op basis van een kop. */
export function sectionSlug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[àáâä]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
