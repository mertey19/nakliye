import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "../Container";
import { Breadcrumbs } from "../Breadcrumbs";
import { CtaBand } from "./CtaBand";
import { JsonLd } from "../JsonLd";
import { QuoteButton } from "../cta/ConversionButtons";

import { business } from "@/config/business";
import { guides, type GuideDef } from "@/config/guides";
import { serviceBySlug } from "@/config/services";
import {
  articleSchema,
  breadcrumbSchema,
  type Crumb,
} from "@/lib/schema";

/**
 * Rehber yazısı iskeleti.
 * Her yazı, doğal biçimde ilgili ticari sayfaya bağlanır (bilgi -> hizmet hunisi).
 * Yazı bilgi çıkmazıyla bitmez; sonunda net bir sonraki adım vardır.
 */
export function GuideShell({
  guide,
  children,
}: {
  guide: GuideDef;
  children: ReactNode;
}) {
  const service = serviceBySlug(guide.ctaServiceSlug);
  const others = guides.filter((g) => g.slug !== guide.slug);

  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Rehber", path: "/rehber" },
    { name: guide.h1, path: `/rehber/${guide.slug}` },
  ];

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <article className="max-w-3xl">
          <header>
            <h1 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
              {guide.h1}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-700">
              {guide.summary}
            </p>
            <p className="mt-4 text-sm text-ink-500">
              Yaklaşık {guide.readingMinutes} dakikalık okuma · Güncelleme:{" "}
              <time dateTime={guide.updated}>
                {new Date(guide.updated).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </header>

          <div className="prose-tr mt-8">{children}</div>

          {service && (
            <aside className="mt-12 rounded-card border-2 border-ink-900 bg-surface p-6">
              <p className="text-[17px] font-bold text-ink-900">
                Taşınma tarihiniz yaklaştıysa planı erken kurun
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                {business.name}{" "}
                <Link
                  href={`/${service.slug}`}
                  className="font-bold text-ink-900 underline decoration-1 underline-offset-4 hover:text-ink-500"
                >
                  {business.primaryCity} {service.navLabel.toLocaleLowerCase("tr-TR")}
                </Link>{" "}
                hizmetinde eşya miktarı, kat ve asansör durumuna göre plan
                çıkarıyor. Bilgileri paylaşırsanız size özel fiyatı iletelim.
              </p>
              <div className="mt-5">
                <QuoteButton
                  location="guide_inline"
                  service={service.slug}
                  label="Nakliyat Teklifi Al"
                />
              </div>
            </aside>
          )}

          <section aria-labelledby="diger-rehberler" className="mt-12">
            <h2
              id="diger-rehberler"
              className="text-xl font-extrabold text-ink-900"
            >
              Diğer Rehberler
            </h2>
            <ul className="mt-4 space-y-3">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/rehber/${g.slug}`}
                    className="block rounded-card border border-line bg-white p-4 hover:border-ink-500"
                  >
                    <span className="font-bold text-ink-900">{g.h1}</span>
                    <span className="mt-1 block text-[15px] text-ink-500">
                      {g.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>

      <CtaBand
        title="Taşınmanızı Planlayalım"
        text="Adres, kat ve tahmini tarih bilgisiyle yazın; size uygun taşıma planını ve fiyatı iletelim."
        whatsappMessage={
          service?.whatsappMessage ??
          `Merhaba ${business.name},\nnakliyat hizmetiniz için fiyat almak istiyorum.`
        }
        service={service?.slug}
        location="guide_bottom"
      />

      <JsonLd
        data={[
          articleSchema({
            headline: guide.h1,
            description: guide.description,
            path: `/rehber/${guide.slug}`,
            datePublished: guide.updated,
            dateModified: guide.updated,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}
