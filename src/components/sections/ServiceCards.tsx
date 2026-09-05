import Link from "next/link";
import { services } from "@/config/services";
import { business } from "@/config/business";

/**
 * Hizmet kartları — beyaz yüzey, ince kenarlık, minimal outline ikon.
 * Hover'da kenarlık metalik griye döner ve kart 4px yükselir.
 *
 * `relative` ZORUNLU: başlık linkindeki `after:inset-0` katmanı konumlandırılmış
 * en yakın atasına göre yayılır. Bu sınıf olmadan tıklama katmanı karttan taşıp
 * sayfadaki diğer CTA'ları kapatır.
 */
export function ServiceCards({ exclude }: { exclude?: string }) {
  const list = services.filter((s) => s.slug !== exclude);

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.slug} className="flex">
          <article className="relative flex w-full flex-col rounded-card border border-line-soft bg-card p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-ink-500 hover:shadow-[0_16px_32px_-24px_rgba(19,24,28,0.6)]">
            <ServiceIcon slug={s.slug} />

            <h3 className="mt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-white">
              <Link
                href={`/${s.slug}`}
                className="after:absolute after:inset-0"
              >
                {business.primaryCity} {s.navLabel}
              </Link>
            </h3>

            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">
              {s.summary}
            </p>

            <ul className="mt-5 space-y-2 border-t border-line-soft pt-5 text-[14px] text-ink-700">
              {s.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-ink-500">
                    —
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold text-white">
              Detayları Gör
              <span aria-hidden="true">→</span>
            </span>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Minimal outline ikonlar — metalik gri stroke, renkli ikon seti yok. */
function ServiceIcon({ slug }: { slug: string }) {
  const props = {
    "aria-hidden": true,
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-ink-500",
  };

  switch (slug) {
    case "evden-eve-nakliyat":
      return (
        <svg {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-5.5h4V20" />
        </svg>
      );
    case "sehirler-arasi-nakliyat":
      return (
        <svg {...props}>
          <path d="M3 17V7a1 1 0 0 1 1-1h9v11" />
          <path d="M13 10h4.5l3.5 4v3h-2" />
          <circle cx="7" cy="17.5" r="1.9" />
          <circle cx="17" cy="17.5" r="1.9" />
        </svg>
      );
    case "ofis-tasima":
      return (
        <svg {...props}>
          <path d="M4 20V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15" />
          <path d="M15 10h4a1 1 0 0 1 1 1v9" />
          <path d="M3 20h18M7.5 8h3M7.5 12h3M7.5 16h3" />
        </svg>
      );
    case "parca-esya-tasima":
      return (
        <svg {...props}>
          <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
          <path d="M4 8.5 12 13l8-4.5M12 13v7" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
          <path d="M3 5.5h18V9H3zM10 13h4" />
        </svg>
      );
  }
}
