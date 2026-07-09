import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_COMPARES } from "@/lib/brandCompare";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, DropIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Motorolie merken vergelijken: Benzol vs Kroon-Oil, Castrol & meer",
  description:
    "Benzol vs de bekende oliemerken (Kroon-Oil, Castrol, Total, Mobil 1, Motul, Liqui Moly…). Eerlijke vergelijking van prijs, normen, verzending en advies.",
  alternates: { canonical: "/vs" },
};

export default function VsIndex() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Merken vergelijken", item: absoluteUrl("/vs") },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Merken vergelijken" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><DropIcon width={14} height={14} /> Merkvergelijking</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Benzol vs andere oliemerken</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Twijfel je tussen Benzol en een bekend merk? We vergelijken eerlijk op prijs, normen, verzending en advies —
            en zijn duidelijk over waar het andere merk sterk in is.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_COMPARES.map((b) => (
            <Link key={b.slug} href={`/vs/${b.slug}`} className="card-surface group flex items-center justify-between p-5 transition hover:border-neon/50">
              <span className="text-lg font-bold">
                Benzol <span className="text-zinc-500">vs</span> {b.competitor}
              </span>
              <ArrowRight width={18} height={18} className="text-neon transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
