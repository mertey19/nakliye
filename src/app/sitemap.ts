import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/config/routes";
import { absoluteUrl } from "@/config/site";

/** /sitemap.xml — sadece kanonik, indekslenebilir sayfalar. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
