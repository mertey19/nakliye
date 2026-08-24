import test from "node:test";
import assert from "node:assert/strict";

import { business } from "../src/config/business";
import {
  formatTrPhone,
  hasAddress,
  hasCoordinates,
  hasDirections,
  hasGbp,
  hasMapEmbed,
  hasPhone,
  hasReviews,
  hasWhatsApp,
  missingBusinessData,
  whatsappLink,
} from "../src/lib/business";
import { buildQuoteMessage, isValidTrPhone } from "../src/lib/quote";

test("telefon biçimlendirme E.164 -> okunabilir TR formatı", () => {
  assert.equal(formatTrPhone("+905321234567"), "0532 123 45 67");
  assert.equal(formatTrPhone("05321234567"), "0532 123 45 67");
  // Geçersiz uzunlukta girdi olduğu gibi döner (uydurma biçim üretilmez)
  assert.equal(formatTrPhone("123"), "123");
});

test("WhatsApp linki mesajı doğru URL-encode eder", () => {
  const original = business.whatsapp;
  // Test için geçici numara enjekte edilir (config'e yazılmaz).
  (business as { whatsapp: string }).whatsapp = "905321234567";
  const link = whatsappLink("Merhaba Kansu Can Nakliye,\nfiyat almak istiyorum.");
  assert.ok(link.startsWith("https://wa.me/905321234567?text="));
  assert.ok(link.includes("%0A"), "satır sonu %0A olarak kodlanmalı");
  assert.ok(!link.includes(" "), "boşluk kalmamalı");
  assert.equal(
    decodeURIComponent(link.split("?text=")[1]),
    "Merhaba Kansu Can Nakliye,\nfiyat almak istiyorum.",
  );
  (business as { whatsapp: string }).whatsapp = original;
});

test("WhatsApp numarası yoksa link üretilmez", () => {
  if (!hasWhatsApp) {
    assert.equal(whatsappLink("test"), "");
  }
});

test("doğrulanmamış alanlar boş bırakılmış (uydurma veri yok)", () => {
  assert.equal(business.foundedYear, null, "kuruluş yılı uydurulmamalı");
  assert.equal(business.completedJobs, null, "iş sayısı uydurulmamalı");
  assert.equal(business.teamSize, null, "ekip sayısı uydurulmamalı");
  assert.equal(business.hasTransportInsurance, null, "sigorta iddiası uydurulmamalı");
  assert.equal(business.priceRange, "", "fiyat aralığı uydurulmamalı");
  assert.equal(business.coordinates?.lat, 36.7680863);
  assert.equal(business.coordinates?.lng, 34.5484853);
  assert.equal(hasReviews, false, "yorum dizisi boşken yorum gösterilmemeli");
});

test("doğrulanmış Google konumu, harita ve yol tarifi eksiksiz", () => {
  assert.equal(hasAddress, true);
  assert.equal(hasCoordinates, true);
  assert.equal(hasDirections, true);
  assert.equal(hasMapEmbed, true);
  assert.equal(hasGbp, true);
  assert.match(business.googleBusinessProfileUrl, /google\.com\/maps/);
  assert.match(business.googleMapsDirectionsUrl, /\/maps\/dir\//);
  assert.match(business.googleMapsEmbedUrl, /output=embed/);
});

test("eksik iş bilgisi kontrol listesi telefon/adres eksiğini bildirir", () => {
  const missing = missingBusinessData();
  if (!hasPhone) {
    assert.ok(missing.some((m) => m.includes("business.phone")));
  }
  if (!hasAddress) {
    assert.ok(missing.some((m) => m.includes("business.address")));
  }
});

test("hizmet bölgeleri tanımlı ve slug'ları benzersiz", () => {
  assert.ok(business.serviceAreas.length > 0);
  const slugs = business.serviceAreas.map((a) => a.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("TR telefon doğrulaması", () => {
  assert.ok(isValidTrPhone("0532 123 45 67"));
  assert.ok(isValidTrPhone("+90 532 123 45 67"));
  assert.ok(isValidTrPhone("5321234567"));
  assert.ok(!isValidTrPhone("532123456"));
  assert.ok(!isValidTrPhone(""));
  assert.ok(!isValidTrPhone("telefon yok"));
});

test("teklif mesajı boş alanları atlar, dolu alanları yazar", () => {
  const msg = buildQuoteMessage({
    from: "Mersin / Mezitli, 3. kat",
    to: "Ankara / Çankaya",
    type: "Evden eve (ev taşıma)",
    date: "",
    phone: "0532 123 45 67",
    notes: "   ",
  });
  assert.ok(msg.includes("Nereden: Mersin / Mezitli, 3. kat"));
  assert.ok(msg.includes("Nereye: Ankara / Çankaya"));
  assert.ok(msg.includes("Telefon: 0532 123 45 67"));
  assert.ok(!msg.includes("Tahmini tarih"), "boş tarih mesaja eklenmemeli");
  assert.ok(!msg.includes("Ek bilgi"), "boş not mesaja eklenmemeli");

  const withExtras = buildQuoteMessage({
    from: "A",
    to: "B",
    type: "Ofis / işyeri taşıma",
    date: "2026-09-01",
    phone: "05321234567",
    notes: "Asansör yok",
  });
  assert.ok(withExtras.includes("Tahmini tarih: 2026-09-01"));
  assert.ok(withExtras.includes("Ek bilgi: Asansör yok"));
});
