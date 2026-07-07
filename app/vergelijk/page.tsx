import Link from "next/link";
import type { Metadata } from "next";
import { COMPARE_PAIRS } from "@/lib/compare";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Motorolie vergelijken: welke viscositeit heb ik nodig?",
  description:
    "5W30 of 5W40? 0W20 of 5W30? Vergelijk de meest gestelde motorolie-keuzes, zie het verschil en ontdek welke viscositeit bij jouw auto past.",
  alternates: { canonical: "/vergelijk" },
};

export default function CompareIndex() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Olie vergelijken", item: absoluteUrl("/vergelijk") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Olie vergelijken" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Motorolie vergelijken</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Twijfel je tussen twee viscositeiten? Kies de vergelijking hieronder en zie precies het verschil — en welke
            olie bij jouw auto past.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPARE_PAIRS.map((p) => (
            <Link
              key={p.slug}
              href={`/vergelijk/${p.slug}`}
              className="card-surface group flex items-center justify-between p-5 transition hover:border-neon/50"
            >
              <span className="text-lg font-bold">
                {p.a} <span className="text-zinc-500">of</span> {p.b}?
              </span>
              <ArrowRight width={18} height={18} className="text-neon transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
