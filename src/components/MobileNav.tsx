"use client";

import { useState } from "react";
import Link from "next/link";
import { track, deviceType } from "@/lib/analytics";
import { hasPhone } from "@/lib/business";
import { business } from "@/config/business";
import { formatPhoneForDisplay, formatPhoneForTel } from "@/lib/contact";
import { PhoneIcon } from "./cta/ConversionButtons";
import { InstagramLink, InstagramGlyph } from "./InstagramLink";
import type { NavItem } from "./nav";

/**
 * Mobil / tablet menüsü (lg altı).
 * Linkler HER ZAMAN HTML'de bulunur; açma-kapama yalnızca `hidden`
 * özniteliğini değiştirir. Böylece içerik JS'e bağımlı olmaz.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2">
        {/* Görünürlük aralığı: 360px - 767px.
            320px altında üst bar sıkışmasın diye gizli (menü panelinde var);
            md ve üstünde masaüstü kümesindeki Instagram devreye girdiği için
            burada gizlenir — aksi halde 768-1023 arasında iki kez çıkardı. */}
        <InstagramLink
          location="header_mobile"
          className="hidden min-[360px]:flex md:hidden"
        />
        {hasPhone && (
          <a
            href={`tel:${formatPhoneForTel(business.phone)}`}
            onClick={() =>
              track("phone_click", {
                cta_location: "header_mobile",
                device_type: deviceType(),
              })
            }
            aria-label={`Telefonla ara: ${formatPhoneForDisplay(business.phone)}`}
            className="icon-btn icon-btn-primary flex h-11 w-11 items-center justify-center rounded-[10px] border transition-colors md:hidden"
          >
            <PhoneIcon />
          </a>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="icon-btn flex h-11 w-11 items-center justify-center rounded-[10px] border transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobil-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_16px_32px_-20px_rgba(19,24,28,0.5)]"
      >
        <nav aria-label="Mobil menü">
          <ul className="flex flex-col divide-y divide-line-soft px-4 pb-4 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center text-[15px] font-medium tracking-[-0.01em] text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {business.instagram && (
              <li>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] text-ink-900"
                >
                  <InstagramGlyph size={18} />
                  Instagram
                </a>
              </li>
            )}
            <li className="pt-4">
              <Link
                href="/teklif-al"
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center justify-center rounded-[10px] bg-ink-900 font-semibold text-white"
              >
                Ücretsiz Teklif Al
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
