import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingFactors } from "@/components/sections/PricingFactors";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ServiceViewTracker } from "@/components/Analytics";
import { QuoteButton } from "@/components/cta/ConversionButtons";

import { business } from "@/config/business";
import { serviceBySlug } from "@/config/services";
import { absoluteUrl } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  type Crumb,
  type FaqItem,
} from "@/lib/schema";

const service = serviceBySlug("ofis-tasima")!;
const city = business.primaryCity;

/** Arama amacı: "mersin ofis taşıma", "mersin işyeri taşıma", "ofis nakliyat mersin". */
export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: { canonical: absoluteUrl(`/${service.slug}`) },
  openGraph: {
    title: service.title,
    description: service.description,
    url: absoluteUrl(`/${service.slug}`),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: `${city} Ofis Taşıma`, path: `/${service.slug}` },
];

const steps = [
  {
    title: "Yerinde ihtiyaç tespiti",
    text: "Masa, dolap, bölme ve arşiv miktarı ile hangi birimin nereye taşınacağı belirlenir.",
  },
  {
    title: "Taşınma takvimi",
    text: "Mesai kaybını azaltmak için taşımanın hangi gün ve saatlerde yapılacağı kararlaştırılır.",
  },
  {
    title: "Etiketleme planı",
    text: "Kutular ve mobilyalar departman/oda bazında etiketlenir; yeni adreste yerleşim buna göre yapılır.",
  },
  {
    title: "Söküm ve paketleme",
    text: "Masalar ve bölme sistemleri sökülür; bilgisayar, ekran ve elektronik ürünler ayrı paketlenir.",
  },
  {
    title: "Taşıma",
    text: "Arşiv ve dosyalar kapalı kutularda taşınır; sıralama önceden belirlenen plana göre ilerler.",
  },
  {
    title: "Kurulum",
    text: "Mobilyalar yeni yerleşim planına göre kurulur, birimler kendi alanına yerleştirilir.",
  },
];

const pricingFactors = [
  {
    title: "Çalışan ve masa sayısı",
    text: "Ofisin büyüklüğü genellikle masa/istasyon sayısıyla ölçülür; araç ve ekip ihtiyacını bu belirler.",
  },
  {
    title: "Arşiv miktarı",
    text: "Dosya ve arşiv yoğun ofislerde kutu sayısı ve taşıma süresi belirgin biçimde artar.",
  },
  {
    title: "Bölme ve mobilya sistemi",
    text: "Sökülüp yeniden kurulması gereken bölme duvarlar ve çok parçalı sistemler ek işçilik demektir.",
  },
  {
    title: "Kat ve yük asansörü",
    text: "İş merkezlerinde yük asansörü kullanım saatleri taşımanın programını doğrudan etkiler.",
  },
  {
    title: "Zamanlama",
    text: "Hafta sonu veya mesai dışı taşıma, planlamanın dar bir zaman aralığına sığdırılmasını gerektirir.",
  },
  {
    title: "Mesafe",
    text: `Aynı iş merkezinde kat değişimi ile ${city} dışına ofis taşıma arasında maliyet farkı büyüktür.`,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Ofis taşıma hafta sonu yapılabilir mi?",
    answer:
      "Evet, çoğu ofis taşıması bilinçli olarak hafta sonuna veya mesai dışına planlanır. Amaç, pazartesi sabahı düzenin çalışır durumda olması. Tarihi konuşurken hangi saat aralığının size uygun olduğunu baştan belirlemek gerekir.",
  },
  {
    question: "Bilgisayarlar ve ekranlar nasıl taşınıyor?",
    answer:
      "Elektronik ürünler ayrı paketlenir ve diğer eşyalarla aynı kutuya konmaz. Kablolar sökülmeden önce hangi istasyona ait olduğu etiketlenirse, yeni adreste kurulum çok daha hızlı ilerler.",
  },
  {
    question: "Arşiv ve evraklar için ne yapmalıyız?",
    answer:
      "Arşivin taşınma öncesinde elenmesi en çok zaman kazandıran adımdır. Taşınacak dosyalar kapalı kutulara konur ve birim adıyla etiketlenir. Gizlilik gerektiren evrakların kutuları sizin tarafınızdan kapatılıp mühürlenebilir.",
  },
  {
    question: "Taşınma sırasında işi tamamen durdurmak gerekir mi?",
    answer:
      "Her zaman gerekmez. Birim birim taşıma yapılarak bazı ekipler çalışmaya devam edebilir. Bunun mümkün olup olmadığı ofisin büyüklüğüne ve iki adresin durumuna bağlı; planlamayı buna göre kuruyoruz.",
  },
];

export default function OfisTasimaPage() {
  return (
    <>
      <ServiceViewTracker service={service.slug} />

      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Hero
        eyebrow={business.name}
        h1={service.h1}
        intro={`Ofis taşımada asıl maliyet, kapalı geçen süredir. ${business.name} olarak ${city}'de ofis ve işyeri taşımalarını, çalışma düzeninin en kısa sürede yeniden kurulmasını hedefleyen bir programla yürütüyoruz.`}
        bullets={service.highlights}
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <Container className="py-14">
        <div className="prose-tr max-w-3xl">
          <h2>Ofis Taşıma Neden Ev Taşımadan Farklı?</h2>
          <p>
            Bir evde eşyanın hangi kutudan çıktığı birkaç gün içinde
            çözülebilir. Ofiste ise ertesi sabah bilgisayarın, dosyanın ve
            kablonun yerinde olması gerekir. Bu yüzden ofis taşımada üç şey öne
            çıkar:
          </p>
          <ul>
            <li>
              <strong>Etiketleme:</strong> Hangi kutu hangi birime ait, önceden
              belli olmalı.
            </li>
            <li>
              <strong>Sıralama:</strong> Önce kurulacak birim, önce taşınır.
            </li>
            <li>
              <strong>Zamanlama:</strong> Taşıma, iş akışının en az zarar
              göreceği saat aralığına yerleştirilir.
            </li>
          </ul>

          <h2>Taşınmadan Önce Sizin Hazırlamanız İyi Olanlar</h2>
          <p>
            Ofis taşımasını hızlandıran birkaç hazırlık var: kullanılmayan
            arşivin elenmesi, kişisel eşyaların çalışanlar tarafından
            toplanması, yeni adresteki oturma planının önceden çıkarılması ve
            internet/telefon aboneliklerinin taşınma gününe göre ayarlanması.
            Adım adım listeyi{" "}
            <Link href="/rehber/ofis-tasirken-nelere-dikkat">
              ofis taşırken nelere dikkat edilmeli
            </Link>{" "}
            yazısında topladık.
          </p>

          <h2>Şehir Dışına Ofis Taşıma</h2>
          <p>
            Başka bir ile taşınan ofislerde yükleme ve teslim günü ayrılır.
            Rotaya göre planlamanın nasıl yapıldığını{" "}
            <Link href="/sehirler-arasi-nakliyat">
              {city} şehirler arası nakliyat
            </Link>{" "}
            sayfasında anlattık. {city} merkez (Akdeniz ilçesi) cadde yasağı ve
            eski bina notu{" "}
            <Link href="/rehber/akdeniz-ev-tasima">
              Akdeniz&apos;de ev taşırken
            </Link>{" "}
            yazısında.
          </p>
        </div>

        <section aria-labelledby="surec" className="mt-14">
          <h2 id="surec" className="text-2xl font-extrabold text-white sm:text-3xl">
            Ofis Taşıma Süreci
          </h2>
          <ProcessSteps steps={steps} />
          <div className="mt-6">
            <QuoteButton
              location="after_process"
              service={service.slug}
              label="Ofis Bilgilerini Gönder"
            />
          </div>
        </section>

        <section aria-labelledby="fiyat" className="mt-16">
          <h2 id="fiyat" className="text-2xl font-extrabold text-white sm:text-3xl">
            Ofis Taşıma Fiyatı Neye Göre Belirlenir?
          </h2>
          <PricingFactors
            factors={pricingFactors}
            whatsappMessage={service.whatsappMessage}
            service={service.slug}
            note="Ofis taşımada fiyat, masa sayısı ve arşiv miktarı görülmeden gerçekçi biçimde verilemez. Ofisinizin büyüklüğünü ve taşınma tarihini paylaşırsanız planı çıkarıp fiyatı iletiriz."
          />
        </section>

        <Gallery title="Ofis Taşıma İşlerimizden" />
        <Reviews />

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-white sm:text-3xl">
            Ofis Taşıma Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>
      </Container>

      <CtaBand
        title="Ofis Taşıma Planınızı Çıkaralım"
        text="Masa sayısı, kat ve tercih ettiğiniz taşınma günü ile yazın; işin en az kesintiyle biteceği programı hazırlayalım."
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema(crumbs),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}
