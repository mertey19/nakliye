import Link from "next/link";

import { business } from "@/config/business";
import {
  addressOneLine,
  hasAddress,
  hasGbp,
  hasMapEmbed,
} from "@/lib/business";
import { DirectionsButton } from "@/components/cta/ConversionButtons";

export function HomeLocation() {
  if (!hasMapEmbed) return null;

  return (
    <div className="mt-12 border-t border-line pt-10 sm:mt-14 sm:pt-12">
      <div className="grid overflow-hidden rounded-card border border-line bg-white lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
        <iframe
          src={business.googleMapsEmbedUrl}
          title={`${business.name} konumu`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0 sm:h-[390px]"
        />

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="eyebrow text-ink-500">Konumumuz</p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-ink-900">
            Bizi Haritada Bulun
          </h2>
          {hasAddress && (
            <address className="mt-4 not-italic text-[16px] leading-relaxed text-ink-700">
              {addressOneLine}
            </address>
          )}
          <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
            Google Haritalar üzerinden bulunduğunuz yerden doğrudan rota
            oluşturabilirsiniz.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <DirectionsButton location="home_location" className="w-full" />
            {hasGbp && (
              <a
                href={business.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] border border-line bg-surface px-5 py-3 text-center font-semibold text-ink-900 transition-colors hover:border-ink-500 hover:bg-white"
              >
                Google İşletme Profilini Gör
              </a>
            )}
            <Link
              href="/iletisim"
              className="inline-flex min-h-[44px] items-center justify-center text-[14px] font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
            >
              Tüm iletişim bilgileri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
