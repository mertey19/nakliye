"use client";

import { track, deviceType } from "@/lib/analytics";
import { WhatsAppIcon } from "../cta/ConversionButtons";

/**
 * "WhatsApp'tan Bilgi Al" bölümünün büyük birincil butonu.
 *
 * Bu bölümde WhatsApp tek aksiyon olduğu için buton birincil ağırlıkta
 * (siyah yüzey) kullanılır; yeşil yine yalnızca ikonda kalır — marka
 * sistemine yayılmaz.
 */
export function WhatsAppCtaButton({
  href,
  location,
  service,
}: {
  href: string;
  location: string;
  service?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("whatsapp_click", {
          cta_location: location,
          page_context: "whatsapp_section",
          device_type: deviceType(),
          service,
        })
      }
      className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[10px] bg-ink-900 px-7 text-[16px] font-semibold tracking-[-0.01em] text-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-ink-600 hover:shadow-[0_10px_24px_-12px_rgba(19,24,28,0.7)] sm:w-auto"
    >
      <WhatsAppIcon className="text-wa-500" />
      WhatsApp&apos;tan Bilgi Al
    </a>
  );
}
