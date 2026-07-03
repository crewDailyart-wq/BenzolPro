export type Viscosity = "0W20" | "0W30" | "5W30" | "5W40" | "10W40" | "10W60" | "15W40";

export type OilCategory = "fullSynthetic" | "syntheticBlend" | "mineral" | "racing";

export interface Product {
  id: string;
  slug: string;
  name: string;
  viscosity: Viscosity;
  category: OilCategory;
  /** Marketing tagline key -> resolved per language via description map on product */
  tagline: string;
  specs: string[]; // e.g. ["ACEA C3", "API SN", "VW 504.00/507.00"]
  sizesLiter: number[]; // available bottle sizes
  price: number; // price for the default (first) size in EUR
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  bestFor: string[]; // fuel/usage tags e.g. ["petrol","diesel","modern"]
  accent: string; // hex accent for the bottle visual
  badge?: "bestseller" | "new" | "sale" | "pro";
  stock: number;
  /** Optional gold highlight line shown on the spotlight/detail page, e.g.
   *  "Geschikt voor ruim 50% van de Nederlandse auto's". */
  fitsNote?: string;
  /** Optional real product photos, one path per angle, e.g.
   *  ["/products/benzol-prime-5w30.jpg", "/products/benzol-prime-5w30-achterkant.jpg"].
   *  With 2+ entries the product page shows a gallery with arrows/thumbnails.
   *  When absent (or all fail to load), the generated SVG bottle is used instead. */
  images?: string[];
  /** Legacy single-photo alias — also recognized if you (or an edit) sets a
   *  single `image: "..."` instead of `images: [...]`. Use `resolveImages()`
   *  from lib/media.ts to read either form; you don't need to set both. */
  image?: string;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  viscosity: Viscosity | string;
  sizeLiter: number;
  price: number;
  qty: number;
  accent: string;
  /** true for bundle lines which always ship free */
  alwaysFreeShip?: boolean;
  /** true when this line represents a bundle rather than a single product */
  isBundle?: boolean;
}

export interface RdwVehicle {
  plate: string;
  found: boolean;
  make?: string;
  model?: string;
  year?: number;
  fuel?: string;
  cylinders?: number;
  bodyType?: string;
  color?: string;
}

export interface OilRecommendation {
  vehicle: RdwVehicle;
  viscosity: Viscosity | null;
  reasonKey: string; // i18n key explaining why
  productSlug: string | null;
  isElectric: boolean;
}
