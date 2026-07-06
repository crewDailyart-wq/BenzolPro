import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: `Welke cookies ${SITE_NAME} gebruikt en waarvoor, en hoe je ze beheert.`,
  alternates: { canonical: "/cookiebeleid" },
};

export default function Page() {
  return (
    <LegalPage
      title="Cookiebeleid"
      intro={`${SITE_NAME} gebruikt zo min mogelijk cookies. Hieronder lees je welke en waarvoor.`}
    >
      <LegalSection heading="1. Wat zijn cookies?">
        <p>
          Cookies zijn kleine bestanden die op je apparaat worden opgeslagen. Sommige zijn noodzakelijk om de website te
          laten werken; andere worden pas geplaatst na jouw toestemming.
        </p>
      </LegalSection>

      <LegalSection heading="2. Functionele en noodzakelijke opslag">
        <p>
          Voor de winkelwagen en het afrekenen gebruiken we lokale opslag in je browser (localStorage) en een tijdelijke,
          beveiligde cookie om je betaling af te ronden. Deze zijn noodzakelijk voor de werking van de webshop en vereisen
          geen toestemming.
        </p>
      </LegalSection>

      <LegalSection heading="3. Analytische cookies (alleen met toestemming)">
        <p>
          Voor het meten van bezoek kunnen we Google Analytics gebruiken. Deze analytische cookies worden{" "}
          <strong>pas geplaatst nadat je daar via de cookiemelding toestemming voor geeft</strong>. Kies je voor
          &laquo;alleen noodzakelijk&raquo;, dan wordt er niets geladen en niets getrackt. Waar we een cookieloze,
          privacyvriendelijke meetmethode (zoals Plausible) gebruiken, worden er geen persoonsgegevens of cookies
          verwerkt en is geen toestemming nodig.
        </p>
      </LegalSection>

      <LegalSection heading="4. Marketingcookies">
        <p>
          Deze webshop plaatst geen marketing- of advertentiecookies en deelt geen gegevens met advertentienetwerken.
        </p>
      </LegalSection>

      <LegalSection heading="5. Je keuze wijzigen">
        <p>
          Je kunt je keuze op elk moment aanpassen via de link <strong>&laquo;Cookievoorkeuren&raquo;</strong> onderaan
          elke pagina. Daarnaast kun je cookies en lokale opslag altijd zelf verwijderen of blokkeren via de instellingen
          van je browser. Houd er rekening mee dat de winkelwagen dan mogelijk niet bewaard blijft.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
