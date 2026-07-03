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
