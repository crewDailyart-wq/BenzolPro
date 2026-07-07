import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllModelEntries,
  getModelBySlug,
  resolveOilCapacity,
  estimateOilChangeCost,
  FILTER_COST_EUR,
  LABOUR_COST_EUR,
} from "@/lib/carModels";
import { euro, sizePrice } from "@/lib/format";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { WrenchIcon, DropIcon, CheckIcon, ArrowRight } from "@/components/icons";

const YEAR = "2026";

export function generateStaticParams() {
  return getAllModelEntries().map((e) => ({ merk: e.makeSlug, model: e.modelSlug }));
}

export function generateMetadata({ params }: { params: { merk: string; model: string } }): Metadata {
  const entry = getModelBySlug(params.merk, params.model);
  if (!entry) return { title: "Kosten olie verversen" };
  const { make, model } = entry;
  const cap = resolveOilCapacity(model.oilCapacityL, model.fuel);
  const cost = estimateOilChangeCost(model.viscosity, cap.liters);
  const title = `Wat kost olie verversen ${make.name} ${model.model}? (${YEAR})`;
  const description = `Een olieverversing bij de ${make.name} ${model.model} kost ca. ${euro(cost.diyEur)} zelf of ${euro(cost.garageEur)} bij de garage. Bekijk de kostenopbouw en bespaar met ${SITE_NAME}.`;
  return {
    title,
    description,
    alternates: { canonical: `/kosten/${params.merk}/${params.model}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "article" },
  };
}

export default function CostPage({ params }: { params: { merk: string; model: string } }) {
  const entry = getModelBySlug(params.merk, params.model);
  if (!entry) notFound();
  const { make, model } = entry;
  const subject = `${make.name} ${model.model}`;
  const cap = resolveOilCapacity(model.oilCapacityL, model.fuel);
  const cost = estimateOilChangeCost(model.viscosity, cap.liters);
  const product = cost.product;
  const savings = Math.max(0, Math.round((cost.garageEur - cost.diyEur) * 100) / 100);
  const url = absoluteUrl(`/kosten/${params.merk}/${params.model}`);
  const liters = cap.liters.toLocaleString("nl-NL", { maximumFractionDigits: 2 });

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Kosten olie verversen", item: absoluteUrl("/kosten") },
        { "@type": "ListItem", position: 3, name: subject, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Wat kost een olieverversing bij de ${subject}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Zelf verversen kost ca. ${euro(cost.diyEur)} (${liters} L ${model.viscosity} olie + filter). Bij een garage betaal je ca. ${euro(cost.garageEur)} inclusief arbeid. Bedragen zijn indicaties.`,
          },
        },
        {
          "@type": "Question",
          name: `Hoeveel olie heeft de ${subject} nodig?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `De ${subject} heeft ${cap.estimated ? "naar schatting " : ""}circa ${liters} liter ${model.viscosity} motorolie nodig (inclusief filter).`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Kosten", href: "/kosten" }, { name: subject }]} />

      <article className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><WrenchIcon width={14} height={14} /> Kosten {YEAR}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Wat kost olie verversen bij de {subject}?</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Kort antwoord: <strong className="text-zinc-200">zelf ca. {euro(cost.diyEur)}</strong>, bij de garage{" "}
            <strong className="text-zinc-200">ca. {euro(cost.garageEur)}</strong>. Zelf doen bespaart je zo’n{" "}
            <strong className="text-neon">{euro(savings)}</strong>. Hieronder de opbouw.
          </p>
        </div>

        {/* kostenopbouw */}
        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
              <DropIcon width={16} height={16} className="text-azure" /> Zelf verversen
            </div>
            <p className="mt-2 text-3xl font-extrabold text-neon">± {euro(cost.diyEur)}</p>
            <table className="mt-3 w-full text-sm text-zinc-400">
              <tbody>
                <tr><td className="py-1">{liters} L {model.viscosity} olie</td><td className="py-1 text-right">{euro(cost.oilEur)}</td></tr>
                <tr><td className="py-1">Oliefilter</td><td className="py-1 text-right">{euro(cost.filterEur)}</td></tr>
                <tr className="border-t border-ink-line font-semibold text-zinc-200"><td className="py-1">Totaal</td><td className="py-1 text-right">{euro(cost.diyEur)}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
              <WrenchIcon width={16} height={16} className="text-azure" /> Bij de garage
            </div>
            <p className="mt-2 text-3xl font-extrabold">± {euro(cost.garageEur)}</p>
            <table className="mt-3 w-full text-sm text-zinc-400">
              <tbody>
                <tr><td className="py-1">Olie + filter</td><td className="py-1 text-right">{euro(cost.diyEur)}</td></tr>
                <tr><td className="py-1">Arbeid (indicatie)</td><td className="py-1 text-right">{euro(LABOUR_COST_EUR)}</td></tr>
                <tr className="border-t border-ink-line font-semibold text-zinc-200"><td className="py-1">Totaal</td><td className="py-1 text-right">{euro(cost.garageEur)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-xs text-zinc-500">
          Indicatie o.b.v. {liters} L {model.viscosity}, een filter van {euro(FILTER_COST_EUR)} en ca. {euro(LABOUR_COST_EUR)} arbeid.
          {cap.estimated ? " De olie-inhoud is een schatting — controleer je instructieboekje." : ""}
        </p>

        {/* product-CTA */}
        {product && (
          <div className="mt-8 flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-ink-line bg-ink-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-neon">Aanbevolen olie voor de {subject}</p>
              <p className="mt-1 text-lg font-bold">{product.name}</p>
              <p className="text-sm text-zinc-400">{model.viscosity} · vanaf {euro(sizePrice(product, product.sizesLiter[0]))}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/product/${product.slug}`} className="btn-neon">Bestel olie <ArrowRight width={16} height={16} /></Link>
              <Link href={`/olie/${params.merk}/${params.model}`} className="btn-ghost">Olie-advies</Link>
            </div>
          </div>
        )}

        <ul className="mt-8 max-w-3xl space-y-2 text-sm text-zinc-300">
          <li className="flex items-start gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Altijd gratis verzending — bestel de olie thuis en bespaar de garagemarge.</li>
          <li className="flex items-start gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Niet zeker van je uitvoering? <Link href="/kenteken-check" className="mx-1 font-semibold text-neon hover:underline">Check je kenteken</Link>.</li>
        </ul>
      </article>
    </>
  );
}
