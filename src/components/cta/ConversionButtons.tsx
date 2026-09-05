"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import {
  hasPhone,
  hasWhatsApp,
  hasDirections,
  phoneLabel,
  telHref,
  whatsappLink,
} from "@/lib/business";
import { business } from "@/config/business";

/**
 * Dönüşüm butonları.
 * - Gerçek <a href> üretir (tarayıcı ve Googlebot için normal link).
 * - Tıklama GA4'e olay olarak gider; hiçbir kişisel veri gönderilmez.
 * - İlgili iletişim bilgisi yoksa buton hiç render edilmez.
 *
 * RENK KURALI: Birincil aksiyon marka kırmızısıdır. WhatsApp yeşili yalnızca
 * WhatsApp ikonunda ve mobil dock'taki doğrudan WhatsApp aksiyonunda kullanılır.
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold " +
  "min-h-[48px] px-6 py-3 text-center leading-tight tracking-[-0.01em] " +
  "transition-[background-color,color,border-color,transform] duration-200";

export const btnStyles = {
  /** Birincil: marka kırmızısı, beyaz metin. */
  primary: `${base} bg-brand text-white hover:bg-brand-hover hover:-translate-y-px`,
  /** Koyu bölümlerde birincil: ters çevrilir. */
  inverse: `${base} bg-white text-ink-900 hover:bg-ink-300 hover:-translate-y-px`,
  /** İkincil: şeffaf yüzey, metalik kenarlık. */
  outline: `${base} bg-transparent text-ink-900 border border-ink-500 hover:border-ink-900 hover:bg-white`,
  /** Koyu bölümlerde ikincil. */
  outlineDark: `${base} bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5`,
} as const;

type CtaProps = {
  /** GA4 için CTA konumu: "hero" | "header" | "sticky_dock" | "after_pricing" ... */
  location: string;
  service?: string;
  className?: string;
  label?: string;
  /** Koyu zeminde mi duruyor? Renk şeması buna göre ters çevrilir. */
  onDark?: boolean;
};

export function CallButton({
  location,
  service,
  className = "",
  label,
  onDark = false,
}: CtaProps) {
  if (!hasPhone) return null;
  const visibleLabel = label ?? "Hemen Ara";
  return (
    <a
      href={telHref}
      onClick={() => track("phone_click", { cta_location: location, service })}
      className={`${onDark ? btnStyles.outlineDark : btnStyles.outline} ${className}`}
      /* Erişilebilir ad görünen metinle BAŞLAR: WCAG 2.5.3 "Label in Name". */
      aria-label={`${visibleLabel}: ${phoneLabel}`}
    >
      <PhoneIcon />
      <span>{visibleLabel}</span>
    </a>
  );
}

/** Header'da numarayı açıkça gösteren varyant (masaüstü). */
export function CallLinkWithNumber({ location }: { location: string }) {
  if (!hasPhone) return null;
  return (
    <a
      href={telHref}
      onClick={() => track("phone_click", { cta_location: location })}
      className="group flex shrink-0 items-center gap-2 whitespace-nowrap"
    >
      <PhoneIcon className="header-phone-number" />
      <span className="flex flex-col leading-tight">
        <span className="header-phone-label text-[11px] font-semibold uppercase tracking-[0.14em]">
          Hemen Ara
        </span>
        <span className="header-phone-number text-[15px] font-bold tracking-[-0.01em]">
          {phoneLabel}
        </span>
      </span>
    </a>
  );
}

export function WhatsAppButton({
  message,
  location,
  service,
  className = "",
  label,
  onDark = false,
}: CtaProps & { message: string }) {
  if (!hasWhatsApp) return null;
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { cta_location: location, service })}
      className={`${onDark ? btnStyles.outlineDark : btnStyles.outline} ${className}`}
    >
      {/* Yeşil yalnızca ikonda: anında tanınırlık, sisteme yayılmadan. */}
      <WhatsAppIcon className="text-wa-500" />
      <span>{label ?? "WhatsApp'tan Fiyat Sor"}</span>
    </a>
  );
}

export function QuoteButton({
  location,
  service,
  className = "",
  label,
  variant = "primary",
}: CtaProps & { variant?: keyof typeof btnStyles }) {
  return (
    <Link
      href="/teklif-al"
      onClick={() => track("service_view", { cta_location: location, service })}
      className={`${btnStyles[variant]} ${className}`}
    >
      {label ?? "Ücretsiz Teklif Al"}
    </Link>
  );
}

export function DirectionsButton({
  location,
  className = "",
  onDark = false,
}: CtaProps) {
  if (!hasDirections) return null;
  return (
    <a
      href={business.googleMapsDirectionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("directions_click", { cta_location: location })}
      className={`${onDark ? btnStyles.outlineDark : btnStyles.outline} ${className}`}
    >
      <PinIcon />
      Yol Tarifi Al
    </a>
  );
}

/* --- İkonlar: outline stil, metalik gri stroke --- */

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2s0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/**
 * Sayfa içi standart CTA grubu: Teklif Al (birincil) + WhatsApp + Ara.
 * Eksik kanallar otomatik düşer.
 */
export function CtaGroup({
  location,
  service,
  whatsappMessage,
  whatsappLabel,
  quoteLabel,
  className = "",
  onDark = false,
}: {
  location: string;
  service?: string;
  whatsappMessage: string;
  whatsappLabel?: string;
  quoteLabel?: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <QuoteButton
        location={location}
        service={service}
        label={quoteLabel}
        variant={onDark ? "inverse" : "primary"}
      />
      <WhatsAppButton
        message={whatsappMessage}
        location={location}
        service={service}
        label={whatsappLabel}
        onDark={onDark}
      />
      <CallButton location={location} service={service} onDark={onDark} />
    </div>
  );
}
