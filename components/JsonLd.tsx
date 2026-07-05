/**
 * Rendert een JSON-LD structured-data blok (schema.org) zodat Google rijke
 * resultaten kan tonen — denk aan sterren, prijs en voorraad direct in de
 * zoekresultaten. Server component: geen "use client".
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify voorkomt injectie; dit is statische, door ons opgebouwde data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
