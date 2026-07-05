import Link from "next/link";
import type { Metadata } from "next";
import { getCities } from "@/lib/garages";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { BuildingIcon, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Olie verversen bij jou in de buurt",
  description:
    "Waar kun je je motorolie laten verversen? Bekijk de garages die met premium Benzol-olie rijden, per plaats. Van Rotterdam tot Antwerpen — vind een vakgarage bij jou in de buurt.",
  alternates: { canonical: "/olie-verversen" },
};

const COUNTRY_LABEL: Record<"NL" | "BE", string> = { NL: "Nederland", BE: "België" };

export default function OilChangeIndex() {
  const cities = getCities();
  const countries: ("NL" | "BE")[] = ["NL", "BE"];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Olie verversen", item: absoluteUrl("/olie-verversen") },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cities.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Olie verversen in ${c.city}`,
      url: absoluteUrl(`/olie-verversen/${c.slug}`),
    })),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, itemList]} />
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span> Olie verversen
      </nav>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">Olie verversen bij jou in de buurt</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Liever je olie laten verversen door een vakman? Deze garages rijden met premium Benzol-motorolie. Kies je plaats
        en vind een aangesloten garage — of{" "}
        <Link href="/#plate" className="font-semibold text-neon hover:underline">
          check eerst je kenteken
        </Link>{" "}
        voor de juiste olie.
      </p>

      {countries.map((country) => {
        const inCountry = cities.filter((c) => c.country === country);
        if (inCountry.length === 0) return null;
        return (
          <section key={country} className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">{COUNTRY_LABEL[country]}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inCountry.map((c) => (
                <Link
                  key={c.slug}
                  href={`/olie-verversen/${c.slug}`}
                  className="card-surface group flex items-center justify-between gap-3 p-4 transition hover:border-neon/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-soft text-azure">
                      <BuildingIcon width={18} height={18} />
                    </span>
                    <span>
                      <span className="block font-bold transition group-hover:text-neon">{c.city}</span>
                      <span className="block text-[11px] text-zinc-500">
                        {c.garages.length} {c.garages.length === 1 ? "garage" : "garages"}
                      </span>
                    </span>
                  </span>
                  <ArrowRight width={16} height={16} className="text-zinc-600 transition group-hover:text-neon" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-10 max-w-3xl rounded-2xl border border-ink-line bg-ink-card p-5">
        <p className="text-sm text-zinc-300">
          Zelf verversen? Bestel je Benzol-olie met altijd gratis verzending, of zoek eerst de juiste olie voor jouw
          auto.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/products" className="btn-neon">Bekijk alle olie <ArrowRight width={18} height={18} /></Link>
          <Link href="/olie" className="btn-azure">Olie per auto <ArrowRight width={18} height={18} /></Link>
        </div>
      </div>
    </div>
  );
}
