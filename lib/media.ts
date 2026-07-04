/**
 * Normalizes a product/bundle's photo field(s) into a single array, no
 * matter which shape was used to set it — `images: [...]` (the documented
 * way) or a single `image: "..."` string (also supported so a manual edit
 * in either style just works). Falsy/empty entries are dropped.
 */
export function resolveImages(entity: { images?: string[]; image?: string } | null | undefined): string[] {
  if (!entity) return [];
  const list = [...(entity.images ?? []), ...(entity.image ? [entity.image] : [])];
  return list.filter((src): src is string => typeof src === "string" && src.trim().length > 0);
}

/**
 * Candidate photo(s) for a specific container size, by naming convention:
 *   20 L → "/products/<slug>-20l.jpg"  (a box/doos of 4×5 L bottles)
 *   60 L → "/products/<slug>-60l.jpg"  (a drum / vat)
 *  208 L → "/products/<slug>-208l.jpg" (a drum / vat)
 * The loose 1 L / 5 L sizes have no separate photo (they use the default
 * product photos). These paths are just *candidates*: if you haven't uploaded
 * the file yet, the gallery silently skips it and shows the normal photos, so
 * nothing ever breaks. Drop a matching file in public/products/ and clicking
 * that size instantly shows it (e.g. the 4-bottle box for 20 L).
 */
export function sizeImageCandidates(slug: string, size: number): string[] {
  if (size >= 20) return [`/products/${slug}-${size}l.jpg`];
  return [];
}
