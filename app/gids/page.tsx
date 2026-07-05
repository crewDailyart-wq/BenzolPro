import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kennisbank — motorolie uitgelegd",
  description:
    "Alles over motorolie in gewone taal: hoe vaak verversen, 5W30 of 5W40, viscositeit, synthetisch vs. mineraal en de ACEA/API-normen. Praktische gidsen van BenzolPro.",
  alternates: { canonical: "/gids" },
};

export default function GuidesIndex() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kennisbank", item: absoluteUrl("/gids") },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: absoluteUrl(`/gids/${g.slug}`),
    })),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, itemList]} />
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span> Kennisbank
      </nav>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">Kennisbank</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Motorolie zonder ingewikkelde termen. In deze gidsen beantwoorden we de vragen die automobilisten het vaakst
        stellen — zodat je met een gerust hart de juiste keuze maakt. Weet je al wat je zoekt?{" "}
        <Link href="/olie" className="font-semibold text-neon hover:underline">
          Bekijk de olie voor jouw auto
        </Link>.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/gids/${g.slug}`}
            className="card-surface group flex flex-col p-5 transition hover:border-neon/50"
          >
            <span className="text-[11px] font-bold uppercase tracking-wide text-azure">
              {g.category} · {g.readingMinutes} min
            </span>
            <h2 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-neon">{g.title}</h2>
            <p className="mt-2 flex-1 text-sm text-zinc-400">{g.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon">
              Lees de gids <ArrowRight width={16} height={16} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
