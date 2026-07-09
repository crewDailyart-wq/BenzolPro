import Shop from "@/components/Shop";
import BrandStrip from "@/components/BrandStrip";
import { PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Alle motorolie — BenzolPro",
  description: "Filter op viscositeit, type en specificatie en vind direct de juiste Benzol motorolie.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { v?: string; sort?: string };
}) {
  return (
    <div className="section-pad py-10">
      <BrandStrip />
      <Shop products={PRODUCTS} initialViscosity={searchParams.v} initialSort={searchParams.sort} />
    </div>
  );
}
