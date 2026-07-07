import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TOOLS, type ToolIcon } from "@/lib/tools";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import { ShieldIcon, ClipboardIcon, SparkIcon, FileIcon, WrenchIcon, ArrowRight, CarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Gratis kentekentools: APK, voertuiggegevens, CO₂, waarde & meer",
  description:
    "Gratis kentekentools van BenzolPro: check APK-datum, voertuiggegevens, CO₂-uitstoot, cataloguswaarde en wegenbelasting op kenteken. Officiële RDW-data, 100% gratis.",
  alternates: { canonical: "/tools" },
};

function Icon({ name }: { name: ToolIcon }) {
  const map = { shield: ShieldIcon, clipboard: ClipboardIcon, spark: SparkIcon, file: FileIcon, wrench: WrenchIcon };
  const C = map[name];
  return <C width={22} height={22} />;
}

export default function ToolsHub() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Gratis kentekentools", item: absoluteUrl("/tools") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Gratis kentekentools",
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: absoluteUrl(`/tools/${t.slug}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Gratis kentekentools" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><CarIcon width={14} height={14} /> Gratis · officiële RDW-data</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Gratis kentekentools</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Alles wat je met je kenteken wilt weten — op één plek. Check je APK, alle voertuiggegevens, CO₂-uitstoot,
            cataloguswaarde en een indicatie van je wegenbelasting. Gratis, op basis van de officiële RDW Open Data.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="card-surface group flex flex-col p-6 transition hover:border-neon/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-soft text-neon">
                <Icon name={t.icon} />
              </span>
              <h2 className="mt-4 text-lg font-bold">{t.name}</h2>
              <p className="mt-1 flex-1 text-sm text-zinc-400">{t.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon">
                {t.cta} <ArrowRight width={16} height={16} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          {/* Olie-tool als afsluiter */}
          <Link href="/kenteken-check" className="group flex flex-col justify-between rounded-2xl border border-neon/40 bg-neon/5 p-6 transition hover:bg-neon/10">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-neon text-ink">
              <CarIcon width={22} height={22} />
            </span>
            <div className="mt-4">
              <h2 className="text-lg font-bold">Welke olie voor mijn auto?</h2>
              <p className="mt-1 text-sm text-zinc-300">Onze bekendste tool: vind direct de juiste motorolie voor jouw kenteken.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon">
                Naar de oliecheck <ArrowRight width={16} height={16} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
