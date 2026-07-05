import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { BUNDLES } from "@/lib/bundles";
import { SITE_URL } from "@/lib/site";

/**
 * Automatische sitemap.xml (bereikbaar op /sitemap.xml). Dien deze in bij Google
 * Search Console zodat alle producten, bundels en pagina's snel geïndexeerd worden.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "daily" },
    { path: "/products", priority: 0.9, freq: "daily" },
    { path: "/bundels", priority: 0.8, freq: "weekly" },
    { path: "/certificaten", priority: 0.5, freq: "yearly" },
    { path: "/offerte", priority: 0.6, freq: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.freq,
    priority: s.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const bundleEntries: MetadataRoute.Sitemap = BUNDLES.map((b) => ({
    url: `${SITE_URL}/bundel/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries, ...bundleEntries];
}
