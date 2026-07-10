import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TOOLS, type ToolIcon } from "@/lib/tools";
import { GUIDES } from "@/lib/guides";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import {
  ShieldIcon,
  ClipboardIcon,
  SparkIcon,
  FileIcon,
  WrenchIcon,
  CarIcon,
  CertificateIcon,
  SlidersIcon,
  DropIcon,
  GlobeIcon,
  StarIcon,
  ArrowRight,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Auto-wiki — kentekentools, kennisbank & motorolie-naslag",
  description:
    "De Auto-wiki van BenzolPro: alle gratis kentekentools (APK, voertuiggegevens, CO₂, waarde, wegenbelasting), de kennisbank over motorolie en handige naslag zoals ACEA/API-normen, olie per automerk en ververskosten — alles op één plek.",
  alternates: { canonical: "/wiki" },
};

function ToolIconEl({ name }: { name: ToolIcon }) {
  const map = { shield: ShieldIcon, clipboard: ClipboardIcon, spark: SparkIcon, file: FileIcon, wrench: WrenchIcon };
  const C = map[name];
  return <C width={22} height={22} />;
}

/** Overige handige naslag & tools die ook in de wiki thuishoren. */
const REFERENCE = [
  {
    href: "/olie",
    icon: CarIcon,
    title: "Olie per automerk & model",
    desc: "Zoek de aanbevolen viscositeit en fabrieksnorm voor jouw specifieke auto.",
  },
  {
    href: "/normen",
    icon: CertificateIcon,
    title: "Olie-normen encyclopedie",
    desc: "Wat betekenen ACEA C3, API SN/CF, VW 504.00, MB 229.51 en BMW LL-04? Alles uitgelegd.",
  },
  {
    href: "/vergelijk",
    icon: SlidersIcon,
    title: "Viscositeiten vergelijken",
    desc: "5W30 of 5W40? 0W20 of 5W30? Zie in één oogopslag de verschillen en de beste keuze.",
  },
  {
    href: "/kosten",
    icon: FileIcon,
    title: "Wat kost olie verversen?",
    desc: "Bereken per automodel de kosten van zelf verversen versus de garage.",
  },
  {
    href: "/olie-verversen",
    icon: DropIcon,
    title: "Zelf olie verversen — stap voor stap",
    desc: "Een duidelijke handleiding om zelf veilig en netjes je motorolie te verversen.",
  },
  {
    href: "/motorolie-rapport",
    icon: StarIcon,
    title: "Nederlands Motorolie-rapport",
    desc: "Welke viscositeiten en normen komen het meest voor in het Nederlandse wagenpark?",
  },
  {
    href: "/open-data",
    icon: GlobeIcon,
    title: "Open motorolie-dataset",
    desc: "Onze olie-spec dataset, vrij te gebruiken en te citeren.",
  },
];

export default function WikiHub() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Auto-wiki", item: absoluteUrl("/wiki") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Auto-wiki",
      url: absoluteUrl("/wiki"),
      description:
        "Alle gratis kentekentools, de kennisbank over motorolie en handige naslag op één plek.",
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Auto-wiki" }]} />

      <div className="section-pad py-10">
        {/* hero */}
        <div className="max-w-3xl">
          <span className="chip">
            <CarIcon width={14} height={14} className="text-neon" /> Alles over je auto & olie op één plek
          </span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Auto-wiki</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Gratis kentekentools, een kennisbank in gewone taal en handige naslag over motorolie — gebundeld in één
            overzicht. Van je APK-datum tot de juiste viscositeit voor jouw auto.
          </p>
        </div>

        {/* kenteken CTA */}
        <Link
          href="/kenteken-check"
          className="card-surface group mt-8 flex flex-col items-start gap-4 p-6 transition hover:border-neon/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-neon/10 text-neon">
              <CarIcon width={24} height={24} />
            </span>
            <div>
              <h2 className="text-lg font-bold transition group-hover:text-neon">Start met je kenteken</h2>
              <p className="text-sm text-zinc-400">Voer je kenteken in en krijg direct de juiste olie én alle voertuiggegevens.</p>
            </div>
          </div>
          <span className="btn-neon shrink-0">
            Kentekencheck <ArrowRight width={16} height={16} />
          </span>
        </Link>

        {/* kentekentools */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Gratis kentekentools</h2>
              <p className="mt-1 text-sm text-zinc-400">Officiële RDW-data, 100% gratis.</p>
            </div>
            <Link href="/tools" className="hidden shrink-0 text-sm font-semibold text-neon hover:underline sm:inline-flex sm:items-center sm:gap-1">
              Alle tools <ArrowRight width={15} height={15} />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card-surface group flex flex-col p-5 transition hover:border-neon/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-neon/10 text-neon">
                  <ToolIconEl name={tool.icon} />
                </span>
                <h3 className="mt-3 text-lg font-bold transition group-hover:text-neon">{tool.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-zinc-400">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon">
                  Openen <ArrowRight width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* kennisbank */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Kennisbank</h2>
              <p className="mt-1 text-sm text-zinc-400">Motorolie uitgelegd in gewone taal.</p>
            </div>
            <Link href="/gids" className="hidden shrink-0 text-sm font-semibold text-neon hover:underline sm:inline-flex sm:items-center sm:gap-1">
              Alle gidsen <ArrowRight width={15} height={15} />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/gids/${g.slug}`}
                className="card-surface group flex flex-col p-5 transition hover:border-neon/50"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-azure">
                  {g.category} · {g.readingMinutes} min
                </span>
                <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-neon">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-400">{g.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon">
                  Lees de gids <ArrowRight width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* handige naslag */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Handige naslag & tools</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCE.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="card-surface group flex gap-4 p-5 transition hover:border-neon/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                  <r.icon width={22} height={22} />
                </span>
                <div>
                  <h3 className="font-bold leading-snug transition group-hover:text-neon">{r.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{r.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
