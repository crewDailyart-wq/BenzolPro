import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { COMPANY, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Retourneren & herroepingsrecht",
  description: `Retourneren bij ${SITE_NAME}: 14 dagen bedenktijd, hoe je herroept en hoe je je geld terugkrijgt.`,
  alternates: { canonical: "/retourbeleid" },
};

export default function Page() {
  return (
    <LegalPage
      title="Retourneren & herroepingsrecht"
      intro="Niet tevreden? Als consument heb je 14 dagen bedenktijd. Hieronder lees je hoe retourneren werkt."
    >
      <LegalSection heading="1. Bedenktijd van 14 dagen">
        <p>
          Je hebt het recht om je bestelling binnen 14 dagen na ontvangst zonder opgave van redenen te herroepen. Na
          melding heb je nogmaals 14 dagen om het product terug te sturen.
        </p>
      </LegalSection>

      <LegalSection heading="2. Hoe herroep je?">
        <p>
          Meld je herroeping binnen de bedenktijd via {COMPANY.email} onder vermelding van je ordernummer. Je mag
          hiervoor het{" "}
          <a
            href="https://www.consuwijzer.nl/thema/modelformulier-voor-herroeping"
            className="text-neon underline"
            target="_blank"
            rel="noreferrer"
          >
            modelformulier voor herroeping
          </a>{" "}
          gebruiken, maar dat is niet verplicht.
        </p>
      </LegalSection>

      <LegalSection heading="3. Staat van het product">
        <p>
          Tijdens de bedenktijd ga je zorgvuldig om met het product en de verpakking. Je mag het product beoordelen zoals
          je in een winkel zou doen. Geopende of gebruikte motorolie kan om hygiëne- en veiligheidsredenen niet worden
          teruggenomen; ongebruikte, ongeopende producten in de originele verpakking wel.
        </p>
      </LegalSection>

      <LegalSection heading="4. Terugbetaling">
        <p>
          We betalen het volledige orderbedrag, inclusief eventuele verzendkosten, binnen 14 dagen na ontvangst van je
          herroeping terug, mits het product retour is of je hebt aangetoond dat je het hebt teruggestuurd. Terugbetaling
          gebeurt met hetzelfde betaalmiddel als waarmee je hebt betaald.
        </p>
      </LegalSection>

      <LegalSection heading="5. Retourkosten">
        <p>
          De rechtstreekse kosten voor het terugzenden zijn voor rekening van de consument, tenzij anders vermeld of
          wanneer er sprake is van een verkeerd of beschadigd geleverd product.
        </p>
      </LegalSection>

      <LegalSection heading="6. Uitzonderingen">
        <p>
          Het herroepingsrecht geldt niet voor zakelijke afnemers (garages/bedrijven) en niet voor producten die om
          gezondheids- of hygiënische redenen niet geschikt zijn om te worden teruggezonden en waarvan de verzegeling na
          levering is verbroken.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
