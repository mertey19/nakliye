import Image from "next/image";

import { Container } from "../Container";
import { CtaGroup } from "../cta/ConversionButtons";
import { hasDirectContact } from "@/lib/business";
import { business } from "@/config/business";
import { availableHeroPhoto } from "@/lib/photos.server";

/**
 * HERO — ilk 5 saniye testi:
 * KİM (marka) / NE (hizmet) / NEREDE (şehir) / NEDEN (fayda) / NASIL (CTA)
 *
 * Zemin off-white (#F4F4F3), başlık siyah (#13181C): yüksek kontrast,
 * geniş whitespace, çok güçlü tipografi.
 *
 * Sağ sütun: firmanın GERÇEK aracı/işi fotoğrafı varsa o kullanılır
 * (config/photos.ts → heroPhoto). Fotoğraf yoksa STOK GÖRSEL KONULMAZ;
 * yerine marka plakası (koyu panel) gelir. Böylece hem düzen dengeli kalır
 * hem de "sanki iş yapılmış" izlenimi veren sahte görsel kullanılmaz.
 *
 * LCP: fotoğraf varsa `priority` ile öncelikli yüklenir; yoksa LCP öğesi
 * H1 metnidir ve mobilde çok hızlı boyanır.
 */
export function Hero({
  h1,
  intro,
  bullets,
  whatsappMessage,
  whatsappLabel,
  service,
  eyebrow,
}: {
  h1: string;
  intro: string;
  bullets?: string[];
  whatsappMessage: string;
  whatsappLabel?: string;
  service?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {eyebrow && <p className="eyebrow mb-4 text-ink-500">{eyebrow}</p>}

            <h1 className="headline text-[34px] text-ink-900 sm:text-[46px] lg:text-[56px]">
              {h1}
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-700 sm:text-[18px]">
              {intro}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[15px] font-medium text-ink-700"
                  >
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <CtaGroup
              location="hero"
              service={service}
              whatsappMessage={whatsappMessage}
              whatsappLabel={whatsappLabel}
              className="mt-9"
            />

            {!hasDirectContact && (
              <p className="mt-4 text-[14px] text-ink-500">
                Taşınma bilgilerinizi teklif formundan iletebilirsiniz.
              </p>
            )}
          </div>

          {availableHeroPhoto ? (
            /* Ölçü dosyadan okunduğu için görsel kendi oranında, kırpılmadan
               render edilir ve yer önceden ayrıldığından CLS oluşmaz. */
            <figure className="photo-zoom overflow-hidden rounded-card border border-line bg-white">
              <Image
                src={availableHeroPhoto.src}
                alt={availableHeroPhoto.alt}
                width={availableHeroPhoto.width}
                height={availableHeroPhoto.height}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="photo h-auto w-full"
              />
            </figure>
          ) : (
            <BrandPlate />
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * Fotoğraf gelene kadar kullanılan marka plakası.
 * Aracın koyu gövdesi + beyaz tipografi + alt bilgi bandı hissini taşır.
 * Hiçbir iddia içermez, yalnızca marka ve verilen hizmetleri yazar.
 */
function BrandPlate() {
  return (
    <div className="section-dark overflow-hidden rounded-card bg-ink-900 text-white">
      <div className="px-8 py-10 sm:px-10 sm:py-12">
        <p className="eyebrow text-ink-300">{business.primaryCity}</p>
        <p className="headline mt-3 text-[30px] sm:text-[34px]">
          {business.name}
        </p>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-300">
          Evden eve, ofis ve parça eşya taşımacılığı. Planlı, paketlemeli ve
          takip edilebilir taşıma.
        </p>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
        {["Evden Eve", "Şehirler Arası", "Ofis Taşıma"].map((label) => (
          <div key={label} className="px-2 py-4">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-300">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 shrink-0 text-ink-900"
    >
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
