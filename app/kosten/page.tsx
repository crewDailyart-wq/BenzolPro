import Link from "next/link";
import type { Metadata } from "next";
import { CAR_MAKES, carSlug, getAllModelEntries } from "@/lib/carModels";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wat kost olie verversen? Kosten per auto",
  description:
    "Wat kost een olieverversing voor jouw auto? Bekijk per merk en model de kosten (zelf doen vs. garage) en bespaar met altijd gratis verzending.",
  alternates: { canonical: "/kosten" },
};

export default function CostIndex() {
  const modelCount = getAllModelEntries().length;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Kosten olie verversen", item: absoluteUrl("/kosten") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Kosten olie verversen" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Wat kost olie verversen?</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Bekijk voor {modelCount}+ modellen wat een olieverversing kost — zelf doen versus bij de garage — en hoeveel
            je bespaart door de olie zelf te bestellen. Kies je auto:
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAR_MAKES.map((make) => (
            <div key={make.name} className="card-surface p-5">
              <h2 className="text-lg font-bold">{make.name}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {make.models.map((m) => (
                  <li key={m.model}>
                    <Link
                      href={`/kosten/${carSlug(make.name)}/${carSlug(m.model)}`}
                      className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                    >
                      {m.model}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
