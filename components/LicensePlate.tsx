import type { ReactNode } from "react";

/** 12 EU-flag stars arranged in a ring, precomputed for a 16x16 viewBox. */
const STAR_POINTS: Array<[number, number]> = [
  [8, 2],
  [11, 2.8],
  [13.2, 5],
  [14, 8],
  [13.2, 11],
  [11, 13.2],
  [8, 14],
  [5, 13.2],
  [2.8, 11],
  [2, 8],
  [2.8, 5],
  [5, 2.8],
];

function EuBand({ size }: { size: "sm" | "lg" }) {
  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center bg-[#06318f] ${
        size === "lg" ? "w-9 py-1.5" : "w-5 py-0.5"
      }`}
    >
      <svg viewBox="0 0 16 16" width={size === "lg" ? 16 : 9} height={size === "lg" ? 16 : 9}>
        {STAR_POINTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" fill="#ffcf00" />
        ))}
      </svg>
      <span className={`font-extrabold text-white ${size === "lg" ? "mt-1 text-[10px]" : "text-[6px]"}`}>NL</span>
    </div>
  );
}

/**
 * A realistic Dutch (EU-format) license plate: yellow reflective field,
 * blue band with the ring of 12 EU stars and "NL", black frame + rivets.
 */
export default function LicensePlate({
  children,
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-stretch overflow-hidden rounded-md border-black shadow-[0_4px_18px_-6px_rgba(255,207,0,0.55)] ${
        size === "lg" ? "h-14 border-2" : "h-6 border"
      } ${className}`}
    >
      <EuBand size={size} />
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#ffe64a] via-[#ffd400] to-[#ffc700] px-3">
        {children}
      </div>
      {size === "lg" && (
        <>
          <span className="absolute left-1 top-1 h-1 w-1 rounded-full bg-black/30" />
          <span className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-black/30" />
        </>
      )}
    </div>
  );
}
