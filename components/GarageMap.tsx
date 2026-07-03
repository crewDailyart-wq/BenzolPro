"use client";

import { useI18n } from "@/lib/i18n/provider";
import { GARAGES } from "@/lib/garages";

/**
 * A self-contained (no external tiles) stylised map of the Netherlands +
 * Belgium with a glowing dot for every garage in lib/garages.ts, projected
 * from real city coordinates. Add a garage in a listed city and its dot
 * appears automatically; unknown cities fall back to their country's centre.
 */

// Approximate [lon, lat] per city used in lib/garages.ts. Add a city here to
// place its dot precisely; otherwise the country centroid is used.
const CITY: Record<string, [number, number]> = {
  // Nederland
  Amersfoort: [5.387, 52.156], Amsterdam: [4.895, 52.37], Rotterdam: [4.478, 51.924],
  Leeuwarden: [5.798, 53.201], Utrecht: [5.121, 52.09], "Den Haag": [4.3, 52.078],
  Zwolle: [6.09, 52.512], Eindhoven: [5.47, 51.441], Arnhem: [5.899, 51.985],
  Groningen: [6.567, 53.219], Breda: [4.776, 51.585], Alkmaar: [4.749, 52.632],
  Maastricht: [5.688, 50.851], Haarlem: [4.646, 52.383], Tilburg: [5.091, 51.56],
  Nijmegen: [5.852, 51.842], Almere: [5.214, 52.35], "De Meern": [5.03, 52.083],
  Venlo: [6.168, 51.37], Deventer: [6.163, 52.251], Dordrecht: [4.69, 51.813],
  // België
  Antwerpen: [4.402, 51.219], Gent: [3.725, 51.054], Brugge: [3.224, 51.209],
  Brussel: [4.352, 50.847], Leuven: [4.7, 50.879], Hasselt: [5.338, 50.93],
  Luik: [5.573, 50.633], Mechelen: [4.48, 51.028], Kortrijk: [3.265, 50.828],
  Oostende: [2.918, 51.233],
};

const CENTROID: Record<"NL" | "BE", [number, number]> = {
  NL: [5.2, 52.2],
  BE: [4.4, 50.95],
};

// projection bounds (a little padding around the extreme cities)
const LON_MIN = 2.6, LON_MAX = 6.9;
const LAT_MIN = 50.4, LAT_MAX = 53.4;
const W = 300, H = 360, PAD = 20;

function project(lon: number, lat: number) {
  const x = PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (H - 2 * PAD);
  return { x, y };
}

export default function GarageMap() {
  const { t } = useI18n();

  const nlC = project(...CENTROID.NL);
  const beC = project(...CENTROID.BE);

  const dots = GARAGES.map((g, i) => {
    const coord = CITY[g.city] ?? CENTROID[g.country];
    // deterministic tiny offset so garages sharing a city don't overlap exactly
    const jitter = ((i % 5) - 2) * 1.6;
    const { x, y } = project(coord[0], coord[1]);
    return { ...g, x: x + jitter, y: y + ((i % 3) - 1) * 1.6 };
  });

  return (
    <div className="section-pad mt-14">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold">{t("garages.mapTitle")}</h3>
        <p className="mt-1 text-sm text-zinc-400">{t("garages.mapSubtitle")}</p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <div className="card-surface relative overflow-hidden p-4">
          <div className="pointer-events-none absolute inset-0 bg-grid-neon [background-size:24px_24px] opacity-20" />
          <svg viewBox={`0 0 ${W} ${H}`} className="relative w-full" role="img" aria-label={t("garages.mapTitle")}>
            <defs>
              <radialGradient id="landGlow" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#4da6ff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#4da6ff" stopOpacity="0" />
              </radialGradient>
              <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* soft land backdrop: two blobs for NL (upper) and BE (lower) */}
            <rect x="0" y="0" width={W} height={H} fill="url(#landGlow)" />
            <ellipse cx={nlC.x} cy={nlC.y} rx="120" ry="96" fill="#12223a" fillOpacity="0.55" stroke="#2f7fd0" strokeOpacity="0.35" />
            <ellipse cx={beC.x} cy={beC.y} rx="120" ry="70" fill="#1a1526" fillOpacity="0.55" stroke="#e7b53c" strokeOpacity="0.28" />

            {/* region labels */}
            <text x={nlC.x + 70} y={nlC.y - 70} fill="#8fc7ff" fillOpacity="0.8" fontSize="13" fontWeight="700" textAnchor="middle">
              {t("garages.countryNL")}
            </text>
            <text x={beC.x - 66} y={beC.y + 60} fill="#f6d989" fillOpacity="0.85" fontSize="13" fontWeight="700" textAnchor="middle">
              {t("garages.countryBE")}
            </text>

            {/* garage dots */}
            {dots.map((d, i) => (
              <g key={`${d.name}-${i}`} filter="url(#dotGlow)">
                <circle cx={d.x} cy={d.y} r="4.2" fill={d.country === "NL" ? "#8fc7ff" : "#f6d989"}>
                  <title>{`${d.name} — ${d.city}`}</title>
                </circle>
              </g>
            ))}
          </svg>

          {/* legend */}
          <div className="relative mt-2 flex items-center justify-center gap-5 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-azure-soft shadow-[0_0_8px_2px_rgba(143,199,255,0.7)]" />
              {t("garages.countryNL")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_8px_2px_rgba(246,217,137,0.6)]" />
              {t("garages.countryBE")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
