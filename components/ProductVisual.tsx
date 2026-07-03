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
 */
export default function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
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
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided local photos, no next/image domain config needed
    return (
      <img
        key={image}
        ref={checkAlreadyFailed}
        src={image}
        alt={product.name}
        className={`rounded-2xl object-contain ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }

  return <OilBottle accent={product.accent} viscosity={product.viscosity} className={className} />;
}
