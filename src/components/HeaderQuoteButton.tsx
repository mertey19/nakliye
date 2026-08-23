"use client";

import Link from "next/link";
import { track, deviceType } from "@/lib/analytics";

/**
 * Header'daki birincil CTA.
 * `header-cta` sınıfı sayesinde scroll ile koyulaşan header üzerinde
 * otomatik olarak ters çevrilir (beyaz yüzey / siyah metin).
 */
export function HeaderQuoteButton() {
  return (
    <Link
      href="/teklif-al"
      onClick={() =>
        track("floating_quote_click", {
          cta_location: "header",
          page_context: "header",
          device_type: deviceType(),
        })
      }
      className="header-cta inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-ink-900 whitespace-nowrap px-5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-ink-600"
    >
      <span className="whitespace-nowrap">Teklif Al</span>
    </Link>
  );
}
