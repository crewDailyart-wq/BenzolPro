import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  NORMS,
  getNorm,
  carsForNorm,
  suggestedProductsForNorm,
  sapsLabel,
} from "@/lib/norms";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckIcon, ArrowRight, DropIcon } from "@/components/icons";

export function generateStaticParams() {
  return NORMS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const norm = getNorm(params.slug);
  if (!norm) return { title: "Motorolie-normen" };
  const title = `${norm.code} — wat is het en welke olie heb je nodig?`;
  const description = `${norm.code}: ${norm.short} Bekijk voor welke auto's deze norm geldt en welke Benzol-olie eraan voldoet.`;
  return {
    title,
    description,
    alternates: { canonical: `/normen/${norm.slug}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "article" },
  };
}

export default function NormPage({ params }: { params: { slug: string } }) {
  const norm = getNorm(params.slug);
  if (!norm) notFound();

  const cars = carsForNorm(norm);
  const { products, exact: exactProducts } = suggestedProductsForNorm(norm);
  const related = (norm.related ?? []).map(getNorm).filter(Boolean) as NonNullable<ReturnType<typeof getNorm>>[];
  const url = absoluteUrl(`/normen/${norm.slug}`);
  const saps = sapsLabel(norm.saps);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Motorolie-normen", item: absoluteUrl("/normen") },
        { "@type": "ListItem", position: 3, name: norm.code, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: norm.code,
      description: norm.short,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Motorolie-normen encyclopedie",
        url: absoluteUrl("/normen"),
      },
      url,
      termCode: norm.code,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: norm.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Motorolie-normen", href: "/normen" }, { name: norm.code }]} />

      <article className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><DropIcon width={14} height={14} /> {norm.category}-norm · {norm.issuer}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{norm.code}</h1>
          <p className="mt-4 text-lg text-zinc-300">{norm.short}</p>
        </div>

        {/* kerngegevens */}
        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {saps && <Fact label="SAPS-niveau" value={saps} />}
          {norm.viscosities && <Fact label="Typische viscositeit" value={norm.viscosities.join(", ")} />}
          <Fact label="Uitgever" value={norm.issuer} />
          <Fact label="Type" value={`${norm.category}-norm`} />
        </div>

        <div className="mt-8 max-w-3xl space-y-4 text-zinc-300">
          <h2 className="text-xl font-bold text-zinc-100">Wat is {norm.code}?</h2>
          <p className="leading-relaxed">{norm.long}</p>
          <p className="text-sm text-zinc-500">
            <CheckIcon width={14} height={14} className="mb-0.5 mr-1 inline text-neon" />
            Let op: dit is een algemene uitleg. Het instructieboekje van je auto is altijd leidend.
          </p>
        </div>

        {/* matching producten */}
        {products.length > 0 && (
          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold">
              {exactProducts ? `Welke Benzol-olie voldoet aan ${norm.code}?` : "Geschikte Benzol-oliën"}
            </h2>
            {!exactProducts && (
              <p className="mt-1 text-sm text-zinc-400">
                Benzol-oliën in de juiste viscositeit ({norm.viscosities?.join(", ")}). Controleer altijd of de vereiste
                norm <strong>{norm.code}</strong> op de verpakking staat.
              </p>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="card-surface group flex items-center justify-between p-4 transition hover:border-neon/50">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-zinc-400">{p.viscosity} · {euro(sizePrice(p, defaultSize(p.sizesLiter)))}</p>
                  </div>
                  <ArrowRight width={16} height={16} className="text-neon transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* omgekeerde index: auto's die deze norm nodig hebben */}
        {cars.length > 0 && (
          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold">Auto&apos;s die {norm.code} nodig hebben</h2>
            <p className="mt-1 text-sm text-zinc-400">Een selectie uit onze database ({cars.length} modellen).</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cars.slice(0, 40).map((c) => (
                <Link
                  key={`${c.makeSlug}/${c.modelSlug}`}
                  href={`/olie/${c.makeSlug}/${c.modelSlug}`}
                  className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                >
                  {c.makeName} {c.modelName}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* verwante normen */}
        {related.length > 0 && (
          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-bold">Verwante normen</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/normen/${r.slug}`} className="inline-flex items-center gap-1 rounded-lg border border-ink-line bg-ink-card px-3 py-1.5 text-sm text-zinc-200 transition hover:border-neon/50">
                  {r.code} <ArrowRight width={13} height={13} className="text-neon" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Veelgestelde vragen</h2>
          <div className="mt-5 space-y-4">
            {norm.faq.map((f) => (
              <div key={f.q} className="card-surface p-5">
                <h3 className="font-semibold text-zinc-100">{f.q}</h3>
                <p className="mt-1.5 text-sm text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/kenteken-check" className="btn-neon">Welke olie voor mijn auto? <ArrowRight width={16} height={16} /></Link>
          <Link href="/normen" className="btn-ghost">Alle normen</Link>
        </div>
      </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-surface p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
