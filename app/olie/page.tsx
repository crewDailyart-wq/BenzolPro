import Link from "next/link";
import type { Metadata } from "next";
import { CAR_MAKES, carSlug, getAllModelEntries, getAllEngineEntries } from "@/lib/carModels";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Welke motorolie voor jouw auto?",
  description:
    "Vind per merk en model de aanbevolen Benzol motorolie. Van Volkswagen tot Toyota — bekijk direct welke olie past en bestel met altijd gratis verzending.",
  alternates: { canonical: "/olie" },
};

export default function OilByCarIndex() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Motorolie per auto", item: absoluteUrl("/olie") },
    ],
  };
  const modelCount = getAllModelEntries().length;
  const engineCount = getAllEngineEntries().length;
  // Dataset-schema: onze olie-per-auto-database als citeerbare dataset.
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Motorolie-adviesdatabase per auto",
    description: `Aanbevolen motorolie-viscositeit, fabrieksnorm en olie-inhoud voor ${CAR_MAKES.length} automerken, ${modelCount} modellen en ${engineCount} motoruitvoeringen. Samengesteld door ${SITE_NAME}.`,
    url: absoluteUrl("/olie"),
    inLanguage: "nl-NL",
    keywords: ["motorolie", "viscositeit", "olie per auto", "olie-inhoud", "5W30", "5W40"],
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    license: absoluteUrl("/olie"),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, dataset]} />
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span> Motorolie per auto
      </nav>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">Welke motorolie voor jouw auto?</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Kies je merk en model en zie direct de aanbevolen Benzol motorolie. Weet je je uitvoering niet zeker?{" "}
        <Link href="/" className="font-semibold text-neon hover:underline">
          Check je kenteken op de homepage
        </Link>{" "}
        voor een advies op maat via de officiële RDW-data.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAR_MAKES.map((make) => (
          <div key={make.name} className="card-surface p-5">
            <h2 className="text-lg font-bold">
              <Link href={`/olie/${carSlug(make.name)}`} className="transition hover:text-neon">
                {make.name}
              </Link>
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {make.models.map((m) => (
                <li key={m.model}>
                  <Link
                    href={`/olie/${carSlug(make.name)}/${carSlug(m.model)}`}
                    className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                  >
                    {m.model}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
