"use client";

import { useEffect, useState } from "react";
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
 * MASAÜSTÜ KALICI İLETİŞİM DOCK'U
 * ===============================
 * Sağ altta, dikey istiflenmiş iletişim aksiyonları. Ziyaretçi sayfanın
 * neresinde olursa olsun aramak / WhatsApp yazmak için başa dönmek zorunda
 * kalmaz.
 *
 * Kararlar:
 * - Hero'nun altına inildiğinde (>420px) yumuşakça belirir. Böylece hero'daki
 *   birincil CTA ile yarışmaz ve açılışta "widget" hissi vermez.
 * - Dev yuvarlak balon YOK: marka diline uygun, kenarlıklı, dikdörtgene yakın
 *   premium kartlar.
 * - Sürekli zıplama/parlama YOK. Tek seferlik giriş animasyonu + hover'da
 *   1px yükselme ve gölge artışı.
 * - Sadece md ve üzeri; mobilde alt bar devrede (ikisi asla birlikte çıkmaz).
 * - Eksik kanal render edilmez; hiçbir kanal yoksa dock hiç görünmez.
 */
export function FloatingContactDock() {
  const pathname = usePathname() || "/";
  const { context, whatsappMessage, service } = resolvePageContext(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 420);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const telHref = hasPhone ? `tel:${formatPhoneForTel(business.phone)}` : "";
  const waHref = hasWhatsApp ? createWhatsAppUrl(whatsappMessage) : "";

  // Teklif sayfasındayken "Teklif Al" tekrar etmesin.
  const showQuote = pathname !== "/teklif-al";

  if (!telHref && !waHref && !showQuote) return null;

  return (
    <div
      className={`cinema-hidden-dock fixed bottom-6 right-6 z-40 hidden md:block ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      } transition-[opacity,transform] duration-300 ease-out`}
      /* Görünmezken klavye odağından ve ekran okuyucudan tamamen çıkar. */
      aria-hidden={!visible}
      inert={!visible}
    >
      <nav
        aria-label="Hızlı iletişim"
        className="flex w-[248px] flex-col gap-2 rounded-[14px] border border-line bg-[#0b0b0b]/95 p-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.55)] backdrop-blur"
      >
        <p className="eyebrow px-2 pb-0.5 pt-1 text-ink-500">Bize ulaşın</p>

        {telHref && (
          <ContactActionButton
            href={telHref}
            label="Hemen Ara"
            ariaLabel={`Hemen Ara: ${formatPhoneForDisplay(business.phone)}`}
            icon={<PhoneIcon />}
            event="floating_phone_click"
            ctaLocation="floating_dock"
            pageContext={context}
            service={service}
            variant="primary"
            className="w-full !justify-start hover:-translate-y-px hover:shadow-[0_8px_18px_-8px_rgba(19,24,28,0.6)]"
          />
        )}

        {waHref && (
          <ContactActionButton
            href={waHref}
            label="WhatsApp'tan Bilgi Al"
            icon={<WhatsAppIcon className="text-wa-500" />}
            event="floating_whatsapp_click"
            ctaLocation="floating_dock"
            pageContext={context}
            service={service}
            variant="whatsapp"
            external
            className="w-full !justify-start !text-[14px] hover:-translate-y-px hover:shadow-[0_8px_18px_-10px_rgba(19,24,28,0.5)]"
          />
        )}

        {showQuote && (
          <ContactActionButton
            href="/teklif-al"
            label="Ücretsiz Teklif Al"
            icon={<QuoteIcon />}
            event="floating_quote_click"
            ctaLocation="floating_dock"
            pageContext={context}
            service={service}
            variant={telHref ? "neutral" : "primary"}
            internal
            className="w-full !justify-start !text-[14px] hover:-translate-y-px"
          />
        )}
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
