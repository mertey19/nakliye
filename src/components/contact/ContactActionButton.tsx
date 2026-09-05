"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, deviceType, type ConversionEvent } from "@/lib/analytics";

/**
 * Kalıcı iletişim CTA sisteminin tek buton primitifi.
 *
 * - Gerçek <a href> / <Link> üretir (semantik link, JS'siz de çalışır).
 * - Görünür metin taşır; ikon tek başına bırakılmaz.
 * - Tıklama GA4'e olay + bağlam olarak gider (kişisel veri YOK).
 * - `href` boşsa hiç render edilmez -> ölü buton oluşmaz.
 */

export type ContactActionVariant =
  | "primary"
  | "neutral"
  | "whatsapp"
  /** Koyu zeminde birincil: ters çevrilir (beyaz yüzey, siyah metin). */
  | "onDarkPrimary"
  /** Koyu zeminde ikincil: şeffaf yüzey, beyaz kenarlık. */
  | "onDarkOutline";

const variants: Record<ContactActionVariant, string> = {
  primary: "bg-brand text-white border border-brand hover:bg-brand-hover",
  neutral: "bg-card text-white border border-line hover:border-white/40",
  whatsapp: "bg-wa-500 text-white border border-wa-500 hover:bg-wa-600",
  onDarkPrimary:
    "bg-white text-ink-900 border border-white hover:bg-ink-300",
  onDarkOutline:
    "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
};

export function ContactActionButton({
  href,
  label,
  icon,
  event,
  ctaLocation,
  pageContext,
  service,
  variant = "neutral",
  external = false,
  internal = false,
  className = "",
  ariaLabel,
}: {
  /** Boşsa buton render edilmez. */
  href: string;
  label: string;
  icon: ReactNode;
  event: ConversionEvent;
  ctaLocation: string;
  pageContext: string;
  service?: string;
  variant?: ContactActionVariant;
  /** wa.me gibi dış bağlantılar için yeni sekme. */
  external?: boolean;
  /** Site içi rota ise next/link kullanılır (prefetch + hızlı geçiş). */
  internal?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  if (!href) return null;

  const onClick = () =>
    track(event, {
      cta_location: ctaLocation,
      page_context: pageContext,
      device_type: deviceType(),
      service,
    });

  const classes =
    "group inline-flex items-center justify-center gap-2 rounded-[10px] " +
    "min-h-[48px] px-4 text-[15px] font-semibold tracking-[-0.01em] " +
    "transition-[background-color,border-color,box-shadow,transform] duration-200 " +
    `${variants[variant]} ${className}`;

  const content = (
    <>
      <span aria-hidden="true" className="shrink-0">
        {icon}
      </span>
      <span>{label}</span>
    </>
  );

  if (internal) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
