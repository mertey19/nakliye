/**
 * GA4 dönüşüm ölçümü — gizlilik odaklı.
 *
 * KURAL: Ziyaretçinin telefon numarası, adı, adresi, form içeriği gibi
 * kişisel veriler ASLA analytics'e gönderilmez. Sadece olay adı, sayfa yolu,
 * hizmet adı, CTA konumu ve kazanım (utm/gclid) bilgisi gönderilir.
 */

export type ConversionEvent =
  | "phone_click"
  | "whatsapp_click"
  | "quote_form_view"
  | "quote_form_start"
  | "quote_form_step_1"
  | "quote_form_step_2"
  | "quote_form_submit"
  | "quote_form_success"
  | "quote_form_error"
  | "directions_click"
  | "service_view"
  // Kalıcı (floating / sticky) iletişim CTA sistemi
  | "floating_phone_click"
  | "floating_whatsapp_click"
  | "floating_quote_click"
  | "sticky_mobile_phone_click"
  | "sticky_mobile_whatsapp_click"
  | "sticky_mobile_quote_click"
  // Sosyal medya (dışa giden tıklama)
  | "instagram_click";

export type EventParams = {
  /** CTA'nın sayfadaki yeri: "header" | "hero" | "sticky_dock" | "footer" | ... */
  cta_location?: string;
  /** İlgili hizmet slug'ı */
  service?: string;
  /** Sayfa bağlamı: "homepage" | hizmet slug'ı | diğer yol */
  page_context?: string;
  /** "mobile" | "desktop" — kalıcı CTA sisteminin hangi varyantı kullanıldı */
  device_type?: string;
  /** Formdaki adım numarası vb. */
  step?: number;
  /** Hata nedeni (teknik, kişisel veri içermez) */
  reason?: string;
};

/** Tıklama anındaki cihaz sınıfı. Kişisel veri içermez. */
export function deviceType(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

const ATTRIBUTION_KEY = "kcn_attr";

type Attribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
};

/**
 * İlk girişteki kazanım bilgisini oturum boyunca saklar.
 * Böylece teklif isteği "Google organik mi, Ads mi, Instagram mı?" ayırt edilebilir.
 * Kanonik URL'ler bu parametrelerden etkilenmez.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer || "";
    const attr: Attribution = {
      source: params.get("utm_source") || undefined,
      medium: params.get("utm_medium") || undefined,
      campaign: params.get("utm_campaign") || undefined,
      term: params.get("utm_term") || undefined,
      content: params.get("utm_content") || undefined,
      gclid: params.get("gclid") || undefined,
      landing_page: window.location.pathname,
      referrer: referrer ? new URL(referrer).hostname : "",
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr));
  } catch {
    /* sessionStorage kapalıysa sessizce geç */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dönüşüm olayı gönderir. GA4 kurulu değilse sessizce hiçbir şey yapmaz. */
export function track(event: ConversionEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const attr = getAttribution();
  const payload = {
    ...params,
    page_path: window.location.pathname,
    lead_source: attr.source || (attr.referrer ? `referral:${attr.referrer}` : "direct"),
    lead_medium: attr.medium || (attr.gclid ? "cpc" : "organic_or_direct"),
    lead_campaign: attr.campaign || "",
    landing_page: attr.landing_page || window.location.pathname,
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  }
}
