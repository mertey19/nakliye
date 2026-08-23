import { Container } from "../Container";
import { CtaGroup } from "../cta/ConversionButtons";
import { business } from "@/config/business";

/**
 * KOYU BÖLÜM — "Neden Kansu Can Nakliye?"
 * Referans araçtaki koyu bilgi bandını sayfa ölçeğinde yeniden yorumlar.
 *
 * İçerik kuralı: yalnızca firmanın gerçekten yaptığı operasyonel işler.
 * Ölçülemeyen üstünlük iddiası ("en iyi", "en ucuz") ve doğrulanmamış
 * sayı ("10 yıl", "10.000 müşteri") KULLANILMAZ.
 */
const reasons: { title: string; text: string }[] = [
  {
    title: "Planlı Taşıma",
    text: "Taşınma günü öncesinde eşya miktarı, kat ve asansör durumu konuşulur; iş saat programına bağlanır.",
  },
  {
    title: "Paketleme Desteği",
    text: "Kırılabilir eşya, mutfak ve elektronik için ayrı ambalaj yapılır; kutular oda bazında etiketlenir.",
  },
  {
    title: "Şehir İçi ve Şehirler Arası",
    text: "Aynı ekip hem şehir içi ev taşımayı hem de il dışı nakliyatı planlar.",
  },
  {
    title: "Doğrudan İletişim",
    text: "Çağrı merkezi arasına girmez; taşımayı yapan firmayla doğrudan konuşursunuz.",
  },
];

export function WhyUs({ whatsappMessage }: { whatsappMessage: string }) {
  return (
    <section
      className="section-dark bg-ink-900 py-16 text-white sm:py-20"
      aria-labelledby="neden-biz"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-ink-300">Çalışma biçimimiz</p>
            <h2
              id="neden-biz"
              className="headline mt-4 text-[30px] text-white sm:text-[38px]"
            >
              Neden {business.name}?
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-300">
              Taşınmada işi zorlaştıran şey mesafe değil, önceden
              konuşulmamış detaylardır. Bu yüzden fiyat vermeden önce işin
              koşullarını netleştiriyoruz.
            </p>

            <CtaGroup
              location="why_us"
              whatsappMessage={whatsappMessage}
              className="mt-8"
              onDark
            />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <li
                key={r.title}
                className="rounded-card border border-white/10 bg-card-dark p-6"
              >
                <p className="text-[16px] font-bold tracking-[-0.01em] text-white">
                  {r.title}
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-300">
                  {r.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
