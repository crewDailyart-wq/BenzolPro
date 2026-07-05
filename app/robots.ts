import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Automatische robots.txt (bereikbaar op /robots.txt). Laat zoekmachines de hele
 * shop indexeren, behalve de checkout-stappen, en wijst naar de sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/checkout/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
