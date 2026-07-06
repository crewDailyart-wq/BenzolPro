import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { COMPANY, SITE_NAME, shown } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: `Hoe ${SITE_NAME} omgaat met je persoonsgegevens (AVG/GDPR): welke gegevens we verwerken, waarvoor en je rechten.`,
  alternates: { canonical: "/privacybeleid" },
};

export default function Page() {
  return (
    <LegalPage
      title="Privacybeleid"
      intro={`${COMPANY.legalName} respecteert je privacy en verwerkt persoonsgegevens uitsluitend in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).`}
    >
      <LegalSection heading="1. Verwerkingsverantwoordelijke">
        <p>
          {COMPANY.legalName}, {shown(COMPANY.street)}, {COMPANY.postal} {COMPANY.city}. Voor privacyvragen: {COMPANY.email}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Welke gegevens we verwerken">
        <ul className="list-disc space-y-1 pl-5">
          <li>Naam, e-mailadres, telefoonnummer en (aflever)adres bij een bestelling of offerte-aanvraag.</li>
          <li>Bestel- en betaalgegevens (de betaling zelf verloopt via Mollie; wij ontvangen geen kaartgegevens).</li>
          <li>
            Kenteken dat je invoert in de kentekencheck. Dit wordt alleen gebruikt om een olie-advies op te halen via de
            openbare RDW-data en wordt niet aan je persoon gekoppeld opgeslagen.
          </li>
          <li>Technische gegevens (zoals IP-adres) die nodig zijn om de website veilig te laten werken.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Doeleinden en grondslagen">
        <ul className="list-disc space-y-1 pl-5">
          <li>Het uitvoeren van je bestelling en het contact daarover (uitvoering van de overeenkomst).</li>
          <li>Het beantwoorden van offerte-aanvragen en vragen (gerechtvaardigd belang / toestemming).</li>
          <li>Het versturen van een nieuwsbrief, alleen na je aanmelding (toestemming, altijd op te zeggen).</li>
          <li>Het voldoen aan wettelijke (fiscale) bewaarplichten.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Delen met derden">
        <p>
          Wij delen gegevens alleen met partijen die nodig zijn om je bestelling uit te voeren, zoals de
          betaaldienstverlener (Mollie), de bezorgdienst en onze e-maildienst. Deze partijen verwerken gegevens
          uitsluitend in onze opdracht. Wij verkopen je gegevens nooit.
        </p>
      </LegalSection>

      <LegalSection heading="5. Bewaartermijnen">
        <p>
          We bewaren je gegevens niet langer dan nodig. Bestel- en factuurgegevens bewaren we conform de wettelijke
          fiscale bewaarplicht van 7 jaar. Overige gegevens verwijderen we zodra ze niet langer nodig zijn.
        </p>
      </LegalSection>

      <LegalSection heading="6. Je rechten">
        <p>
          Je hebt het recht op inzage, correctie, verwijdering, beperking en overdraagbaarheid van je gegevens, en het
          recht bezwaar te maken. Stuur je verzoek naar {COMPANY.email}. Je kunt ook een klacht indienen bij de{" "}
          <a href="https://www.autoriteitpersoonsgegevens.nl" className="text-neon underline" target="_blank" rel="noreferrer">
            Autoriteit Persoonsgegevens
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="7. Cookies">
        <p>
          Voor informatie over cookies verwijzen we naar ons{" "}
          <a href="/cookiebeleid" className="text-neon underline">
            cookiebeleid
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
