import Link from "next/link";
import { Container } from "./Container";
import { BrandLogo } from "./ui/BrandLogo";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { featuredGuides } from "@/config/guides";
import { districtLocationLinks } from "@/config/locations";
import { formatPhoneForDisplay, formatPhoneForTel, createWhatsAppUrl } from "@/lib/contact";
import { defaultWhatsAppMessage } from "@/lib/messages";
import {
  addressOneLine,
  hasAddress,
  hasEmail,
  hasOpeningHours,
  hasPhone,
  hasSocial,
  hasWhatsApp,
  socialLinks,
} from "@/lib/business";

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
 * FOOTER — referans araçtaki koyu marka bandının sayfa karşılığı.
 * Zemin #13181C, başlıklar beyaz, gövde açık gri (#D3D4D5).
 *
 * Yerel varlık (local entity) ayağı: isim, adres, telefon ve hizmet bölgesi
 * sitenin geri kalanıyla BİREBİR aynı kaynaktan gelir.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark border-t-2 border-brand bg-ink-900 text-ink-300">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo size={56} className="h-14 w-14 rounded-full" />
              <p className="text-[18px] font-extrabold tracking-[-0.03em] text-white">
                {business.name}
              </p>
            </div>
            <p className="eyebrow mt-1.5 text-ink-300/80">
              {business.primaryCity} Nakliyat
            </p>
            {business.legalName && (
              <p className="mt-3 text-[14px] text-ink-300">{business.legalName}</p>
            )}
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-300">
              {business.primaryCity} içinde ve {business.primaryCity} dışına evden
              eve nakliyat, ofis taşıma ve parça eşya taşıma hizmeti.
            </p>
          </div>

          <nav aria-label="Hizmetler">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
              Hizmetler
            </p>
            <ul className="mt-4 text-[14px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="İletişim">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
              İletişim
            </p>
            <ul className="mt-4 text-[14px]">
              {hasPhone && (
                <li>
                  <a
                    href={`tel:${formatPhoneForTel(business.phone)}`}
                    className="inline-block py-1.5 font-bold text-white transition-colors hover:text-ink-300"
                  >
                    {formatPhoneForDisplay(business.phone)}
                  </a>
                </li>
              )}
              {hasWhatsApp && (
                <li>
                  <a
                    href={createWhatsAppUrl(defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {hasEmail && (
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                  >
                    {business.email}
                  </a>
                </li>
              )}
              {hasAddress && (
                <li className="py-1.5 text-ink-300">{addressOneLine}</li>
              )}
              <li>
                <Link
                  href="/iletisim"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  İletişim sayfası
                </Link>
              </li>
              <li>
                <Link
                  href="/teklif-al"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Teklif Al
                </Link>
              </li>
            </ul>

            {hasOpeningHours && (
              <div className="mt-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
                  Çalışma Saatleri
                </p>
                <ul className="mt-3 space-y-1 text-[14px] text-ink-300">
                  {business.openingHours.map((h, i) => (
                    <li key={i}>
                      {h.days.map((d) => DAY_TR[d]).join(", ")}: {h.opens} – {h.closes}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>

          <nav aria-label="Kurumsal">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
              Kurumsal
            </p>
            <ul className="mt-4 text-[14px]">
              <li>
                <Link
                  href="/hakkimizda"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/hizmet-bolgeleri"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Hizmet Bölgeleri
                </Link>
              </li>
              <li>
                <Link
                  href="/rehber"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Taşınma Rehberi
                </Link>
              </li>
              <li>
                <Link
                  href="/kvkk-aydinlatma-metni"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  KVKK
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Gizlilik
                </Link>
              </li>
            </ul>

            <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.14em] text-white">
              Rehber
            </p>
            <ul className="mt-3 text-[14px]">
              {featuredGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/rehber/${g.slug}`}
                    className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                  >
                    {g.h1}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rehber"
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  Tüm rehberler
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <nav aria-label="Hizmet bölgeleri" className="mt-12 border-t border-white/10 pt-8">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white">
            Hizmet bölgeleri
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {districtLocationLinks.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/${location.slug}`}
                  className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
                >
                  {location.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/mersin-ucuz-nakliye"
                className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
              >
                Uygun fiyatlı nakliye
              </Link>
            </li>
            <li>
              <Link
                href="/hizmet-bolgeleri"
                className="inline-block py-1.5 text-ink-300 transition-colors hover:text-white"
              >
                Tüm bölgeler
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-[14px] text-ink-300">
            <span className="font-semibold text-white">Hizmet bölgesi:</span>{" "}
            {business.primaryCity} —{" "}
            {business.serviceAreas.map((a) => a.name).join(", ")}
          </p>
          {hasSocial && (
            <ul className="mt-4 flex flex-wrap gap-5 text-[14px]">
              {socialLinks.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1.5 text-ink-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 text-[13px] text-ink-300/70">
            © {year} {business.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
