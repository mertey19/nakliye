import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/**
 * Görünür ve taranabilir breadcrumb. Şeması sayfa tarafından JsonLd ile eklenir.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Site haritası yolu" className="py-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-700 font-medium">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-ink-500 underline-offset-2 hover:underline">
                  {c.name}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
