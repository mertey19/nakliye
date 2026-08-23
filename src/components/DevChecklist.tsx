import { missingBusinessData } from "@/lib/business";

/**
 * SADECE geliştirme ortamında görünür. Üretimde hiç render edilmez.
 * Amaç: eksik iş bilgisinin gözden kaçmaması (uydurma veri yerine eksik veri).
 */
export function DevChecklist() {
  if (process.env.NODE_ENV === "production") return null;
  const missing = missingBusinessData();
  if (missing.length === 0) return null;

  return (
    <aside className="border-t-4 border-ink-900 bg-surface px-4 py-4 text-sm text-ink-900 print:hidden">
      <p className="font-bold">
        [DEV] Eksik iş bilgisi ({missing.length}) — bu alanlar doldurulana kadar
        ilgili bölümler sitede gizlenir:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-700">
        {missing.map((m) => (
          <li key={m}>
            <code className="text-[13px]">{m}</code>
          </li>
        ))}
      </ul>
    </aside>
  );
}
