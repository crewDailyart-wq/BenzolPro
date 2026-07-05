import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/provider";
import { AudienceProvider } from "@/lib/audience";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL } from "@/lib/site";
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
  areaServed: ["NL", "BE"],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
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
    <html lang="nl" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <JsonLd data={[ORG_JSONLD, WEBSITE_JSONLD]} />
        <I18nProvider>
          <AudienceProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <ChatWidget />
            </CartProvider>
          </AudienceProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
