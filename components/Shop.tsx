"use client";

import { useMemo, useState } from "react";
import type { OilCategory, Product, Viscosity } from "@/lib/types";
import { ALL_VISCOSITIES } from "@/lib/products";
import { useI18n } from "@/lib/i18n/provider";
import ProductCard from "./ProductCard";
import { SearchIcon, SlidersIcon } from "./icons";

type SortKey = "popular" | "priceLow" | "priceHigh" | "rating";
const CATEGORIES: OilCategory[] = ["fullSynthetic", "syntheticBlend", "mineral", "racing"];

interface ShopProps {
  products: Product[];
  initialViscosity?: string;
  initialSort?: string;
}

export default function Shop({ products, initialViscosity, initialSort }: ShopProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [viscosity, setViscosity] = useState<Viscosity | "all">(
    (ALL_VISCOSITIES as string[]).includes(initialViscosity ?? "") ? (initialViscosity as Viscosity) : "all",
  );
  const [category, setCategory] = useState<OilCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>((initialSort as SortKey) || "popular");

  const filtered = useMemo(() => {
    let list = products.slice();
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.viscosity.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)),
      );
    }
    if (viscosity !== "all") list = list.filter((p) => p.viscosity === viscosity);
    if (category !== "all") list = list.filter((p) => p.category === category);

    switch (sort) {
      case "priceLow":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [products, query, viscosity, category, sort]);

  const hasFilters = query || viscosity !== "all" || category !== "all";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("filter.title")}</h1>
        <p className="mt-2 text-zinc-400">{t("brand.tagline")}</p>
      </div>

      {/* search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-zinc-500" width={18} height={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("filter.search")}
            className="input-field ps-10"
            aria-label={t("filter.search")}
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersIcon width={18} height={18} className="text-zinc-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="input-field !w-auto cursor-pointer"
            aria-label={t("filter.sort")}
          >
            <option value="popular">{t("filter.sortPopular")}</option>
            <option value="rating">{t("filter.sortRating")}</option>
            <option value="priceLow">{t("filter.sortPriceLow")}</option>
            <option value="priceHigh">{t("filter.sortPriceHigh")}</option>
          </select>
        </div>
      </div>

      {/* viscosity chips */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("filter.viscosity")}</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={viscosity === "all"} onClick={() => setViscosity("all")}>
            {t("filter.all")}
          </FilterChip>
          {ALL_VISCOSITIES.map((v) => (
            <FilterChip key={v} active={viscosity === v} onClick={() => setViscosity(v)}>
              {v}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* category chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="me-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("filter.category")}</p>
        <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
          {t("filter.all")}
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
            {t(`category.${c}`)}
          </FilterChip>
        ))}
      </div>

      {/* result count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          <span className="font-bold text-zinc-100">{filtered.length}</span> {t("filter.results")}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setViscosity("all");
              setCategory("all");
            }}
            className="text-sm text-neon hover:underline"
          >
            {t("filter.clear")}
          </button>
        )}
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-line py-20 text-center text-zinc-500">
          {t("filter.none")}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-neon bg-neon text-ink"
          : "border-ink-line bg-ink-card text-zinc-300 hover:border-neon/60 hover:text-neon"
      }`}
    >
      {children}
    </button>
  );
}
