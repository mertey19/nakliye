import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBar } from "@/components/sections/TrustBar";
import { QuoteForm } from "@/components/QuoteForm";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/JsonLd";
import {
  CallButton,
  WhatsAppButton,
} from "@/components/cta/ConversionButtons";

import { business } from "@/config/business";
import { absoluteUrl } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  type Crumb,
  type FaqItem,
} from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";
import { hasDirectContact, hasPhone, hasWhatsApp, phoneLabel } from "@/lib/business";

const city = business.primaryCity;

/** Arama amacı: "mersin nakliyat fiyat teklifi", "nakliyat teklif al". */
export const metadata: Metadata = {
  title: `Nakliyat Teklifi Al | ${business.name}`,
  description: `${city} içi ve şehirler arası taşınma için teklif alın. Nereden nereye taşındığınızı ve tahmini tarihi paylaşın, ${business.name} size özel fiyatı iletsin.`,
  alternates: { canonical: absoluteUrl("/teklif-al") },
  openGraph: {
    title: `Nakliyat Teklifi Al | ${business.name}`,
    description: `Taşınma bilgilerinizi paylaşın, ${business.name} size özel fiyatı iletsin.`,
    url: absoluteUrl("/teklif-al"),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Teklif Al", path: "/teklif-al" },
];

const faqItems: FaqItem[] = [
  {
    question: "Teklif almak ücretli mi?",
    answer:
      "Hayır. Taşınma bilgilerinizi göndermeniz ve fiyat öğrenmeniz ücretsizdir, herhangi bir yükümlülük doğurmaz. Fiyatı öğrendikten sonra çalışmama kararı verebilirsiniz.",
  },
  {
    question: "Formu gönderdikten sonra ne oluyor?",
    answer:
      "Bilgileriniz hazır bir mesaja dönüşüyor ve siz gönderiyorsunuz. Ardından eksik kalan noktalar (kat, asansör, eşya miktarı) varsa kısa bir görüşmeyle netleştirip fiyatı iletiyoruz.",
  },
  {
    question: "Verdiğiniz fiyat sonradan değişir mi?",
    answer:
      "Paylaştığınız bilgiler doğruysa fiyat değişmez. Fiyatın değişmesine yol açan tek durum, taşınma günü ortaya çıkan ve önceden bildirilmemiş koşullardır: beklenenden fazla eşya, çalışmayan asansör ya da aracın binaya yaklaşamaması gibi. Bu yüzden bilgileri baştan doğru vermeniz kendi lehinize.",
  },
  {
    question: "Eve gelip keşif yapıyor musunuz?",
    answer:
      "Küçük taşımalarda genellikle gerek kalmıyor; telefonda alınan bilgiler yeterli oluyor. Büyük evlerde, çok sayıda özel eşya olduğunda veya ofis taşımalarında yerinde görmek daha sağlıklı sonuç veriyor.",
  },
  {
    question: "Taşınma tarihim kesin değil, yine de teklif alabilir miyim?",
    answer:
      "Alabilirsiniz. Tahmini bir aralık vermeniz yeterli. Tarih netleştiğinde haber vermeniz durumunda o güne yer ayırmayı planlayabiliyoruz.",
  },
];

export default function TeklifAlPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>
      <TrustBar />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Nakliyat Teklifi Al
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-700">
              Üç kısa adımda taşınma bilgilerinizi alıyoruz. Formu doldurmanız
              yaklaşık bir dakika sürüyor; ardından bilgiler hazır mesaj olarak
              önünüze geliyor ve gönderiyorsunuz.
            </p>

            <ul className="mt-6 space-y-2.5 text-[15px] text-ink-700">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="font-bold text-white">
                  1.
                </span>
                Nereden nereye taşınıyorsunuz?
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="font-bold text-white">
                  2.
                </span>
                Ne taşınacak ve tahmini tarih ne?
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="font-bold text-white">
                  3.
                </span>
                Size hangi numaradan dönelim?
              </li>
            </ul>

            {hasDirectContact && (
              <div className="mt-8 rounded-card border border-line bg-surface p-6">
                <p className="text-[16px] font-bold text-white">
                  Form doldurmak istemiyor musunuz?
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                  Doğrudan arayabilir veya WhatsApp&apos;tan yazabilirsiniz.
                  {hasPhone ? ` Telefon: ${phoneLabel}` : ""}
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {hasWhatsApp && (
                    <WhatsAppButton
                      message={defaultWhatsAppMessage}
                      location="quote_page_alt"
                    />
                  )}
                  {hasPhone && <CallButton location="quote_page_alt" />}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-card border border-line bg-card p-6">
              <h2 className="text-[17px] font-bold text-white">
                Teklif verirken neye bakıyoruz?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                Eşya miktarı, iki adresin kat ve asansör durumu, mesafe ve
                paketleme kapsamı. Bu dördü netleştiğinde fiyat da netleşiyor.
                Bu yüzden formda gereksiz soru sormuyoruz.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <QuoteForm />
          </div>
        </div>
      </Container>

      <Container className="pb-14">
        <section aria-labelledby="teklif-sss" className="max-w-3xl">
          <h2
            id="teklif-sss"
            className="text-2xl font-extrabold text-white sm:text-3xl"
          >
            Teklif Süreci Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>
      </Container>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqItems)]} />
    </>
  );
}
