"use client";

import { useAudience } from "@/lib/audience";
import { useI18n } from "@/lib/i18n/provider";
import { euro } from "@/lib/format";

interface PriceTagProps {
  /** consumer price for the chosen size */
  base: number;
  /** optional consumer "was" price */
  compareAt?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const SIZE: Record<string, string> = {
  xs: "text-sm",
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
};

export default function PriceTag({ base, compareAt, size = "md", className = "" }: PriceTagProps) {
  const { isGarage, price, garageDiscountPct } = useAudience();
  const { t } = useI18n();
  const current = price(base);

  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`font-extrabold text-neon ${SIZE[size]}`}>{euro(current)}</span>
      {isGarage ? (
        <>
          <span className="text-sm text-red-500 line-through">{euro(base)}</span>
          <span className="rounded bg-neon/15 px-1.5 py-0.5 text-[11px] font-bold text-neon">
            {t("audience.garageTag")} −{garageDiscountPct}%
          </span>
        </>
      ) : (
        compareAt && <span className="text-sm text-red-500 line-through">{euro(compareAt)}</span>
      )}
    </div>
  );
}
