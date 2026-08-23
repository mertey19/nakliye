import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { guides } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { defaultWhatsAppMessage } from "@/lib/messages";

const city = business.primaryCity;

export const metadata: Metadata = {
  title: `Taşınma Rehberi | ${business.name}`,
  description: `Ev taşırken yapılması gerekenler, nakliye firması seçerken dikkat edilecekler ve eşyaların doğru paketlenmesi. Taşınma sürecini kolaylaştıran pratik rehberler.`,
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

      <Container className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            Taşınma Rehberi
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-700">
            Taşınma sürecinde en çok sorulan konuları yazıya döktük. Amaç uzun
            makale yazmak değil; taşınmadan önce işinizi kolaylaştıracak somut
            bilgileri bir arada vermek.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug} className="flex">
              <article className="relative flex w-full flex-col rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-md">
                <h2 className="text-lg font-bold text-ink-900">
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

        <section aria-labelledby="hangi-rehber" className="mt-14 max-w-3xl">
          <h2
            id="hangi-rehber"
            className="text-2xl font-extrabold text-ink-900 sm:text-3xl"
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
              rehberi, dört hafta öncesinden yeni evdeki ilk güne kadar sırayla
              ne yapılacağını anlatıyor. Abonelik işlemleri ve &ldquo;ilk gün
              kutusu&rdquo; gibi çoğu zaman atlanan adımlar da burada.
            </p>
            <p>
              <strong>Elinizde birden fazla teklif varsa ve
              karşılaştıramıyorsanız:</strong>{" "}
              <Link href="/rehber/nakliye-firmasi-secerken">
                nakliye firması nasıl seçilir
              </Link>{" "}
              yazısında telefonda sorulması gereken sorular ve düşük fiyatın ne
              zaman risk olduğu var.
            </p>
            <p>
              <strong>Paketlemeyi kendiniz yapacaksanız:</strong>{" "}
              <Link href="/rehber/esyalar-nasil-paketlenir">
                eşyalar nasıl paketlenir
              </Link>{" "}
              rehberi mutfaktan elektroniğe oda oda yöntemi, malzeme seçimini ve
              etiketlemeyi anlatıyor.
            </p>
          </div>
        </section>

        <p className="mt-10 max-w-3xl text-[16px] leading-relaxed text-ink-700">
          Taşınma planınız netleştiyse{" "}
          <Link
            href="/evden-eve-nakliyat"
            className="font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
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
