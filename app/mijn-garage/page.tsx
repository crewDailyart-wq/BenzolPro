import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import MyGarage from "@/components/MyGarage";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mijn Garage: APK- en olieverversing-herinneringen",
  description:
    "Bewaar je auto('s) en mis nooit meer je APK of olieverversing. Gratis herinneringen per e-mail en agenda, met het juiste olie-advies. Op basis van RDW-data.",
  alternates: { canonical: "/mijn-garage" },
};

const BENEFITS = [
  "Nooit meer een APK-datum vergeten",
  "Weet precies wanneer je olie toe is",
  "Herinnering per e-mail én in je agenda",
  "Direct de juiste olie voor elke auto",
];

const FAQ = [
  { q: "Moet ik een account aanmaken?", a: "Nee. Je auto's worden lokaal in je browser bewaard. Wil je e-mailherinneringen, dan meld je alleen je e-mailadres aan." },
  { q: "Waar komt de APK-datum vandaan?", a: "Rechtstreeks uit de officiële RDW-data, op basis van je kenteken." },
  { q: "Hoe weet de site wanneer mijn olie toe is?", a: "Vul de datum van je laatste olieverversing in en kies een interval (standaard 12 maanden). We berekenen dan de volgende beurt." },
];

export default function MijnGaragePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Mijn Garage", item: absoluteUrl("/mijn-garage") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${SITE_NAME} — Mijn Garage`,
      url: absoluteUrl("/mijn-garage"),
      applicationCategory: "BrowserApplication",
      operatingSystem: "Web",
      inLanguage: "nl-NL",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description: "Bewaar je auto's en krijg gratis herinneringen voor APK en olieverversing.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Mijn Garage" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip">Gratis · RDW</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Mijn Garage</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Bewaar je auto(&apos;s) en mis nooit meer je APK of olieverversing. We onthouden je gegevens en sturen je op tijd
            een herinnering — met direct de juiste olie erbij.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 max-w-2xl">
          <MyGarage />
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold">Veelgestelde vragen</h2>
          <div className="mt-5 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="card-surface p-5">
                <h3 className="font-semibold text-zinc-100">{f.q}</h3>
                <p className="mt-1.5 text-sm text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
