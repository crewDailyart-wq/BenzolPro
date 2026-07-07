import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPARE_PAIRS, getComparePair, VISCOSITY_INFO } from "@/lib/compare";
import { pickProductForViscosity } from "@/lib/carModels";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckIcon, ArrowRight, BoltIcon, DropIcon } from "@/components/icons";
import type { Viscosity } from "@/lib/types";

export function generateStaticParams() {
  return COMPARE_PAIRS.map((p) => ({ paar: p.slug }));
}

export function generateMetadata({ params }: { params: { paar: string } }): Metadata {
  const pair = getComparePair(params.paar);
  if (!pair) return { title: "Motorolie vergelijken" };
  const title = `${pair.a} of ${pair.b}? Verschil + welke jij nodig hebt`;
  const description = `${pair.a} of ${pair.b} motorolie: ${pair.intro} Bekijk het verschil en welke olie bij jouw auto past.`;
  return {
    title,
    description,
    alternates: { canonical: `/vergelijk/${pair.slug}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "article" },
  };
}

function ViscosityCard({ v }: { v: Viscosity }) {
  const info = VISCOSITY_INFO[v];
  const product = pickProductForViscosity(v);
  return (
    <div className="card-surface flex flex-col p-6">
      <h2 className="text-2xl font-extrabold text-neon">{v}</h2>
      <p className="mt-2 text-sm text-zinc-300">{info.summary}</p>
      <p className="mt-3 flex items-start gap-2 text-sm text-zinc-400">
        <BoltIcon width={16} height={16} className="mt-0.5 shrink-0 text-azure" /> {info.koudestart}
      </p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-zinc-400">Het best voor</p>
      <ul className="mt-2 space-y-1.5">
        {info.bestVoor.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
            <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-neon" /> {b}
          </li>
        ))}
      </ul>
      {product && (
        <div className="mt-5 flex items-center justify-between border-t border-ink-line pt-4">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-neon">{euro(sizePrice(product, defaultSize(product.sizesLiter)))}</p>
          </div>
          <Link href={`/product/${product.slug}`} className="btn-neon px-4 py-2 text-sm">
            Bekijk <ArrowRight width={14} height={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ComparePage({ params }: { params: { paar: string } }) {
  const pair = getComparePair(params.paar);
  if (!pair) notFound();
  const url = absoluteUrl(`/vergelijk/${pair.slug}`);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Olie vergelijken", item: absoluteUrl("/vergelijk") },
        { "@type": "ListItem", position: 3, name: `${pair.a} of ${pair.b}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Wat is het verschil tussen ${pair.a} en ${pair.b}?`,
          acceptedAnswer: { "@type": "Answer", text: pair.intro },
        },
        {
          "@type": "Question",
          name: `${pair.a} of ${pair.b} — welke moet ik hebben?`,
          acceptedAnswer: { "@type": "Answer", text: pair.verdict },
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Olie vergelijken", href: "/vergelijk" }, { name: `${pair.a} of ${pair.b}` }]} />

      <article className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><DropIcon width={14} height={14} /> Vergelijking</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{pair.a} of {pair.b}? Dit is het verschil</h1>
          <p className="mt-4 text-lg text-zinc-400">{pair.intro}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ViscosityCard v={pair.a} />
          <ViscosityCard v={pair.b} />
        </div>

        {/* verdict — antwoord-eerst */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-neon/30 bg-neon/5 p-6">
          <h2 className="text-lg font-bold text-neon">Welke moet jij hebben?</h2>
          <p className="mt-2 text-sm text-zinc-200">{pair.verdict}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-zinc-400">
            <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" />
            Twijfel je? <Link href="/kenteken-check" className="mx-1 font-semibold text-neon hover:underline">Check je kenteken</Link>
            en zie direct de juiste olie voor jóuw auto — het instructieboekje is altijd leidend.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/kenteken-check" className="btn-neon">Check je kenteken</Link>
          <Link href="/gids" className="btn-ghost">Naar de kennisbank</Link>
        </div>
      </article>
    </>
  );
}
