import Hero from "@/components/Hero";
import UspSection from "@/components/UspSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);
  const list = featured.length >= 4 ? featured : PRODUCTS.slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedProducts products={list} />
      <UspSection />
    </>
  );
}
