import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string; // laatste item (huidige pagina) heeft geen href
}

/**
 * Zichtbaar kruimelpad. Vult de al aanwezige BreadcrumbList-structured-data aan
 * met een klikbare navigatie — beter voor UX, doorklikken en verblijfsduur.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Kruimelpad" className="section-pad pt-6 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="transition hover:text-neon">
                  {item.name}
                </Link>
              ) : (
                <span className={last ? "text-zinc-300" : ""} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              )}
              {!last && <span className="text-zinc-600">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
