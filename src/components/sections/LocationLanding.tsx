import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingFactors } from "@/components/sections/PricingFactors";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import {
  locationBySlug,
  locationWhatsAppMessage,
  type LocationDef,
} from "@/config/locations";
import { absoluteUrl } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  locationServiceSchema,
  type Crumb,
} from "@/lib/schema";

export function locationMetadata(slug: string): Metadata {
  const location = locationBySlug(slug);
  if (!location) return {};
  const url = absoluteUrl(`/${location.slug}`);
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical: url },
    openGraph: {
      title: location.title,
      description: location.description,
      url,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: location.title,
      description: location.description,
    },
  };
}

export function LocationLanding({ location }: { location: LocationDef }) {
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hizmet Bölgeleri", path: "/hizmet-bolgeleri" },
    { name: location.navLabel, path: `/${location.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Hero
        eyebrow={location.eyebrow}
        h1={location.h1}
        intro={location.intro}
        bullets={location.bullets}
        whatsappMessage={locationWhatsAppMessage}
        whatsappLabel="WhatsApp'tan Teklif Al"
      />

      <Container className="py-14">
        <section aria-labelledby="hizmetler">
          <h2 id="hizmetler" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Bu bölgede planladığımız hizmetler
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.servicesLead}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {location.services.map((item) => (
              <li key={item.href + item.title} className="rounded-card border border-line bg-white p-5">
                <p className="font-bold text-ink-900">{item.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block py-1 text-[14px] font-bold text-brand underline decoration-1 underline-offset-4 hover:text-brand-hover"
                >
                  {item.title} sayfasına geç ↗
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="surec" className="mt-16">
          <h2 id="surec" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Taşıma süreci
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.processLead}
          </p>
          <ProcessSteps steps={location.process} />
        </section>

        <section aria-labelledby="neden" className="mt-16">
          <h2 id="neden" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Neden Kansu Can Nakliye?
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.whyLead}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {location.why.map((item) => (
              <li key={item.title} className="rounded-card border border-line bg-white p-5">
                <p className="font-bold text-ink-900">{item.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="fiyat" className="mt-16">
          <h2 id="fiyat" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Fiyatı belirleyen etkenler
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.pricingLead}
          </p>
          <PricingFactors
            factors={location.pricing}
            whatsappMessage={locationWhatsAppMessage}
            note="Rakam uydurulmaz. Ücretsiz teklif, paylaştığınız eşya, mesafe, kat ve asansör bilgisine göre hazırlanır."
          />
        </section>

        <section aria-labelledby="kapsam" className="mt-16">
          <h2 id="kapsam" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Hizmet kapsamı ve komşu bölgeler
          </h2>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.coverageLead}
          </p>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-ink-700">
            {location.coverage}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {location.nearby.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-ink-900 hover:border-brand hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {location.serviceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-semibold text-ink-900 underline decoration-1 underline-offset-4 hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {location.guideHref && (
            <p className="mt-6 text-[15px] text-ink-700">
              Sokak ve bina notları için{" "}
              <Link
                href={location.guideHref}
                className="font-bold text-ink-900 underline decoration-1 underline-offset-4 hover:text-brand"
              >
                {location.guideLabel}
              </Link>
            </p>
          )}
        </section>

        <section aria-labelledby="sss" className="mt-16">
          <h2 id="sss" className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Sık sorulan sorular
          </h2>
          <Faq items={location.faqs} />
        </section>
      </Container>

      <CtaBand
        title={location.ctaTitle}
        text={location.ctaText}
        whatsappMessage={locationWhatsAppMessage}
        whatsappLabel="WhatsApp'tan Teklif Al"
        location={`location_${location.slug}`}
      />

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(location.faqs),
          locationServiceSchema(location),
        ]}
      />
    </>
  );
}
