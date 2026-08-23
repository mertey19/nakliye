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

const service = serviceBySlug("parca-esya-tasima")!;
const city = business.primaryCity;

/** Arama amacı: "mersin parça eşya taşıma", "tek eşya taşıma mersin", "beyaz eşya taşıma mersin". */
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
  { name: `${city} Parça Eşya Taşıma`, path: `/${service.slug}` },
];

const steps = [
  {
    title: "Eşyanın tanımlanması",
    text: "Taşınacak parçanın ne olduğu, kabaca ölçüsü ve kaç kişilik taşıma gerektirdiği konuşulur.",
  },
  {
    title: "İki adresin durumu",
    text: "Kat, asansör ve kapı/merdiven genişliği sorulur; eşyanın geçip geçmeyeceği önceden değerlendirilir.",
  },
  {
    title: "Zaman planı",
    text: "Alım ve teslim saati belirlenir; çoğu parça taşıma aynı gün içinde tamamlanır.",
  },
  {
    title: "Koruma ve taşıma",
    text: "Eşyanın köşeleri ve yüzeyi korunur, sabitlenerek taşınır ve gösterdiğiniz yere bırakılır.",
  },
];

const pricingFactors = [
  {
    title: "Parçanın büyüklüğü",
    text: "Tek koltukla üç kapılı gardırop aynı ekip ve aracı gerektirmez.",
  },
  {
    title: "Kat ve asansör",
    text: "Asansöre sığmayan eşyanın merdivenden taşınması, işin süresini ve kişi sayısını artırır.",
  },
  {
    title: "Mesafe",
    text: `Aynı mahalle içindeki taşıma ile ${city}'nin iki ucu arasındaki taşıma aynı değildir.`,
  },
  {
    title: "Söküm gerekliliği",
    text: "Kapıdan geçmeyen mobilyanın sökülüp yeniden kurulması ek işçilik demektir.",
  },
  {
    title: "Parça sayısı",
    text: "Tek parça mı, birkaç parça mı taşınacağı araç doluluğunu ve süreyi belirler.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Tek bir koltuk veya buzdolabı için de geliyor musunuz?",
    answer:
      "Evet. Parça eşya taşıma tam olarak bunun için var: tam ev taşıma paketi almadan, sadece taşınacak parçaya göre plan yapılır. Eşyanın ne olduğunu ve iki adresi yazmanız yeterli.",
  },
  {
    question: "Eşya asansöre sığmazsa ne oluyor?",
    answer:
      "Merdivenden taşınır ya da gerekiyorsa sökülüp yeniden kurulur. Bunu taşıma gününde keşfetmemek için kapı genişliği ve kat bilgisini önceden soruyoruz.",
  },
  {
    question: "İkinci el aldığım eşyayı satıcıdan alıp getirir misiniz?",
    answer:
      "Evet, alım ve teslim adresi farklı olabilir. Satıcının adresi, teslim adresi ve eşyanın ne olduğu netse aynı gün içinde planlanabiliyor.",
  },
  {
    question: "Birkaç parça eşyam var, tam ev taşıma mı almalıyım?",
    answer:
      "Eşya sayısı arttıkça bir noktada ev taşıma paketi daha mantıklı hale gelir. Taşınacakları yazarsanız hangisinin size uygun olduğunu açıkça söylüyoruz; gereksiz büyük paket satmıyoruz.",
  },
];

export default function ParcaEsyaTasimaPage() {
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
        intro={`Her taşıma bir ev dolusu eşya olmak zorunda değil. Tek koltuk, beyaz eşya ya da birkaç kutuluk yük için ${business.name} ${city} içinde parça eşya taşıması yapıyor.`}
        bullets={service.highlights}
        whatsappMessage={service.whatsappMessage}
        service={service.slug}
      />

      <Container className="py-14">
        <div className="prose-tr max-w-3xl">
          <h2>Hangi Durumlarda Parça Eşya Taşıma Mantıklı?</h2>
          <ul>
            <li>İkinci el aldığınız mobilyayı satıcıdan eve getirmek</li>
            <li>Öğrenci evinden birkaç parça eşya taşımak</li>
            <li>Beyaz eşyayı yeni adrese ayrıca göndermek</li>
            <li>Depoya kaldıracağınız eşyayı taşıtmak</li>
            <li>Ev taşımasından sonra unutulan parçaları getirmek</li>
          </ul>
          <p>
            Bu durumların ortak noktası şu: araç ve ekip birkaç saatliğine
            gerekiyor. Tam ev taşıma paketi almak hem gereksiz hem pahalı olur.
          </p>

          <h2>Taşımadan Önce Bize Söylemeniz Gerekenler</h2>
          <p>
            Parça eşya taşımada en sık yaşanan sorun, eşyanın kapıdan veya
            asansörden geçmemesi. Bunu önlemek için üç bilgi yeterli:{" "}
            <strong>eşyanın ne olduğu</strong>,{" "}
            <strong>iki adresin kat ve asansör durumu</strong> ve{" "}
            <strong>eşyanın sökülebilir olup olmadığı</strong>.
          </p>

          <h2>Tam Ev Taşıması Gerekiyorsa</h2>
          <p>
            Taşınacak eşya sayısı arttıysa parça taşıma yerine{" "}
            <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>{" "}
            hizmeti daha uygun olabilir. Hangisinin sizin için ekonomik olduğunu
            eşya listesini gördükten sonra söyleyebiliriz.
          </p>
        </div>

        <section aria-labelledby="surec" className="mt-14">
          <h2 id="surec" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Parça Eşya Taşıma Nasıl İlerliyor?
          </h2>
          <ProcessSteps steps={steps} />
          <div className="mt-6">
            <QuoteButton
              location="after_process"
              service={service.slug}
              label="Eşya Bilgisini Gönder"
            />
          </div>
        </section>

        <section aria-labelledby="fiyat" className="mt-16">
          <h2 id="fiyat" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Parça Eşya Taşıma Fiyatı Nasıl Belirlenir?
          </h2>
          <PricingFactors
            factors={pricingFactors}
            whatsappMessage={service.whatsappMessage}
            service={service.slug}
            note="Parça taşımada fiyat, eşyanın ne olduğu ve iki adresin durumu netleştikten sonra hızlıca verilebiliyor. Eşyayı ve adresleri yazın, kısa sürede dönelim."
          />
        </section>

        <Gallery title="Parça Eşya Taşıma İşlerimizden" />
        <Reviews />

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Parça Eşya Taşıma Hakkında Sık Sorulan Sorular
          </h2>
          <Faq items={faqItems} />
        </section>
      </Container>

      <CtaBand
        title="Tek Parça da Olsa Planlayalım"
        text="Taşınacak eşyayı, çıkış ve varış adresini yazın; aynı gün içinde uygun saat bulabilir miyiz bakalım."
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
