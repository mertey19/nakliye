"use client";

import Script from "next/script";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";
import { site } from "@/config/site";

/**
 * GA4 — yalnızca NEXT_PUBLIC_GA_ID tanımlıysa yüklenir.
 * Tanımlı değilse HİÇBİR üçüncü taraf script'i sayfaya girmez (performans bütçesi).
 * IP anonimleştirme ve reklam sinyallerinin kapatılması varsayılandır.
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  if (!site.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${site.gaId}', {
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
