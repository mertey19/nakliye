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

const service = serviceBySlug("sehirler-arasi-nakliyat")!;
const city = business.primaryCity;

/**
 * Arama amacı: "mersin şehirler arası nakliyat", "mersinden ... nakliyat",
 * "şehirler arası ev taşıma mersin".
 *
 * NOT: Rota sayfaları (mersin-ankara, mersin-istanbul ...) OTOMATİK üretilmedi.
 * Programatik rota sayfası ancak o rotada gerçekten iş yapıldığı ve sayfada
 * özgün/faydalı bilgi verilebildiği zaman açılmalıdır (bkz. docs/seo/).
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
  { name: `${city} Şehirler Arası Nakliyat`, path: `/${service.slug}` },
];

const steps = [
  {
    title: "Rota ve tarih",
    text: "Çıkış adresi, varış ili ve tahmini taşınma tarihi alınır; yol süresi buna göre hesaplanır.",
  },
  {
    title: "Eşya tespiti",
    text: "Evin veya ofisin büyüklüğü, beyaz eşya ve hassas eşya durumu netleştirilir.",
  },
  {
    title: "Uzun yol paketlemesi",
    text: "Şehir içi taşımaya göre daha dayanıklı ambalaj kullanılır; köşe ve yüzey koruması yapılır.",
  },
  {
    title: "Yükleme ve sabitleme",
    text: "Eşyalar araç içinde kaymayacak biçimde istiflenir ve sabitlenir.",
  },
  {
    title: "Yol",
    text: "Mesafeye göre teslim aynı gün veya ertesi gün yapılır; çıkış sonrası bilgilendirilirsiniz.",
  },
  {
    title: "Teslim ve kurulum",
    text: "Varış adresinde boşaltma, mobilya kurulumu ve kutuların odalara dağıtımı yapılır.",
  },
];

const pricingFactors = [
  {
    title: "Mesafe",
    text: `${city} çıkışlı taşımalarda gidilen il, fiyatın en belirleyici kalemi: yol süresi, yakıt ve dönüş planı buna bağlı.`,
  },
  {
    title: "Eşya hacmi",
    text: "Aracın ne kadarını doldurduğunuz belirleyicidir. Yarım araçlık yükle tam ev taşıması aynı fiyatlanmaz.",
  },
  {
    title: "Çıkış ve varış koşulları",
    text: "İki adresteki kat, asansör ve araç yaklaşımı durumu ayrı ayrı hesaba katılır.",
  },
  {
    title: "Paketleme kapsamı",
    text: "Uzun yolda ambalaj kalitesi hasar riskini doğrudan etkilediği için paketleme kapsamı önemlidir.",
  },
  {
    title: "Teslim zamanlaması",
    text: "Belirli bir güne/saate sabitlenmiş teslim, esnek teslime göre daha sıkı planlama gerektirir.",
  },
  {
    title: "Dönüş yükü durumu",
    text: "Aracın dönüşte boş dönüp dönmeyeceği maliyeti etkiler; bu yüzden tarihte esneklik bazen avantaj sağlar.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: `${city}'den hangi illere taşıma yapıyorsunuz?`,
    answer: `${city} çıkışlı şehirler arası ev ve ofis taşıması yapıyoruz. Gideceğiniz ili, tahmini tarihi ve eşya miktarını paylaşırsanız o rota için uygun planı ve fiyatı çıkarıyoruz.`,
  },
  {
    question: "Eşyalar aynı gün teslim ediliyor mu?",
    answer:
      "Mesafeye bağlı. Yakın illerde yükleme ve teslim aynı gün tamamlanabilir. Uzun mesafelerde teslim genellikle ertesi güne planlanır. Tarih netleşirken bunu baştan konuşuyoruz ki yeni adreste beklemede kalmayın.",
  },
  {
    question: "Şehirler arası taşımada eşyalarım başka yüklerle karışır mı?",
    answer:
      "Taşımanın tek yük olarak mı yoksa parça yük olarak mı planlandığı fiyatı ve süreyi değiştirir. Hangi biçimde çalışılacağını teklif aşamasında açıkça belirtiyoruz; belirsiz bırakmıyoruz.",
  },
  {
    question: "Uzun yolda eşyalar nasıl korunuyor?",
    answer:
      "Mobilyaların köşeleri ve yüzeyleri ayrıca korunur, cam ve elektronik ürünler dolgu malzemesiyle paketlenir. Araç içinde istif, eşyaların yolda kaymayacağı şekilde yapılır ve sabitleme kullanılır.",
  },
  {
    question: "Taşınma tarihimi kaç gün önceden bildirmeliyim?",
    answer:
      "Şehirler arası taşımada araç planı şehir içine göre daha uzun süre bloke edildiği için erken haber vermek önemli. Tarihiniz netleşir netleşmez yazın; kesinleşmemişse bile yaklaşık aralığı bildirmeniz planlamayı kolaylaştırır.",
  },
];

export default function SehirlerArasiNakliyatPage() {
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
        intro={`Başka bir ile taşınmak, şehir içi taşınmadan farklı planlama ister: yükleme ve teslim günü ayrılır, ambalaj daha dayanıklı olmak zorundadır. ${business.name} ${city} çıkışlı ev ve ofis taşımalarını rotaya göre planlar.`}
        bullets={service.highlights}
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <Container className="py-14">
        <div className="prose-tr max-w-3xl">
          <h2>Şehirler Arası Taşımada Neler Değişir?</h2>
          <p>
            Şehir içi bir taşımada işin ağırlığı yükleme ve boşaltmadadır. Şehir
            dışına çıkıldığında ise iki yeni değişken devreye girer:{" "}
            <strong>yolda geçen süre</strong> ve{" "}
            <strong>eşyanın yol boyunca sabit kalması</strong>.
          </p>
          <p>
            Bu yüzden şehirler arası taşımalarda paketleme daha kalın yapılır,
            mobilya köşeleri ayrıca korunur ve araç içi istif sabitlemeye göre
            kurulur. Aynı ev, şehir içinde taşınırken kullanılan ambalajla uzun
            yola çıkarılmaz.
          </p>

          <h2>Hangi Bilgileri Hazırlamalısınız?</h2>
          <p>
            Şehirler arası teklif alırken şu dört bilgi işi hızlandırır:
          </p>
          <ol>
            <li>Çıkış adresi (ilçe, kat, asansör durumu)</li>
            <li>Varış ili ve mümkünse ilçe</li>
            <li>Evin oda sayısı veya taşınacak eşyanın kabaca listesi</li>
            <li>Tahmini taşınma tarihi ya da tarih aralığı</li>
          </ol>
          <p>
            Bu dördü elinizdeyse, telefonda uzun uzun soru cevaba gerek kalmadan
            gerçekçi bir fiyat konuşabiliriz.
          </p>

          <h2>Ofis ve İşyeri Taşımalarında</h2>
          <p>
            Şehirler arası taşınan bir ofiste öncelik, çalışma düzeninin en kısa
            sürede yeniden kurulmasıdır. Bu tür taşımalarda kutu etiketlemesi ve
            teslim sırası önceden belirlenir. Ayrıntılar için{" "}
            <Link href="/ofis-tasima">{city} ofis taşıma</Link> sayfasına
            bakabilirsiniz.
          </p>
        </div>

        <section aria-labelledby="surec" className="mt-14">
          <h2 id="surec" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Şehirler Arası Nakliyat Süreci
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
            Şehirler Arası Nakliyat Fiyatı Nasıl Hesaplanır?
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            İl bazında sabit bir tarife yayınlamak gerçekçi olmaz; aynı ile giden
            iki taşıma arasında ciddi fark olabilir. Fiyatı belirleyen kalemler:
          </p>
          <PricingFactors
            factors={pricingFactors}
            whatsappMessage={service.whatsappMessage}
            service={service.slug}
            note="Rota, eşya hacmi ve tarih birlikte değerlendirilmeden verilen rakam gerçekçi olmaz. Çıkış-varış bilgisini paylaşırsanız o rotaya özel fiyatı çıkarırız."
          />
        </section>

        <Gallery title="Şehirler Arası Taşıma İşlerimizden" />
        <Reviews />

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Şehirler Arası Nakliyat Hakkında Sık Sorulan Sorular
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
                href="/evden-eve-nakliyat"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  {city} Evden Eve Nakliyat
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Şehir içi ev taşımanın kapsamı ve süreci.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/sehirler-arasi-ev-tasima"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  Şehirler Arası Ev Nasıl Taşınır?
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Yükleme-teslim ayrımı ve uzun yol paketlemesi.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/esyalar-nasil-paketlenir"
                className="block rounded-card border border-line-soft bg-white p-5 hover:border-ink-500"
              >
                <span className="font-bold text-ink-900">
                  Eşyalar Nasıl Paketlenir?
                </span>
                <span className="mt-1 block text-[15px] text-ink-500">
                  Uzun yola çıkacak eşyalar için paketleme yöntemleri.
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </Container>

      <CtaBand
        title="Rotanıza Özel Teklif Alın"
        text={`Nereden nereye taşındığınızı ve tahmini tarihi yazın; ${business.name} o rotaya uygun araç planını ve fiyatı iletsin.`}
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
