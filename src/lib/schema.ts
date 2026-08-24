import { business } from "@/config/business";
import { reviews } from "@/config/reviews";
import { siteUrl, absoluteUrl } from "@/config/site";
import type { ServiceDef } from "@/config/services";
import {
  hasAddress,
  hasCoordinates,
  hasOpeningHours,
  hasPhone,
  socialLinks,
} from "./business";

/**
 * JSON-LD üretimi — SADECE doğrulanmış alanlar.
 * aggregateRating, review, priceRange, geo, openingHours gibi alanlar
 * gerçek veri yoksa hiç üretilmez (uydurulmaz).
 */

type Json = Record<string, unknown>;

export const ORGANIZATION_ID = `${siteUrl}/#business`;

export function movingCompanySchema(): Json {
  const node: Json = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": ORGANIZATION_ID,
    name: business.name,
    url: siteUrl,
    // Şehir doğrulanmış bilgi; sokak/ilçe doğrulanana kadar sadece il yayınlanır.
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.city,
      addressCountry: business.address.countryCode,
      ...(hasAddress
        ? {
            streetAddress: business.address.street,
            addressRegion: business.address.district,
            ...(business.address.postalCode
              ? { postalCode: business.address.postalCode }
              : {}),
          }
        : {}),
    },
    areaServed: [
      { "@type": "City", name: business.primaryCity },
      ...business.serviceAreas.map((a) => ({
        "@type": "AdministrativeArea",
        name: `${a.name}, ${business.primaryCity}`,
      })),
    ],
    knowsLanguage: "tr",
  };

  // Aynı işletmenin ikinci yazımı — Google iki adı tek varlıkta birleştirsin.
  if (business.alternateName) node.alternateName = business.alternateName;
  if (business.legalName) node.legalName = business.legalName;
  if (hasPhone) node.telephone = business.phone;
  if (business.email) node.email = business.email;
  if (hasCoordinates && business.coordinates) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    };
  }
  if (hasOpeningHours) {
    node.openingHoursSpecification = business.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (business.foundedYear) node.foundingDate = String(business.foundedYear);
  if (business.priceRange) node.priceRange = business.priceRange;
  if (socialLinks.length > 0) node.sameAs = socialLinks.map((s) => s.url);

  // aggregateRating / review: sadece GERÇEK yorum varsa.
  const rated = reviews.filter((r) => typeof r.rating === "number");
  if (rated.length > 0) {
    const sum = rated.reduce((acc, r) => acc + (r.rating as number), 0);
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (sum / rated.length).toFixed(1),
      reviewCount: rated.length,
    };
  }
  if (reviews.length > 0) {
    node.review = reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
      ...(typeof r.rating === "number"
        ? {
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
          }
        : {}),
    }));
  }

  return node;
}

export function serviceSchema(service: ServiceDef): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${business.primaryCity} ${service.schemaServiceType}`,
    serviceType: service.schemaServiceType,
    description: service.description,
    url: absoluteUrl(`/${service.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: business.primaryCity },
      ...business.serviceAreas.map((a) => ({
        "@type": "AdministrativeArea",
        name: `${a.name}, ${business.primaryCity}`,
      })),
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/** FAQ şeması SADECE aynı sayfada görünen SSS içeriği için üretilir. */
export function faqSchema(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: "tr",
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
