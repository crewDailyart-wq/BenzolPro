"use client";

/**
 * A sporty car that continuously cruises along a visible road across the
 * hero, xenon-blue headlights on, leaving a gold/blue glowing trail.
 * Purely decorative; respects reduced-motion.
 */
export default function DrivingCar({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 z-20 ${className}`} aria-hidden>
      {/* road surface — static across the full width, right under the wheels.
          Lives outside the car's own overflow-hidden wrapper below, so it's
          never clipped by that wrapper's (unscaled) auto-height. */}
      <div className="absolute inset-x-0 top-[70px] h-4 -translate-y-1/2 sm:top-[84px]">
        <div className="h-full w-full rounded-full bg-gradient-to-b from-[#48484f] via-[#28282d] to-[#151517] shadow-[0_0_18px_-1px_rgba(77,166,255,0.5)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-azure/40" />
        <div
          className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #8fc7ff 0px, #8fc7ff 20px, transparent 20px, transparent 40px)",
            filter: "drop-shadow(0 0 4px rgba(143,199,255,0.9))",
          }}
        />
      </div>

      {/* car: its own overflow-hidden wrapper keeps the sweeping animation
          from ever widening the page, without clipping the road above */}
      <div className="overflow-hidden">
      <div className="animate-drive w-max will-change-transform">
        <div className="relative scale-125 sm:scale-150">
          {/* xenon-blue headlight beam */}
          <div className="absolute left-[160px] top-[22px] h-14 w-56 -translate-y-1/2 rounded-full bg-gradient-to-r from-white/70 via-azure/35 to-transparent blur-lg" />
          {/* ambient halo: gold + blue mix */}
          <div className="absolute -inset-4 rounded-full bg-neon/8 blur-2xl" />
          <div className="absolute -inset-3 rounded-full bg-azure/12 blur-2xl" />
          {/* blue underglow beneath the chassis */}
          <div className="absolute inset-x-3 bottom-1 h-3 rounded-full bg-azure/50 blur-md" />

          <svg width="190" height="66" viewBox="0 0 190 66" fill="none" className="relative drop-shadow-[0_6px_18px_rgba(77,166,255,0.35)]">
            <defs>
              <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c2e34" />
                <stop offset="100%" stopColor="#0d0d0f" />
              </linearGradient>
            </defs>
            {/* body */}
            <path
              d="M9 44 Q11 30 26 28 L57 26 Q70 12 100 12 L122 12 Q140 13 153 28 L171 33 Q180 35 180 44 L180 48 Q180 51 176 51 L13 51 Q9 51 9 48 Z"
              fill="url(#carBody)"
              stroke="#4da6ff"
              strokeOpacity="0.55"
              strokeWidth="1.4"
            />
            {/* windows, blue-tinted glass */}
            <path d="M63 26 Q74 17 98 17 L118 17 Q131 18 140 26 Z" fill="#4da6ff" fillOpacity="0.28" />
            {/* headlight (bright xenon-white core) */}
            <circle cx="176" cy="39" r="3.6" fill="#ffffff" />
            <circle cx="176" cy="39" r="6.5" fill="#8fc7ff" fillOpacity="0.55" />
            {/* taillight */}
            <rect x="10" y="35" width="4.5" height="6.5" rx="1.2" fill="#e0455e" />
            {/* wheels */}
            <g>
              <circle cx="53" cy="51" r="12" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "53px 51px" }}>
                <circle cx="53" cy="51" r="5.4" fill="#16150f" stroke="#4da6ff" strokeWidth="1.5" />
                <path d="M53 46v11M47 51h12" stroke="#2f7fd0" strokeWidth="1.3" />
              </g>
            </g>
            <g>
              <circle cx="138" cy="51" r="12" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "138px 51px" }}>
                <circle cx="138" cy="51" r="5.4" fill="#16150f" stroke="#4da6ff" strokeWidth="1.5" />
                <path d="M138 46v11M132 51h12" stroke="#2f7fd0" strokeWidth="1.3" />
              </g>
            </g>
          </svg>
          {/* gold/blue ground speed trail */}
          <div className="absolute -left-32 bottom-[9px] h-[3px] w-48 bg-gradient-to-l from-azure/70 via-neon/30 to-transparent blur-[1.5px]" />
        </div>
      </div>
      </div>
    </div>
  );
}
