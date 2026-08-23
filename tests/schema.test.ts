import test from "node:test";
import assert from "node:assert/strict";

import {
  breadcrumbSchema,
  faqSchema,
  movingCompanySchema,
  serviceSchema,
  articleSchema,
} from "../src/lib/schema";
import { services } from "../src/config/services";
import { business } from "../src/config/business";
import { hasPhone } from "../src/lib/business";
import { siteUrl } from "../src/config/site";

test("MovingCompany şeması doğrulanmış alanlarla üretilir", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  assert.equal(node["@type"], "MovingCompany");
  assert.equal(node.name, business.name);
  assert.equal(node.url, siteUrl);
  assert.ok(Array.isArray(node.areaServed));
});

test("doğrulanmamış alanlar JSON-LD'ye SIZMAZ", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  // Bu alanlar gerçek veri girilene kadar üretilmemeli.
  assert.equal(node.aggregateRating, undefined, "sahte puan üretilemez");
  assert.equal(node.review, undefined, "sahte yorum üretilemez");
  assert.equal(node.priceRange, undefined, "doğrulanmamış fiyat aralığı üretilemez");
  assert.equal(node.geo, undefined, "uydurma koordinat üretilemez");
  assert.equal(
    node.openingHoursSpecification,
    undefined,
    "uydurma çalışma saati üretilemez",
  );
  // telephone koşullu: config'te numara VARSA yayınlanır, YOKSA hiç üretilmez.
  // Asıl kural "uydurulmaz", "hiç olmaz" değil.
  if (hasPhone) {
    assert.equal(
      node.telephone,
      business.phone,
      "numara girildiğinde JSON-LD config'teki numarayı birebir yayınlamalı",
    );
  } else {
    assert.equal(node.telephone, undefined, "telefon yokken telephone alanı olmamalı");
  }
});

test("adres yalnızca doğrulanmış parçaları içerir", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  const address = node.address as Record<string, unknown>;
  assert.equal(address.addressLocality, business.primaryCity);
  assert.equal(address.addressCountry, "TR");
  assert.equal(
    address.streetAddress,
    undefined,
    "açık adres girilmeden streetAddress üretilmemeli",
  );
});

test("her hizmet için Service şeması sayfa URL'siyle eşleşir", () => {
  for (const s of services) {
    const node = serviceSchema(s) as Record<string, unknown>;
    assert.equal(node["@type"], "Service");
    assert.equal(node.url, `${siteUrl}/${s.slug}`);
    assert.equal(node.serviceType, s.schemaServiceType);
    assert.deepEqual(node.provider, { "@id": `${siteUrl}/#business` });
  }
});

test("breadcrumb şeması sıralı ve mutlak URL'li", () => {
  const node = breadcrumbSchema([
    { name: "Ana Sayfa", path: "/" },
    { name: "Evden Eve Nakliyat", path: "/evden-eve-nakliyat" },
  ]) as Record<string, unknown>;
  const items = node.itemListElement as Record<string, unknown>[];
  assert.equal(items.length, 2);
  assert.equal(items[0].position, 1);
  assert.equal(items[0].item, siteUrl);
  assert.equal(items[1].position, 2);
  assert.equal(items[1].item, `${siteUrl}/evden-eve-nakliyat`);
});

test("FAQ şeması verilen soruların birebir aynısını üretir", () => {
  const items = [
    { question: "Soru 1?", answer: "Cevap 1" },
    { question: "Soru 2?", answer: "Cevap 2" },
  ];
  const node = faqSchema(items) as Record<string, unknown>;
  const entities = node.mainEntity as Record<string, unknown>[];
  assert.equal(entities.length, 2);
  assert.equal(entities[0].name, "Soru 1?");
  assert.deepEqual(entities[1].acceptedAnswer, {
    "@type": "Answer",
    text: "Cevap 2",
  });
});

test("Article şeması kanonik yolu ve tarihleri taşır", () => {
  const node = articleSchema({
    headline: "Test",
    description: "Açıklama",
    path: "/rehber/test",
    datePublished: "2026-08-23",
    dateModified: "2026-08-23",
  }) as Record<string, unknown>;
  assert.equal(node.url, `${siteUrl}/rehber/test`);
  assert.equal(node.inLanguage, "tr");
  assert.equal(node.mainEntityOfPage, `${siteUrl}/rehber/test`);
});

test("JSON-LD serileştirilebilir (undefined/döngü yok)", () => {
  const all = [
    movingCompanySchema(),
    ...services.map(serviceSchema),
    breadcrumbSchema([{ name: "Ana Sayfa", path: "/" }]),
  ];
  for (const node of all) {
    assert.doesNotThrow(() => JSON.stringify(node));
  }
});
