"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Site logo. If you upload a file to `public/logo.png` (or logo.svg / .jpg,
 * see below) it is shown automatically; otherwise the built-in Benzol wordmark
 * is used. See public/LEES-MIJ.txt for how to add your own logo.
 */
export default function Logo({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Benzol home">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- local, user-provided logo
        <img
          src="/logo.png"
          alt="Benzol"
          className="h-10 w-auto max-w-[190px] object-contain"
          onError={() => setFailed(true)}
          ref={(el) => {
            if (el && el.complete && el.naturalWidth === 0) setFailed(true);
          }}
        />
      ) : (
        <>
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-neon text-ink shadow-neon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
              <path d="M13 2 4 14h7l-1 8 10-13h-7z" fill="#0a0a0b" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Benzol<span className="text-neon">Pro</span>
          </span>
        </>
      )}
    </Link>
  );
}
