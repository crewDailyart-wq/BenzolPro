"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import OilBottle from "./OilBottle";

/**
 * Renders a product's real photo when `product.image` is set, falling back
 * to the generated SVG bottle if there is no photo or it fails to load.
 * See README.md ("Eigen productfoto's toevoegen") for how to add photos.
 */
export default function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (product.image && !failed) {
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided local photos, no next/image domain config needed
    return (
      <img
        src={product.image}
        alt={product.name}
        className={`object-contain ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }

  return <OilBottle accent={product.accent} viscosity={product.viscosity} className={className} />;
}
