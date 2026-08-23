import type { FaqItem } from "@/lib/schema";

/**
 * SSS — <details>/<summary> ile kurulur:
 *  - JavaScript gerekmez, içerik HTML'de tam olarak bulunur (taranabilir),
 *  - klavye ve ekran okuyucu ile çalışır,
 *  - CLS üretmez.
 * Şema, sayfanın gösterdiği SSS ile birebir aynıdır (uydurma SSS yok).
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-8 divide-y divide-line-soft overflow-hidden rounded-card border border-line-soft bg-white">
      {items.map((f) => (
        <details key={f.question} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold tracking-[-0.01em] text-ink-900 marker:hidden">
            {f.question}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-500 transition-transform duration-200 group-open:rotate-45"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 1.5v9M1.5 6h9" />
              </svg>
            </span>
          </summary>
          <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-500">
            {f.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
