import ParallaxBackground from "@/components/ParallaxBackground";
import MonteursBar from "@/components/MonteursBar";
import Hero from "@/components/Hero";
import UspSection from "@/components/UspSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BundleDeals from "@/components/BundleDeals";
import LuxuryShowcase from "@/components/LuxuryShowcase";
import MechanicChoice from "@/components/MechanicChoice";
import ShippingInfo from "@/components/ShippingInfo";
import TrustedGarages from "@/components/TrustedGarages";
import Reviews from "@/components/Reviews";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { PRODUCTS } from "@/lib/products";
import { DICTIONARIES } from "@/lib/i18n/dictionaries";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);
  const list = featured.length >= 4 ? featured : PRODUCTS.slice(0, 4);

  // FAQPage structured data — kan Google als uitklapbare vragen in de zoekresultaten tonen.
  const faq = DICTIONARIES.nl.faq as Record<string, { q: string; a: string }>;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.filter((k) => faq[k]).map((k) => ({
      "@type": "Question",
      name: faq[k].q,
      acceptedAnswer: { "@type": "Answer", text: faq[k].a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <ParallaxBackground />
      <MonteursBar />
      <Hero />
      <FeaturedProducts products={list} />
      <BundleDeals />
      <LuxuryShowcase />
      <MechanicChoice />
      <UspSection />
      <ShippingInfo />
      <TrustedGarages />
      <Reviews scope="home" seedRating={4.9} seedCount={1240} />
      <FaqSection />
    </>
  );
}
