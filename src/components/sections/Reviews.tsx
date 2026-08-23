import { reviews } from "@/config/reviews";
import { hasReviewLink } from "@/lib/business";
import { business } from "@/config/business";

/**
 * Müşteri yorumları.
 * config/reviews.ts BOŞSA bu bölüm hiç render edilmez — uydurma yorum yazılmaz.
 * Karar noktalarına yakın, 3-6 gerçek yorum gösterilmesi hedeflenir.
 */
export function Reviews({ limit = 6 }: { limit?: number }) {
  if (reviews.length === 0) return null;

  return (
    <section className="mt-14" aria-labelledby="yorumlar-baslik">
      <h2 id="yorumlar-baslik" className="text-2xl font-extrabold text-ink-900">
        Müşteri Yorumları
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, limit).map((r, i) => (
          <li key={`${r.name}-${i}`} className="rounded-card border border-line bg-white p-6">
            <blockquote className="text-[15px] leading-relaxed text-ink-700">
              “{r.text}”
            </blockquote>
            <p className="mt-4 text-sm font-bold text-ink-900">{r.name}</p>
            {r.sourceUrl && (
              <a
                href={r.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-1 inline-block text-xs font-semibold text-ink-900 underline decoration-1 underline-offset-2 transition-colors hover:text-ink-500"
              >
                Yorumun kaynağı
              </a>
            )}
          </li>
        ))}
      </ul>
      {hasReviewLink && (
        <a
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
        >
          Google&apos;da yorum bırakın
        </a>
      )}
    </section>
  );
}
