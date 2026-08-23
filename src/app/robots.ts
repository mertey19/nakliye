import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/config/site";

/**
 * /robots.txt
 * Üretimde "/" ASLA engellenmez. Sadece Next.js iç dizinleri ve sorgu
 * parametreli yinelenen URL'ler taramadan çıkarılır.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
