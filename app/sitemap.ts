import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { BUNDLES } from "@/lib/bundles";
import { getMakeEntries, getAllModelEntries, getAllGenerationEntries, getAllEngineEntries } from "@/lib/carModels";
import { GUIDES } from "@/lib/guides";
import { getCities } from "@/lib/garages";
import { COMPARE_PAIRS } from "@/lib/compare";
import { TOOLS } from "@/lib/tools";
import { NORMS } from "@/lib/norms";
import { BRAND_COMPARES } from "@/lib/brandCompare";
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
    { path: "/kenteken-check", priority: 0.8, freq: "monthly" },
    { path: "/widget", priority: 0.6, freq: "monthly" },
    { path: "/open-data", priority: 0.6, freq: "monthly" },
    { path: "/motorolie-rapport", priority: 0.7, freq: "yearly" },
    { path: "/kosten", priority: 0.7, freq: "monthly" },
    { path: "/vergelijk", priority: 0.7, freq: "monthly" },
    { path: "/vs", priority: 0.7, freq: "monthly" },
    { path: "/wiki", priority: 0.8, freq: "weekly" },
    { path: "/tools", priority: 0.8, freq: "weekly" },
    { path: "/mijn-garage", priority: 0.7, freq: "monthly" },
    { path: "/normen", priority: 0.7, freq: "monthly" },
    { path: "/olie", priority: 0.8, freq: "weekly" },
    { path: "/olie-verversen", priority: 0.7, freq: "weekly" },
    { path: "/gids", priority: 0.7, freq: "weekly" },
    { path: "/bundels", priority: 0.8, freq: "weekly" },
    { path: "/certificaten", priority: 0.5, freq: "yearly" },
    { path: "/offerte", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/algemene-voorwaarden", priority: 0.3, freq: "yearly" },
    { path: "/privacybeleid", priority: 0.3, freq: "yearly" },
    { path: "/retourbeleid", priority: 0.3, freq: "yearly" },
    { path: "/cookiebeleid", priority: 0.3, freq: "yearly" },
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

  const makeEntries: MetadataRoute.Sitemap = getMakeEntries().map((e) => ({
    url: `${SITE_URL}/olie/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const modelEntries: MetadataRoute.Sitemap = getAllModelEntries().map((e) => ({
    url: `${SITE_URL}/olie/${e.makeSlug}/${e.modelSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const generationEntries: MetadataRoute.Sitemap = getAllGenerationEntries().map((e) => ({
    url: `${SITE_URL}/olie/${e.makeSlug}/${e.modelSlug}/${e.genSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const engineEntries: MetadataRoute.Sitemap = getAllEngineEntries().map((e) => ({
    url: `${SITE_URL}/olie/${e.makeSlug}/${e.modelSlug}/motor/${e.engineSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/gids/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cityEntries: MetadataRoute.Sitemap = getCities().map((c) => ({
    url: `${SITE_URL}/olie-verversen/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Kostenpagina's per model ("wat kost olie verversen [auto]").
  const costEntries: MetadataRoute.Sitemap = getAllModelEntries().map((e) => ({
    url: `${SITE_URL}/kosten/${e.makeSlug}/${e.modelSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Viscositeit-vergelijkpagina's ("5W30 of 5W40").
  const compareEntries: MetadataRoute.Sitemap = COMPARE_PAIRS.map((p) => ({
    url: `${SITE_URL}/vergelijk/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Gratis RDW-kentekentools (APK, voertuiggegevens, CO2, waarde, wegenbelasting).
  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  // Olie-norm-encyclopedie (ACEA/API/OEM).
  const normEntries: MetadataRoute.Sitemap = NORMS.map((n) => ({
    url: `${SITE_URL}/normen/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Merk-vs-merk vergelijkingen (Benzol vs concurrent).
  const brandVsEntries: MetadataRoute.Sitemap = BRAND_COMPARES.map((b) => ({
    url: `${SITE_URL}/vs/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...bundleEntries,
    ...makeEntries,
    ...modelEntries,
    ...generationEntries,
    ...engineEntries,
    ...guideEntries,
    ...cityEntries,
    ...costEntries,
    ...compareEntries,
    ...toolEntries,
    ...normEntries,
    ...brandVsEntries,
  ];
}
