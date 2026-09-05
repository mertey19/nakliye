import test from "node:test";
import assert from "node:assert/strict";

import {
  breadcrumbSchema,
  faqSchema,
  movingCompanySchema,
  serviceSchema,
  articleSchema,
  webSiteSchema,
  locationServiceSchema,
} from "../src/lib/schema";
import { services } from "../src/config/services";
import { business } from "../src/config/business";
import { locations } from "../src/config/locations";
import { hasAddress, hasPhone } from "../src/lib/business";
import { siteUrl } from "../src/config/site";

test("MovingCompany şeması doğrulanmış alanlarla üretilir", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  assert.equal(node["@type"], "MovingCompany");
  assert.equal(node.name, business.name);
  assert.equal(node.url, siteUrl);
  assert.ok(Array.isArray(node.areaServed));
  const served = (node.areaServed as { name: string }[]).map((a) => a.name);
  for (const name of ["Mersin", "Mezitli, Mersin", "Yenişehir, Mersin", "Erdemli, Mersin", "Silifke, Mersin", "Tarsus, Mersin"]) {
    assert.ok(served.includes(name), `areaServed eksik: ${name}`);
  }
});

test("konum sayfaları Service şeması kanonik URL taşır", () => {
  for (const location of locations) {
    const node = locationServiceSchema(location) as Record<string, unknown>;
    assert.equal(node["@type"], "Service");
    assert.equal(node.url, `${siteUrl}/${location.slug}`);
    assert.deepEqual(node.provider, { "@id": `${siteUrl}/#business` });
  }
});

test("doğrulanmamış alanlar JSON-LD'ye SIZMAZ", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  // Bu alanlar gerçek veri girilene kadar üretilmemeli.
  assert.equal(node.aggregateRating, undefined, "sahte puan üretilemez");
  assert.equal(node.review, undefined, "sahte yorum üretilemez");
  assert.equal(node.priceRange, undefined, "doğrulanmamış fiyat aralığı üretilemez");
  assert.deepEqual(node.geo, {
    "@type": "GeoCoordinates",
    latitude: 36.7680863,
    longitude: 34.5484853,
  });
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

test("adres doğrulanmış parçaları birebir ve doğru alanlarda içerir", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  const address = node.address as Record<string, unknown>;
  assert.equal(address.addressCountry, "TR");

  if (hasAddress) {
    // TÜRKİYE EŞLEMESİ: addressLocality = İLÇE, addressRegion = İL.
    // Ters yazılırsa Google işletmeyi yanlış idari birimle eşleştirir.
    assert.equal(address.streetAddress, business.address.street);
    assert.equal(address.addressLocality, business.address.district);
    assert.equal(address.addressRegion, business.address.city);
    assert.equal(address.postalCode, business.address.postalCode);
    assert.notEqual(
      address.addressLocality,
      address.addressRegion,
      "ilçe ile il aynı değere ayarlanmış",
    );
  } else {
    // Sokak/ilçe doğrulanmadıysa yalnızca il yayınlanır, uydurma alan olmaz.
    assert.equal(address.addressLocality, business.primaryCity);
    assert.equal(address.streetAddress, undefined);
    assert.equal(address.postalCode, undefined);
  }
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

test("işletme şeması logo ve gerçek görsel taşır", () => {
  const node = movingCompanySchema() as Record<string, unknown>;
  assert.ok(
    typeof node.logo === "string" && node.logo.startsWith(siteUrl),
    "logo mutlak URL olmalı",
  );
  const images = node.image as string[];
  assert.ok(Array.isArray(images) && images.length > 0, "en az bir görsel olmalı");
  for (const img of images) {
    assert.ok(img.startsWith(siteUrl), `görsel mutlak URL değil: ${img}`);
    assert.ok(img.includes("/images/"), `beklenmeyen görsel yolu: ${img}`);
  }
});

test("WebSite düğümü işletmeyle çelişmez, ona bağlanır", () => {
  const site = webSiteSchema() as Record<string, unknown>;
  assert.equal(site["@type"], "WebSite");
  assert.equal(site.url, siteUrl);
  assert.deepEqual(site.publisher, { "@id": `${siteUrl}/#business` });
  // Aynı @id iki farklı entity'ye verilmemeli
  assert.notEqual(site["@id"], `${siteUrl}/#business`);
  // Olmayan site içi arama bildirilmemeli
  assert.equal(site.potentialAction, undefined);
});
