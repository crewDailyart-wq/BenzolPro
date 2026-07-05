import type { Product } from "./types";

export function euro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * De verkoopprijs voor één specifieke maat. Leest de vaste, per-maat prijs uit
 * `product.prices[size]` — elke maat heeft dus zijn eigen unieke prijs. Staat
 * die maat (nog) niet in `prices`, dan valt de code terug op de oude
 * automatische staffelberekening zodat er nooit iets breekt.
 */
export function sizePrice(
  product: Pick<Product, "prices" | "price" | "sizesLiter">,
  size: number,
): number {
  const explicit = product.prices?.[size];
  if (explicit != null) return explicit;
  return priceForSize(product.price, product.sizesLiter[0], size);
}

/**
 * De optionele "was"-prijs (doorgestreept) voor één specifieke maat, uit
 * `product.compareAtPrices[size]`. Valt terug op de oude afleiding uit
 * `compareAtPrice`, of geeft `undefined` als er geen was-prijs is.
 */
export function sizeCompareAt(
  product: Pick<Product, "compareAtPrices" | "compareAtPrice" | "sizesLiter">,
  size: number,
): number | undefined {
  const explicit = product.compareAtPrices?.[size];
  if (explicit != null) return explicit;
  if (product.compareAtPrice != null)
    return priceForSize(product.compareAtPrice, product.sizesLiter[0], size);
  return undefined;
}

/**
 * The size that should be selected by default for a product: 5 L when
 * available (the most popular consumer size), otherwise the first listed size.
 */
export function defaultSize(sizesLiter: number[]): number {
  return sizesLiter.includes(5) ? 5 : sizesLiter[0];
}

/**
 * Short note explaining what a container size actually is, so customers know
 * what they're buying: a 20L is a box of 4×5L bottles, and 60L / 208L are
 * drums (vaten). Returns null for the loose bottle sizes (1L / 5L).
 */
export function sizeNote(size: number): string | null {
  if (size >= 60) return "vat";
  if (size >= 20) return "1 doos · 4×5 L";
  return null;
}

/**
 * FALLBACK-berekening. Sinds elke maat een eigen vaste prijs heeft (zie
 * `product.prices` en `sizePrice`) wordt dit alleen nog gebruikt als een maat
 * per ongeluk geen eigen prijs heeft. Leidt een maatprijs af uit de basisprijs
 * met staffelkorting per liter.
 */
export function priceForSize(basePrice: number, baseSize: number, size: number): number {
  if (size === baseSize) return basePrice;
  const perLitre = basePrice / baseSize;
  let bulkFactor = 1;
  if (size >= 208) bulkFactor = 0.62;
  else if (size >= 60) bulkFactor = 0.72;
  else if (size >= 20) bulkFactor = 0.8;
  else if (size >= 5) bulkFactor = 0.88;
  return Math.round(perLitre * size * bulkFactor * 100) / 100;
}
