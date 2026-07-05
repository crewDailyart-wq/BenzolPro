import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCities, getCityBySlug, garageInitials, type CityEntry } from "@/lib/garages";
import { estimateOilChangeCost } from "@/lib/carModels";
import { euro } from "@/lib/format";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { BuildingIcon, WrenchIcon, CarIcon, CheckIcon, TruckIcon, ArrowRight } from "@/components/icons";

const COUNTRY_LABEL: Record<"NL" | "BE", string> = { NL: "Nederland", BE: "België" };

export function generateStaticParams() {
  return getCities().map((c) => ({ stad: c.slug }));
}

export function generateMetadata({ params }: { params: { stad: string } }): Metadata {
  const city = getCityBySlug(params.stad);
  if (!city) return { title: "Olie verversen" };
  const n = city.garages.length;
  const title = `Olie verversen in ${city.city} — ${n} Benzol-${n === 1 ? "garage" : "garages"}`;
  const description = `Waar kun je in ${city.city} je motorolie laten verversen? Bekijk de ${n} ${
    n === 1 ? "garage die" : "garages die"
  } met premium Benzol-olie ${n === 1 ? "rijdt" : "rijden"}, plus wat een verversing kost en welke olie jouw auto nodig heeft.`;
  return {
    title,
    description,
    alternates: { canonical: `/olie-verversen/${city.slug}` },
    openGraph: { title: `${title} — ${SITE_NAME}`, description, type: "website" },
  };
}

/** schema.org AutoRepair-node voor één garage in deze plaats. */
function autoRepairNode(name: string, city: CityEntry) {
  const node: Record<string, unknown> = {
    "@type": "AutoRepair",
    name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.city,
      addressCountry: city.country,
    },
    areaServed: city.city,
    makesOffer: {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Motorolie verversen met Benzol-olie" },
    },
  };
  if (city.coords) {
    node.geo = { "@type": "GeoCoordinates", latitude: city.coords[1], longitude: city.coords[0] };
  }
  return node;
}

export default function CityPage({ params }: { params: { stad: string } }) {
  const city = getCityBySlug(params.stad);
  if (!city) notFound();

  const n = city.garages.length;
  const others = getCities().filter((c) => c.slug !== city.slug).slice(0, 8);
  // indicatieve kosten voor een doorsnee auto (5W30, ± 4,5 L)
  const cost = estimateOilChangeCost("5W30", 4.5);

  const pageUrl = absoluteUrl(`/olie-verversen/${city.slug}`);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Olie verversen", item: absoluteUrl("/olie-verversen") },
      { "@type": "ListItem", position: 3, name: city.city, item: pageUrl },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Waar kan ik in ${city.city} mijn motorolie laten verversen?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In ${city.city} ${n === 1 ? "is er een garage die" : `zijn er ${n} garages die`} met premium Benzol-motorolie ${
            n === 1 ? "rijdt" : "rijden"
          }: ${city.garages.map((g) => g.name).join(", ")}. Zij verversen je olie met de juiste specificatie voor jouw auto.`,
        },
      },
      {
        "@type": "Question",
        name: `Wat kost een olieverversing in ${city.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Reken voor een doorsnee auto op circa ${euro(cost.garageEur)} bij de garage (olie, filter en arbeid). Zelf verversen kan vanaf ± ${euro(cost.diyEur)} aan olie en filter. Dit is een indicatie; de exacte prijs hangt af van je motor en olie-inhoud.`,
        },
      },
      {
        "@type": "Question",
        name: "Hoe weet ik welke olie mijn auto nodig heeft?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check je kenteken op de homepage voor een advies op maat via de officiële RDW-data, of zoek je auto op onder 'Motorolie per auto'.",
        },
      },
    ],
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Olie verversen in ${city.city}`,
    url: pageUrl,
    about: city.garages.map((g) => autoRepairNode(g.name, city)),
  };

  return (
    <div className="section-pad py-10">
      <JsonLd data={[breadcrumb, faq, collection]} />

      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-neon">Home</Link> <span className="mx-1">/</span>
        <Link href="/olie-verversen" className="hover:text-neon">Olie verversen</Link> <span className="mx-1">/</span>{" "}
        {city.city}
      </nav>

      <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">Olie verversen in {city.city}</h1>
      <p className="speakable-answer mt-3 max-w-3xl text-lg leading-relaxed text-zinc-300">
        In <strong>{city.city}</strong> {n === 1 ? "rijdt " : "rijden "}
        <strong className="text-neon">{n} {n === 1 ? "garage" : "garages"}</strong> met premium Benzol-motorolie. Laat je
        olie verversen door een vakman, of bestel de juiste olie en doe het zelf — altijd met gratis verzending.
      </p>

      {/* garages in deze plaats */}
      <div className="mt-8 max-w-3xl">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">
          Benzol-garages in {city.city} ({COUNTRY_LABEL[city.country]})
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {city.garages.map((g) => (
            <div key={g.name} className="card-surface flex items-center gap-3 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink-soft text-sm font-bold text-azure">
                {garageInitials(g.name)}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 truncate font-semibold text-zinc-100">
                  <BuildingIcon width={14} height={14} className="shrink-0 text-zinc-500" /> {g.name}
                </span>
                <span className="text-[11px] text-zinc-500">{city.city} · rijdt met Benzol-olie</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* wat kost het */}
      <div className="mt-8 max-w-3xl">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Wat kost olie verversen in {city.city}?</h2>
        <div className="card-surface mt-3 grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <WrenchIcon width={15} height={15} className="text-azure" /> Bij de garage
            </p>
            <p className="mt-1 text-2xl font-extrabold text-neon">± {euro(cost.garageEur)}</p>
            <p className="text-xs text-zinc-500">olie, filter en arbeid — doorsnee auto</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <TruckIcon width={15} height={15} className="text-azure" /> Zelf doen
            </p>
            <p className="mt-1 text-2xl font-extrabold text-neon">± {euro(cost.diyEur)}</p>
            <p className="text-xs text-zinc-500">olie + filter, gratis bezorgd</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Indicatie voor een doorsnee auto (5W30, ± 4,5 L). De exacte prijs hangt af van je motor en olie-inhoud —{" "}
          <Link href="/olie" className="font-semibold text-neon hover:underline">bekijk het per model</Link>.
        </p>
      </div>

      {/* CTA's */}
      <div className="mt-8 max-w-3xl">
        <div className="card-surface flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-zinc-300">
            <CarIcon width={20} height={20} className="text-azure" />
            Weet je welke olie je nodig hebt? Check je kenteken of bestel direct.
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link href="/#plate" className="btn-azure">Kenteken checken</Link>
            <Link href="/products" className="btn-neon">Bestel olie</Link>
          </div>
        </div>
      </div>

      <ul className="mt-8 max-w-3xl space-y-2 text-sm text-zinc-300">
        <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Premium Benzol-olie die voldoet aan de officiële ACEA-, API- en OEM-normen.</li>
        <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Aangesloten garages in {city.city} en omgeving.</li>
        <li className="flex gap-2"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> Zelf doen? Voor 22:00 besteld is morgen in huis, altijd gratis verzending.</li>
      </ul>

      {/* andere plaatsen */}
      {others.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">Olie verversen in andere plaatsen</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/olie-verversen/${c.slug}`}
                  className="inline-block rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200 transition hover:bg-neon hover:text-ink"
                >
                  {c.city}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/olie-verversen" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon hover:underline">
            Alle plaatsen <ArrowRight width={16} height={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
