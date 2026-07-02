import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "BenzolPro" };
  return {
    title: `${product.name} — BenzolPro`,
    description: `${product.name} · ${product.specs.join(", ")}. Premium Benzol motorolie.`,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.viscosity === product.viscosity || p.category === product.category),
  ).slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
