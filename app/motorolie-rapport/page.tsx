import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildDataset, datasetStats, DATASET_UPDATED, type Distribution } from "@/lib/dataset";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

const YEAR = "2026";

export const metadata: Metadata = {
  title: `Nederlands Motorolie-rapport ${YEAR}`,
  description: `Welke motorolie rijdt Nederland? Cijfers en trends over viscositeit, fabrieksnormen en olie-inhoud, op basis van de ${SITE_NAME}-database. Vrij te citeren met bronvermelding.`,
  alternates: { canonical: "/motorolie-rapport" },
};

function Bar({ item, max, accent = "bg-neon" }: { item: Distribution; max: number; accent?: string }) {
  const width = Math.max(4, Math.round((item.count / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm font-semibold">{item.label}</span>
      <div className="h-6 flex-1 overflow-hidden rounded-full bg-ink-soft">
        <div className={`h-full rounded-full ${accent}`} style={{ width: `${width}%` }} />
      </div>
      <span className="w-16 shrink-0 text-right text-sm text-zinc-400">{item.pct}%</span>
    </div>
  );
}

export default function ReportPage() {
  const rows = buildDataset();
  const stats = datasetStats(rows);
  const visMax = stats.viscosityDistribution[0]?.count ?? 1;
  const fuelMax = stats.fuelDistribution[0]?.count ?? 1;
  const topVis = stats.viscosityDistribution[0];
  const url = absoluteUrl("/motorolie-rapport");

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Nederlands Motorolie-rapport ${YEAR}`,
      description: `Cijfers en trends over motorolie in Nederland, op basis van de ${SITE_NAME}-database van ${stats.variants} auto-uitvoeringen.`,
      inLanguage: "nl-NL",
      datePublished: DATASET_UPDATED,
      dateModified: DATASET_UPDATED,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/opengraph-image` },
      mainEntityOfPage: url,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#kernconclusies"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: `Nederlands Motorolie-rapport ${YEAR} — brondata`,
      description: "Verdeling van viscositeit, brandstof, fabrieksnormen en olie-inhoud in de BenzolPro-database.",
      url,
      creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: `Motorolie-rapport ${YEAR}` }]} />

      <article className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip">Onderzoek · {YEAR}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Het Nederlandse Motorolie-rapport {YEAR}</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Welke motorolie heeft de gemiddelde Nederlandse auto nodig? We analyseerden onze database van{" "}
            <strong className="text-zinc-200">{stats.variants} auto-uitvoeringen</strong> over {stats.models} modellen en{" "}
            {stats.makes} merken. Dit zijn de belangrijkste bevindingen.
          </p>
        </div>

        {/* Kernconclusies — antwoord-eerst blok (ook voor AI/voice) */}
        <div id="kernconclusies" className="mt-8 max-w-3xl rounded-2xl border border-neon/30 bg-neon/5 p-6">
          <h2 className="text-lg font-bold text-neon">Kernconclusies</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            <li>
              • <strong>{topVis?.label}</strong> is met afstand de meest voorgeschreven viscositeit — {topVis?.pct}% van
              alle auto-uitvoeringen in de database.
            </li>
            <li>
              • De gemiddelde auto heeft <strong>{stats.avgCapacity} liter</strong> motorolie nodig (spreiding{" "}
              {stats.minCapacity}–{stats.maxCapacity} L).
            </li>
            <li>
              • De meest voorkomende fabrieksnorm is <strong>{stats.topNorms[0]?.label}</strong>.
            </li>
            <li>
              • Voor {stats.exactCapacityShare}% van de uitvoeringen is een exacte olie-inhoud bekend; de rest is een
              onderbouwde schatting per brandstoftype.
            </li>
          </ul>
        </div>

        {/* Viscositeit-verdeling */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Welke viscositeit rijdt Nederland?</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Verdeling van de aanbevolen viscositeit over alle {stats.variants} uitvoeringen.
          </p>
          <div className="mt-5 space-y-2.5">
            {stats.viscosityDistribution.map((d) => (
              <Bar key={d.label} item={d} max={visMax} />
            ))}
          </div>
        </section>

        {/* Brandstof-verdeling */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Verdeling naar brandstof</h2>
          <div className="mt-5 space-y-2.5">
            {stats.fuelDistribution.map((d) => (
              <Bar key={d.label} item={d} max={fuelMax} accent="bg-azure" />
            ))}
          </div>
        </section>

        {/* Top normen */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Meest voorkomende fabrieksnormen</h2>
          <p className="mt-2 text-sm text-zinc-400">De ACEA/OEM-normen die het vaakst worden voorgeschreven.</p>
          <div className="mt-5 space-y-2.5">
            {stats.topNorms.map((d) => (
              <Bar key={d.label} item={d} max={stats.topNorms[0]?.count ?? 1} />
            ))}
          </div>
        </section>

        {/* Methode + citatie (backlink-bait) */}
        <section className="mt-12 max-w-3xl rounded-2xl border border-ink-line bg-ink-soft p-6">
          <h2 className="text-xl font-bold">Over dit rapport</h2>
          <p className="mt-2 text-sm text-zinc-400">
            De cijfers zijn berekend uit de openbare {SITE_NAME}-oliedatabase (bijgewerkt {DATASET_UPDATED}), gebaseerd
            op fabrieksnormen en RDW-brandstofgegevens. De volledige brondata is vrij beschikbaar op onze{" "}
            <a href={absoluteUrl("/open-data")} className="text-neon underline">
              open-data-pagina
            </a>{" "}
            (JSON &amp; CSV).
          </p>
          <p className="mt-4 text-sm font-semibold text-zinc-200">Journalist of blogger? Je mag deze cijfers vrij overnemen.</p>
          <p className="mt-1 text-sm text-zinc-400">Graag met bronvermelding:</p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-ink-line bg-ink p-4 text-xs text-zinc-300">
            <code>Bron: Nederlands Motorolie-rapport {YEAR}, {SITE_NAME} — {SITE_URL}/motorolie-rapport</code>
          </pre>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/kenteken-check" className="btn-neon">Check je eigen kenteken</a>
          <a href="/open-data" className="btn-ghost">Bekijk de open data</a>
        </div>
      </article>
    </>
  );
}
