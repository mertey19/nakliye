import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/config/routes";
import { absoluteUrl } from "@/config/site";

/**
 * /sitemap.xml — sadece kanonik, indekslenebilir sayfalar.
 *
 * `lastModified` config'ten GERÇEK içerik tarihini alır; derleme tarihi
 * kullanılmaz. Her build'de "bugün" basmak Google'ın lastmod sinyaline olan
 * güvenini yok eder.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${route.lastModified}T00:00:00Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
