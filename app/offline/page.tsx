import Link from "next/link";
import type { Metadata } from "next";
import { CarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <div className="section-pad flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-soft text-neon">
        <CarIcon width={30} height={30} />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold">Je bent offline</h1>
      <p className="mt-3 max-w-sm text-zinc-400">
        Er is geen internetverbinding. De kentekencheck heeft verbinding nodig. Zodra je weer online bent, werkt alles
        gewoon.
      </p>
      <Link href="/" className="btn-neon mt-8">Probeer opnieuw</Link>
    </div>
  );
}
