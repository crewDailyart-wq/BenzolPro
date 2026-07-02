export function euro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Derive a bottle/drum-size price from the base (smallest) size price, with
 * steeper per-litre discounts the larger the container — mirroring how
 * garages buy in bulk (a 208L drum is far cheaper per litre than a 1L can).
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
