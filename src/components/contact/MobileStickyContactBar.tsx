"use client";

import { usePathname } from "next/navigation";

import { ContactActionButton } from "./ContactActionButton";
import { PhoneIcon, WhatsAppIcon } from "../cta/ConversionButtons";
import { business } from "@/config/business";
import { hasPhone, hasWhatsApp } from "@/lib/business";
import {
  createWhatsAppUrl,
  formatPhoneForDisplay,
  formatPhoneForTel,
  resolvePageContext,
} from "@/lib/contact";

/**
 * MOBİL KALICI İLETİŞİM BARI
 * ==========================
 * Google'dan gelen mobil ziyaretçinin, sayfanın neresinde olursa olsun tek
 * başparmakla arama / WhatsApp / teklif aksiyonuna ulaşabilmesi için.
 *
 * Kararlar:
 * - SABİT konumlandırma (scroll'da gizlenip görünme YOK). Gizle/göster
 *   davranışı küçük ekranlarda titreme ve yanlış tıklama üretiyor; şartname
 *   de "kararsızlık yaratıyorsa sabit bırak" diyor.
 * - <body> alt boşluğu (globals.css --dock-height) sayesinde içeriği KAPATMAZ.
 * - iPhone safe-area desteklidir.
 * - Eksik kanal otomatik düşer; kalanlar barı eşit paylaşır. Ölü buton olmaz.
 */
export function MobileStickyContactBar() {
  const pathname = usePathname() || "/";
  const { context, whatsappMessage, service } = resolvePageContext(pathname);

  const telHref = hasPhone ? `tel:${formatPhoneForTel(business.phone)}` : "";
  const waHref = hasWhatsApp ? createWhatsAppUrl(whatsappMessage) : "";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-900 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <nav
        aria-label="Hızlı iletişim"
        className="mx-auto flex h-[68px] max-w-2xl items-stretch gap-2 px-3 py-2.5"
      >
        {telHref && (
          <ContactActionButton
            href={telHref}
            label="Ara"
            ariaLabel={`Ara: ${formatPhoneForDisplay(business.phone)}`}
            icon={<PhoneIcon />}
            event="sticky_mobile_phone_click"
            ctaLocation="sticky_mobile_bar"
            pageContext={context}
            service={service}
            variant="onDarkOutline"
            className="flex-1 !px-2 !text-[14px]"
          />
        )}

        {waHref && (
          <ContactActionButton
            href={waHref}
            label="WhatsApp"
            icon={<WhatsAppIcon className="text-wa-500" />}
            event="sticky_mobile_whatsapp_click"
            ctaLocation="sticky_mobile_bar"
            pageContext={context}
            service={service}
            variant="onDarkOutline"
            external
            className="flex-1 !px-2 !text-[14px]"
          />
        )}

        <ContactActionButton
          href="/teklif-al"
          label={telHref || waHref ? "Teklif Al" : "Ücretsiz Teklif Al"}
          icon={<QuoteIcon />}
          event="sticky_mobile_quote_click"
          ctaLocation="sticky_mobile_bar"
          pageContext={context}
          service={service}
          variant="onDarkPrimary"
          internal
          className="flex-1 !px-2 !text-[14px] font-bold"
        />
      </nav>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7Z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}
