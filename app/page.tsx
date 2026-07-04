import ParallaxBackground from "@/components/ParallaxBackground";
import MonteursBar from "@/components/MonteursBar";
import Hero from "@/components/Hero";
import UspSection from "@/components/UspSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BundleDeals from "@/components/BundleDeals";
import MechanicChoice from "@/components/MechanicChoice";
import ShippingInfo from "@/components/ShippingInfo";
import TrustedGarages from "@/components/TrustedGarages";
import Reviews from "@/components/Reviews";
import FaqSection from "@/components/FaqSection";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);
  const list = featured.length >= 4 ? featured : PRODUCTS.slice(0, 4);

  return (
    <>
      <ParallaxBackground />
      <MonteursBar />
      <Hero />
      <BundleDeals />
      <FeaturedProducts products={list} />
      <MechanicChoice />
      <UspSection />
      <ShippingInfo />
      <TrustedGarages />
      <Reviews scope="home" seedRating={4.9} seedCount={1240} />
      <FaqSection />
    </>
  );
}
