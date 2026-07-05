import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllModelEntries,
  getModelBySlug,
  carSlug,
  viscosityReason,
} from "@/lib/carModels";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { oilChangeHowTo } from "@/lib/schema";
import OilAdviceBody from "@/components/OilAdviceBody";
import OilCapacityCost from "@/components/OilCapacityCost";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllModelEntries().map((e) => ({ merk: e.makeSlug, model: e.modelSlug }));
}

export function generateMetadata({ params }: { params: { merk: string; model: string } }): Metadata {
  const entry = getModelBySlug(params.merk, params.model);
  if (!entry) return { title: "Motorolie per auto" };
  const { make, model } = entry;
  const title = `Welke motorolie voor de ${make.name} ${model.model}? (${model.viscosity})`;
  const description = `Voor de ${make.name} ${model.model}${model.era ? ` (${model.era})` : ""} adviseren wij Benzol ${model.viscosity} motorolie. Bekijk het advies en bestel met altijd gratis verzending.`;
  return {
    title,
    description,
    alternates: { canonical: `/olie/${params.merk}/${params.model}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "article" },
  };
}

export default function ModelPage({ params }: { params: { merk: string; model: string } }) {
  const entry = getModelBySlug(params.merk, params.model);
  if (!entry) notFound();
  const { make, model } = entry;
  const otherModels = make.models.filter((m) => carSlug(m.model) !== params.model);
  const generations = model.generations ?? [];
  const engines = model.engines ?? [];
  const capacity = model.oilCapacityL;

  const pageUrl = absoluteUrl(`/olie/${params.merk}/${params.model}`);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Motorolie per auto", item: absoluteUrl("/olie") },
      { "@type": "ListItem", position: 3, name: make.name, item: absoluteUrl(`/olie/${params.merk}`) },
      { "@type": "ListItem", position: 4, name: model.model, item: pageUrl },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Welke motorolie heeft de ${make.name} ${model.model} nodig?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Voor de ${make.name} ${model.model} adviseren wij een ${model.viscosity} motorolie — ${viscosityReason(
            model.viscosity,
          )}. Controleer altijd je instructieboekje of de olievuldop voor de exacte fabrieksnorm.`,
        },
      },
      ...(capacity
        ? [
            {
              "@type": "Question",
              name: `Hoeveel liter olie gaat er in de ${make.name} ${model.model}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `De ${make.name} ${model.model} heeft bij een verversing inclusief filter circa ${capacity} liter ${model.viscosity} motorolie nodig.`,
              },
            },
          ]
        : []),
    ],
    // speakable: laat voice-assistenten de kernvraag/antwoord voorlezen
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-answer"] },
  };
  const schemas: object[] = [breadcrumb, faq];
  if (capacity) {
    schemas.push(oilChangeHowTo({ subject: `${make.name} ${model.model}`, viscosity: model.viscosity, capacityL: capacity, url: pageUrl }));
  }

  return (
    <div className="section-pad py-10">
      <JsonLd data={schemas} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/olie" className="hover:text-neon">Motorolie per auto</Link> <span className="mx-1">/</span>
        <Link href={`/olie/${params.merk}`} className="hover:text-neon">{make.name}</Link>{" "}
        <span className="mx-1">/</span> {model.model}
      </nav>

      <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
        Welke motorolie voor de {make.name} {model.model}?
      </h1>

      <OilAdviceBody subject={`${make.name} ${model.model}`} era={model.era} fuel={model.fuel} viscosity={model.viscosity} />

      {capacity && <OilCapacityCost subject={`${make.name} ${model.model}`} viscosity={model.viscosity} capacityL={capacity} />}

      {/* motoruitvoeringen (interne links + eigen pagina's) */}
      {engines.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Kies je motor</h2>
          <p className="mt-1 text-sm text-zinc-400">Het advies en de olie-inhoud verschillen per uitvoering — kies je motor voor de exacte aanbeveling.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {engines.map((e) => (
              <Link
                key={e.slug}
                href={`/olie/${params.merk}/${params.model}/motor/${e.slug}`}
                className="card-surface flex items-center justify-between gap-3 p-3.5 transition hover:border-neon/50"
              >
                <span>
                  <span className="block text-sm font-semibold text-zinc-100">{make.name} {model.model} {e.name}</span>
                  <span className="block text-[11px] text-zinc-500">
                    {e.power ? `${e.power} · ` : ""}{e.oilCapacityL ? `± ${e.oilCapacityL} L` : e.fuel}
                  </span>
                </span>
                <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[11px] font-bold text-neon">
                  {e.viscosity}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* generaties (interne links + eigen pagina's) */}
      {generations.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Kies je generatie</h2>
          <p className="mt-1 text-sm text-zinc-400">Het advies verschilt per bouwjaar — kies je generatie voor de exacte aanbeveling.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {generations.map((g) => (
              <Link
                key={g.slug}
                href={`/olie/${params.merk}/${params.model}/${g.slug}`}
                className="card-surface flex items-center justify-between gap-3 p-3.5 transition hover:border-neon/50"
              >
                <span>
                  <span className="block text-sm font-semibold text-zinc-100">{make.name} {g.name}</span>
                  <span className="block text-[11px] text-zinc-500">{g.era}</span>
                </span>
                <span className="rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[11px] font-bold text-neon">
                  {g.viscosity}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* andere modellen van dit merk */}
      {otherModels.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Andere {make.name}-modellen</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {otherModels.map((m) => (
              <li key={m.model}>
                <Link
                  href={`/olie/${params.merk}/${carSlug(m.model)}`}
                  className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                >
                  {make.name} {m.model}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
