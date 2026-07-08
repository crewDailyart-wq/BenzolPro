import Link from "next/link";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import { TOOLS, type ToolDef, type ToolIcon } from "@/lib/tools";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import { ShieldIcon, ClipboardIcon, SparkIcon, FileIcon, WrenchIcon, ArrowRight, CheckIcon } from "./icons";

function Icon({ name, ...p }: { name: ToolIcon; width?: number; height?: number; className?: string }) {
  const map = { shield: ShieldIcon, clipboard: ClipboardIcon, spark: SparkIcon, file: FileIcon, wrench: WrenchIcon };
  const C = map[name];
  return <C {...p} />;
}

export default function ToolPageLayout({ tool, children }: { tool: ToolDef; children: React.ReactNode }) {
  const url = absoluteUrl(`/tools/${tool.slug}`);
  const others = TOOLS.filter((t) => t.slug !== tool.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Gratis kentekentools", item: absoluteUrl("/tools") },
        { "@type": "ListItem", position: 3, name: tool.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.h1,
      url,
      applicationCategory: "BrowserApplication",
      operatingSystem: "Web",
      inLanguage: "nl-NL",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description: tool.description,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Gratis kentekentools", href: "/tools" }, { name: tool.name }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip"><Icon name={tool.icon} width={14} height={14} /> Gratis · RDW</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{tool.h1}</h1>
          <p className="mt-4 text-lg text-zinc-400">{tool.intro}</p>
        </div>

        <div className="mt-8 max-w-2xl">{children}</div>

        {/* FAQ */}
        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold">Veelgestelde vragen</h2>
          <div className="mt-5 space-y-4">
            {tool.faq.map((f) => (
              <div key={f.q} className="card-surface p-5">
                <h3 className="font-semibold text-zinc-100">{f.q}</h3>
                <p className="mt-1.5 text-sm text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Andere tools */}
        <section className="mt-14">
          <h2 className="text-xl font-bold">Meer gratis kentekentools</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="card-surface group flex items-center gap-3 p-4 transition hover:border-neon/50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-soft text-neon">
                  <Icon name={t.icon} width={18} height={18} />
                </span>
                <span className="flex-1 text-sm font-semibold">{t.name}</span>
                <ArrowRight width={16} height={16} className="text-neon transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 flex max-w-3xl items-start gap-2 text-sm text-zinc-500">
          <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" />
          Alle tools gebruiken de officiële, openbare RDW Open Data en zijn 100% gratis. Persoonsgegevens van de eigenaar tonen we niet.
        </p>
      </div>
    </>
  );
}
