"use client";

import { formatBottleSize } from "@/lib/format";

/**
 * Blue glittering size chip (e.g. "5 L" or "300 ml") that marks which size the
 * standard headline price is for. Kleine onderhoudsmaten (< 1 L) worden als
 * milliliters getoond via `formatBottleSize`.
 */
export default function SizeChip({
  liters,
  className = "",
}: {
  liters: number;
  className?: string;
}) {
  const label = formatBottleSize(liters);
  return (
    <span className={`size-chip ${className}`} aria-label={label}>
      <span>{label.replace(" ", " ")}</span>
    </span>
  );
}
