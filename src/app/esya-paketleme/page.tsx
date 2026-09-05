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

const service = serviceBySlug("esya-paketleme")!;
const city = business.primaryCity;

/** Arama amacı: "mersin eşya paketleme", "paketleme hizmeti mersin", "taşınma paketleme". */
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
  { name: `${city} Eşya Paketleme`, path: `/${service.slug}` },
];

const steps = [
  {
    title: "Kapsamın belirlenmesi",
    text: "Hangi odaların ve hangi eşya gruplarının paketleneceği konuşulur.",
  },
  {
    title: "Malzeme hazırlığı",
    text: "Eşya türüne göre koli, balonlu naylon, streç ve dolgu malzemesi hazırlanır.",
  },
  {
    title: "Paketleme",
    text: "Kırılabilir eşya tek tek sarılır, kutular boşluk bırakmayacak şekilde doldurulur.",
  },
  {
    title: "Etiketleme",
    text: "Her kutunun hangi odaya ait olduğu ve kırılabilir içerik taşıyıp taşımadığı yazılır.",
  },
];

const pricingFactors = [
  {
    title: "Paketlenecek oda sayısı",
    text: "Sadece mutfak mı, evin tamamı mı paketlenecek: işçilik süresini bu belirler.",
  },
  {
    title: "Kırılabilir eşya yoğunluğu",
    text: "Cam, porselen ve dekoratif ürün çoksa hem malzeme hem süre artar.",
  },
  {
    title: "Malzeme miktarı",
    text: "Kullanılan koli, balonlu naylon ve dolgu miktarı doğrudan maliyet kalemidir.",
  },
  {
    title: "Taşımayla birlikte mi?",
    text: "Paketleme, taşımayla birlikte alındığında tek plan içinde yürütülür.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Sadece paketleme hizmeti alabilir miyim?",
    answer:
      "Evet. Taşımayı başka bir şekilde çözecek olsanız bile yalnızca paketleme için de çalışıyoruz. Bu durumda hangi odaların paketleneceğini ve tarihi belirlemek yeterli.",
  },
  {
    question: "Paketleme malzemesi size mi ait?",
    answer:
      "Paketleme hizmetinde malzeme bizim tarafımızdan getirilir. Elinizde hazır koli varsa kullanabiliriz; bu durumda malzeme kalemi düşer.",
  },
  {
    question: "Paketleme taşınma günü mü yapılıyor?",
    answer:
      "Küçük evlerde taşınma günü sabahı paketleme mümkün olabiliyor, ancak eşya çoksa bir gün önceden paketleme yapılması taşıma gününü ciddi biçimde rahatlatır. Kapsamı konuşurken buna birlikte karar veriyoruz.",
  },
  {
    question: "Kıyafetleri katlamak zorunda mıyım?",
    answer:
      "Gardıroptaki askılı kıyafetler için askılı koli kullanılabiliyor; bu durumda kıyafetler askıda kalır ve yeni evde doğrudan dolaba asılır. Katlanacak kıyafetler ise normal kolilere yerleştirilir.",
  },
];

export default function EsyaPaketlemePage() {
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
        intro={`Taşınmada kırılan eşyaların çoğu, taşıma sırasında değil yanlış paketleme yüzünden kırılır. ${business.name} ${city}'de eşya paketlemeyi taşımanın parçası olarak ya da tek başına bir hizmet olarak veriyor.`}
        bullets={service.highlights}
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <Container className="py-14">
        <div className="prose-tr max-w-3xl">
          <h2>Paketleme Neleri Kapsıyor?</h2>
          <ul>
            <li>
              <strong>Mutfak:</strong> Tabak, bardak ve porselen ürünler tek tek
              sarılır; kutular boşluk kalmayacak şekilde doldurulur.
            </li>
            <li>
              <strong>Salon:</strong> Cam ve dekoratif ürünler ayrı ambalajlanır,
              tablo ve ayna için köşe koruması yapılır.
            </li>
            <li>
              <strong>Yatak odası:</strong> Askılı kıyafetler için askılı koli,
              katlanacaklar için standart koli kullanılır.
            </li>
            <li>
              <strong>Elektronik:</strong> Televizyon, bilgisayar ve küçük ev
              aletleri dolgu malzemesiyle korunur.
            </li>
          </ul>

          <h2>İyi Paketlemenin Üç Kuralı</h2>
          <ol>
            <li>
              <strong>Kutu içinde boşluk kalmaz.</strong> Boşluk, yolda hareket
              demek; hareket de kırılma demek.
            </li>
            <li>
              <strong>Ağır eşya küçük kutuya.</strong> Kitap gibi ağır ürünler
              büyük koliye doldurulduğunda koli dibi dayanmaz.
            </li>
            <li>
              <strong>Her kutu etiketlenir.</strong> Oda adı ve içeriğin
              kırılabilir olup olmadığı yazılır; yerleşim buna göre yapılır.
            </li>
          </ol>
          <p>
            Kendiniz paketleyecekseniz{" "}
            <Link href="/rehber/esyalar-nasil-paketlenir">
              eşyalar nasıl paketlenir
            </Link>{" "}
            rehberimizde oda oda yöntemi anlattık.
          </p>
        </div>

        <section aria-labelledby="surec" className="mt-14">
          <h2 id="surec" className="text-2xl font-extrabold text-white sm:text-3xl">
            Paketleme Süreci
          </h2>
          <ProcessSteps steps={steps} />
          <div className="mt-6">
            <QuoteButton
              location="after_process"
              service={service.slug}
              label="Paketleme İçin Bilgi Gönder"
            />
          </div>
        </section>

        <section aria-labelledby="fiyat" className="mt-16">
          <h2 id="fiyat" className="text-2xl font-extrabold text-white sm:text-3xl">
            Paketleme Fiyatı Nasıl Belirlenir?
          </h2>
          <PricingFactors
            factors={pricingFactors}
            whatsappMessage={service.whatsappMessage}
            service={service.slug}
            note="Paketleme fiyatı, kapsam ve kırılabilir eşya yoğunluğuna göre değişir. Hangi odaların paketleneceğini yazarsanız net fiyatı iletiriz."
          />
        </section>

        <Gallery title="Paketleme İşlerimizden" />
        <Reviews />

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-white sm:text-3xl">
            Paketleme Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>
      </Container>

      <CtaBand
        title="Paketleme İhtiyacınızı Konuşalım"
        text="Hangi odaların paketlenmesini istediğinizi ve taşınma tarihinizi yazın; kapsamı ve fiyatı netleştirelim."
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
