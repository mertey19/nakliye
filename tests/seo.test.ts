import test from "node:test";
import assert from "node:assert/strict";

import { services } from "../src/config/services";
import { guides } from "../src/config/guides";
import { indexableRoutes } from "../src/config/routes";
import { absoluteUrl, siteUrl } from "../src/config/site";
import { business } from "../src/config/business";

test("kanonik URL üretimi: sorgu ve fragment kanonike girmez", () => {
  assert.equal(absoluteUrl("/"), siteUrl);
  assert.equal(absoluteUrl("/evden-eve-nakliyat"), `${siteUrl}/evden-eve-nakliyat`);
  assert.equal(
    absoluteUrl("/evden-eve-nakliyat?utm_source=google&gclid=abc"),
    `${siteUrl}/evden-eve-nakliyat`,
    "UTM/gclid kanonik URL'ye girmemeli",
  );
  assert.equal(absoluteUrl("/iletisim#harita"), `${siteUrl}/iletisim`);
  assert.equal(
    absoluteUrl("/rehber/"),
    `${siteUrl}/rehber`,
    "sondaki eğik çizgi kanonikte olmamalı",
  );
});

test("site URL'si sonunda eğik çizgi taşımaz", () => {
  assert.ok(!siteUrl.endsWith("/"));
  assert.ok(siteUrl.startsWith("https://"));
});

test("hizmet slug'ları benzersiz", () => {
  const slugs = services.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("başlık etiketleri benzersiz (yinelenen metadata yok)", () => {
  const titles = [...services.map((s) => s.title), ...guides.map((g) => g.title)];
  const duplicates = titles.filter((t, i) => titles.indexOf(t) !== i);
  assert.deepEqual(duplicates, [], `yinelenen başlık: ${duplicates.join(" | ")}`);
});

test("meta açıklamaları benzersiz ve makul uzunlukta", () => {
  const descriptions = [
    ...services.map((s) => s.description),
    ...guides.map((g) => g.description),
  ];
  const duplicates = descriptions.filter((d, i) => descriptions.indexOf(d) !== i);
  assert.deepEqual(duplicates, []);
  for (const d of descriptions) {
    assert.ok(d.length >= 80, `çok kısa meta açıklama: ${d}`);
    assert.ok(d.length <= 250, `çok uzun meta açıklama: ${d}`);
  }
});

test("rehber başlıkları SERP'te kesilmeyecek uzunlukta", () => {
  for (const g of guides) {
    assert.ok(
      g.title.length <= 65,
      `${g.slug} başlığı çok uzun (${g.title.length}): ${g.title}`,
    );
    assert.ok(g.title.endsWith(`| ${business.name}`));
  }
});

test("hizmet başlıkları şehir + hizmet + marka kalıbına uyar, spam içermez", () => {
  for (const s of services) {
    assert.ok(
      s.title.includes(business.primaryCity),
      `${s.slug} başlığında şehir yok`,
    );
    assert.ok(
      s.title.endsWith(`| ${business.name}`),
      `${s.slug} başlığı marka ile bitmiyor`,
    );
    // Başlıkta 2'den fazla dikey çizgi = anahtar kelime doldurma işareti
    assert.ok(
      s.title.split("|").length <= 2,
      `${s.slug} başlığı anahtar kelime doldurma gibi görünüyor`,
    );
    assert.ok(s.title.length <= 65, `${s.slug} başlığı çok uzun: ${s.title.length}`);
  }
});

test("anahtar kelime yamyamlaşması yok: aynı H1 iki sayfada kullanılmaz", () => {
  const h1s = services.map((s) => s.h1);
  assert.equal(new Set(h1s).size, h1s.length);
  // Ana sayfa H1'i hizmet sayfalarının hiçbiriyle aynı olmamalı.
  const homeH1 = `${business.primaryCity} Nakliyat ve Evden Eve Taşıma`;
  assert.ok(
    !h1s.includes(homeH1),
    "ana sayfa H1'i bir hizmet sayfasıyla aynı olmamalı",
  );
});

test("sitemap yolları kanonik biçimde ve benzersiz", () => {
  const paths = indexableRoutes.map((r) => r.path);
  assert.equal(new Set(paths).size, paths.length, "sitemap'te yinelenen URL var");
  for (const p of paths) {
    assert.ok(p.startsWith("/"), `yol / ile başlamalı: ${p}`);
    assert.ok(!p.includes("?"), `parametreli URL sitemap'e girmemeli: ${p}`);
    assert.ok(!p.includes("#"), `fragment sitemap'e girmemeli: ${p}`);
    assert.ok(p === "/" || !p.endsWith("/"), `sondaki eğik çizgi olmamalı: ${p}`);
    assert.ok(!p.startsWith("/api"), `API yolu sitemap'e girmemeli: ${p}`);
  }
});

test("her hizmet ve rehber sayfası sitemap'te (orphan sayfa yok)", () => {
  const paths = new Set(indexableRoutes.map((r) => r.path));
  for (const s of services) {
    assert.ok(paths.has(`/${s.slug}`), `${s.slug} sitemap'te yok`);
  }
  for (const g of guides) {
    assert.ok(paths.has(`/rehber/${g.slug}`), `${g.slug} sitemap'te yok`);
  }
  assert.ok(paths.has("/"), "ana sayfa sitemap'te yok");
  assert.ok(paths.has("/teklif-al"), "teklif sayfası sitemap'te yok");
});

test("sitemap öncelikleri geçerli aralıkta ve ana sayfa en yüksek", () => {
  for (const r of indexableRoutes) {
    assert.ok(r.priority > 0 && r.priority <= 1, `geçersiz priority: ${r.path}`);
  }
  const home = indexableRoutes.find((r) => r.path === "/");
  assert.equal(home?.priority, 1.0);
});

test("her hizmetin WhatsApp mesajı bağlama özel ve marka adını içerir", () => {
  const messages = services.map((s) => s.whatsappMessage);
  assert.equal(new Set(messages).size, messages.length, "mesajlar benzersiz olmalı");
  for (const m of messages) {
    assert.ok(m.includes(business.name));
  }
});

test("hizmet özetleri ve kapsam maddeleri boş değil", () => {
  for (const s of services) {
    assert.ok(s.summary.length > 30, `${s.slug} özeti çok kısa`);
    assert.ok(s.highlights.length >= 3, `${s.slug} için yeterli kapsam maddesi yok`);
  }
});

test("sitemap lastmod GERÇEK içerik tarihi — derleme tarihi değil", () => {
  const today = new Date().toISOString().slice(0, 10);
  const dates = indexableRoutes.map((r) => r.lastModified);

  for (const d of dates) {
    assert.match(d, /^\d{4}-\d{2}-\d{2}$/, `geçersiz tarih biçimi: ${d}`);
    assert.ok(
      !Number.isNaN(Date.parse(d)),
      `ayrıştırılamayan tarih: ${d}`,
    );
    assert.ok(d <= today, `gelecek tarihli lastmod: ${d}`);
  }

  // Asıl koruma: her sayfa "bugün" damgalanmışsa tarih derlemeden geliyordur.
  // Google böyle bir sitemap'in lastmod sinyalini tamamen yok sayar.
  const allToday = dates.every((d) => d === today);
  assert.ok(
    !allToday,
    "tüm sayfalar bugünün tarihini taşıyor — lastmod derleme tarihinden üretiliyor olabilir",
  );
});

test("rehber slug'ları benzersiz ve relatedSlugs çözülür", () => {
  const slugs = guides.map((g) => g.slug);
  assert.equal(new Set(slugs).size, slugs.length, "yinelenen rehber slug'ı");
  for (const g of guides) {
    assert.ok(g.relatedSlugs.length >= 1, `${g.slug} relatedSlugs boş`);
    for (const rel of g.relatedSlugs) {
      assert.notEqual(rel, g.slug, `${g.slug} kendini related olarak gösteriyor`);
      assert.ok(
        slugs.includes(rel),
        `${g.slug} → ${rel} mevcut bir rehber değil`,
      );
    }
  }
});

test("rehber H1'leri ticari şehir+hizmet sorgularını kopyalamaz", () => {
  const forbidden = [
    `${business.primaryCity} Nakliyat`,
    `${business.primaryCity} Nakliye`,
    `${business.primaryCity} Evden Eve Nakliyat`,
    `${business.primaryCity} Şehirler Arası Nakliyat`,
    `${business.primaryCity} Ofis Taşıma`,
    `${business.primaryCity} Parça Eşya`,
    `${business.primaryCity} Eşya Paketleme`,
  ];
  for (const g of guides) {
    for (const phrase of forbidden) {
      assert.ok(
        !g.h1.includes(phrase),
        `${g.slug} H1 ticari sorguyu kopyalıyor: "${g.h1}"`,
      );
    }
  }
});

test("rehber sayfalarının sitemap tarihi, sayfada görünen güncelleme tarihiyle aynı", () => {
  for (const g of guides) {
    const route = indexableRoutes.find((r) => r.path === `/rehber/${g.slug}`);
    assert.equal(
      route?.lastModified,
      g.updated,
      `${g.slug}: sitemap tarihi sayfadaki tarihten farklı`,
    );
  }
});
