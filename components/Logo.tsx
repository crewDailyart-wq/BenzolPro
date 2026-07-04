import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="BenzolPro home">
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-neon text-ink shadow-neon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
          <path d="M13 2 4 14h7l-1 8 10-13h-7z" fill="#0a0a0b" />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight">
        Benzol<span className="text-neon">Pro</span>
      </span>
    </Link>
  );
}
