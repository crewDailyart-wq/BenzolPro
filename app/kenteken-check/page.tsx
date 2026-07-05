import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PlateLookup from "@/components/PlateLookup";
import { CarIcon, CheckIcon, ShieldIcon, BoltIcon, TruckIcon, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Welke motorolie past bij mijn kenteken? — Gratis kentekencheck",
  description:
    "Voer je kenteken in en zie direct welke motorolie bij jouw auto past. Gratis, op basis van de officiële RDW-data. Inclusief het juiste product en altijd gratis verzending.",
  alternates: { canonical: "/kenteken-check" },
  openGraph: {
    title: "Gratis kentekencheck motorolie — BenzolPro",
    description:
      "Voer je kenteken in en zie direct welke motorolie bij jouw auto past. Gratis, op basis van officiële RDW-data.",
    type: "website",
  },
};

const STEPS = [
  { title: "Voer je kenteken in", text: "Typ je Nederlandse kenteken in het invoerveld hierboven." },
  { title: "Wij checken de RDW-data", text: "We halen merk, model, bouwjaar en brandstof op uit de officiële RDW open data." },
  { title: "Zie direct je olie", text: "Je krijgt meteen de aanbevolen viscositeit én het bijpassende Benzol-product te zien." },
];

const FAQS = [
  {
    q: "Is de kentekencheck gratis?",
    a: "Ja, de kentekencheck is volledig gratis en je hoeft niets in te vullen behalve je kenteken. Er worden geen gegevens opgeslagen.",
  },
  {
    q: "Welke gegevens gebruiken jullie?",
    a: "We gebruiken de officiële, openbare RDW-data (merk, model, bouwjaar en brandstofsoort). Op basis daarvan bepalen we een verantwoorde viscositeit.",
  },
  {
    q: "Klopt het advies altijd?",
    a: "Het advies is een gedegen indicatie op basis van bouwjaar en brandstof. Voor de exacte fabrieksnorm blijft je instructieboekje of de olievuldop leidend — zeker bij specifieke uitvoeringen.",
  },
  {
    q: "Werkt het ook voor elektrische auto's?",
    a: "Volledig elektrische auto's hebben geen motorolie nodig; dat geven we netjes aan. Voor hybrides adviseren we wél de juiste (vaak dunne) olie.",
  },
];

export default function KentekenCheckPage() {
  const pageUrl = absoluteUrl("/kenteken-check");
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kentekencheck", item: pageUrl },
    ],
  };
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kentekencheck motorolie",
    url: pageUrl,
    applicationCategory: "AutomotiveApplication",
    operatingSystem: "Web",
    inLanguage: "nl-NL",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description:
      "Gratis tool die op basis van de officiële RDW-data direct de juiste motorolie voor je kenteken toont.",
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Motorolie vinden op kenteken",
    inLanguage: "nl-NL",
    mainEntityOfPage: pageUrl,
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, webApp, howTo, faq]} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span> Kentekencheck
      </nav>

      <div className="mt-3 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <span className="chip w-fit"><CarIcon width={14} height={14} /> Gratis · RDW-data</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Welke motorolie past bij mijn kenteken?</h1>
          <p className="speakable-answer mt-3 max-w-xl text-lg leading-relaxed text-zinc-300">
            Voer je kenteken in en je ziet <strong>direct</strong> welke motorolie bij jouw auto past — gratis en op
            basis van de <strong>officiële RDW-data</strong>. Inclusief het juiste Benzol-product en altijd gratis
            verzending.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> 100% gratis — geen registratie, geen gegevens opgeslagen.</li>
            <li className="flex gap-2"><ShieldIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Gebaseerd op officiële, openbare RDW-data.</li>
            <li className="flex gap-2"><BoltIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Meteen het juiste product met de aanbevolen viscositeit.</li>
            <li className="flex gap-2"><TruckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Voor 22:00 besteld, morgen in huis — altijd gratis verzending.</li>
          </ul>
        </div>

        {/* de tool */}
        <PlateLookup />
      </div>

      {/* hoe werkt het */}
      <div className="mt-14 max-w-4xl">
        <h2 className="text-xl font-bold text-zinc-100">Hoe werkt de kentekencheck?</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card-surface p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-neon/10 text-sm font-extrabold text-neon">
                {i + 1}
              </span>
              <p className="mt-3 font-semibold text-zinc-100">{s.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* interne links */}
      <div className="mt-12 max-w-4xl rounded-2xl border border-ink-line bg-ink-card p-5">
        <p className="text-sm text-zinc-300">Liever zelf bladeren of meer weten?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/olie" className="inline-flex items-center gap-1.5 rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink">Motorolie per auto <ArrowRight width={14} height={14} /></Link>
          <Link href="/products" className="inline-flex items-center gap-1.5 rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink">Alle olie <ArrowRight width={14} height={14} /></Link>
          <Link href="/gids/wat-betekent-motorolie-viscositeit" className="inline-flex items-center gap-1.5 rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink">Wat betekent 5W30? <ArrowRight width={14} height={14} /></Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-100">Veelgestelde vragen</h2>
        <div className="mt-4 divide-y divide-ink-line rounded-2xl border border-ink-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-zinc-100 marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-neon transition group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-zinc-500">
        Let op: het advies is een indicatie op basis van bouwjaar en brandstof. Controleer altijd je instructieboekje of
        de olievuldop voor de exacte fabrieksnorm van jouw specifieke uitvoering.
      </p>
    </div>
  );
}
