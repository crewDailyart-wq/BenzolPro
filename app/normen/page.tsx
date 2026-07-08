import Link from "next/link";
import type { Metadata } from "next";
import { NORMS, normsByCategory } from "@/lib/norms";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, DropIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Motorolie-normen encyclopedie: ACEA, API & fabrieksnormen uitgelegd",
  description:
    "Alle motorolie-normen op één plek: ACEA (C3, A3/B4…), API (SP, SQ…) en fabrieksnormen (VW 504.00/507.00, BMW LL-04, MB 229.51…). Wat ze betekenen en welke olie je nodig hebt.",
  alternates: { canonical: "/normen" },
};

const CATEGORY_INTRO: Record<string, string> = {
  OEM: "Fabrieksnormen (OEM) — de eigen eisen van automerken zoals VW, BMW en Mercedes.",
  ACEA: "ACEA-klassen — de Europese prestatie- en SAPS-normen.",
  API: "API- & ILSAC-klassen — de Amerikaanse/Japanse normen.",
};

export default function NormenIndex() {
  const groups = normsByCategory();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Motorolie-normen", item: absoluteUrl("/normen") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "Motorolie-normen encyclopedie",
      description:
        "Uitleg van alle gangbare motorolie-normen (ACEA, API, fabrieksnormen) met per norm welke auto's hem nodig hebben en welke olie eraan voldoet.",
      url: absoluteUrl("/normen"),
      inLanguage: "nl-NL",
      creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      hasDefinedTerm: NORMS.map((n) => ({
        "@type": "DefinedTerm",
        name: n.code,
        termCode: n.code,
        url: absoluteUrl(`/normen/${n.slug}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Motorolie-normen" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><DropIcon width={14} height={14} /> Kennisbank</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Motorolie-normen encyclopedie</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Wat betekent <strong className="text-zinc-200">ACEA C3</strong>, <strong className="text-zinc-200">API SP</strong> of{" "}
            <strong className="text-zinc-200">VW 504.00/507.00</strong>? Hier vind je alle gangbare motorolie-normen
            uitgelegd — met per norm welke auto&apos;s hem nodig hebben en welke Benzol-olie eraan voldoet.
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            Weet je je norm niet? <Link href="/kenteken-check" className="font-semibold text-neon hover:underline">Check je kenteken</Link> voor een advies op maat.
          </p>
        </div>

        {groups.map((g) => (
          <section key={g.category} className="mt-10">
            <h2 className="text-xl font-bold">{g.category}</h2>
            <p className="mt-1 text-sm text-zinc-500">{CATEGORY_INTRO[g.category]}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.norms.map((n) => (
                <Link
                  key={n.slug}
                  href={`/normen/${n.slug}`}
                  className="card-surface group flex flex-col p-5 transition hover:border-neon/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-neon">{n.code}</span>
                    <ArrowRight width={16} height={16} className="text-neon transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 flex-1 text-sm text-zinc-400">{n.short}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
