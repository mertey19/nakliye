import test from "node:test";
import assert from "node:assert/strict";

/**
 * Kanonik adres çözümlemesi.
 *
 * Bu dosya kendi süreçinde çalışır (node --test her test dosyasını ayrı
 * süreçte açar), bu yüzden env değişkenlerini import'tan ÖNCE ayarlayıp
 * modülü dinamik import edebiliyoruz.
 */

test("NEXT_PUBLIC_SITE_URL varsa o kullanılır", async () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://ornek-alanadi.com/";
  process.env.VERCEL_PROJECT_PRODUCTION_URL = "nakliye.vercel.app";

  // Specifier değişkende: aynı modülü farklı env ile yeniden yüklemek için
  // sorgu parametresi kullanılır; TS'in statik modül çözümlemesi devre dışı kalır.
  const specifier = "../src/config/site?case=env";
  const { siteUrl, siteUrlSource, absoluteUrl } = await import(specifier);

  assert.equal(siteUrlSource, "env");
  assert.equal(siteUrl, "https://ornek-alanadi.com", "sondaki / temizlenmeli");
  assert.equal(
    absoluteUrl("/evden-eve-nakliyat?utm_source=google"),
    "https://ornek-alanadi.com/evden-eve-nakliyat",
    "UTM kanonike girmemeli",
  );
});

test("env yoksa Vercel üretim adresine düşer (yanlış alan adı yerine kendi adresi)", async () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  process.env.VERCEL_PROJECT_PRODUCTION_URL = "nakliye.vercel.app";

  const specifier = "../src/config/site?case=vercel";
  const { siteUrl, siteUrlSource } = await import(specifier);

  assert.equal(siteUrlSource, "vercel");
  assert.equal(siteUrl, "https://nakliye.vercel.app");
});

test("hiçbiri yoksa yer tutucuya düşer ve kaynağı 'placeholder' olarak işaretler", async () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.VERCEL_PROJECT_PRODUCTION_URL;

  const specifier = "../src/config/site?case=placeholder";
  const { siteUrl, siteUrlSource } = await import(specifier);

  assert.equal(
    siteUrlSource,
    "placeholder",
    "yer tutucu kullanıldığında bu durum işaretlenmeli ki derleme log'unda uyarı çıksın",
  );
  assert.ok(siteUrl.startsWith("https://"));
  assert.ok(!siteUrl.endsWith("/"));
});
