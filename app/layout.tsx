import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/provider";
import { AudienceProvider } from "@/lib/audience";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "BenzolPro — Premium motorolie, direct de juiste keuze",
  description:
    "Premium Benzol motorolie voor elke auto. Voer je kenteken in en vind direct de juiste olie via de officiële RDW-database. Snel afrekenen met iDEAL.",
  keywords: ["motorolie", "engine oil", "5W30", "5W40", "10W40", "0W30", "RDW", "iDEAL", "Benzol"],
  openGraph: {
    title: "BenzolPro — Premium motorolie",
    description: "Vind in seconden de juiste olie voor jouw auto.",
    type: "website",
  },
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
        <I18nProvider>
          <AudienceProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </AudienceProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
