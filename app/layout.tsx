import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Zelf-gehost lettertype (geen render-blokkerende externe request, geen layout-shift).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});
import { I18nProvider } from "@/lib/i18n/provider";
import { AudienceProvider } from "@/lib/audience";
import { CartProvider } from "@/lib/cart";
import AppShell from "@/components/AppShell";
import JsonLd from "@/components/JsonLd";
import { ConsentProvider } from "@/lib/consent";
import Analytics from "@/components/Analytics";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, COMPANY, isPlaceholder } from "@/lib/site";
import { getBrandAggregateRating } from "@/lib/products";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BenzolPro — Premium motorolie, direct de juiste keuze",
    template: "%s — BenzolPro",
  },
  description:
    "Premium Benzol motorolie voor elke auto. Voer je kenteken in en vind direct de juiste olie via de officiële RDW-database. Snel afrekenen met iDEAL. Altijd gratis verzending.",
  keywords: ["motorolie", "engine oil", "5W30", "5W40", "10W40", "0W30", "RDW", "iDEAL", "Benzol", "motorolie kopen", "olie voor mijn auto"],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "BenzolPro — Premium motorolie",
    description: "Vind in seconden de juiste olie voor jouw auto. Altijd gratis verzending, morgen in huis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BenzolPro — Premium motorolie",
    description: "Vind in seconden de juiste olie voor jouw auto.",
  },
  robots: { index: true, follow: true },
  // Zet NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION om je site in Google Search Console
  // te verifiëren (de meta-tag verschijnt dan automatisch in de <head>).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Globale structured data: wie is het bedrijf + welke website is dit.
const BRAND_RATING = getBrandAggregateRating();

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  slogan: SITE_TAGLINE,
  logo: `${SITE_URL}/opengraph-image`,
  email: CONTACT_EMAIL,
  legalName: COMPANY.legalName,
  areaServed: ["NL", "BE"],
  // Adres en telefoon alleen opnemen als ze echt zijn ingevuld (geen placeholders
  // in de structured data — dat schaadt juist het vertrouwen bij Google).
  ...(isPlaceholder(COMPANY.street)
    ? {}
    : {
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.street,
          postalCode: COMPANY.postal,
          addressLocality: COMPANY.city,
          addressCountry: COMPANY.country,
        },
      }),
  ...(isPlaceholder(COMPANY.vat) ? {} : { vatID: COMPANY.vat }),
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: COMPANY.phone,
    contactType: "customer support",
    availableLanguage: ["Dutch", "English"],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BRAND_RATING.ratingValue,
    reviewCount: BRAND_RATING.reviewCount,
    bestRating: BRAND_RATING.bestRating,
    worstRating: BRAND_RATING.worstRating,
  },
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "nl-NL",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" dir="ltr" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <JsonLd data={[ORG_JSONLD, WEBSITE_JSONLD]} />
        <ConsentProvider>
          <I18nProvider>
            <AudienceProvider>
              <CartProvider>
                <AppShell>{children}</AppShell>
              </CartProvider>
            </AudienceProvider>
          </I18nProvider>
          <Analytics />
        </ConsentProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
