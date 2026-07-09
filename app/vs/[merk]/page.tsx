import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRAND_COMPARES, getBrandCompare, compareRows } from "@/lib/brandCompare";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckIcon, CloseIcon, ArrowRight, DropIcon } from "@/components/icons";

export function generateStaticParams() {
  return BRAND_COMPARES.map((b) => ({ merk: b.slug }));
}

export function generateMetadata({ params }: { params: { merk: string } }): Metadata {
  const cmp = getBrandCompare(params.merk);
  if (!cmp) return { title: "Motorolie merken vergelijken" };
  const title = `Benzol vs ${cmp.competitor}: welke motorolie kiezen?`;
  const description = `Benzol of ${cmp.competitor}? Vergelijk prijs, normen, verzending en advies. ${cmp.verdict}`;
  return {
    title,
    description: description.slice(0, 155),
    alternates: { canonical: `/vs/${cmp.slug}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description: description.slice(0, 155), type: "article" },
  };
}

export default function BrandVsPage({ params }: { params: { merk: string } }) {
  const cmp = getBrandCompare(params.merk);
  if (!cmp) notFound();
  const rows = compareRows(cmp.competitor);
  const url = absoluteUrl(`/vs/${cmp.slug}`);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Merken vergelijken", item: absoluteUrl("/vs") },
        { "@type": "ListItem", position: 3, name: `Benzol vs ${cmp.competitor}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cmp.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Merken vergelijken", href: "/vs" }, { name: `Benzol vs ${cmp.competitor}` }]} />

      <article className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><DropIcon width={14} height={14} /> Merkvergelijking</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Benzol vs {cmp.competitor}: welke kies je?</h1>
          <p className="mt-4 text-lg text-zinc-400">
            {cmp.competitorNote} Hieronder vergelijken we eerlijk waar beide sterk in zijn — en waarom veel mensen voor
            Benzol via {SITE_NAME} kiezen.
          </p>
        </div>

        {/* vergelijkingstabel */}
        <div className="mt-8 max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink-line text-left">
                <th className="py-3 pr-4 font-semibold text-zinc-400">Kenmerk</th>
                <th className="py-3 pr-4 font-bold text-neon">Benzol</th>
                <th className="py-3 font-semibold text-zinc-200">{cmp.competitor}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-ink-line/50 align-top">
                  <td className="py-3 pr-4 text-zinc-300">{r.label}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-start gap-1.5">
                      {r.benzolYes ? <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-neon" /> : <CloseIcon width={14} height={14} className="mt-0.5 shrink-0 text-zinc-600" />}
                      <span className="font-medium text-zinc-100">{r.benzol}</span>
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="flex items-start gap-1.5">
                      {r.competitorYes ? <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-emerald-400" /> : <CloseIcon width={14} height={14} className="mt-0.5 shrink-0 text-zinc-600" />}
                      <span className="text-zinc-300">{r.competitor}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* edges */}
        <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold text-neon">Waarom Benzol?</h2>
            <ul className="mt-3 space-y-2">
              {cmp.benzolEdge.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-zinc-200">
                  <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-neon" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold text-zinc-200">Sterk aan {cmp.competitor}</h2>
            <ul className="mt-3 space-y-2">
              {cmp.competitorEdge.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckIcon width={15} height={15} className="mt-0.5 shrink-0 text-emerald-400" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* verdict */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-neon/30 bg-neon/5 p-6">
          <h2 className="text-lg font-bold text-neon">Ons eerlijke oordeel</h2>
          <p className="mt-2 text-sm text-zinc-200">{cmp.verdict}</p>
        </div>

        {/* FAQ */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Veelgestelde vragen</h2>
          <div className="mt-5 space-y-4">
            {cmp.faq.map((f) => (
              <div key={f.q} className="card-surface p-5">
                <h3 className="font-semibold text-zinc-100">{f.q}</h3>
                <p className="mt-1.5 text-sm text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/kenteken-check" className="btn-neon">Welke Benzol-olie voor mijn auto? <ArrowRight width={16} height={16} /></Link>
          <Link href="/vs" className="btn-ghost">Andere merken vergelijken</Link>
        </div>
      </article>
    </>
  );
}
