"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport decorative background with several layers that move at
 * different speeds as the page scrolls (parallax depth). Blends the gold brand
 * glow with subtle azure-blue accents and a field of twinkling sparkles.
 * Purely decorative and reduced-motion safe (see globals.css).
 */
export default function ParallaxBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      for (const el of layers) {
        const speed = parseFloat(el.dataset.speed || "0");
        el.style.setProperty("--p", String(y * speed));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // deterministic sparkle field (no Math.random so SSR/CSR match)
  const sparkles = [
    { x: 8, y: 12, s: 3, d: 0, blue: true },
    { x: 22, y: 30, s: 2, d: 1.2, blue: false },
    { x: 40, y: 8, s: 2, d: 0.6, blue: true },
    { x: 58, y: 22, s: 3, d: 2.1, blue: true },
    { x: 73, y: 14, s: 2, d: 0.3, blue: false },
    { x: 88, y: 28, s: 3, d: 1.6, blue: true },
    { x: 15, y: 55, s: 2, d: 0.9, blue: false },
    { x: 34, y: 66, s: 3, d: 2.4, blue: true },
    { x: 50, y: 48, s: 2, d: 1.1, blue: true },
    { x: 66, y: 60, s: 2, d: 0.4, blue: false },
    { x: 82, y: 52, s: 3, d: 1.9, blue: true },
    { x: 92, y: 70, s: 2, d: 0.7, blue: false },
    { x: 12, y: 82, s: 2, d: 1.4, blue: true },
    { x: 44, y: 88, s: 3, d: 0.2, blue: true },
    { x: 70, y: 84, s: 2, d: 2.0, blue: false },
  ];

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base tint */}
      <div className="absolute inset-0 bg-ink" />

      {/* slow gold glow, top */}
      <div
        data-speed="0.12"
        className="parallax-layer absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(231,181,60,0.16), transparent 60%)" }}
      />
      {/* blue glow, mid-left */}
      <div
        data-speed="0.3"
        className="parallax-layer absolute left-[-8%] top-[38%] h-[560px] w-[560px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(77,166,255,0.14), transparent 62%)" }}
      />
      {/* blue glow, lower-right */}
      <div
        data-speed="0.45"
        className="parallax-layer absolute right-[-6%] top-[70%] h-[620px] w-[620px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(77,166,255,0.12), transparent 62%)" }}
      />
      {/* gold glow, far down */}
      <div
        data-speed="0.22"
        className="parallax-layer absolute left-[20%] top-[120%] h-[600px] w-[900px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(231,181,60,0.12), transparent 60%)" }}
      />

      {/* drifting grid */}
      <div
        data-speed="0.18"
        className="parallax-layer absolute inset-x-0 -top-10 h-[220%] bg-grid-neon opacity-[0.10]"
        style={{ backgroundSize: "46px 46px" }}
      />

      {/* twinkling sparkles */}
      <div data-speed="0.5" className="parallax-layer absolute inset-0 h-[200%]">
        {sparkles.map((sp, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full"
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              width: sp.s,
              height: sp.s,
              animationDelay: `${sp.d}s`,
              background: sp.blue ? "#8fc7ff" : "#f6d989",
              boxShadow: sp.blue
                ? "0 0 8px 1px rgba(143,199,255,0.7)"
                : "0 0 8px 1px rgba(246,217,137,0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
