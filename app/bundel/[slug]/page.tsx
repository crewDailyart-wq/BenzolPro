import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BundleDetail from "@/components/BundleDetail";
import { BUNDLES, getBundleBySlug } from "@/lib/bundles";

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const bundle = getBundleBySlug(params.slug);
  if (!bundle) return { title: "BenzolPro" };
  return {
    title: `${bundle.name.nl} — BenzolPro bundeldeal`,
    description: bundle.desc.nl,
  };
}

export default function BundlePage({ params }: { params: { slug: string } }) {
  const bundle = getBundleBySlug(params.slug);
  if (!bundle) notFound();

  return <BundleDetail bundle={bundle} />;
}
