import type { Locale } from "./i18n/config";
import { getProductById } from "./products";
import { sizePrice } from "./format";
import { resolveImages } from "./media";

export interface BundleItem {
  productId: string;
  sizeLiter: number;
  qty: number;
}

export interface Bundle {
  id: string;
  slug: string;
  accent: string;
  items: BundleItem[];
  /** fixed bundle price (already discounted, incl. always-free shipping) */
  price: number;
  badge?: "popular" | "garage" | "value" | "performance";
  gift?: string; // localized-later key handled in component copy
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  /** Optional dedicated bundle photo(s) — a shot of the whole pack and, by
   *  convention, a second shot of its contents: "/products/bundles/<slug>.jpg"
   *  and "/products/bundles/<slug>-inhoud.jpg" (see LEES-MIJ.txt in that
   *  folder). With 2+ photos the product-detail bundle preview shows the
   *  gallery arrows. When absent, it falls back to the photos of the
   *  products included in the bundle. */
  images?: string[];
  image?: string;
}

export const GIFT_LABEL: Record<string, Record<string, string>> = {
  funnel: { nl: "Gratis trechter", en: "Free funnel", pl: "Lejek gratis", ar: "قمع مجاني", tr: "Ücretsiz huni" },
  gloves: { nl: "Gratis handschoenen", en: "Free gloves", pl: "Rękawice gratis", ar: "قفازات مجانية", tr: "Ücretsiz eldiven" },
  drainpan: { nl: "Gratis opvangbak", en: "Free drain pan", pl: "Miska gratis", ar: "حوض تصريف مجاني", tr: "Ücretsiz tava" },
  cap: { nl: "Gratis Benzol-cap", en: "Free Benzol cap", pl: "Czapka gratis", ar: "قبعة مجانية", tr: "Ücretsiz şapka" },
};

export const BADGE_LABEL: Record<string, Record<string, string>> = {
  popular: { nl: "Populair", en: "Popular", pl: "Popularne", ar: "شائع", tr: "Popüler" },
  value: { nl: "Voordeel", en: "Best value", pl: "Najlepsza cena", ar: "أفضل قيمة", tr: "En avantajlı" },
  garage: { nl: "Voor garages", en: "For garages", pl: "Dla warsztatów", ar: "للورش", tr: "Servisler için" },
  performance: { nl: "Performance", en: "Performance", pl: "Performance", ar: "أداء", tr: "Performans" },
};

export const BUNDLES: Bundle[] = [
  {
    id: "b-service",
    slug: "verversbeurt-compleet",
    accent: "#e7b53c",
    items: [
      { productId: "p-prime-5w30", sizeLiter: 5, qty: 1 },
      { productId: "p-injector-cleaner", sizeLiter: 0.3, qty: 1 },
    ],
    price: 29.95,
    badge: "popular",
    gift: "funnel",
    name: {
      nl: "Verversbeurt Compleet",
      en: "Complete Oil-Change Kit",
      pl: "Kompletny zestaw do wymiany",
      ar: "طقم تغيير الزيت الكامل",
      tr: "Komple Yağ Değişim Seti",
    },
    desc: {
      nl: "5L Benzol Modern Drive 5W30 + injector cleaner — verversen én je brandstofsysteem reinigen in één beurt. Gratis trechter.",
      en: "5L Benzol Modern Drive 5W30 + injector cleaner — change your oil and clean the fuel system in one go. Free funnel.",
      pl: "5L Benzol Modern Drive 5W30 + injector cleaner — wymiana oleju i czyszczenie układu paliwowego naraz. Gratisowy lejek.",
      ar: "5 لتر Benzol Modern Drive 5W30 + منظف حاقنات — تغيير الزيت وتنظيف نظام الوقود دفعة واحدة. قمع مجاني.",
      tr: "5L Benzol Modern Drive 5W30 + enjektör temizleyici — yağ değişimi ve yakıt sistemi temizliği bir arada. Ücretsiz huni.",
    },
    images: [
      "/products/bundles/verversbeurt-compleet.jpg",
      "/products/bundles/verversbeurt-compleet-inhoud.jpg",
    ],
  },
  {
    id: "b-winter",
    slug: "winter-ready",
    accent: "#5aa9d1",
    items: [
      { productId: "p-eco-0w30", sizeLiter: 5, qty: 1 },
      { productId: "p-prime-5w30", sizeLiter: 5, qty: 1 },
    ],
    price: 49.95,
    badge: "value",
    gift: "gloves",
    name: {
      nl: "Winter Ready Pakket",
      en: "Winter Ready Pack",
      pl: "Pakiet Winter Ready",
      ar: "حزمة الاستعداد للشتاء",
      tr: "Kışa Hazır Paketi",
    },
    desc: {
      nl: "5L 0W30 + 5L 5W30 voor benzine én diesel met roetfilter. Razendsnelle, perfecte koude start. Gratis handschoenen.",
      en: "5L 0W30 + 5L 5W30 for petrol and DPF diesel. Lightning-fast, perfect cold starts. Free gloves.",
      pl: "5L 0W30 + 5L 5W30 do benzyny i diesla z DPF. Błyskawiczny, idealny zimny rozruch. Rękawice gratis.",
      ar: "5 لتر 0W30 + 5 لتر 5W30 للبنزين والديزل بفلتر DPF. تشغيل بارد مثالي وسريع. قفازات مجانية.",
      tr: "Benzin ve DPF dizel için 5L 0W30 + 5L 5W30. Yıldırım hızında, mükemmel soğuk çalıştırma. Ücretsiz eldiven.",
    },
    images: [
      "/products/bundles/winter-ready.jpg",
      "/products/bundles/winter-ready-inhoud.jpg",
    ],
  },
  {
    id: "b-garage",
    slug: "garage-bulk-synth",
    accent: "#e08a3d",
    items: [{ productId: "p-synth-5w40", sizeLiter: 5, qty: 3 }],
    price: 64.95,
    badge: "garage",
    gift: "drainpan",
    name: {
      nl: "Garage Bulk 3×5L",
      en: "Garage Bulk 3×5L",
      pl: "Garaż Hurt 3×5L",
      ar: "جملة الورشة 3×5 لتر",
      tr: "Servis Toplu 3×5L",
    },
    desc: {
      nl: "3×5L Benzol Synth 5W40 — dé werkpaardolie voor de werkplaats. Extra staffelkorting mogelijk.",
      en: "3×5L Benzol Synth 5W40 — the workshop workhorse. Extra volume discounts available.",
      pl: "3×5L Benzol Synth 5W40 — koń roboczy warsztatu. Możliwe dodatkowe rabaty ilościowe.",
      ar: "3×5 لتر Benzol Synth 5W40 — حصان عمل الورشة. خصومات كمية إضافية متاحة.",
      tr: "3×5L Benzol Synth 5W40 — atölyenin yük beygiri. Ek hacim indirimleri mevcut.",
    },
    images: [
      "/products/bundles/garage-bulk-synth.jpg",
      "/products/bundles/garage-bulk-synth-inhoud.jpg",
    ],
  },
  {
    id: "b-perf",
    slug: "performance-pack",
    accent: "#e0455e",
    items: [
      { productId: "p-synth-5w40", sizeLiter: 5, qty: 1 },
      { productId: "p-injector-cleaner", sizeLiter: 0.3, qty: 1 },
      { productId: "p-antirust-spray", sizeLiter: 0.4, qty: 1 },
    ],
    price: 39.95,
    badge: "performance",
    gift: "cap",
    name: {
      nl: "Compleet Onderhoud Pakket",
      en: "Complete Care Pack",
      pl: "Pakiet Pełnej Pielęgnacji",
      ar: "حزمة العناية الكاملة",
      tr: "Komple Bakım Paketi",
    },
    desc: {
      nl: "5L Modern Drive 5W40 + injector cleaner + anti-roest spray — verversen, reinigen én beschermen in één. Gratis Benzol-cap.",
      en: "5L Modern Drive 5W40 + injector cleaner + anti-rust spray — change, clean and protect in one. Free Benzol cap.",
      pl: "5L Modern Drive 5W40 + injector cleaner + spray antykorozyjny — wymiana, czyszczenie i ochrona w jednym. Czapka Benzol gratis.",
      ar: "5 لتر Modern Drive 5W40 + منظف حاقنات + رذاذ مضاد للصدأ — تغيير وتنظيف وحماية معًا. قبعة Benzol مجانية.",
      tr: "5L Modern Drive 5W40 + enjektör temizleyici + pas önleyici sprey — değiştir, temizle ve koru. Ücretsiz Benzol şapka.",
    },
    images: [
      "/products/bundles/performance-pack.jpg",
      "/products/bundles/performance-pack-inhoud.jpg",
    ],
  },
];

/** Sum of the individual consumer prices of everything in a bundle. */
export function bundleOriginalPrice(bundle: Bundle): number {
  let total = 0;
  for (const item of bundle.items) {
    const product = getProductById(item.productId);
    if (!product) continue;
    total += sizePrice(product, item.sizeLiter) * item.qty;
  }
  return Math.round(total * 100) / 100;
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug);
}

/** All bundles that include the given product, in catalog order. */
export function getBundlesForProduct(productId: string): Bundle[] {
  return BUNDLES.filter((b) => b.items.some((it) => it.productId === productId));
}

/**
 * Photos to show for a bundle: its own dedicated photo(s) if set, otherwise
 * the photos of the products it contains (so the gallery is never empty).
 */
export function getBundleGalleryImages(bundle: Bundle): string[] {
  const own = resolveImages(bundle);
  if (own.length > 0) return own;
  return bundle.items.flatMap((it) => resolveImages(getProductById(it.productId)));
}
