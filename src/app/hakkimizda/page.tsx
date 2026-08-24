import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";

const city = business.primaryCity;

/**
 * HAKKIMIZDA — genel geçer "müşteri memnuniyeti ilkemizdir" metni YOK.
 * Sayfa, firmanın çalışma biçimi üzerine kurulu. Kuruluş yılı, ekip ve
 * tamamlanmış iş sayısı gibi bilgiler DOĞRULANMADIĞI için yazılmadı;
 * bu bilgiler config/business.ts'ye girildiğinde buraya eklenmelidir.
 */
export const metadata: Metadata = {
  title: `Hakkımızda — ${city}'de Taşımacılık | ${business.name}`,
  description: `${business.name} nasıl çalışır? ${city}'de evden eve nakliyat, ofis taşıma ve paketleme hizmetlerinde izlediğimiz yöntem, fiyatlandırma yaklaşımımız ve söz verdiğimiz sınırlar.`,
  alternates: { canonical: absoluteUrl("/hakkimizda") },
  openGraph: {
    title: `Hakkımızda | ${business.name}`,
    description: `${city}'de nakliyat hizmetlerinde çalışma biçimimiz.`,
    url: absoluteUrl("/hakkimizda"),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Hakkımızda", path: "/hakkimizda" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {business.name} Hakkında
          </h1>

          <div className="prose-tr mt-6">
            <p>
              {business.name}, {city} merkezde ve {city} dışına ev, ofis ve parça
              eşya taşıması yapan bir nakliyat firmasıdır. İşin büyük kısmını
              belirleyen şey araç ya da ekip değil, taşınma öncesinde yapılan
              plandır. Bu sayfada nasıl çalıştığımızı anlatıyoruz.
            </p>

            <h2>Önce plan, sonra taşıma</h2>
            <p>
              Taşınma gününde çıkan sorunların neredeyse tamamı önceden
              konuşulmamış detaylardan doğar: asansöre sığmayan gardırop, aracın
              yaklaşamadığı sokak, paketlenmemiş mutfak dolabı. Bu yüzden fiyat
              vermeden önce eşya miktarını, iki adresin kat ve asansör durumunu ve
              paketleme kapsamını netleştiriyoruz.
            </p>

            <h2>Neden sabit fiyat listesi yayınlamıyoruz?</h2>
            <p>
              İnternette sık görülen &ldquo;3+1 ev şu fiyata taşınır&rdquo;
              listeleri işin gerçeğini yansıtmıyor. Aynı büyüklükteki iki ev,
              biri asansörsüz dördüncü kattaysa ve diğerinin kapısına araç
              yanaşabiliyorsa, aynı emeği gerektirmiyor. Baştan düşük rakam verip
              taşıma günü fiyatı yükseltmek yerine, bilgiyi baştan alıp gerçekçi
              fiyat vermeyi tercih ediyoruz.
            </p>
            <p>
              Fiyatı belirleyen etkenleri açıkça{" "}
              <Link href="/evden-eve-nakliyat#fiyat">
                evden eve nakliyat sayfasında
              </Link>{" "}
              listeledik.
            </p>

            <h2>Doğrudan iletişim</h2>
            <p>
              Taşınma sürecinde muhatabınız değişmez. Teklifi kim veriyorsa,
              planı da o yapar. Arada çağrı merkezi ya da aracı bulunmaz; bu da
              taşınma günü değişen bir detayın hızla çözülmesini sağlar.
            </p>

            <h2>Söz vermediğimiz şeyler</h2>
            <p>
              Bu sitede uydurma müşteri yorumu, doğrulanmamış puan ya da
              &ldquo;{city}&apos;nin en iyisi&rdquo; gibi ölçülemeyen iddialar
              bulamazsınız. Yapmadığımız bir hizmeti de listelemiyoruz.
              Yapabileceğimiz iş belliyse net konuşuyoruz, yapamayacağımız bir
              rota ya da tarih varsa bunu da açıkça söylüyoruz.
            </p>

            <h2>Hangi hizmetleri veriyoruz?</h2>
            <ul>
              <li>
                <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>{" "}
                — şehir içi ve şehir dışı ev taşıma
              </li>
              <li>
                <Link href="/sehirler-arasi-nakliyat">
                  {city} şehirler arası nakliyat
                </Link>{" "}
                — {city} çıkışlı il dışı taşımalar
              </li>
              <li>
                <Link href="/ofis-tasima">{city} ofis taşıma</Link> — ofis,
                mağaza ve işyeri taşımaları
              </li>
              <li>
                <Link href="/parca-esya-tasima">{city} parça eşya taşıma</Link> —
                tek parça veya birkaç kalem eşya
              </li>
              <li>
                <Link href="/esya-paketleme">{city} eşya paketleme</Link> —
                taşımayla birlikte veya tek başına
              </li>
            </ul>
          </div>
        </div>

        <Gallery title="İşlerimizden" />
        <Reviews />
      </Container>

      <CtaBand
        title="Taşınmanızı Konuşalım"
        text="Taşınma tarihiniz ve adres bilgilerinizle yazın; size uygun planı çıkarıp fiyatı iletelim."
        whatsappMessage={defaultWhatsAppMessage}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
