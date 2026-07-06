import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import JsonLd from "@/components/JsonLd";
import { COMPANY, SITE_NAME, SITE_URL, shown } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${SITE_NAME}. E-mail, telefoon en bedrijfsgegevens van ${COMPANY.legalName}.`,
  alternates: { canonical: "/contact" },
};

const CONTACT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact — ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: COMPANY.legalName,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    url: SITE_URL,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={CONTACT_JSONLD} />
      <LegalPage title="Contact" intro="Vragen over een bestelling, een product of bulklevering? We helpen je graag.">
        <LegalSection heading="Bereik ons">
          <ul className="list-none space-y-2">
            <li>
              📧 E-mail:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-neon underline">
                {COMPANY.email}
              </a>
            </li>
            <li>
              📞 Telefoon:{" "}
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-neon underline">
                {COMPANY.phone}
              </a>
            </li>
            <li>💬 Of gebruik de chat rechtsonder op elke pagina.</li>
          </ul>
        </LegalSection>

        <LegalSection heading="Voor garages">
          <p>
            Ben je een garage of bedrijf en wil je bulkprijzen? Vraag vrijblijvend een{" "}
            <a href="/offerte" className="text-neon underline">
              offerte op maat
            </a>{" "}
            aan.
          </p>
        </LegalSection>

        <LegalSection heading="Bedrijfsgegevens">
          <ul className="list-none space-y-1">
            <li>{COMPANY.legalName}</li>
            <li>
              {shown(COMPANY.street)}, {COMPANY.postal} {COMPANY.city}
            </li>
            <li>KvK: {shown(COMPANY.kvk)}</li>
            <li>BTW: {shown(COMPANY.vat)}</li>
          </ul>
        </LegalSection>
      </LegalPage>
    </>
  );
}
