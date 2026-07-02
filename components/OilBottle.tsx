interface OilBottleProps {
  accent: string;
  viscosity: string;
  className?: string;
}

/**
 * A crisp, futuristic oil-bottle rendered entirely in SVG so the shop needs
 * no binary image assets. The accent colour drives the "liquid" glow.
 */
export default function OilBottle({ accent, viscosity, className }: OilBottleProps) {
  const gid = viscosity.replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 200 260" className={className} role="img" aria-label={`Benzol ${viscosity}`}>
      <defs>
        <linearGradient id={`body-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1f" />
          <stop offset="55%" stopColor="#101013" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <linearGradient id={`liq-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`glow-${gid}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${gid}`}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ambient glow */}
      <ellipse cx="100" cy="150" rx="80" ry="90" fill={`url(#glow-${gid})`} />

      {/* cap */}
      <rect x="82" y="8" width="36" height="26" rx="5" fill="#1c1c22" stroke={accent} strokeOpacity="0.5" />
      <rect x="88" y="30" width="24" height="12" rx="2" fill="#101013" />

      {/* bottle body */}
      <path
        d="M60 60 q0 -18 18 -18 h44 q18 0 18 18 v150 q0 22 -22 22 h-54 q-22 0 -22 -22 z"
        fill={`url(#body-${gid})`}
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* label panel */}
      <rect x="66" y="96" width="68" height="110" rx="8" fill="#0b0b0d" stroke={accent} strokeOpacity="0.25" />

      {/* liquid stripe */}
      <path d="M66 150 h68 v40 q0 8 -8 8 h-52 q-8 0 -8 -8 z" fill={`url(#liq-${gid})`} opacity="0.9" />
      <rect x="66" y="150" width="68" height="4" fill={accent} filter={`url(#blur-${gid})`} opacity="0.8" />

      {/* brand + viscosity text */}
      <text x="100" y="120" textAnchor="middle" fontFamily="monospace" fontSize="11" letterSpacing="2" fill={accent}>
        BENZOL
      </text>
      <text x="100" y="180" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#0a0a0b">
        {viscosity}
      </text>
      <text x="100" y="138" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="1.5" fill="#8a8f98">
        FULL SYNTHETIC
      </text>

      {/* highlight */}
      <rect x="70" y="66" width="8" height="150" rx="4" fill="#ffffff" opacity="0.05" />
    </svg>
  );
}
