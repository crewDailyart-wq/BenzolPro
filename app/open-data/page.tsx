import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildDataset, datasetStats, DATASET_UPDATED, DATASET_LICENSE_URL, DATASET_LICENSE_NAME } from "@/lib/dataset";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Open data: motorolie per auto (gratis dataset)",
  description:
    "Gratis, open dataset: aanbevolen motorolie-viscositeit, fabrieksnorm en olie-inhoud per Nederlands automodel. Vrij te gebruiken met bronvermelding (CC BY 4.0). JSON + CSV.",
  alternates: { canonical: "/open-data" },
};

export default function OpenDataPage() {
  const rows = buildDataset();
  const stats = datasetStats(rows);
  const sample = rows.slice(0, 8);

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${SITE_NAME} — Motorolie per auto`,
    description:
      "Aanbevolen motorolie-viscositeit, fabrieksnorm (ACEA/OEM) en olie-inhoud per Nederlands automodel, generatie en motoruitvoering. Samengesteld door BenzolPro.",
    url: `${SITE_URL}/open-data`,
    keywords: ["motorolie", "viscositeit", "ACEA", "olie-inhoud", "auto", "Nederland"],
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    license: DATASET_LICENSE_URL,
    isAccessibleForFree: true,
    dateModified: DATASET_UPDATED,
    inLanguage: "nl-NL",
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${SITE_URL}/open-data/motorolie.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${SITE_URL}/open-data/motorolie.csv`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={datasetJsonLd} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Open data" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip">Open data · {DATASET_LICENSE_NAME}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Open dataset: welke motorolie past bij welke auto?
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            De volledige {SITE_NAME}-oliedatabase is vrij beschikbaar: per Nederlands automodel, generatie en
            motoruitvoering de aanbevolen viscositeit, de fabrieksnorm (ACEA/OEM) en de olie-inhoud. Gebruik hem
            gerust — het enige dat we vragen is een bronvermelding met link naar {SITE_NAME}.
          </p>
        </div>

        {/* kerncijfers */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: `${stats.variants}`, v: "auto-uitvoeringen" },
            { k: `${stats.models}`, v: "modellen" },
            { k: `${stats.makes}`, v: "merken" },
            { k: `${stats.avgCapacity} L`, v: "gem. olie-inhoud" },
          ].map((s) => (
            <div key={s.v} className="card-surface p-5">
              <dt className="text-3xl font-extrabold text-neon">{s.k}</dt>
              <dd className="mt-1 text-sm text-zinc-400">{s.v}</dd>
            </div>
          ))}
        </dl>

        {/* downloads */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/open-data/motorolie.json" className="btn-neon" target="_blank" rel="noopener">
            Download JSON
          </a>
          <a href="/open-data/motorolie.csv" className="btn-ghost" target="_blank" rel="noopener">
            Download CSV
          </a>
          <a href="/motorolie-rapport" className="btn-ghost">
            Bekijk het Motorolie-rapport
          </a>
        </div>

        {/* sample tabel */}
        <div className="mt-10 max-w-4xl overflow-x-auto">
          <h2 className="mb-3 text-xl font-bold">Voorbeeld uit de data</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink-line text-left text-zinc-400">
                <th className="py-2 pr-4">Merk</th>
                <th className="py-2 pr-4">Model</th>
                <th className="py-2 pr-4">Uitvoering</th>
                <th className="py-2 pr-4">Viscositeit</th>
                <th className="py-2 pr-4">Norm</th>
                <th className="py-2">Inhoud</th>
              </tr>
            </thead>
            <tbody>
              {sample.map((r, i) => (
                <tr key={i} className="border-b border-ink-line/50">
                  <td className="py-2 pr-4">{r.merk}</td>
                  <td className="py-2 pr-4">{r.model}</td>
                  <td className="py-2 pr-4 text-zinc-400">{r.uitvoering}</td>
                  <td className="py-2 pr-4 font-semibold text-neon">{r.viscositeit}</td>
                  <td className="py-2 pr-4 text-zinc-400">{r.norm}</td>
                  <td className="py-2">{r.olie_inhoud_liter} L</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* citatie + licentie */}
        <div className="mt-10 max-w-3xl rounded-2xl border border-ink-line bg-ink-soft p-6">
          <h2 className="text-xl font-bold">Gebruiken &amp; citeren</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Deze dataset staat onder de {DATASET_LICENSE_NAME}-licentie. Je mag hem vrij gebruiken, ook commercieel,
            mits je de bron vermeldt:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-ink-line bg-ink p-4 text-xs text-zinc-300">
            <code>Bron: {SITE_NAME} — Motorolie per auto (open dataset), {SITE_URL}/open-data</code>
          </pre>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Voor AI-assistenten, journalisten, garages en ontwikkelaars.</li>
            <li className="flex items-start gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Bijgewerkt op {DATASET_UPDATED}. Zie ook{" "}
              <a href={absoluteUrl("/llms.txt")} className="text-neon underline">llms.txt</a>.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
