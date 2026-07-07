/**
 * Betaalmethode-badges (iDEAL, Mastercard, Visa, Apple Pay, PayPal, Bancontact,
 * Maestro) als inline-SVG — geen externe afbeeldingen, dus nooit een kapot logo
 * en altijd scherp. Vertrouwenssignaal bij de checkout en in de footer.
 *
 * `marquee` toont de badges als een langzaam bewegende, oneindige strip
 * (respecteert prefers-reduced-motion: dan staat hij stil). Server component.
 */

// Vaste hoogte, flexibele breedte per logo — zo wordt niets afgekapt.
const H = 20;

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-white px-2 shadow-sm ring-1 ring-black/5"
    >
      {children}
    </span>
  );
}

function Ideal() {
  return (
    <svg viewBox="0 0 48 20" height={H} width={48 * (H / 20)} aria-hidden>
      <text x="1" y="15" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="15">
        <tspan fill="#cc0066">i</tspan>
        <tspan fill="#0a0a0b">DEAL</tspan>
      </text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 40 26" height={H} width={40 * (H / 26)} aria-hidden>
      <circle cx="16" cy="13" r="8" fill="#EB001B" />
      <circle cx="24" cy="13" r="8" fill="#F79E1B" />
      <path d="M20 7a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#FF5F00" />
    </svg>
  );
}

function Visa() {
  return (
    <svg viewBox="0 0 42 20" height={H} width={42 * (H / 20)} aria-hidden>
      <text x="1" y="16" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="15" fill="#1A1F71">
        VISA
      </text>
    </svg>
  );
}

function Maestro() {
  return (
    <svg viewBox="0 0 40 26" height={H} width={40 * (H / 26)} aria-hidden>
      <circle cx="16" cy="13" r="8" fill="#0099DF" />
      <circle cx="24" cy="13" r="8" fill="#ED0006" />
      <path d="M20 7a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#6C6BBD" />
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 46 20" height={H} width={46 * (H / 20)} aria-hidden>
      <path
        d="M8.4 5.6c.5-.6.8-1.4.7-2.2-.7 0-1.5.4-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9zM9.1 6.7c-1.1-.1-2 .6-2.5.6-.5 0-1.3-.6-2.1-.6-1.1 0-2.1.6-2.6 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.1 1.6 1.9 1.6.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5c.9 0 1.4-.8 2-1.5.6-.9.8-1.7.8-1.7 0 0-1.6-.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.3-1.2z"
        fill="#0a0a0b"
      />
      <text x="15" y="15" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="12" fill="#0a0a0b">
        Pay
      </text>
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 48 20" height={H} width={48 * (H / 20)} aria-hidden>
      <text x="1" y="15" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009cde">Pal</tspan>
      </text>
    </svg>
  );
}

function Bancontact() {
  return (
    <svg viewBox="0 0 40 26" height={H} width={40 * (H / 26)} aria-hidden>
      <rect x="3" y="9" width="17" height="8" rx="2" fill="#005498" />
      <rect x="20" y="9" width="17" height="8" rx="2" fill="#FFD800" />
    </svg>
  );
}

const BADGES: { label: string; el: React.ReactNode }[] = [
  { label: "iDEAL", el: <Ideal /> },
  { label: "Bancontact", el: <Bancontact /> },
  { label: "Mastercard", el: <Mastercard /> },
  { label: "Visa", el: <Visa /> },
  { label: "Maestro", el: <Maestro /> },
  { label: "Apple Pay", el: <ApplePay /> },
  { label: "PayPal", el: <PayPal /> },
];

export default function PaymentBadges({
  className = "",
  marquee = false,
}: {
  className?: string;
  marquee?: boolean;
}) {
  if (marquee) {
    // Track met de badges twee keer erin, zodat translateX(-50%) naadloos loopt.
    return (
      <div className={`marquee-mask relative flex overflow-hidden ${className}`}>
        <div className="flex w-max animate-marquee items-center gap-2 pe-2">
          {[...BADGES, ...BADGES].map((b, i) => (
            <Tile key={`${b.label}-${i}`} label={b.label}>
              {b.el}
            </Tile>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {BADGES.map((b) => (
        <Tile key={b.label} label={b.label}>
          {b.el}
        </Tile>
      ))}
    </div>
  );
}
