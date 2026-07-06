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

      <LegalSection heading="3. Analytische en marketingcookies">
        <p>
          Deze webshop plaatst standaard geen analytische of marketingcookies. Zodra wij analytics (bijvoorbeeld voor het
          meten van bezoek) of marketing zouden inzetten, gebeurt dat uitsluitend na jouw toestemming via een
          cookiemelding, en werken we dit beleid bij.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies beheren">
        <p>
          Je kunt cookies en lokale opslag altijd zelf verwijderen of blokkeren via de instellingen van je browser. Houd
          er rekening mee dat de winkelwagen dan mogelijk niet bewaard blijft.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
