"use client";

import { track, deviceType } from "@/lib/analytics";
import { business } from "@/config/business";

/**
 * Header'daki Instagram bağlantısı.
 *
 * - Yalnızca `business.instagram` doluysa render edilir (ölü buton yok).
 * - Logo TEK RENK kullanılır: renkli Instagram gradienti siyah/beyaz/metalik
 *   marka sistemini bozar. Glif tek renkte de anında tanınıyor.
 * - Renk geçişi `.icon-btn` sınıfından gelir; scroll ile koyulaşan header'da
 *   otomatik olarak beyaza döner.
 * - Görünür metni olmadığı için erişilebilir ad aria-label ile verilir.
 */
export function InstagramLink({
  location = "header",
  className = "",
}: {
  location?: string;
  className?: string;
}) {
  const url = business.instagram.trim();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("instagram_click", {
          cta_location: location,
          device_type: deviceType(),
        })
      }
      aria-label={`${business.name} Instagram sayfası (yeni sekmede açılır)`}
      className={`icon-btn flex h-11 w-11 items-center justify-center rounded-[10px] border transition-colors ${className}`}
    >
      <InstagramGlyph />
    </a>
  );
}

/** Instagram glifi — outline stil, ikon sistemiyle aynı çizgi kalınlığı. */
export function InstagramGlyph({ size = 19 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
