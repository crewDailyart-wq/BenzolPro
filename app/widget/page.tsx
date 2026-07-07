import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import WidgetSnippet from "@/components/WidgetSnippet";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Gratis kentekencheck-widget voor je website",
  description:
    "Zet de gratis BenzolPro motorolie-kentekencheck op je eigen site. Ideaal voor garages, autoblogs en forums — je bezoekers vinden direct de juiste olie. Eén regel code.",
  alternates: { canonical: "/widget" },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${SITE_NAME} Kentekencheck-widget`,
  applicationCategory: "BrowserApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/widget`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Gratis insluitbare widget die op basis van het Nederlandse kenteken (RDW) de juiste motorolie aanbeveelt.",
};

const BENEFITS = [
  "100% gratis — geen account, geen kosten",
  "Werkt met de officiële RDW-kentekendata",
  "Verwijst je bezoekers naar het juiste olie-advies",
  "Één regel code, nul onderhoud",
];

export default function WidgetPage() {
  return (
    <>
      <JsonLd data={JSONLD} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Kentekencheck-widget" }]} />

      <div className="section-pad py-10">
        <div className="max-w-3xl">
          <span className="chip">Gratis widget</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Zet de motorolie-kentekencheck op je eigen website
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Heb je een garage, autoblog of forum? Bied je bezoekers de gratis BenzolPro-kentekencheck. Ze voeren hun
            kenteken in en zien direct welke motorolie bij hun auto past — jij hoeft niets te doen.
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-neon" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <WidgetSnippet />
        </div>

        <div className="mt-12 max-w-3xl rounded-2xl border border-ink-line bg-ink-soft p-6">
          <h2 className="text-xl font-bold">Hoe werkt het?</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
            <li>Kopieer de insluitcode hierboven.</li>
            <li>Plak hem in de HTML van je eigen pagina (bijv. een blogartikel of je servicepagina).</li>
            <li>Klaar — de check werkt meteen en blijft automatisch up-to-date.</li>
          </ol>
          <p className="mt-4 text-sm text-zinc-500">
            Vragen of wil je een variant op maat (eigen kleuren, jouw logo)? Neem{" "}
            <a href={absoluteUrl("/contact")} className="text-neon underline">
              contact
            </a>{" "}
            op.
          </p>
        </div>
      </div>
    </>
  );
}
