"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import OilBottle from "./OilBottle";
import { ArrowRight } from "./icons";

/**
 * Image gallery: large photo with very visible prev/next arrows, a
 * clickable thumbnail strip below it, keyboard (←/→) and touch-swipe
 * support. Falls back to the generated SVG bottle if there are no photos,
 * and silently skips any individual photo that fails to load.
 *
 * Generic over `images` (not tied to the Product type) so it can render
 * either a product's photos or — in bundle-preview mode — a bundle's photos.
 */
export default function ProductGallery({
  images: sourceImages,
  name,
  accent,
  viscosity,
  imageClassName = "",
}: {
  images: string[];
  name: string;
  accent: string;
  viscosity: string;
  imageClassName?: string;
}) {
  // keyed by content, not array reference — callers like resolveImages()
  // return a fresh array every render, which would otherwise reset state below on every parent re-render
  const imagesKey = sourceImages.join("|");
  const allImages = useMemo(() => sourceImages, [imagesKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // reset to the first photo whenever the source list actually changes (e.g. switching into bundle preview)
  useEffect(() => {
    setIndex(0);
    setFailed(new Set());
  }, [imagesKey]);

  const images = allImages.filter((_, i) => !failed.has(i));
  const total = images.length;
  const safeIndex = total > 0 ? Math.min(index, total - 1) : 0;
  const current = images[safeIndex];

  function goTo(i: number) {
    setIndex((i + total) % total);
  }
  function prev() {
    goTo(safeIndex - 1);
  }
  function next() {
    goTo(safeIndex + 1);
  }
  function markFailed(originalIndex: number) {
    if (originalIndex < 0) return;
    setFailed((prev) => (prev.has(originalIndex) ? prev : new Set(prev).add(originalIndex)));
  }

  /**
   * Server-rendered <img> tags start loading as soon as the browser parses
   * the HTML — before React hydrates and attaches the onError listener. If
   * the load already failed by the time hydration commits, that native
   * error event is missed. This ref catches that case on mount.
   */
  function checkAlreadyFailed(el: HTMLImageElement | null, src: string) {
    if (el && el.complete && el.naturalWidth === 0) {
      markFailed(allImages.indexOf(src));
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta > 0 ? prev() : next();
    touchStartX.current = null;
  }

  if (total === 0 || !current) {
    return (
      <div className="mx-auto aspect-square max-w-md">
        <OilBottle accent={accent} viscosity={viscosity} className={`h-full w-full ${imageClassName}`} />
      </div>
    );
  }

  return (
    <div>
      {/* main photo + arrows */}
      <div
        className="relative mx-auto aspect-square max-w-md outline-none"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={name}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided local photos */}
        <img
          key={current}
          ref={(el) => checkAlreadyFailed(el, current)}
          src={current}
          alt={`${name} — foto ${safeIndex + 1} van ${total}`}
          className={`h-full w-full rounded-3xl object-contain ${imageClassName}`}
          onError={() => markFailed(allImages.indexOf(current))}
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Vorige foto"
              className="absolute start-2 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-neon/50 bg-ink/80 text-neon shadow-neon backdrop-blur transition hover:scale-110 hover:bg-neon hover:text-ink active:scale-95 sm:h-14 sm:w-14"
            >
              <ArrowRight width={22} height={22} className="rotate-180 rtl:rotate-0" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Volgende foto"
              className="absolute end-2 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-neon/50 bg-ink/80 text-neon shadow-neon backdrop-blur transition hover:scale-110 hover:bg-neon hover:text-ink active:scale-95 sm:h-14 sm:w-14"
            >
              <ArrowRight width={22} height={22} className="rtl:rotate-180" />
            </button>
            <span className="absolute bottom-3 end-3 z-20 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-zinc-200 backdrop-blur">
              {safeIndex + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* thumbnail strip — click to jump straight to an angle */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto px-1 pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1} van ${total}`}
              aria-current={i === safeIndex}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === safeIndex ? "border-neon shadow-neon" : "border-ink-line opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided local photos */}
              <img
                ref={(el) => checkAlreadyFailed(el, img)}
                src={img}
                alt=""
                className="h-full w-full object-cover"
                onError={() => markFailed(allImages.indexOf(img))}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
