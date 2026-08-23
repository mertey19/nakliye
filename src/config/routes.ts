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
};

/**
 * SITEMAP KAYNAĞI — yalnızca indekslenebilir kanonik sayfalar.
 * API, 404, test, parametreli ve yinelenen URL'ler buraya GİRMEZ.
 */
export const indexableRoutes: IndexableRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Ticari hizmet sayfaları
  ...services.map((s) => ({
    path: `/${s.slug}`,
    priority: s.priority,
    changeFrequency: "monthly" as const,
  })),

  // Dönüşüm ve kurumsal
  { path: "/teklif-al", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hizmet-bolgeleri", priority: 0.7, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hakkimizda", priority: 0.6, changeFrequency: "yearly" },

  // İçerik
  { path: "/rehber", priority: 0.5, changeFrequency: "monthly" },
  ...guides.map((g) => ({
    path: `/rehber/${g.slug}`,
    priority: 0.5,
    changeFrequency: "yearly" as const,
  })),

  // Yasal
  { path: "/gizlilik-politikasi", priority: 0.2, changeFrequency: "yearly" },
  { path: "/kvkk-aydinlatma-metni", priority: 0.2, changeFrequency: "yearly" },
];
