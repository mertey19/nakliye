import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import {
  CallButton,
  QuoteButton,
  WhatsAppButton,
} from "@/components/cta/ConversionButtons";

import { business } from "@/config/business";
import { services } from "@/config/services";
import { defaultWhatsAppMessage } from "@/lib/messages";

/**
 * 404 — ziyaretçiyi kaybetmek yerine hizmetlere ve iletişime yönlendirir.
 * Bu sayfa indekslenmez (Next.js 404 durum kodu ile sunulur).
 */
/** 404 içeriği hiçbir koşulda dizine girmemeli. */
export const metadata: Metadata = {
  title: `Sayfa Bulunamadı | ${business.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink-900">
          404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
          Aradığınız sayfayı bulamadık
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-700">
          Sayfa taşınmış veya adres yanlış yazılmış olabilir. Taşınma planınız
          için aşağıdaki sayfalardan devam edebilir ya da doğrudan bize
          yazabilirsiniz.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <QuoteButton location="404" />
          <WhatsAppButton message={defaultWhatsAppMessage} location="404" />
          <CallButton location="404" />
        </div>

        <h2 className="mt-12 text-xl font-extrabold text-ink-900">
          {business.primaryCity} nakliyat hizmetlerimiz
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="block rounded-card border border-line bg-white p-4 font-semibold text-ink-900 hover:border-ink-500 hover:text-ink-500"
              >
                {business.primaryCity} {s.navLabel}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href="/"
            className="font-bold text-ink-900 underline decoration-1 underline-offset-4 transition-colors hover:text-ink-500"
          >
            Ana sayfaya dön
          </Link>
        </p>
      </div>
    </Container>
  );
}
