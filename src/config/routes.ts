import { services } from "./services";
import { guides } from "./guides";

export type IndexableRoute = {
  /** Kanonik yol, başında "/", sonunda "/" YOK. */
  path: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /**
   * İçeriğin GERÇEKTEN son değiştiği tarih (ISO, YYYY-MM-DD).
   *
   * ÖNEMLİ: Burada `new Date()` KULLANILMAZ. Her derlemede "bugün" basmak,
   * Google'a "16 sayfam da bugün değişti" demektir; sinyal güvenilirliğini
   * yitirir ve lastmod tamamen yok sayılır.
   *
   * Bir sayfanın içeriğini anlamlı biçimde değiştirdiğinizde buradaki tarihi
   * elle güncelleyin. Yazım hatası düzeltmek için güncellemeye gerek yok.
   */
  lastModified: string;
};

/** Sayfaların içeriğinin son anlamlı değişiklik tarihleri. */
const CONTENT_DATES = {
  /** İlk yayın. */
  initial: "2026-08-23",
  /** Marka adı "Nakliye" -> "Nakliyat" değişimi tüm başlıkları etkiledi. */
  brandRename: "2026-08-24",
  /** Rehber kümesi genişledi; hub ve ana sayfa listesi değişti. */
  guideCluster: "2026-08-27",
  /** İlçe bilgi rehberleri; hub ve hizmet bölgeleri iç link aldı. */
  districtGuides: "2026-08-28",
  /** Ana sayfa title/H1 "nakliye" yazımı + yerel kapsama paragrafı. */
  homeNakliyeQuery: "2026-08-31",
} as const;

/**
 * SITEMAP KAYNAĞI — yalnızca indekslenebilir kanonik sayfalar.
 * API, 404, test, parametreli ve yinelenen URL'ler buraya GİRMEZ.
 */
export const indexableRoutes: IndexableRoute[] = [
  // Ana sayfa: marka adı + tanıtım bölümü + WhatsApp bölümü eklendi.
  {
    path: "/",
    priority: 1.0,
    changeFrequency: "weekly",
    lastModified: CONTENT_DATES.homeNakliyeQuery,
  },

  // Ticari hizmet sayfaları — başlık ve metinler marka adıyla güncellendi.
  ...services.map((s) => ({
    path: `/${s.slug}`,
    priority: s.priority,
    changeFrequency: "monthly" as const,
    lastModified: CONTENT_DATES.brandRename,
  })),

  // Dönüşüm ve kurumsal
  {
    path: "/teklif-al",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: CONTENT_DATES.brandRename,
  },
  {
    path: "/hizmet-bolgeleri",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: CONTENT_DATES.districtGuides,
  },
  {
    path: "/iletisim",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: CONTENT_DATES.brandRename,
  },
  {
    path: "/hakkimizda",
    priority: 0.6,
    changeFrequency: "yearly",
    lastModified: CONTENT_DATES.brandRename,
  },

  // İçerik
  {
    path: "/rehber",
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: CONTENT_DATES.districtGuides,
  },
  // Rehber yazılarının tarihi kendi kaydından gelir; sayfada görünen
  // "Güncelleme" tarihiyle sitemap'teki lastmod böylece hep aynı olur.
  ...guides.map((g) => ({
    path: `/rehber/${g.slug}`,
    priority: 0.5,
    changeFrequency: "yearly" as const,
    lastModified: g.updated,
  })),

  // Yasal
  {
    path: "/gizlilik-politikasi",
    priority: 0.2,
    changeFrequency: "yearly",
    lastModified: CONTENT_DATES.initial,
  },
  {
    path: "/kvkk-aydinlatma-metni",
    priority: 0.2,
    changeFrequency: "yearly",
    lastModified: CONTENT_DATES.initial,
  },
];
