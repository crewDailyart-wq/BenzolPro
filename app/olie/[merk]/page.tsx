import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getMakeEntries,
  getMakeBySlug,
  carSlug,
  pickProductForViscosity,
} from "@/lib/carModels";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getMakeEntries().map((e) => ({ merk: e.slug }));
}

export function generateMetadata({ params }: { params: { merk: string } }): Metadata {
  const make = getMakeBySlug(params.merk);
  if (!make) return { title: "Motorolie per auto" };
  return {
    title: `Motorolie voor je ${make.name}`,
    description: `Welke motorolie past bij jouw ${make.name}? Bekijk per model de aanbevolen Benzol olie en bestel met altijd gratis verzending.`,
    alternates: { canonical: `/olie/${params.merk}` },
  };
}

export default function MakePage({ params }: { params: { merk: string } }) {
  const make = getMakeBySlug(params.merk);
  if (!make) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Motorolie per auto", item: absoluteUrl("/olie") },
      { "@type": "ListItem", position: 3, name: make.name, item: absoluteUrl(`/olie/${params.merk}`) },
    ],
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={breadcrumb} />
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/olie" className="hover:text-neon">Motorolie per auto</Link> <span className="mx-1">/</span> {make.name}
      </nav>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">Motorolie voor je {make.name}</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Kies hieronder je model om de aanbevolen Benzol motorolie te zien. Twijfel je over de uitvoering?{" "}
        <Link href="/" className="font-semibold text-neon hover:underline">
          Check je kenteken
        </Link>{" "}
        voor advies op maat.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {make.models.map((m) => {
          const product = pickProductForViscosity(m.viscosity);
          const price = product ? euro(sizePrice(product, defaultSize(product.sizesLiter))) : null;
          return (
            <Link
              key={m.model}
              href={`/olie/${params.merk}/${carSlug(m.model)}`}
              className="card-surface group p-5 transition hover:border-neon/50 hover:shadow-neon"
            >
              <p className="text-lg font-bold transition group-hover:text-neon">
                {make.name} {m.model}
              </p>
              {m.era && <p className="text-xs text-zinc-500">{m.era}</p>}
              <p className="mt-3 text-sm text-zinc-300">
                Aanbevolen: <span className="font-bold text-neon">Benzol {m.viscosity}</span>
              </p>
              {price && <p className="mt-1 text-sm text-zinc-400">vanaf {price}</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
