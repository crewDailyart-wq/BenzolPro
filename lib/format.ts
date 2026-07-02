export function euro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Derive a bottle-size price from the base (1L) price with a bulk discount for 5L. */
export function priceForSize(basePrice: number, baseSize: number, size: number): number {
  if (size === baseSize) return basePrice;
  const perLitre = basePrice / baseSize;
  // 5L (and larger) gets ~12% bulk discount
  const bulkFactor = size >= 5 ? 0.88 : 1;
  return Math.round(perLitre * size * bulkFactor * 100) / 100;
}
