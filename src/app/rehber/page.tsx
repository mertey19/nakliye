import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBar } from "@/components/sections/TrustBar";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { districtGuides, generalGuides } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";

const city = business.primaryCity;

export const metadata: Metadata = {
  title: `Taşınma Rehberi | ${business.name}`,
  description: `Ev taşırken yapılacaklar, nakliyat fiyatı, şehirler arası plan ve ${city} ilçelerinde (Yenişehir, Mezitli, Toroslar, Akdeniz) taşınma notları. Pratik rehberler.`,
  alternates: { canonical: absoluteUrl("/rehber") },
  openGraph: {
    title: `Taşınma Rehberi | ${business.name}`,
    description: `Taşınma sürecini kolaylaştıran pratik rehberler.`,
    url: absoluteUrl("/rehber"),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Rehber", path: "/rehber" },
];

export default function RehberPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>
      <TrustBar />

      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Taşınma Rehberi
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-700">
            Taşınma sürecinde en çok sorulan konuları yazıya döktük. Amaç uzun
            makale yazmak değil; taşınmadan önce işinizi kolaylaştıracak somut
            bilgileri bir arada vermek.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {generalGuides.map((g) => (
            <li key={g.slug} className="flex">
              <article className="relative flex w-full flex-col rounded-card border border-line bg-card p-6 transition-shadow hover:shadow-md">
                <h2 className="text-lg font-bold text-white">
                  <Link
                    href={`/rehber/${g.slug}`}
                    className="after:absolute after:inset-0 hover:text-ink-500"
                  >
                    {g.h1}
                  </Link>
                </h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">
                  {g.summary}
                </p>
                <p className="mt-4 text-sm text-ink-500">
                  Yaklaşık {g.readingMinutes} dakika
                </p>
              </article>
            </li>
          ))}
        </ul>

        <section aria-labelledby="ilce-rehberleri" className="mt-14">
          <h2
            id="ilce-rehberleri"
            className="text-2xl font-extrabold text-white sm:text-3xl"
          >
            {city} İlçelerinde Taşınma
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            Aynı metnin ilçe adı değiştirilmiş kopyaları değil; her ilçenin
            sokak, bina ve site gerçeği ayrı. Ticari &ldquo;X nakliyat&rdquo;
            araması{" "}
            <Link
              href="/hizmet-bolgeleri"
              className="font-bold text-white underline decoration-1 underline-offset-4 hover:text-ink-500"
            >
              hizmet bölgeleri
            </Link>{" "}
            sayfasındadır.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {districtGuides.map((g) => (
              <li key={g.slug} className="flex">
                <article className="relative flex w-full flex-col rounded-card border border-line bg-card p-6 transition-shadow hover:shadow-md">
                  <h3 className="text-lg font-bold text-white">
                    <Link
                      href={`/rehber/${g.slug}`}
                      className="after:absolute after:inset-0 hover:text-ink-500"
                    >
                      {g.h1}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">
                    {g.summary}
                  </p>
                  <p className="mt-4 text-sm text-ink-500">
                    Yaklaşık {g.readingMinutes} dakika
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="hangi-rehber" className="mt-14 max-w-3xl">
          <h2
            id="hangi-rehber"
            className="text-2xl font-extrabold text-white sm:text-3xl"
          >
            Hangi Rehberi Okumalısınız?
          </h2>
          <div className="prose-tr mt-4">
            <p>
              <strong>Taşınma tarihiniz belli, nereden başlayacağınızı
              bilmiyorsanız:</strong>{" "}
              <Link href="/rehber/ev-tasirken-yapilmasi-gerekenler">
                ev taşırken yapılması gerekenler
              </Link>{" "}
              dört haftalık sırayı,{" "}
              <Link href="/rehber/tasinma-gunu-kontrol-listesi">
                taşınma günü kontrol listesi
              </Link>{" "}
              ise sabahın kendisini anlatır.
            </p>
            <p>
              <strong>Elinizde birden fazla teklif varsa:</strong>{" "}
              <Link href="/rehber/nakliye-firmasi-secerken">
                nakliye firması nasıl seçilir
              </Link>{" "}
              ve{" "}
              <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
                nakliyat fiyatı neye göre belirlenir
              </Link>{" "}
              yazıları aynı işi karşılaştırmanıza yardım eder. Uydurma fiyat
              listesi yok; etkenler açık.
            </p>
            <p>
              <strong>Paketlemeyi kendiniz yapacaksanız:</strong>{" "}
              <Link href="/rehber/esyalar-nasil-paketlenir">
                eşyalar nasıl paketlenir
              </Link>{" "}
              oda oda yöntem,{" "}
              <Link href="/rehber/beyaz-esya-nasil-tasinir">
                beyaz eşya nasıl taşınır
              </Link>{" "}
              buzdolabı ve çamaşır makinesi hazırlığı.
            </p>
            <p>
              <strong>Özel durum:</strong> asansör yoksa{" "}
              <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
                asansörsüz ev nasıl taşınır
              </Link>
              ; öğrenci evi veya dönem sonuysa{" "}
              <Link href="/rehber/ogrenci-evi-nasil-tasinir">
                öğrenci evi nasıl taşınır
              </Link>
              ; işyeri taşıyorsanız{" "}
              <Link href="/rehber/ofis-tasirken-nelere-dikkat">
                ofis taşırken nelere dikkat edilmeli
              </Link>
              ; il dışına gidiyorsanız{" "}
              <Link href="/rehber/sehirler-arasi-ev-tasima">
                şehirler arası ev nasıl taşınır
              </Link>
              . {city} merkez ilçelerinde sokak ve bina farkı için yukarıdaki
              ilçe rehberleri.
            </p>
          </div>
        </section>

        <p className="mt-10 max-w-3xl text-[16px] leading-relaxed text-ink-700">
          Taşınma planınız netleştiyse{" "}
          <Link
            href="/evden-eve-nakliyat"
            className="font-bold text-white underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
          >
            {city} evden eve nakliyat
          </Link>{" "}
          sayfasından süreci inceleyebilir ya da doğrudan teklif isteyebilirsiniz.
        </p>
      </Container>

      <CtaBand
        title="Taşınma Planınızı Birlikte Çıkaralım"
        text="Rehberleri okuduktan sonra kalan soruları doğrudan sorabilirsiniz. Adres ve tarih bilgisiyle yazın, planı çıkaralım."
        whatsappMessage={defaultWhatsAppMessage}
        location="guide_hub_bottom"
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
