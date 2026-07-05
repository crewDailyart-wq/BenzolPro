import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllGenerationEntries,
  getGenerationBySlug,
  viscosityReason,
} from "@/lib/carModels";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { oilChangeHowTo } from "@/lib/schema";
import OilAdviceBody from "@/components/OilAdviceBody";
import OilCapacityCost from "@/components/OilCapacityCost";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllGenerationEntries().map((e) => ({
    merk: e.makeSlug,
    model: e.modelSlug,
    generatie: e.genSlug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { merk: string; model: string; generatie: string };
}): Metadata {
  const entry = getGenerationBySlug(params.merk, params.model, params.generatie);
  if (!entry) return { title: "Motorolie per auto" };
  const { make, generation } = entry;
  const title = `Welke motorolie voor de ${make.name} ${generation.name}? (${generation.viscosity})`;
  const description = `Voor de ${make.name} ${generation.name} (${generation.era}) adviseren wij Benzol ${generation.viscosity} motorolie. Bekijk het advies en bestel met altijd gratis verzending.`;
  return {
    title,
    description,
    alternates: { canonical: `/olie/${params.merk}/${params.model}/${params.generatie}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "article" },
  };
}

export default function GenerationPage({
  params,
}: {
  params: { merk: string; model: string; generatie: string };
}) {
  const entry = getGenerationBySlug(params.merk, params.model, params.generatie);
  if (!entry) notFound();
  const { make, model, generation } = entry;
  const siblings = (model.generations ?? []).filter((g) => g.slug !== params.generatie);
  const capacity = generation.oilCapacityL ?? model.oilCapacityL;

  const pageUrl = absoluteUrl(`/olie/${params.merk}/${params.model}/${params.generatie}`);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Motorolie per auto", item: absoluteUrl("/olie") },
      { "@type": "ListItem", position: 3, name: make.name, item: absoluteUrl(`/olie/${params.merk}`) },
      { "@type": "ListItem", position: 4, name: model.model, item: absoluteUrl(`/olie/${params.merk}/${params.model}`) },
      { "@type": "ListItem", position: 5, name: generation.name, item: pageUrl },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Welke motorolie heeft de ${make.name} ${generation.name} (${generation.era}) nodig?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Voor de ${make.name} ${generation.name} adviseren wij een ${generation.viscosity} motorolie — ${viscosityReason(
            generation.viscosity,
          )}. Controleer altijd je instructieboekje of de olievuldop voor de exacte fabrieksnorm.`,
        },
      },
      ...(capacity
        ? [
            {
              "@type": "Question",
              name: `Hoeveel liter olie gaat er in de ${make.name} ${generation.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `De ${make.name} ${generation.name} heeft bij een verversing inclusief filter circa ${capacity} liter ${generation.viscosity} motorolie nodig.`,
              },
            },
          ]
        : []),
    ],
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-answer"] },
  };
  const schemas: object[] = [breadcrumb, faq];
  if (capacity) {
    schemas.push(oilChangeHowTo({ subject: `${make.name} ${generation.name}`, viscosity: generation.viscosity, capacityL: capacity, url: pageUrl }));
  }

  return (
    <div className="section-pad py-10">
      <JsonLd data={schemas} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/olie" className="hover:text-neon">Motorolie per auto</Link> <span className="mx-1">/</span>
        <Link href={`/olie/${params.merk}`} className="hover:text-neon">{make.name}</Link> <span className="mx-1">/</span>
        <Link href={`/olie/${params.merk}/${params.model}`} className="hover:text-neon">{model.model}</Link>{" "}
        <span className="mx-1">/</span> {generation.name}
      </nav>

      <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
        Welke motorolie voor de {make.name} {generation.name}?
      </h1>

      <OilAdviceBody
        subject={`${make.name} ${generation.name}`}
        era={generation.era}
        fuel={generation.fuel}
        viscosity={generation.viscosity}
      />

      {capacity && <OilCapacityCost subject={`${make.name} ${generation.name}`} viscosity={generation.viscosity} capacityL={capacity} />}

      {/* andere generaties van dit model */}
      {siblings.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Andere generaties {make.name} {model.model}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siblings.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/olie/${params.merk}/${params.model}/${g.slug}`}
                  className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                >
                  {g.name} <span className="text-zinc-500">· {g.era}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/olie/${params.merk}/${params.model}`} className="mt-4 inline-block text-sm font-medium text-neon hover:underline">
            ← Terug naar alle {make.name} {model.model}
          </Link>
        </div>
      )}
    </div>
  );
}
