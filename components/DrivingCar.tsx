"use client";

/**
 * A sporty car that continuously cruises across the hero, headlights on,
 * leaving a glowing gold trail. Purely decorative; respects reduced-motion.
 */
export default function DrivingCar({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 z-20 overflow-hidden ${className}`} aria-hidden>
      <div className="animate-drive w-max will-change-transform">
        <div className="relative scale-125 sm:scale-150">
          {/* headlight beam */}
          <div className="absolute left-[160px] top-[22px] h-14 w-56 -translate-y-1/2 rounded-full bg-gradient-to-r from-neon/60 via-neon/20 to-transparent blur-lg" />
          {/* glow halo around the car */}
          <div className="absolute -inset-4 rounded-full bg-neon/10 blur-2xl" />
          <svg width="190" height="66" viewBox="0 0 190 66" fill="none" className="relative drop-shadow-[0_6px_18px_rgba(231,181,60,0.35)]">
            <defs>
              <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#302f34" />
                <stop offset="100%" stopColor="#0d0d0f" />
              </linearGradient>
            </defs>
            {/* body */}
            <path
              d="M9 44 Q11 30 26 28 L57 26 Q70 12 100 12 L122 12 Q140 13 153 28 L171 33 Q180 35 180 44 L180 48 Q180 51 176 51 L13 51 Q9 51 9 48 Z"
              fill="url(#carBody)"
              stroke="#e7b53c"
              strokeOpacity="0.65"
              strokeWidth="1.4"
            />
            {/* windows */}
            <path d="M63 26 Q74 17 98 17 L118 17 Q131 18 140 26 Z" fill="#e7b53c" fillOpacity="0.2" />
            {/* headlight (bright core) */}
            <circle cx="176" cy="39" r="3.6" fill="#fffdf5" />
            <circle cx="176" cy="39" r="6.5" fill="#f6d989" fillOpacity="0.5" />
            {/* taillight */}
            <rect x="10" y="35" width="4.5" height="6.5" rx="1.2" fill="#e0455e" />
            {/* wheels */}
            <g>
              <circle cx="53" cy="51" r="12" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "53px 51px" }}>
                <circle cx="53" cy="51" r="5.4" fill="#16150f" stroke="#e7b53c" strokeWidth="1.5" />
                <path d="M53 46v11M47 51h12" stroke="#b78a2b" strokeWidth="1.3" />
              </g>
            </g>
            <g>
              <circle cx="138" cy="51" r="12" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "138px 51px" }}>
                <circle cx="138" cy="51" r="5.4" fill="#16150f" stroke="#e7b53c" strokeWidth="1.5" />
                <path d="M138 46v11M132 51h12" stroke="#b78a2b" strokeWidth="1.3" />
              </g>
            </g>
          </svg>
          {/* gold ground trail */}
          <div className="absolute -left-32 bottom-[9px] h-[3px] w-48 bg-gradient-to-l from-neon/70 via-neon/20 to-transparent blur-[1.5px]" />
        </div>
      </div>
    </div>
  );
}
