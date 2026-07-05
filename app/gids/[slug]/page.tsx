import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES, getGuideBySlug, relatedGuides, sectionSlug } from "@/lib/guides";
import { pickProductForViscosity } from "@/lib/carModels";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ProductVisual from "@/components/ProductVisual";
import { ArrowRight, CarIcon, CheckIcon, TruckIcon } from "@/components/icons";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Kennisbank" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/gids/${guide.slug}` },
    openGraph: { title: `${guide.title} — ${SITE_NAME}`, description: guide.description, type: "article" },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const pageUrl = absoluteUrl(`/gids/${guide.slug}`);
  const related = relatedGuides(guide.slug);

  // aanbevolen producten op basis van de gekoppelde viscositeiten (ontdubbeld)
  const products = Array.from(
    new Map(
      (guide.relatedViscosities ?? [])
        .map((v) => pickProductForViscosity(v))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .map((p) => [p.slug, p]),
    ).values(),
  );

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kennisbank", item: absoluteUrl("/gids") },
      { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
    ],
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    datePublished: guide.updated,
    inLanguage: "nl-NL",
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, article, faq]} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/gids" className="hover:text-neon">Kennisbank</Link> <span className="mx-1">/</span>{" "}
        {guide.category}
      </nav>

      <article className="mt-3 max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-wide text-azure">
          {guide.category} · {guide.readingMinutes} min lezen
        </span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{guide.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-300">{guide.intro}</p>

        {/* inhoudsopgave */}
        {guide.sections.length > 2 && (
          <nav className="mt-8 rounded-2xl border border-ink-line bg-ink-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">In deze gids</h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {guide.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${sectionSlug(s.heading)}`} className="text-zinc-300 transition hover:text-neon">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* secties */}
        {guide.sections.map((s) => (
          <section key={s.heading} className="mt-8 scroll-mt-24" id={sectionSlug(s.heading)}>
            <h2 className="text-xl font-bold text-zinc-100">{s.heading}</h2>
            {s.body.filter(Boolean).map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-zinc-300">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-2 text-zinc-300">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckIcon width={16} height={16} className="mt-1 shrink-0 text-neon" /> {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* aanbevolen producten */}
        {products.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Passende Benzol-olie</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {products.map((p) => {
                const price = euro(sizePrice(p, defaultSize(p.sizesLiter)));
                return (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    className="card-surface flex items-center gap-4 p-4 transition hover:border-neon/50"
                  >
                    <div className="h-20 w-20 shrink-0 rounded-xl bg-ink-soft p-2">
                      <ProductVisual product={p} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{p.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-extrabold text-neon">{price}</span>
                        <span className="rounded-full border border-azure/40 bg-azure/10 px-2 py-0.5 text-[11px] font-bold text-azure">
                          {p.viscosity}
                        </span>
                      </div>
                      <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <TruckIcon width={12} height={12} /> Altijd gratis verzending
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* kenteken-CTA */}
        <div className="mt-10 rounded-2xl border border-ink-line bg-ink-card p-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-zinc-300">
              <CarIcon width={20} height={20} className="text-azure" />
              Weet je niet zeker welke olie jouw auto nodig heeft? Check je kenteken voor een advies op maat.
            </p>
            <Link href="/" className="btn-azure shrink-0">
              Kenteken checken <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-zinc-100">Veelgestelde vragen</h2>
          <div className="mt-4 divide-y divide-ink-line rounded-2xl border border-ink-line">
            {guide.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-zinc-100 marker:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {f.q}
                    <span className="text-neon transition group-open:rotate-45">＋</span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-500">
          Dit artikel is algemeen voorlichtend. Controleer altijd je instructieboekje of de olievuldop voor de exacte
          fabrieksnorm en viscositeit van jouw specifieke uitvoering.
        </p>
      </article>

      {/* verwante gidsen */}
      {related.length > 0 && (
        <div className="mt-14 max-w-5xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Lees ook</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/gids/${g.slug}`}
                className="card-surface group flex flex-col p-5 transition hover:border-neon/50"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-azure">{g.category}</span>
                <h3 className="mt-1.5 font-bold leading-snug transition group-hover:text-neon">{g.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neon">
                  Lees verder <ArrowRight width={15} height={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
