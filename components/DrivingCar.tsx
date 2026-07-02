"use client";

/**
 * A small sporty car that drives across the screen once on load, headlights on,
 * leaving a soft gold light trail. Purely decorative; respects reduced-motion.
 */
export default function DrivingCar({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 z-20 overflow-hidden ${className}`} aria-hidden>
      <div className="animate-drive w-max will-change-transform">
        <div className="relative">
          {/* headlight beam */}
          <div className="absolute left-[150px] top-[18px] h-10 w-40 -translate-y-1/2 rounded-full bg-gradient-to-r from-neon/50 to-transparent blur-md" />
          <svg width="170" height="60" viewBox="0 0 170 60" fill="none">
            <defs>
              <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a2a2f" />
                <stop offset="100%" stopColor="#101013" />
              </linearGradient>
            </defs>
            {/* body */}
            <path
              d="M8 40 Q10 28 24 26 L52 24 Q64 12 92 12 L112 12 Q128 13 140 26 L156 30 Q164 32 164 40 L164 44 Q164 47 160 47 L12 47 Q8 47 8 44 Z"
              fill="url(#carBody)"
              stroke="#e7b53c"
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />
            {/* windows */}
            <path d="M58 24 Q68 16 90 16 L108 16 Q120 17 128 24 Z" fill="#e7b53c" fillOpacity="0.18" />
            {/* headlight */}
            <circle cx="160" cy="36" r="3" fill="#f6d989" />
            {/* taillight */}
            <rect x="9" y="32" width="4" height="6" rx="1" fill="#e0455e" />
            {/* wheels */}
            <g>
              <circle cx="48" cy="47" r="11" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "48px 47px" }}>
                <circle cx="48" cy="47" r="5" fill="#16150f" stroke="#e7b53c" strokeWidth="1.4" />
                <path d="M48 42v10M43 47h10" stroke="#b78a2b" strokeWidth="1.2" />
              </g>
            </g>
            <g>
              <circle cx="126" cy="47" r="11" fill="#0a0a0b" stroke="#2c2a22" strokeWidth="2" />
              <g className="origin-center animate-wheel" style={{ transformBox: "fill-box", transformOrigin: "126px 47px" }}>
                <circle cx="126" cy="47" r="5" fill="#16150f" stroke="#e7b53c" strokeWidth="1.4" />
                <path d="M126 42v10M121 47h10" stroke="#b78a2b" strokeWidth="1.2" />
              </g>
            </g>
          </svg>
          {/* gold ground trail */}
          <div className="absolute -left-24 bottom-[6px] h-[2px] w-40 bg-gradient-to-l from-neon/60 to-transparent blur-[1px]" />
        </div>
      </div>
    </div>
  );
}
