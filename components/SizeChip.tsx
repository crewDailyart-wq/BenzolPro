"use client";

import { useI18n } from "@/lib/i18n/provider";

/**
 * Blue glittering size chip (e.g. "5 L") that marks which size the standard
 * headline price is for. Since prices are shown for the 5 L size everywhere,
 * this makes the size unmistakable with an animated azure sheen + glitter.
 */
export default function SizeChip({
  liters,
  className = "",
}: {
  liters: number;
  className?: string;
}) {
  const { t } = useI18n();
  const unit = t("product.liter");
  return (
    <span className={`size-chip ${className}`} aria-label={`${liters} ${unit}`}>
      <span>
        {liters}&nbsp;{unit}
      </span>
    </span>
  );
}
