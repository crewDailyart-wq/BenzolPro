import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BundleDetail from "@/components/BundleDetail";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUNDLES, getBundleBySlug } from "@/lib/bundles";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const bundle = getBundleBySlug(params.slug);
  if (!bundle) return { title: "BenzolPro" };
  return {
    title: `${bundle.name.nl} — BenzolPro bundeldeal`,
    description: bundle.desc.nl,
    alternates: { canonical: `/bundel/${bundle.slug}` },
  };
}

export default function BundlePage({ params }: { params: { slug: string } }) {
  const bundle = getBundleBySlug(params.slug);
  if (!bundle) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Bundeldeals", item: absoluteUrl("/bundels") },
      { "@type": "ListItem", position: 3, name: bundle.name.nl, item: absoluteUrl(`/bundel/${bundle.slug}`) },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Bundeldeals", href: "/bundels" },
          { name: bundle.name.nl },
        ]}
      />
      <BundleDetail bundle={bundle} />
    </>
  );
}
