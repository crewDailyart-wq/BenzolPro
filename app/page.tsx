import ParallaxBackground from "@/components/ParallaxBackground";
import Hero from "@/components/Hero";
import UspSection from "@/components/UspSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BundleDeals from "@/components/BundleDeals";
import TrustedGarages from "@/components/TrustedGarages";
import FaqSection from "@/components/FaqSection";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);
  const list = featured.length >= 4 ? featured : PRODUCTS.slice(0, 4);

  return (
    <>
      <ParallaxBackground />
      <Hero />
      <BundleDeals />
      <FeaturedProducts products={list} />
      <UspSection />
      <TrustedGarages />
      <FaqSection />
    </>
  );
}
