/**
 * Taşıma süreci — sadece gerçekten uygulanan adımlar yazılır.
 * Her hizmet sayfası kendi adım listesini geçer.
 */
export function ProcessSteps({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <ol className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-5 bg-card p-6">
          <span
            aria-hidden="true"
            className="text-[13px] font-bold tabular-nums text-ink-500"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-[16px] font-bold tracking-[-0.01em] text-white">
              {s.title}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
              {s.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
