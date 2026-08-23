import { Container } from "../Container";

/**
 * GÜVEN BANDI — referans araçtaki koyu alt bilgi bandının web karşılığı.
 * Koyu zemin (#13181C), açık gri outline ikon, beyaz metin.
 *
 * SADECE firmanın gerçekten yaptığı operasyonel işler yazılır.
 * "10 yıllık deneyim", "10.000 mutlu müşteri", "4.9 puan" gibi
 * doğrulanmamış iddialar burada YER ALMAZ.
 */
const items: { title: string; icon: "check" | "truck" | "clock" }[] = [
  { title: "Güvenilir Hizmet", icon: "check" },
  { title: "Profesyonel Taşıma", icon: "truck" },
  { title: "Planlı Teslim", icon: "clock" },
];

export function TrustBar() {
  return (
    <section
      className="section-dark bg-ink-900 text-white"
      aria-label="Çalışma biçimimiz"
    >
      <Container>
        <ul className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((it) => (
            <li
              key={it.title}
              className="flex items-center justify-center gap-3 px-4 py-5 sm:py-6"
            >
              <Icon name={it.icon} />
              <span className="text-[13px] font-bold uppercase tracking-[0.12em] sm:text-[14px]">
                {it.title}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Icon({ name }: { name: "check" | "truck" | "clock" }) {
  const common = {
    "aria-hidden": true,
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0 text-ink-300",
  };

  if (name === "truck") {
    return (
      <svg {...common}>
        <path d="M3 17V6a1 1 0 0 1 1-1h10v12" />
        <path d="M14 9h4l3 3.5V17h-2" />
        <circle cx="7.5" cy="17.5" r="2" />
        <circle cx="17" cy="17.5" r="2" />
        <path d="M9.5 17.5h5.5" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 4.3-2.9 8.2-7 10-4.1-1.8-7-5.7-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
