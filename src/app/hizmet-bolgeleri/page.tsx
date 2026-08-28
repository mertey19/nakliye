import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { districtGuideSlug, guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  type Crumb,
  type FaqItem,
} from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";

const city = business.primaryCity;

/**
 * TEK GÜÇLÜ BÖLGE SAYFASI (ticari niyet: "mezitli nakliyat" vb.).
 *
 * İlçe başına ayrı *hizmet* URL'si AÇILMADI. Aynı satış metninin ilçe adı
 * değiştirilerek çoğaltılması doorway page'dir. İlçeye özgü sokak/bina notları
 * bilgi rehberlerindedir: `/rehber/{ilce}-ev-tasima`. H1 "[İlçe] Nakliyat"
 * değildir; yamyamlaşma olmaz.
 */
export const metadata: Metadata = {
  title: `${city} Nakliyat Hizmet Bölgeleri | ${business.name}`,
  description: `${business.name} ${city} merkezde ${business.serviceAreas
    .map((a) => a.name)
    .join(", ")} ilçelerinde ve ${city} dışına taşıma yapıyor. Bölgenizde taşıma planı için iletişime geçin.`,
  alternates: { canonical: absoluteUrl("/hizmet-bolgeleri") },
  openGraph: {
    title: `${city} Nakliyat Hizmet Bölgeleri | ${business.name}`,
    description: `${city} merkez ilçeleri ve şehir dışı taşımalarda hizmet bölgelerimiz.`,
    url: absoluteUrl("/hizmet-bolgeleri"),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Hizmet Bölgeleri", path: "/hizmet-bolgeleri" },
];

const faqItems: FaqItem[] = [
  {
    question: `${city} merkez dışına taşıma yapıyor musunuz?`,
    answer: `Evet. ${city} merkez ilçelerinin yanında ${city} dışına, diğer illere ev ve ofis taşıması da yapıyoruz. Merkez dışındaki bir ilçeden taşınacaksanız adresi yazın, o bölgeye gidip gitmediğimizi net olarak söyleyelim.`,
  },
  {
    question: "Aracınız binaya yaklaşamazsa ne oluyor?",
    answer:
      "Bu durum özellikle dar sokaklarda ve otopark sorunu olan bölgelerde yaşanır. Eşya, araç ile bina arasında elde taşınır; bu da süreyi uzatır. Adresi önceden bildiğimizde durumu değerlendirip planı ona göre kuruyoruz.",
  },
  {
    question: "Taşınma günü sokakta park yeri ayırtmak gerekir mi?",
    answer:
      "Yoğun caddelerde ve dar sokaklarda taşıma saatinde araç için yer bulunması işi çok hızlandırır. Mümkünse bina yönetimi veya komşularla önceden konuşmanız, aracın kapıya yakın park edebilmesini sağlar.",
  },
  {
    question: "İki adres farklı ilçelerde, sorun olur mu?",
    answer: `Hayır. ${city} merkez içindeki taşımalar genellikle aynı gün tamamlanır; ilçe farkı taşıma planını değiştirmez, sadece mesafe hesabına girer.`,
  },
];

const checklistItems: {
  title: string;
  text: string;
  href?: string;
  hrefLabel?: string;
}[] = [
  {
    title: "Kat ve asansör",
    text: "Kaçıncı kattasınız, asansör var mı ve eşyalar asansöre sığıyor mu? Asansörsüz kat, işçilik ve süreyi doğrudan etkiler.",
    href: "/rehber/asansorsuz-ev-nasil-tasinir",
    hrefLabel: "Asansörsüz ev taşıma rehberi",
  },
  {
    title: "Araç yaklaşımı",
    text: "Aracın binaya kaç metre yaklaşabildiği önemli. Dar sokak veya park sorunu varsa taşıma mesafesi artar.",
  },
  {
    title: "Bina kuralları",
    text: "Bazı sitelerde taşıma için belirli saat aralıkları veya yönetim izni gerekir. Bunu önceden öğrenmek gecikmeyi önler.",
  },
  {
    title: "Merdiven ve kapı ölçüsü",
    text: "Büyük gardırop ve köşe koltuk gibi eşyalarda merdiven boşluğu ve kapı genişliği belirleyicidir.",
  },
];

export default function HizmetBolgeleriPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Hero
        eyebrow={business.name}
        h1={`${city} Nakliyat Hizmet Bölgeleri`}
        intro={`${city} merkezde ${business.serviceAreas
          .map((a) => a.name)
          .join(", ")} ilçelerinde taşıma yapıyoruz. Aynı ekip ${city} dışına yapılan ev ve ofis taşımalarını da planlıyor.`}
        whatsappMessage={defaultWhatsAppMessage}
      />

      <Container className="py-14">
        <section aria-labelledby="bolgeler">
          <h2 id="bolgeler" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            {city} Merkezde Taşıma Yaptığımız İlçeler
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {business.serviceAreas.map((a) => {
              const g = guideBySlug(districtGuideSlug(a.slug));
              return (
                <li key={a.slug}>
                  {g ? (
                    <Link
                      href={`/rehber/${g.slug}`}
                      className="block rounded-card border border-line bg-white px-5 py-4 transition-shadow hover:shadow-md"
                    >
                      <span className="block text-[16px] font-semibold text-ink-900">
                        {a.name}
                      </span>
                      <span className="mt-1.5 block text-[13px] font-normal leading-snug text-ink-500">
                        {g.summary}
                      </span>
                    </Link>
                  ) : (
                    <span className="block rounded-card border border-line bg-white px-5 py-4 text-[16px] font-semibold text-ink-900">
                      {a.name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            Listede olmayan bir ilçeden ya da {city} dışından taşınıyorsanız yine
            de yazın. Rota uygunsa planlıyoruz; uygun değilse bunu net olarak
            söylüyoruz, boş vaat vermiyoruz.
          </p>
        </section>

        <section aria-labelledby="kontrol" className="mt-16">
          <h2 id="kontrol" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Bölgenizde Taşımayı Etkileyen Dört Şey
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            Taşınma gününde işi uzatan şey genellikle mesafe değil, adresin
            koşulları oluyor. Teklif alırken şunları bize söylemeniz, gerçekçi
            bir plan çıkarmamızı sağlar:
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {checklistItems.map((c) => (
              <li key={c.title} className="rounded-card border border-line bg-white p-5">
                <p className="font-bold text-ink-900">{c.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  {c.text}
                </p>
                {c.href && (
                  <Link
                    href={c.href}
                    className="mt-3 inline-block py-1 text-[14px] font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
                  >
                    {c.hrefLabel} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sehirdisi" className="mt-16">
          <h2 id="sehirdisi" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            {city} Dışına Taşımalar
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            Başka bir ile taşınıyorsanız planlama şehir içine göre değişir:
            yükleme ve teslim günü ayrılabilir, ambalaj uzun yola göre yapılır.
            Süreci{" "}
            <Link
              href="/sehirler-arasi-nakliyat"
              className="font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
            >
              {city} şehirler arası nakliyat
            </Link>{" "}
            sayfasında anlattık.
          </p>
        </section>

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Hizmet Bölgeleri Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>
      </Container>

      <CtaBand
        title="Adresinizi Yazın, Planlayalım"
        text="Çıkış ve varış adresini, kat ve asansör bilgisiyle birlikte iletin; bölgenize uygun taşıma planını çıkaralım."
        whatsappMessage={defaultWhatsAppMessage}
      />

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqItems)]} />
    </>
  );
}
