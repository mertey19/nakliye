import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { readImageSize } from "../src/lib/image-size";
import { photos, promoPhotos, heroPhoto } from "../src/config/photos";
import {
  availablePhotos,
  availablePromoPhotos,
  availableHeroPhoto,
  missingPhotoFiles,
} from "../src/lib/photos.server";

const publicDir = path.join(process.cwd(), "public");

test("listedeki her görselin src'si /images/ altında ve uzantısı geçerli", () => {
  const all = [...photos, ...promoPhotos, ...(heroPhoto ? [heroPhoto] : [])];
  assert.ok(all.length > 0, "en az bir görsel tanımlı olmalı");
  for (const p of all) {
    assert.ok(p.src.startsWith("/images/"), `beklenmeyen yol: ${p.src}`);
    assert.match(p.src, /\.(webp|png|jpe?g)$/i, `desteklenmeyen format: ${p.src}`);
    assert.ok(p.alt.trim().length > 10, `alt metni çok kısa: ${p.src}`);
    // alt metninde anahtar kelime doldurma olmamalı
    assert.ok(
      !/nakliyat.*nakliye.*nakliyat/i.test(p.alt),
      `alt metninde anahtar kelime doldurma: ${p.src}`,
    );
  }
});

test("dosyası olan görsellerin ölçüsü başlıktan okunabiliyor", () => {
  for (const p of [...availablePhotos, ...availablePromoPhotos]) {
    assert.ok(p.width > 0 && p.height > 0, `ölçü okunamadı: ${p.src}`);
  }
  if (availableHeroPhoto) {
    assert.ok(availableHeroPhoto.width > 0 && availableHeroPhoto.height > 0);
  }
});

test("okunan ölçü, dosyanın gerçek ölçüsüyle tutarlı (CLS güvencesi)", () => {
  for (const p of [...availablePhotos, ...availablePromoPhotos]) {
    const buf = fs.readFileSync(path.join(publicDir, p.src.replace(/^\/+/, "")));
    const size = readImageSize(buf);
    assert.deepEqual(
      { width: p.width, height: p.height },
      size,
      `${p.src} için okunan ölçü tutarsız`,
    );
  }
});

test("dosyası olmayan görsel yayınlanmaz (kırık görsel yasağı)", () => {
  for (const src of missingPhotoFiles) {
    assert.ok(
      !availablePhotos.some((p) => p.src === src),
      `${src} dosyası yok ama yayınlanıyor`,
    );
    assert.notEqual(availableHeroPhoto?.src, src);
  }
});

test("readImageSize bozuk/desteklenmeyen veriye null döner", () => {
  assert.equal(readImageSize(Buffer.alloc(0)), null);
  assert.equal(readImageSize(Buffer.from("bu bir görsel değil")), null);
  assert.equal(readImageSize(Buffer.alloc(64)), null);
});

test("readImageSize PNG başlığını doğru çözer", () => {
  // 1x1 saydam PNG
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
  );
  assert.deepEqual(readImageSize(png), { width: 1, height: 1 });
});

test("yayınlanan görseller mobil için makul boyutta (<400 KB)", () => {
  for (const p of [...availablePhotos, ...availablePromoPhotos]) {
    const bytes = fs.statSync(
      path.join(publicDir, p.src.replace(/^\/+/, "")),
    ).size;
    assert.ok(
      bytes < 400 * 1024,
      `${p.src} çok büyük: ${Math.round(bytes / 1024)} KB — sıkıştırın`,
    );
  }
});

test("tanıtım görselleri 'İşlerimizden' galerisine karışmıyor", () => {
  // Tanıtım grafikleri tamamlanmış iş fotoğrafı değildir; iki liste ayrı kalmalı
  // ki ziyaretçiye gerçek iş gibi sunulmasınlar.
  const galleryPaths = new Set(photos.map((p) => p.src));
  for (const p of promoPhotos) {
    assert.ok(
      !galleryPaths.has(p.src),
      `${p.src} hem tanıtım hem "İşlerimizden" listesinde`,
    );
  }
});

test("tanıtım görsellerinin alt metni bunların tanıtım grafiği olduğunu söyler", () => {
  for (const p of promoPhotos) {
    assert.match(
      p.alt,
      /tanıtım görseli/i,
      `${p.src} alt metni görselin tanıtım grafiği olduğunu belirtmiyor`,
    );
  }
});
