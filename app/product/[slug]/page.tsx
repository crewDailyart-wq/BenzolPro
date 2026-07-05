import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, getProductBySlug, productPositioning } from "@/lib/products";
import { sizePrice, defaultSize } from "@/lib/format";
import { resolveImages } from "@/lib/media";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "BenzolPro" };
  const canonical = `/product/${product.slug}`;
  const positioning = productPositioning(product);
  const title = `${product.name} — ${positioning.join(" · ")} motorolie`;
  const description =
    product.description ??
    `${product.name} · ${product.specs.join(", ")}. Premium Benzol motorolie — altijd gratis verzending, morgen in huis.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonical),
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.viscosity === product.viscosity || p.category === product.category),
  ).slice(0, 4);

  // ---- Product structured data (schema.org/Product) ----
  const stdSize = defaultSize(product.sizesLiter);
  const price = sizePrice(product, stdSize);
  const url = absoluteUrl(`/product/${product.slug}`);
  const photos = resolveImages(product);
  const images = photos.length > 0 ? photos.map((p) => absoluteUrl(p)) : [`${url}/opengraph-image`];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name} — ${product.specs.join(", ")}. Premium Benzol motorolie.`,
    sku: product.id,
    mpn: product.slug,
    category: "Motorolie",
    brand: { "@type": "Brand", name: "Benzol" },
    image: images,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: price.toFixed(2),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url,
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
        shippingDestination: [
          { "@type": "DefinedRegion", addressCountry: "NL" },
          { "@type": "DefinedRegion", addressCountry: "BE" },
        ],
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Producten", item: absoluteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <ProductDetail product={product} related={related} />
    </>
  );
}
