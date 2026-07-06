// Bouwt een Google Shopping-productfeed (RSS 2.0 met het g:-namespace). Eén item
// per maat-variant (item_group_id koppelt de maten van één product samen), zodat
// je oliën in Google Shopping en de gratis productvermeldingen kunnen verschijnen.
// Dien de URL (https://<domein>/feed.xml) in bij Google Merchant Center.
import { PRODUCTS, productPositioning, TAGLINES } from "./products";
import { sizePrice, sizeCompareAt } from "./format";
import { resolveImages } from "./media";
import { SITE_URL, SITE_NAME, absoluteUrl } from "./site";

// Google Product Category 5613 = "Motor Vehicle Oils & Fluids".
const GOOGLE_CATEGORY = "5613";

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function itemDescription(name: string, specs: string[], tagline: string): string {
  const parts = [tagline, `Specificaties: ${specs.join(", ")}.`, "Premium Benzol motorolie — altijd gratis verzending, morgen in huis."];
  return parts.filter(Boolean).join(" ");
}

export function buildProductFeed(): string {
  const items: string[] = [];

  for (const p of PRODUCTS) {
    const productUrl = absoluteUrl(`/product/${p.slug}`);
    const photos = resolveImages(p);
    // Google accepteert geen SVG; gebruik een echte foto indien aanwezig, anders
    // de automatisch gegenereerde OG-afbeelding (een echte PNG-URL).
    const imageLink = photos.length > 0 ? absoluteUrl(photos[0]) : `${productUrl}/opengraph-image`;
    const productType = `Motorolie > ${p.viscosity} > ${productPositioning(p).join(" ")}`.trim();
    const tagline = TAGLINES[p.tagline]?.nl ?? "";
    const description = itemDescription(p.name, p.specs, tagline);
    const availability = p.stock > 0 ? "in_stock" : "out_of_stock";

    for (const size of p.sizesLiter) {
      const selling = sizePrice(p, size);
      const wasPrice = sizeCompareAt(p, size);
      const hasSale = wasPrice != null && wasPrice > selling;
      const regular = hasSale ? wasPrice! : selling;

      const priceLines = [`<g:price>${regular.toFixed(2)} EUR</g:price>`];
      if (hasSale) priceLines.push(`<g:sale_price>${selling.toFixed(2)} EUR</g:sale_price>`);

      items.push(
        `  <item>
    <g:id>${esc(p.id)}-${size}</g:id>
    <g:item_group_id>${esc(p.id)}</g:item_group_id>
    <title>${esc(`${p.name} — ${size} liter`)}</title>
    <link>${esc(productUrl)}</link>
    <g:description>${esc(description)}</g:description>
    <g:image_link>${esc(imageLink)}</g:image_link>
    <g:availability>${availability}</g:availability>
    ${priceLines.join("\n    ")}
    <g:brand>Benzol</g:brand>
    <g:mpn>${esc(`${p.slug}-${size}l`)}</g:mpn>
    <g:condition>new</g:condition>
    <g:google_product_category>${GOOGLE_CATEGORY}</g:google_product_category>
    <g:product_type>${esc(productType)}</g:product_type>
    <g:unit_pricing_measure>${size}l</g:unit_pricing_measure>
    <g:shipping>
      <g:country>NL</g:country>
      <g:service>Standaard</g:service>
      <g:price>0.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
      <g:country>BE</g:country>
      <g:service>Standaard</g:service>
      <g:price>0.00 EUR</g:price>
    </g:shipping>
  </item>`,
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>${esc(SITE_NAME)} — Motorolie</title>
  <link>${esc(SITE_URL)}</link>
  <description>Premium Benzol motorolie voor elke auto. Altijd gratis verzending.</description>
${items.join("\n")}
</channel>
</rss>`;
}
