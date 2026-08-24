import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  CallButton,
  DirectionsButton,
  QuoteButton,
  WhatsAppButton,
} from "@/components/cta/ConversionButtons";

import { business } from "@/config/business";
import { services } from "@/config/services";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { contactWhatsAppMessage } from "@/lib/messages";
import {
  addressOneLine,
  hasAddress,
  hasDirectContact,
  hasEmail,
  hasMapEmbed,
  hasOpeningHours,
  hasPhone,
  hasWhatsApp,
  phoneLabel,
  socialLinks,
  telHref,
} from "@/lib/business";

const city = business.primaryCity;

const DAY_TR: Record<string, string> = {
  Monday: "Pazartesi",
  Tuesday: "Salı",
  Wednesday: "Çarşamba",
  Thursday: "Perşembe",
  Friday: "Cuma",
  Saturday: "Cumartesi",
  Sunday: "Pazar",
};

/**
 * İletişim sayfası aynı zamanda yerel varlık (local entity) sinyalidir:
 * isim, adres, telefon, hizmet bölgesi ve çalışma saatleri Google İşletme
 * Profili ile birebir aynı kaynaktan gelir.
 */
export const metadata: Metadata = {
  title: `İletişim ve Telefon | ${business.name}`,
  description: `${business.name} iletişim bilgileri. ${city} içi ve şehirler arası taşıma için telefon, WhatsApp veya teklif formu üzerinden ulaşın.`,
  alternates: { canonical: absoluteUrl("/iletisim") },
  openGraph: {
    title: `İletişim | ${business.name}`,
    description: `${city} nakliyat hizmetleri için iletişim bilgileri.`,
    url: absoluteUrl("/iletisim"),
  },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "İletişim", path: "/iletisim" },
];

export default function IletisimPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
          {business.name} İletişim
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-700">
          Taşınma tarihiniz yaklaştıysa en hızlı yol doğrudan yazmak ya da
          aramak. Detaylı bilgi vermek isterseniz teklif formunu kullanabilirsiniz.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="iletisim-bilgileri">
            <h2 id="iletisim-bilgileri" className="text-xl font-extrabold text-ink-900">
              İletişim Bilgileri
            </h2>

            <dl className="mt-5 divide-y divide-line-soft rounded-card border border-line bg-white">
              <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                  Firma
                </dt>
                <dd className="text-[16px] font-semibold text-ink-900">
                  {business.name}
                </dd>
              </div>

              {hasPhone && (
                <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                  <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                    Telefon
                  </dt>
                  <dd>
                    <a
                      href={telHref}
                      className="text-[16px] font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
                    >
                      {phoneLabel}
                    </a>
                  </dd>
                </div>
              )}

              {hasEmail && (
                <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                  <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                    E-posta
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-[16px] text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              )}

              {hasAddress && (
                <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                  <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                    Adres
                  </dt>
                  <dd className="text-[16px] text-ink-900">{addressOneLine}</dd>
                </div>
              )}

              <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                  Hizmet bölgesi
                </dt>
                <dd className="text-[16px] text-ink-900">
                  {city} ({business.serviceAreas.map((a) => a.name).join(", ")}) ve{" "}
                  {city} dışı taşımalar
                </dd>
              </div>

              {hasOpeningHours && (
                <div className="flex flex-wrap items-baseline gap-2 px-5 py-4">
                  <dt className="w-32 shrink-0 text-sm font-bold uppercase tracking-wide text-ink-500">
                    Çalışma saatleri
                  </dt>
                  <dd className="text-[16px] text-ink-900">
                    <ul>
                      {business.openingHours.map((h, i) => (
                        <li key={i}>
                          {h.days.map((d) => DAY_TR[d]).join(", ")}: {h.opens} –{" "}
                          {h.closes}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {hasWhatsApp && (
                <WhatsAppButton
                  message={contactWhatsAppMessage}
                  location="contact_page"
                  label="WhatsApp'tan Yaz"
                />
              )}
              {hasPhone && <CallButton location="contact_page" />}
              <QuoteButton
                location="contact_page"
                variant="outline"
                label="Teklif Formunu Doldur"
              />
              <DirectionsButton location="contact_page" />
            </div>

            {!hasDirectContact && (
              <p className="mt-5 rounded-card border border-line bg-surface p-4 text-[15px] leading-relaxed text-ink-700">
                Taşınma bilgilerinizi{" "}
                <Link
                  href="/teklif-al"
                  className="font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
                >
                  teklif formu
                </Link>{" "}
                üzerinden iletebilirsiniz.
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-extrabold text-ink-900">
                  Sosyal Medya ve Google
                </h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center rounded-[10px] border border-line bg-white px-4 font-semibold text-ink-700 hover:bg-surface"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section aria-labelledby="konum">
            <h2 id="konum" className="text-xl font-extrabold text-ink-900">
              Konum
            </h2>
            {hasMapEmbed ? (
              <div className="mt-5 overflow-hidden rounded-card border border-line">
                {/* Harita gövdenin altında ve lazy yüklenir; LCP'yi etkilemez. */}
                <iframe
                  src={business.googleMapsEmbedUrl}
                  title={`${business.name} konumu`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[360px] w-full border-0"
                />
              </div>
            ) : (
              <p className="mt-5 rounded-card border border-line bg-surface p-5 text-[15px] leading-relaxed text-ink-700">
                Taşıma hizmeti adresinize gelerek verilir. {city} merkez
                ilçelerinde ve {city} dışına yapılan taşımalar için önce telefon
                veya WhatsApp üzerinden planlama yapıyoruz.
              </p>
            )}

            <div className="mt-6 rounded-card border border-line bg-white p-6">
              <h3 className="text-[17px] font-bold text-ink-900">
                Yazarken şunları eklerseniz daha hızlı dönebiliriz
              </h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-500">
                <li>• Çıkış ve varış adresi (ilçe yeterli)</li>
                <li>• Kat ve asansör durumu</li>
                <li>• Evin oda sayısı veya taşınacak eşyalar</li>
                <li>• Tahmini taşınma tarihi</li>
              </ul>
            </div>
          </section>
        </div>
      </Container>

      <Container className="pb-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="ne-zaman">
            <h2 id="ne-zaman" className="text-xl font-extrabold text-ink-900">
              Ne Zaman Ulaşmalısınız?
            </h2>
            <div className="prose-tr mt-4">
              <p>
                Taşınma tarihi netleşir netleşmez yazmanız en iyisi. Nakliyatta
                ay sonları ve hafta sonları belirgin biçimde yoğun geçer; bu
                dönemlerde istediğiniz güne yer ayırtmak için erken haber vermek
                gerekir.
              </p>
              <p>
                Tarihiniz henüz kesin değilse de yazabilirsiniz. Tahmini bir
                aralık üzerinden konuşup, tarih kesinleştiğinde planı
                netleştiriyoruz. Acil taşımalarda önce arayın; uygun araç ve ekip
                varsa kısa sürede program çıkarabiliyoruz.
              </p>
            </div>
          </section>

          <section aria-labelledby="hangi-hizmet">
            <h2 id="hangi-hizmet" className="text-xl font-extrabold text-ink-900">
              Hangi Hizmet İçin Yazıyorsunuz?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
              Hizmet sayfasında sürecin nasıl işlediğini ve fiyatı belirleyen
              etkenleri görebilirsiniz:
            </p>
            <ul className="mt-4 grid gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="block rounded-card border border-line bg-white px-4 py-3 font-semibold text-ink-900 hover:border-ink-500 hover:text-ink-500"
                  >
                    {city} {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
