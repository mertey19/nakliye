import { Container } from "../Container";
import { WhatsAppCtaButton } from "../contact/WhatsAppCtaButton";
import { business } from "@/config/business";
import { hasWhatsApp } from "@/lib/business";
import { createWhatsAppUrl } from "@/lib/contact";

/**
 * "WHATSAPP'TAN BİLGİ AL" BÖLÜMÜ
 * ==============================
 * Bağımsız, gözle görülür bir dönüşüm bloğu. Sayfa sonu CTA bandından
 * bilinçli olarak FARKLI görünür (koyu bant değil, açık zeminde beyaz kart):
 * amaç aynı butonu tekrar etmek değil, WhatsApp'ı ayrı bir kanal olarak
 * anlaşılır kılmak.
 *
 * Farkı yaratan kısım: gönderilecek mesajın ÖNİZLEMESİ. Kullanıcı butona
 * basmadan önce ne göndereceğini görür — bu, "ne yazacağım şimdi?"
 * tereddüdünü ortadan kaldırır ve tıklama sonrası vazgeçmeyi azaltır.
 *
 * WhatsApp numarası yoksa bölüm HİÇ render edilmez (ölü buton yasağı).
 */

/** Müşterilerin gerçekten sorduğu tipteki sorular. */
const sampleQuestions = [
  "3+1 evimin taşınması yaklaşık ne tutar?",
  "Cumartesi günü için uygun musunuz?",
  "Sadece buzdolabı ve çamaşır makinesi taşıtabilir miyim?",
  "Çıkışta asansör yok, bu süreyi ne kadar uzatır?",
];

export function WhatsAppSection({
  message,
  location = "whatsapp_section",
  service,
}: {
  message: string;
  location?: string;
  service?: string;
}) {
  if (!hasWhatsApp) return null;

  const href = createWhatsAppUrl(message);
  if (!href) return null;

  return (
    <section
      className="bg-surface py-14 sm:py-20"
      aria-labelledby="whatsapp-baslik"
    >
      <Container>
        <div className="overflow-hidden rounded-card border border-line-soft bg-card">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12">
            <div>
              <p className="eyebrow text-ink-500">WhatsApp</p>
              <h2
                id="whatsapp-baslik"
                className="headline mt-4 text-[28px] text-white sm:text-[34px]"
              >
                WhatsApp&apos;tan Bilgi Al
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-700">
                Telefonda konuşmaya vaktiniz yoksa yazın. Taşınma tarihinizi ve
                adresleri ilettiğinizde {business.name} size uygun planı ve fiyatı
                çıkarır. Form doldurmanız gerekmez.
              </p>

              <ul className="mt-7 space-y-3">
                {sampleQuestions.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700"
                  >
                    <ChatIcon />
                    <span>&ldquo;{q}&rdquo;</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <WhatsAppCtaButton
                  href={href}
                  location={location}
                  service={service}
                />
              </div>
            </div>

            {/* Mesaj önizlemesi: kullanıcı ne göndereceğini önceden görür. */}
            <div className="lg:pl-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink-500">
                Gönderilecek mesaj
              </p>
              <div className="mt-4 rounded-card border border-line bg-surface p-5">
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink-800">
                  {message}
                </p>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
                Mesaj hazır geliyor; dilediğiniz gibi düzenleyip
                gönderebilirsiniz. Gönderene kadar hiçbir bilgi bize ulaşmaz.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-ink-500"
    >
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12Z" />
    </svg>
  );
}
