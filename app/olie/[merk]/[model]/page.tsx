import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllModelEntries,
  getModelBySlug,
  getMakeBySlug,
  carSlug,
  viscosityReason,
  pickProductForViscosity,
} from "@/lib/carModels";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import ProductVisual from "@/components/ProductVisual";
import JsonLd from "@/components/JsonLd";
import { CheckIcon, TruckIcon, ArrowRight, CarIcon } from "@/components/icons";

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
  const product = pickProductForViscosity(model.viscosity);
  const stdSize = product ? defaultSize(product.sizesLiter) : 5;
  const price = product ? euro(sizePrice(product, stdSize)) : null;

  const otherModels = make.models.filter((m) => carSlug(m.model) !== params.model);

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
    ],
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, faq]} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/olie" className="hover:text-neon">Motorolie per auto</Link> <span className="mx-1">/</span>
        <Link href={`/olie/${params.merk}`} className="hover:text-neon">{make.name}</Link>{" "}
        <span className="mx-1">/</span> {model.model}
      </nav>

      <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
        Welke motorolie voor de {make.name} {model.model}?
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-300">
        Voor de <strong>{make.name} {model.model}</strong>
        {model.era ? ` (${model.era}, ${model.fuel})` : ` (${model.fuel})`} adviseren wij{" "}
        <strong className="text-neon">Benzol {model.viscosity}</strong> motorolie — {viscosityReason(model.viscosity)}.
      </p>

      {/* aanbevolen product */}
      {product && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Onze aanbeveling</h2>
          <div className="card-surface mt-3 flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
            <div className="h-28 w-28 shrink-0 self-center rounded-xl bg-ink-soft p-2">
              <ProductVisual product={product} className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold">{product.name}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{product.specs.slice(0, 4).join(" · ")}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xl font-extrabold text-neon">{price}</span>
                <span className="rounded-full border border-azure/40 bg-azure/10 px-2 py-0.5 text-[11px] font-bold text-azure">
                  {model.viscosity}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TruckIcon width={13} height={13} /> Altijd gratis verzending
                </span>
              </div>
            </div>
            <Link href={`/product/${product.slug}`} className="btn-neon shrink-0 self-stretch sm:self-center">
              Bekijk &amp; bestel <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      )}

      {/* kenteken-CTA */}
      <div className="mt-8 max-w-3xl">
        <div className="card-surface flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-zinc-300">
            <CarIcon width={20} height={20} className="text-azure" />
            Niet zeker welke uitvoering of motor je hebt? Check je kenteken voor een advies op maat.
          </p>
          <Link href="/" className="btn-azure shrink-0">
            Kenteken checken <ArrowRight width={18} height={18} />
          </Link>
        </div>
      </div>

      {/* waarom deze olie */}
      <div className="mt-8 max-w-3xl rounded-2xl border border-ink-line bg-ink-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Waarom {model.viscosity} voor deze auto?</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> {viscosityReason(model.viscosity)}.</li>
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Voldoet aan de officiële ACEA-, API- en OEM-specificaties.</li>
          <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Altijd gratis verzending, voor 22:00 besteld is morgen in huis.</li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Let op: dit is een algemeen advies op basis van bouwjaar en brandstof. Controleer altijd je instructieboekje of
          de olievuldop voor de exacte fabrieksnorm van jouw specifieke uitvoering.
        </p>
      </div>

      {/* andere modellen van dit merk (interne links) */}
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
