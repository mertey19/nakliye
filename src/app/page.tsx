import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { Section, SectionHeading } from "@/components/sections/Section";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingFactors } from "@/components/sections/PricingFactors";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { guides } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { faqSchema, type FaqItem } from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";

const city = business.primaryCity;

/**
 * ANA SAYFA — arama amacı: "mersin nakliyat", "mersin nakliye",
 * "mersin nakliyat firması", "nakliyeci mersin" (geniş şehir + sektör).
 *
 * "mersin evden eve nakliyat" araması için kanonik sayfa /evden-eve-nakliyat'tır.
 * Bu ayrım, iki sayfanın aynı sorguda birbirini yemesini (cannibalization) önler.
 *
 * Bölüm ritmi: OFF-WHITE (hero) → DARK (güven bandı) → WHITE (hizmetler)
 * → OFF-WHITE (süreç) → DARK (neden biz) → WHITE (fiyat) → OFF-WHITE (bölgeler)
 * → WHITE (SSS) → OFF-WHITE (rehber) → DARK (kapanış CTA)
 */
export const metadata: Metadata = {
  title: `${city} Nakliyat ve Evden Eve Taşıma | ${business.name}`,
  description: `${city} içinde ve ${city} dışına evden eve nakliyat, ofis taşıma, parça eşya taşıma ve paketleme. Taşınma detaylarınızı paylaşın, ${business.name}'den hızlıca teklif alın.`,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${city} Nakliyat ve Evden Eve Taşıma | ${business.name}`,
    description: `${city} içinde ve ${city} dışına evden eve nakliyat, ofis taşıma ve parça eşya taşıma. Taşınma planınızı birlikte çıkaralım.`,
    url: absoluteUrl("/"),
  },
};

const processSteps = [
  {
    title: "İletişim",
    text: "Telefon, WhatsApp veya teklif formundan taşınma bilgilerinizi iletirsiniz.",
  },
  {
    title: "İhtiyacın belirlenmesi",
    text: "Eşya miktarı, kat, asansör durumu ve iki adresin araç yaklaşımı konuşulur.",
  },
  {
    title: "Planlama",
    text: "Taşınma günü, ekip ve araç ihtiyacı ile paketleme kapsamı netleştirilir.",
  },
  {
    title: "Paketleme",
    text: "İstenirse kırılabilir eşya, mutfak ve elektronik ürünler taşımaya hazır paketlenir.",
  },
  {
    title: "Yükleme",
    text: "Mobilyalar gerekiyorsa sökülür, sabitlenerek araca yüklenir.",
  },
  {
    title: "Taşıma ve teslim",
    text: "Eşyalar yeni adrese taşınır, mobilyalar kurulur ve yerleşim yapılır.",
  },
];

const pricingFactors = [
  {
    title: "Mesafe ve rota",
    text: `${city} içi kısa mesafe ile il dışına giden bir taşıma aynı fiyatlanmaz; yol süresi ve yakıt maliyeti değişir.`,
  },
  {
    title: "Eşya miktarı",
    text: "1+1 bir evle 4+1 bir evin araç hacmi ve ekip ihtiyacı farklıdır.",
  },
  {
    title: "Kat ve asansör",
    text: "Asansör yoksa veya eşya asansöre sığmıyorsa taşıma süresi ve işçilik artar.",
  },
  {
    title: "Paketleme kapsamı",
    text: "Sadece taşıma mı, yoksa paketleme malzemesi ve işçiliği de dahil mi olduğu fiyatı değiştirir.",
  },
  {
    title: "Araç yaklaşımı",
    text: "Dar sokak, otopark sorunu veya aracın binaya yaklaşamaması ek taşıma mesafesi yaratır.",
  },
  {
    title: "Tarih ve zamanlama",
    text: "Ay sonu ve hafta sonu yoğunluğu ile acil taşımalar planlamayı etkiler.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Nakliyat fiyatı nasıl belirleniyor?",
    answer:
      "Fiyat; taşınacak eşya miktarı, iki adres arasındaki mesafe, kat ve asansör durumu, paketleme yapılıp yapılmayacağı ve aracın binaya yaklaşabilmesi gibi etkenlere göre belirlenir. Bu etkenler her taşınmada farklı olduğu için sabit liste fiyatı yayınlamıyoruz; bilgileri aldıktan sonra size özel fiyat veriyoruz.",
  },
  {
    question: "Taşınmadan kaç gün önce iletişime geçmeliyim?",
    answer:
      "Tarihiniz netleştiği anda yazmanız en iyisi. Özellikle ay sonu ve hafta sonları yoğun olduğu için erken haber vermek istediğiniz güne yer ayırmayı kolaylaştırır. Acil durumlarda da önce arayın; uygun araç ve ekip varsa kısa sürede planlayabiliriz.",
  },
  {
    question: "Eşyaları kim paketliyor?",
    answer:
      "Tercihe bağlı. İsterseniz kırılabilir eşya, mutfak ve elektronik ürünlerin paketlemesini biz yaparız; isterseniz siz paketler, biz sadece taşırız. Paketleme kapsamı fiyatı doğrudan etkilediği için teklif öncesinde netleştiriyoruz.",
  },
  {
    question: "Şehirler arası taşıma yapıyor musunuz?",
    answer: `Evet. ${city} içindeki taşımaların yanında ${city} dışına ev ve ofis taşıması da yapıyoruz. Çıkış ve varış adresini, tahmini tarihi ve eşya miktarını paylaşırsanız rotaya göre plan çıkarıyoruz.`,
  },
  {
    question: "Asansör olmayan binalarda taşıma yapılıyor mu?",
    answer:
      "Yapılıyor. Bu durumda eşyalar merdivenden taşınır; süre ve işçilik arttığı için planlamayı buna göre yapıyoruz. Kat sayısını ve asansör durumunu önceden bildirmeniz, gün içinde sürpriz yaşanmasını önler.",
  },
  {
    question: "Sadece birkaç parça eşya taşıtabilir miyim?",
    answer:
      "Evet. Tek koltuk, buzdolabı, çamaşır makinesi veya birkaç kutuluk yük için tam ev taşıma paketi gerekmez. Parça eşya taşıma hizmetinde yalnızca taşınan parçaya göre plan yapılır.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={business.name}
        h1={`${city} Nakliyat ve Evden Eve Taşıma`}
        intro={`${business.name} ile şehir içi ve şehirler arası taşınma sürecinizi planlayın. Taşınma detaylarınızı paylaşın, size uygun nakliye çözümü için hızlıca iletişime geçelim.`}
        bullets={[
          "Evden eve, ofis ve parça eşya taşıma",
          `${city} içi ve ${city} dışı taşımalar`,
          "İsteğe bağlı profesyonel paketleme",
          "Taşınma günü için saat bazlı program",
        ]}
        whatsappMessage={defaultWhatsAppMessage}
      />

      <TrustBar />

      <Section tone="white" labelledBy="hizmetler-baslik">
        <SectionHeading
          id="hizmetler-baslik"
          eyebrow="Hizmetlerimiz"
          title="Hangi Taşıma Hizmetlerini Veriyoruz?"
          intro="Her taşınma aynı değil. Bir öğrenci evinin taşınmasıyla bir ofisin taşınması farklı planlama gerektirir. Aşağıdaki hizmetlerden size uyanı seçip detay sayfasına bakabilir ya da doğrudan bilgi isteyebilirsiniz."
        />
        <ServiceCards />
      </Section>

      <Section tone="light" labelledBy="surec-baslik">
        <SectionHeading
          id="surec-baslik"
          eyebrow="Süreç"
          title="Taşınma Süreci Nasıl İlerliyor?"
          intro="Taşınma gününde sürpriz yaşanmaması, öncesinde konuşulanlara bağlı. Süreci şu sırayla yürütüyoruz:"
        />
        <ProcessSteps steps={processSteps} />
      </Section>

      <WhyUs whatsappMessage={defaultWhatsAppMessage} />

      <Section tone="white" labelledBy="fiyat-baslik">
        <SectionHeading
          id="fiyat-baslik"
          eyebrow="Fiyatlandırma"
          title="Nakliyat Fiyatı Nasıl Hesaplanır?"
          intro="İnternette gördüğünüz sabit fiyat listeleri çoğu zaman taşınmanızın gerçek koşullarını içermez. Fiyatı belirleyen asıl etkenler şunlar:"
        />
        <PricingFactors
          factors={pricingFactors}
          whatsappMessage={defaultWhatsAppMessage}
        />
      </Section>

      <Section tone="light" labelledBy="bolge-baslik">
        <SectionHeading
          id="bolge-baslik"
          eyebrow="Hizmet bölgeleri"
          title="Hangi Bölgelerde Hizmet Veriyoruz?"
          intro={`${city} merkezde ${business.serviceAreas
            .map((a) => a.name)
            .join(", ")} ilçelerinde taşıma yapıyoruz. ${city} dışına yapılan ev ve ofis taşımaları için de aynı ekip planlama yürütüyor.`}
        />
        <div className="mt-8 flex flex-wrap gap-2.5">
          {business.serviceAreas.map((a) => (
            <span
              key={a.slug}
              className="rounded-[10px] border border-line bg-white px-5 py-2.5 text-[14px] font-semibold text-ink-900"
            >
              {a.name}
            </span>
          ))}
        </div>
        <Link
          href="/hizmet-bolgeleri"
          className="mt-7 inline-flex items-center gap-1.5 py-1.5 text-[15px] font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
        >
          Hizmet bölgeleri ve taşıma koşulları
          <span aria-hidden="true">→</span>
        </Link>

        <Gallery />
        <Reviews />
      </Section>

      <Section tone="white" labelledBy="sss-baslik">
        <SectionHeading
          id="sss-baslik"
          eyebrow="Sık sorulanlar"
          title="Sık Sorulan Sorular"
        />
        <Faq items={faqItems} />
      </Section>

      <Section tone="light" labelledBy="rehber-baslik">
        <SectionHeading
          id="rehber-baslik"
          eyebrow="Rehber"
          title="Taşınma Rehberi"
          intro="Taşınma tarihi yaklaşanların en çok sorduğu konuları yazıya döktük."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <article className="relative h-full rounded-card border border-line-soft bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-ink-500">
                <h3 className="text-[17px] font-bold tracking-[-0.02em] text-ink-900">
                  <Link
                    href={`/rehber/${g.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {g.h1}
                  </Link>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  {g.summary}
                </p>
                <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-500">
                  {g.readingMinutes} dk okuma
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Taşınmanızı Planlayalım"
        text={`Taşınma tarihiniz belli olduysa erken haber vermeniz uygun araç ve ekip ayırmayı kolaylaştırır. Bilgileri paylaşın, ${business.name} size özel teklifi hazırlasın.`}
        whatsappMessage={defaultWhatsAppMessage}
      />

      <JsonLd data={faqSchema(faqItems)} />
    </>
  );
}
