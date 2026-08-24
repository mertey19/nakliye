import { business } from "./business";

/**
 * KANONİK SİTE ADRESİ
 * ===================
 * Kanonik strateji: https + non-www + sondaki "/" YOK.
 *
 * Çözümleme sırası:
 *  1. NEXT_PUBLIC_SITE_URL          → asıl kaynak. Alan adı belliyse bu girilir.
 *  2. VERCEL_PROJECT_PRODUCTION_URL → Vercel'in otomatik verdiği üretim adresi.
 *     Env değişkeni unutulursa site en azından KENDİ adresine canonical verir;
 *     yanlış bir alan adına işaret etmez.
 *  3. Yer tutucu                    → yalnızca yerel geliştirme için.
 *
 * NOT: Bu modül SUNUCU tarafında kullanılır (metadata, sitemap, robots, JSON-LD).
 * İstemci bileşenlerinden import EDİLMEZ; aksi halde VERCEL_* değişkeni
 * tarayıcı paketinde `undefined` olur ve sunucu/istemci değerleri ayrışır.
 */

// Gerçek kanonik alan adı. NOT: araç kaplamasında yazan .com adresi
// KAYITLI DEĞİL; canlı site .com.tr üzerinde.
const PLACEHOLDER_SITE_URL = "https://www.kansucannakliye.com.tr";

function resolveSiteUrl(): { url: string; source: "env" | "vercel" | "placeholder" } {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return { url: explicit, source: "env" };

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return { url: `https://${vercelHost}`, source: "vercel" };

  return { url: PLACEHOLDER_SITE_URL, source: "placeholder" };
}

const resolved = resolveSiteUrl();

export const siteUrl = resolved.url.replace(/\/+$/, "");

/** Kanonik adresin nereden geldiği — derleme uyarısı ve teşhis için. */
export const siteUrlSource = resolved.source;

/**
 * Derleme sırasında bir kez uyarır. Amaç: env değişkeni unutulduğunda
 * durumun log'da görünmesi. Derlemeyi KIRMAZ (önizleme dağıtımları çalışsın).
 */
if (typeof window === "undefined" && resolved.source !== "env") {
  const message =
    resolved.source === "vercel"
      ? `[site] NEXT_PUBLIC_SITE_URL tanımlı değil. Kanonik adres Vercel üretim adresine düşürüldü: ${siteUrl}`
      : `[site] NEXT_PUBLIC_SITE_URL tanımlı değil. Kanonik adres YER TUTUCU: ${siteUrl} — sitemap ve canonical etiketleri yanlış alan adına işaret eder.`;
  console.warn(message);
}

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
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || "",
} as const;
