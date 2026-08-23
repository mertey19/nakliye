"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";

/**
 * GA4 kimliği doğrudan NEXT_PUBLIC_ değişkeninden okunur.
 * `@/config/site` BİLEREK import edilmez: o modül sunucuya özel
 * VERCEL_* değişkenlerine bakar ve istemci paketine girmemelidir.
 */
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

/**
 * GA4 — yalnızca NEXT_PUBLIC_GA_ID tanımlıysa yüklenir.
 * Tanımlı değilse HİÇBİR üçüncü taraf script'i sayfaya girmez (performans bütçesi).
 * IP anonimleştirme ve reklam sinyallerinin kapatılması varsayılandır.
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}

/** Hizmet sayfası görüntülemesini ölçer. */
export function ServiceViewTracker({ service }: { service: string }) {
  useEffect(() => {
    import("@/lib/analytics").then(({ track }) =>
      track("service_view", { service, cta_location: "page_load" }),
    );
  }, [service]);
  return null;
}
