import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { COMPANY, SITE_NAME, shown } from "@/lib/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: `De algemene voorwaarden van ${SITE_NAME}: bestellen, betalen, levering, garantie en herroepingsrecht.`,
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function Page() {
  return (
    <LegalPage
      title="Algemene voorwaarden"
      intro={`Deze voorwaarden zijn van toepassing op elke bestelling en overeenkomst met ${COMPANY.legalName} via ${SITE_NAME}.`}
    >
      <LegalSection heading="1. Bedrijfsgegevens">
        <p>
          {COMPANY.legalName}, gevestigd te {shown(COMPANY.street)}, {COMPANY.postal} {COMPANY.city} ({COMPANY.country}).
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>KvK-nummer: {shown(COMPANY.kvk)}</li>
          <li>BTW-nummer: {shown(COMPANY.vat)}</li>
          <li>E-mail: {COMPANY.email}</li>
          <li>Telefoon: {COMPANY.phone}</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. Toepasselijkheid">
        <p>
          Deze algemene voorwaarden zijn van toepassing op elk aanbod van {SITE_NAME} en op elke tot stand gekomen
          overeenkomst op afstand tussen {COMPANY.legalName} en de consument of zakelijke afnemer. Voordat de
          overeenkomst wordt gesloten, wordt de tekst van deze voorwaarden beschikbaar gesteld en kan deze worden
          opgeslagen.
        </p>
      </LegalSection>

      <LegalSection heading="3. Aanbod en prijzen">
        <p>
          Alle prijzen zijn in euro’s en inclusief btw, tenzij anders vermeld. Kennelijke vergissingen of fouten in het
          aanbod binden {SITE_NAME} niet. Verzending is gratis, tenzij bij de bestelling anders is aangegeven.
        </p>
      </LegalSection>

      <LegalSection heading="4. De overeenkomst">
        <p>
          De overeenkomst komt tot stand op het moment dat de bestelling is geplaatst en de betaling is voltooid. Je
          ontvangt hiervan een bevestiging per e-mail. {SITE_NAME} kan zich binnen wettelijke kaders op de hoogte
          stellen of de afnemer aan zijn betalingsverplichtingen kan voldoen.
        </p>
      </LegalSection>

      <LegalSection heading="5. Betaling">
        <p>
          Betaling verloopt via de beveiligde betaalomgeving van Mollie (o.a. iDEAL, creditcard, Apple Pay en PayPal).
          De bestelling wordt verwerkt zodra de betaling is ontvangen. {SITE_NAME} verwerkt zelf geen
          kaart- of bankgegevens; deze worden uitsluitend door de betaaldienstverlener verwerkt.
        </p>
      </LegalSection>

      <LegalSection heading="6. Levering">
        <p>
          Bestellingen worden zo snel mogelijk geleverd op het opgegeven adres of afhaalpunt. Genoemde levertijden zijn
          indicatief. Het risico van beschadiging en/of vermissing van producten ligt bij {SITE_NAME} tot het moment
          van bezorging aan de consument, tenzij uitdrukkelijk anders is overeengekomen.
        </p>
      </LegalSection>

      <LegalSection heading="7. Herroepingsrecht">
        <p>
          De consument heeft het recht de overeenkomst binnen 14 dagen na ontvangst zonder opgave van redenen te
          ontbinden. Zie ons{" "}
          <a href="/retourbeleid" className="text-neon underline">
            retour- en herroepingsbeleid
          </a>{" "}
          voor de voorwaarden en de werkwijze. Het herroepingsrecht geldt niet voor zakelijke afnemers.
        </p>
      </LegalSection>

      <LegalSection heading="8. Garantie en conformiteit">
        <p>
          {SITE_NAME} staat ervoor in dat de producten voldoen aan de overeenkomst, de in het aanbod vermelde
          specificaties en de wettelijke bepalingen. Motorolie dient te worden toegepast conform de specificaties in het
          instructieboekje van het voertuig; de weergegeven olie-adviezen zijn een indicatie.
        </p>
      </LegalSection>

      <LegalSection heading="9. Klachten en geschillen">
        <p>
          Klachten kun je binnen bekwame tijd en volledig omschreven indienen via {COMPANY.email}. Wij reageren binnen
          14 dagen. Op overeenkomsten is Nederlands recht van toepassing. Je kunt een geschil ook voorleggen via het
          Europese ODR-platform:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            className="text-neon underline"
            target="_blank"
            rel="noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
