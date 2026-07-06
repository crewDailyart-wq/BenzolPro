"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { resolveImages } from "@/lib/media";
import OilBottle from "./OilBottle";

/**
 * Renders a product's first real photo when `product.images` is set, falling
 * back to the generated SVG bottle if there are no photos or it fails to
 * load. For a multi-photo gallery with navigation arrows, use
 * `ProductGallery` (used on the product detail page) instead.
 * See README.md ("Eigen productfoto's toevoegen") for how to add photos.
 *
 * `cover`: when true a real photo fills its frame edge-to-edge (object-cover,
 * no letterbox borders) — used on the product cards and bestseller. The SVG
 * bottle fallback always stays "contain" so the bottle is never cropped.
 */
export default function ProductVisual({
  product,
  className = "",
  cover = false,
}: {
  product: Product;
  className?: string;
  cover?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const image = resolveImages(product)[0];

  // Server-rendered <img> tags start loading as soon as the browser parses
  // the HTML, before React hydrates and attaches onError — if the load
  // already failed by then, that native error event is missed. This ref
  // catches that case right on mount.
  function checkAlreadyFailed(el: HTMLImageElement | null) {
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }

  if (image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided local photos, no next/image domain config needed
      <img
        key={image}
        ref={checkAlreadyFailed}
        src={image}
        alt={product.name}
        className={`${cover ? "h-full w-full object-cover" : "rounded-2xl object-contain"} ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }

  return <OilBottle accent={product.accent} viscosity={product.viscosity} className={className} />;
}
