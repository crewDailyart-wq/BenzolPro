"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import ProductCard from "./ProductCard";
import { ArrowRight } from "./icons";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const { t } = useI18n();

  return (
    <section className="section-pad py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("filter.title")}</h2>
          <p className="mt-2 text-zinc-400">{t("brand.tagline")}</p>
        </div>
        <Link href="/products" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-neon hover:underline sm:inline-flex">
          {t("footer.allProducts")} <ArrowRight width={16} height={16} />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link href="/products" className="btn-ghost">
          {t("footer.allProducts")} <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </section>
  );
}
