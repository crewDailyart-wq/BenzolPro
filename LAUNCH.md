# 🚀 BenzolPro — livegang-checklist

Volg deze stappen om de webshop vandaag echt live en verkoopklaar te zetten.
Alles wat de code doet is af; wat overblijft zijn accounts en sleutels die alleen
jij kunt aanmaken.

## 1. Zet je omgevingsvariabelen (het belangrijkste)

Kopieer `.env.example` en vul alles in bij je host (Vercel/Netlify → Environment
Variables). Kritiek vóór livegang:

- [ ] **`NEXT_PUBLIC_SITE_URL`** = je echte domein (bijv. `https://www.benzolpro.nl`).
      Zonder dit wijzen alle canonical-URLs, de sitemap en de rich-data naar het
      placeholderdomein → dat schaadt je SEO.
- [ ] **`MOLLIE_API_KEY`** = je Mollie **live**-sleutel. Zonder deze kun je geen
      betalingen aannemen (de checkout geeft dan een nette foutmelding).
- [ ] **Bedrijfsgegevens** (`NEXT_PUBLIC_COMPANY_*`) — KvK, BTW, adres. Verplicht
      voor de juridische pagina's en voor Google Merchant.
- [ ] **`RESEND_API_KEY` + `MAIL_FROM` + `ORDER_EMAIL`** (of `ORDER_WEBHOOK_URL`)
      zodat je bestellingen en offertes daadwerkelijk binnenkrijgt.

## 2. Betalingen — Mollie

1. Maak een account op [mollie.com](https://www.mollie.com) en doorloop de
   onboarding (KvK, bankrekening).
2. Activeer de gewenste methoden: **iDEAL**, **creditcard**, evt. Apple Pay / PayPal / Bancontact.
3. Zet eerst `MOLLIE_API_KEY=test_...`, doe een testbestelling, controleer dat je
   op de bedankpagina "betaald" ziet en de e-mails ontvangt.
4. Wissel daarna naar `live_...`.

> De Mollie-webhook (`/api/mollie/webhook`) werkt automatisch zodra `NEXT_PUBLIC_SITE_URL`
> een publiek https-domein is. Lokaal (localhost) wordt de status opgehaald op de
> bedankpagina zelf — dan mis je niets tijdens het testen.

## 3. Bestellingen/offertes ontvangen — Resend

1. Maak een account op [resend.com](https://resend.com) (gratis tier volstaat om te starten).
2. Verifieer je domein (DNS-records) en zet een afzender, bijv. `orders@benzolpro.nl`.
3. Zet `RESEND_API_KEY`, `MAIL_FROM` en `ORDER_EMAIL`.
   - Geen Resend? Zet in plaats daarvan `ORDER_WEBHOOK_URL` naar een Zapier/Make-webhook.

## 4. Juridisch (verplicht voor een NL-webshop)

De pagina's staan klaar en zijn met je bedrijfsgegevens gevuld:
`/algemene-voorwaarden`, `/privacybeleid`, `/retourbeleid`, `/cookiebeleid`, `/contact`.

- [ ] Vul je echte bedrijfsgegevens in (stap 1) zodat er geen "—" meer staat.
- [ ] Laat de teksten kort nakijken; het zijn juridisch degelijke sjablonen, maar
      geen vervanging voor advies op maat.

## 5. SEO-livegang

- [ ] Deploy met het echte `NEXT_PUBLIC_SITE_URL`.
- [ ] Controleer `https://<domein>/robots.txt` en `https://<domein>/sitemap.xml`.
- [ ] **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
      verifieer je domein en dien `sitemap.xml` in.
- [ ] **Bing Webmaster Tools**: idem (kost 2 minuten, extra bereik).
- [ ] Test enkele pagina's in de
      [Rich Results Test](https://search.google.com/test/rich-results) — Product,
      FAQ en Breadcrumb horen groen te zijn.
- [ ] Optioneel: verifieer je site direct in de `<head>` via
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (de "HTML-tag"-methode van Search Console).
- [ ] **Google Merchant Center** voor Shopping: dien de productfeed in op
      `https://<domein>/feed.xml` (staat klaar — één item per maat, met gratis
      verzending NL/BE). Vereist verder de juridische pagina's en bij voorkeur
      echte productfoto's. Zolang er geen foto staat, gebruikt de feed automatisch
      de gegenereerde OG-afbeelding (een echte PNG).
- [ ] Optioneel: zet **Vercel KV** (Storage → KV) aan voor blijvende, gedeelde
      productreviews. `KV_REST_API_URL` + `KV_REST_API_TOKEN` worden dan
      automatisch gezet; zonder KV blijven reviews lokaal in de browser.

## 5b. Analytics & cookies (AVG-conform, kant-en-klaar)

De cookiemelding en analytics zitten er al in; ze verschijnen pas als je ze aanzet:

- [ ] Wil je bezoek meten met **Google Analytics 4**? Zet `NEXT_PUBLIC_GA_ID` (bijv. `G-XXXX`).
      De cookiemelding verschijnt dan automatisch en GA laadt **pas na toestemming**
      (Google Consent Mode v2 staat standaard op "denied").
- [ ] Liever cookieloos en zonder banner? Zet `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — Plausible
      is privacyvriendelijk en vereist geen toestemming.
- [ ] Niets invullen mag ook: dan is er geen tracking en geen cookiemelding — nog steeds AVG-conform.

Bezoekers kunnen hun keuze altijd wijzigen via **"Cookievoorkeuren"** onderaan elke pagina.

## 6. Content-finetuning (mag ook na livegang)

- [ ] Zet echte productfoto's in `public/products/` (zie README) — verhoogt conversie
      én is **nodig voor Google Shopping**: de feed (`/feed.xml`) verwijst naar die
      fotopaden. Zonder geüploade foto's toont de site nette SVG-flessen, maar keurt
      Merchant Center de items af omdat de afbeeldings-URL niet laadt. Upload dus de
      foto's op de exacte bestandsnamen uit de README vóórdat je de feed indient.
- [ ] Controleer de prijzen per maat in `lib/products.ts` en de bundelprijzen in `lib/bundles.ts`.
- [ ] Vul echte afhaalpunten in (`components/Checkout.tsx` → `PICKUP_POINTS`) of verberg afhalen.

---

Snel testen kan lokaal:

```bash
npm install
npm run build && npm run start   # productie-build op http://localhost:3000
```
