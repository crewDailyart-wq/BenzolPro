import Link from "next/link";
import { LEGAL_UPDATED } from "@/lib/site";

/**
 * Gedeelde opmaak voor de juridische pagina's (voorwaarden, privacy, retour,
 * cookies, contact). Zorgt voor een consistente, leesbare prose-lay-out in de
 * huisstijl, met kruimelpad en "laatst bijgewerkt"-datum.
 */
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const updated = new Date(LEGAL_UPDATED).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="section-pad py-12">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-neon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">{title}</span>
      </nav>

      <article className="legal-prose mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-zinc-500">Laatst bijgewerkt: {updated}</p>
        {intro && <p className="mt-6 text-lg text-zinc-300">{intro}</p>}
        <div className="mt-8 space-y-6 text-zinc-400">{children}</div>
      </article>
    </div>
  );
}

/** Eén paragraafblok met kop. */
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-zinc-100">{heading}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
