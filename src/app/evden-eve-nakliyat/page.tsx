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

const service = serviceBySlug("evden-eve-nakliyat")!;
const city = business.primaryCity;

/**
 * ANA TİCARİ SAYFA (money page)
 * Arama amacı: "mersin evden eve nakliyat", "mersin ev taşıma",
 * "mersin şehir içi nakliyat", "evden eve nakliyat mersin".
 *
 * "şehir içi nakliyat" için AYRI sayfa AÇILMADI: aynı arama amacını karşıladığı
 * için bu sayfada başlı başına bir H2 bölümü olarak ele alındı.
 */
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
  { name: `${city} Evden Eve Nakliyat`, path: `/${service.slug}` },
];

const steps = [
  {
    title: "Taşınma bilgilerinin alınması",
    text: "Evin oda sayısı, beyaz eşya durumu, çıkış ve varış katı ile asansör bilgisi konuşulur.",
  },
  {
    title: "Planlama ve tarih",
    text: "Eşya miktarına göre araç ve ekip belirlenir, taşınma günü saat programına bağlanır.",
  },
  {
    title: "Paketleme",
    text: "İstenirse mutfak, cam eşya ve elektronik ürünler ambalajlanır; kutular oda bazında etiketlenir.",
  },
  {
    title: "Söküm ve yükleme",
    text: "Gardırop, yatak ve masa gibi mobilyalar sökülür, sabitlenerek araca yüklenir.",
  },
  {
    title: "Taşıma",
    text: "Eşyalar yeni adrese götürülür; şehir dışı taşımada teslim günü ayrıca planlanır.",
  },
  {
    title: "Kurulum ve yerleşim",
    text: "Sökülen mobilyalar kurulur, kutular gösterdiğiniz odalara yerleştirilir.",
  },
];

const pricingFactors = [
  {
    title: "Evin büyüklüğü",
    text: "1+1 ile 4+1 arasında araç hacmi, ekip sayısı ve süre ciddi biçimde değişir.",
  },
  {
    title: "Kat ve asansör",
    text: "Asansörsüz bir 4. kat, aynı eşya için asansörlü bir daireye göre daha uzun sürer.",
  },
  {
    title: "Mesafe",
    text: `${city} içindeki iki mahalle arası taşıma ile il dışına taşıma aynı fiyatlanmaz.`,
  },
  {
    title: "Paketleme",
    text: "Paketleme malzemesi ve işçiliği dahil edilirse maliyet artar; kırılan eşya riski azalır.",
  },
  {
    title: "Söküm-kurulum ihtiyacı",
    text: "Ankastre ürünler, çok parçalı gardıroplar ve duvara sabit üniteler ek işçilik gerektirir.",
  },
  {
    title: "Araç yaklaşımı",
    text: "Aracın binaya yaklaşamadığı dar sokaklarda eşya elde taşınacağı için süre uzar.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: `${city} içinde evden eve taşıma ne kadar sürer?`,
    answer:
      "Süre, eşya miktarına ve iki adresin kat/asansör durumuna bağlı. Asansörlü binalarda orta büyüklükte bir ev genellikle gün içinde tamamlanır. Asansörsüz kat, çok fazla eşya veya paketlemenin taşınma günü yapılması süreyi uzatır. Bu yüzden planlamayı taşınmadan önce yapıyoruz.",
  },
  {
    question: "Eşyalarımı ben paketlesem daha mı ucuz olur?",
    answer:
      "Paketlemeyi siz yaparsanız işçilik ve malzeme kalemi düşer. Ancak cam eşya, tabak-bardak ve elektronik ürünlerin yanlış paketlenmesi taşıma sırasında hasar riskini artırır. Yaygın çözüm: kıyafet ve kitap gibi kolay kalemleri siz, kırılabilir eşyaları biz paketleriz.",
  },
  {
    question: "Mobilyaları söküp tekrar kuruyor musunuz?",
    answer:
      "Evet. Gardırop, yatak, yemek masası gibi taşınırken sökülmesi gereken mobilyalar sökülür ve yeni adreste kurulur. Ankastre ürünlerin sökümü için önceden bilgi vermeniz iyi olur; bazıları için ayrı hazırlık gerekir.",
  },
  {
    question: "Asansör yoksa ne oluyor?",
    answer:
      "Eşyalar merdivenden taşınır. Bu, ekip sayısını ve süreyi etkilediği için fiyatı da etkiler. Kat sayısını ve asansör durumunu ilk görüşmede söylerseniz, taşınma günü sürpriz çıkmaz.",
  },
  {
    question: "Taşınma günü ben evde olmak zorunda mıyım?",
    answer:
      "Eşyaların hangi odaya gideceğini ve nelerin özel dikkat istediğini göstermeniz için en az bir yetkili kişinin bulunması işi kolaylaştırır. Siz gelemiyorsanız, adresteki bir yakınınızın bilgilendirilmesi yeterlidir.",
  },
];

export default function EvdenEveNakliyatPage() {
  return (
    <>
      <ServiceViewTracker service={service.slug} />

      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Hero
        eyebrow={`${business.name}`}
        h1={service.h1}
        intro={`Ev taşımak sadece eşyayı bir yerden bir yere götürmek değil; sıralama, paketleme ve zamanlama işidir. ${business.name} olarak ${city} içindeki ve ${city} dışına yapılan ev taşımalarını, taşınma gününden önce çıkardığımız plana göre yürütüyoruz.`}
        bullets={service.highlights}
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <Container className="py-14">
        <div className="prose-tr max-w-3xl">
          <h2>Hizmet Neleri Kapsıyor?</h2>
          <p>
            Evden eve nakliyat hizmetimiz, taşınmanın hangi bölümünü bize
            bırakmak istediğinize göre şekilleniyor. Kapsam iki uçta olabiliyor:
          </p>
          <ul>
            <li>
              <strong>Sadece taşıma:</strong> Siz paketlersiniz, biz mobilyaları
              söker, yükler, taşır ve yeni adreste kurarız.
            </li>
            <li>
              <strong>Paketleme dahil taşıma:</strong> Mutfak, cam eşya,
              elektronik ve gardırop içeriği dahil paketleme de bize ait olur.
            </li>
          </ul>
          <p>
            İki durumda da mobilya söküm-kurulumu, yükleme ve yerleşim hizmete
            dahildir. Paketleme kapsamını taşınma öncesinde netleştiriyoruz;
            çünkü fiyatı en çok etkileyen kalemlerden biri bu.
          </p>

          <h2 id="sehir-ici">
            {city} Şehir İçi Ev Taşıma
          </h2>
          <p>
            {city} içindeki taşımalarda mesafe kısa olduğu için işin büyük kısmı
            yükleme ve boşaltmada geçer. Burada belirleyici olan mesafe değil,
            binaların durumu: asansör var mı, araç binaya kaç metre
            yaklaşabiliyor, taşınma saatinde sokakta park sorunu oluyor mu.
          </p>
          <p>
            Bu yüzden şehir içi taşımalarda iki adresi de önceden konuşuyoruz.
            Aynı gün içinde çıkış ve teslim genellikle mümkün oluyor; öğleden
            sonra biten taşımalarda yerleşim aynı gün tamamlanabiliyor.
          </p>

          <h2>{city} Dışına Ev Taşıma</h2>
          <p>
            Başka bir ile taşınıyorsanız yükleme ve teslim günü çoğu zaman
            ayrılır. Uzun yolda eşyanın sabitlenmesi ve ambalajın dayanıklılığı
            daha kritik hale gelir. Şehirler arası taşımanın nasıl planlandığını{" "}
            <Link href="/sehirler-arasi-nakliyat">
              {city} şehirler arası nakliyat
            </Link>{" "}
            sayfasında ayrıntılı anlattık.
          </p>
        </div>

        <section aria-labelledby="surec" className="mt-14">
          <h2 id="surec" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Ev Taşıma Süreci Nasıl İlerliyor?
          </h2>
          <ProcessSteps steps={steps} />
          <div className="mt-6">
            <QuoteButton
              location="after_process"
              service={service.slug}
              label="Taşınma Bilgilerini Gönder"
            />
          </div>
        </section>

        <section aria-labelledby="fiyat" className="mt-16">
          <h2 id="fiyat" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Evden Eve Nakliyat Fiyatı Neye Göre Belirlenir?
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            Aynı şehirde, aynı oda sayısındaki iki ev bile aynı fiyata
            taşınmayabilir. Farkı yaratan kalemler şunlar:
          </p>
          <PricingFactors
            factors={pricingFactors}
            whatsappMessage={service.whatsappMessage}
            service={service.slug}
          />
        </section>

        <Gallery title="Ev Taşıma İşlerimizden" />
        <Reviews />

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Evden Eve Nakliyat Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>

        <section aria-labelledby="ilgili" className="mt-16">
          <h2 id="ilgili" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            İlgili Sayfalar
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li>
              <Link
                href="/esya-paketleme"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  {city} Eşya Paketleme
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Sadece paketleme desteği almak isteyenler için.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/parca-esya-tasima"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  {city} Parça Eşya Taşıma
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Tam ev değil, birkaç parça taşınacaksa.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/ev-tasirken-yapilmasi-gerekenler"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  Ev Taşırken Yapılması Gerekenler
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Taşınmadan önceki 4 haftalık kontrol listesi.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/hizmet-bolgeleri"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">Hizmet Bölgeleri</span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  {city} merkezde taşıma yaptığımız ilçeler.
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </Container>

      <CtaBand
        title="Ev Taşıma Teklifinizi Alın"
        text="Oda sayısı, kat ve asansör bilgisiyle birlikte yazın; taşınmanıza uygun ekip ve araç planını çıkarıp fiyatı iletelim."
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
