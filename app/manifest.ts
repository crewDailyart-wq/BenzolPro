import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

// Web App Manifest → maakt BenzolPro installeerbaar (PWA). Bereikbaar op
// /manifest.webmanifest; Next koppelt hem automatisch in de <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Premium motorolie`,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: "/?utm_source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "nl-NL",
    categories: ["shopping", "automotive"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Kentekencheck", short_name: "Olie-check", url: "/kenteken-check?utm_source=pwa" },
      { name: "Mijn Garage", short_name: "Garage", url: "/mijn-garage?utm_source=pwa" },
      { name: "Gratis tools", short_name: "Tools", url: "/tools?utm_source=pwa" },
    ],
  };
}
