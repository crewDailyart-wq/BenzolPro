/**
 * Betaalmethode-badges (iDEAL, Mastercard, Visa, Apple Pay, PayPal, Bancontact,
 * Maestro) als inline-SVG — geen externe afbeeldingen, dus nooit een kapot logo
 * en altijd scherp. Bedoeld als vertrouwenssignaal bij de checkout en in de footer.
 * Server component (geen state).
 */

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-11 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"
    >
      {children}
    </span>
  );
}

function Ideal() {
  return (
    <svg viewBox="0 0 40 26" width="30" height="20" aria-hidden>
      <text x="4" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14">
        <tspan fill="#cc0066">i</tspan>
        <tspan fill="#0a0a0b">DEAL</tspan>
      </text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 40 26" width="30" height="20" aria-hidden>
      <circle cx="16" cy="13" r="8" fill="#EB001B" />
      <circle cx="24" cy="13" r="8" fill="#F79E1B" />
      <path d="M20 7a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#FF5F00" />
    </svg>
  );
}

function Visa() {
  return (
    <svg viewBox="0 0 40 26" width="32" height="20" aria-hidden>
      <text x="4" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="13" fill="#1A1F71">
        VISA
      </text>
    </svg>
  );
}

function Maestro() {
  return (
    <svg viewBox="0 0 40 26" width="30" height="20" aria-hidden>
      <circle cx="16" cy="13" r="8" fill="#0099DF" />
      <circle cx="24" cy="13" r="8" fill="#ED0006" />
      <path d="M20 7a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#6C6BBD" />
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 40 26" width="32" height="20" aria-hidden fill="#0a0a0b">
      <path d="M8.9 8.6c.5-.6.8-1.4.7-2.2-.7 0-1.5.4-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9zM9.6 9.7c-1.1-.1-2 .6-2.5.6-.5 0-1.3-.6-2.1-.6-1.1 0-2.1.6-2.6 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.6 2 1.6.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5c.9 0 1.4-.8 2-1.5.6-.9.8-1.7.8-1.7 0 0-1.6-.6-1.6-2.4 0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.3-1.2z" />
      <text x="16" y="17" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="10" fill="#0a0a0b">Pay</text>
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 44 26" width="34" height="20" aria-hidden>
      <text x="3" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="12">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009cde">Pal</tspan>
      </text>
    </svg>
  );
}

function Bancontact() {
  return (
    <svg viewBox="0 0 40 26" width="32" height="20" aria-hidden>
      <rect x="4" y="9" width="17" height="8" rx="2" fill="#005498" />
      <rect x="19" y="9" width="17" height="8" rx="2" fill="#FFD800" />
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

export default function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {BADGES.map((b) => (
        <Tile key={b.label} label={b.label}>
          {b.el}
        </Tile>
      ))}
    </div>
  );
}
