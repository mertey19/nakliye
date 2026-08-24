import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * ARAMA MOTORU DOĞRULAMA DOSYALARI
 * ================================
 * Google Search Console, doğrulama dosyasını periyodik olarak YENİDEN kontrol
 * eder. Dosya silinirse doğrulama düşer ve mülkün tüm verisine erişim kapanır.
 *
 * Bu test, dosyanın kazara silinmesini veya bozulmasını derleme öncesinde
 * yakalar. Yeni bir doğrulama dosyası eklendiğinde ek düzenleme gerekmez;
 * public/ kökündeki tüm google*.html dosyaları otomatik denetlenir.
 */

const publicDir = path.join(process.cwd(), "public");

function verificationFiles(): string[] {
  return fs
    .readdirSync(publicDir)
    .filter((f) => /^google[a-f0-9]+\.html$/i.test(f));
}

test("Google Search Console doğrulama dosyası public/ kökünde duruyor", () => {
  const files = verificationFiles();
  assert.ok(
    files.length > 0,
    "public/ altında google<token>.html bulunamadı — doğrulama dosyası silinmiş olabilir",
  );
});

test("doğrulama dosyasının içeriği kendi adıyla tutarlı", () => {
  for (const file of verificationFiles()) {
    const content = fs
      .readFileSync(path.join(publicDir, file), "utf8")
      .trim();
    assert.equal(
      content,
      `google-site-verification: ${file}`,
      `${file} içeriği Google'ın beklediği biçimde değil`,
    );
  }
});

test("doğrulama dosyası site kökünden servis edilecek konumda", () => {
  for (const file of verificationFiles()) {
    // public/ kökünde olmalı; alt klasöre taşınırsa Google bulamaz.
    assert.ok(
      fs.existsSync(path.join(publicDir, file)),
      `${file} public/ kökünde değil`,
    );
    assert.ok(
      !fs.existsSync(path.join(publicDir, "images", file)),
      `${file} yanlışlıkla images/ altına taşınmış`,
    );
  }
});
