import { business } from "./business";

/**
 * Kanonik site adresi. .env.local içindeki NEXT_PUBLIC_SITE_URL ile ezilir.
 * Kanonik strateji: https + non-www + sondaki "/" YOK.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://kansucannakliye.com";

export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

/** Kanonik mutlak URL üretir. Sorgu parametreleri kanonike ASLA girmez. */
export function absoluteUrl(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return siteUrl;
  return `${siteUrl}/${clean.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

export const site = {
  locale: "tr_TR",
  lang: "tr",
  /** Marka adı — başlık şablonunun sağ tarafı. */
  brand: business.name,
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || "",
} as const;
