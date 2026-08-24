# SEO Değişiklik Günlüğü

En yeni üstte. Her madde: **ne değişti · neden · SEO etkisi**.

---

## 2026-08-24 — Teknik SEO denetimi ve düzeltmeler

Canlı siteye (`https://www.kansucannakliye.com.tr`) karşı yapılan tam denetim
sonrası. Ayrıntılı bulgular: `SEO_AUDIT.md`.

### P0

| Dosya | Değişiklik | Neden | SEO etkisi |
| --- | --- | --- | --- |
| `src/config/routes.ts`, `src/app/sitemap.ts` | `lastmod` artık gerçek içerik tarihinden geliyor; `new Date()` kaldırıldı | 16 URL'nin hepsi aynı build timestamp'ini taşıyordu | Google, "her sayfa her gün değişiyor" diyen sitemap'in `lastmod` sinyalini tamamen yok sayar. Artık tarih güvenilir; tarama önceliği doğru çalışır |
| `src/config/site.ts` | Yedek alan adı `kansucannakliye.com` → `www.kansucannakliye.com.tr` | Yedek değer **kayıtlı olmayan** bir alan adını gösteriyordu | `NEXT_PUBLIC_SITE_URL` bir gün silinirse tüm canonical'lar ve sitemap ölü bir alan adına işaret edecekti |

### P1

| Dosya | Değişiklik | Neden | SEO etkisi |
| --- | --- | --- | --- |
| `src/lib/schema.ts` | Adres eşlemesi düzeltildi: `addressLocality` = **ilçe**, `addressRegion` = **il** | Ters yazılmıştı (locality=Mersin, region=Yenişehir) | Google işletmeyi yanlış idari birimle eşleştiriyordu. Yerel eşleşme doğruluğu için kritik |
| `src/lib/schema.ts` | `logo` ve `image` eklendi (gerçek dosyalar) | İşletme şemasında görsel sinyal yoktu | Google'ın işletmeyi tanıması ve GBP kaydıyla eşleştirmesi kolaylaşır |
| `src/lib/schema.ts`, `src/app/layout.tsx` | `WebSite` düğümü eklendi, `publisher` ile işletmeye bağlandı | Site ↔ işletme ilişkisi bildirilmiyordu | Varlık (entity) anlaşılırlığı. Çelişen ikinci işletme entity'si üretilmedi; site içi arama olmadığı için `SearchAction` eklenmedi |
| `next.config.ts` | `/index.html` → `/` yönlendirmesi kaldırıldı | Böyle bir URL hiç var olmadı; eski site varsayımıydı | Gereksiz yönlendirme kuralı temizlendi. `/hizmetler` korundu (yaygın tahmin-URL'i) |
| `src/config/photos.ts` | Görsel `alt` metinlerindeki marka adı NAP ile hizalandı | "Kansu Can Nakliye" yazıyordu, işletme adı "Nakliyat" | NAP tutarlılığı; görsel arama sinyali |

### P2

| Dosya | Değişiklik | Neden | SEO etkisi |
| --- | --- | --- | --- |
| `src/app/rehber/asansorsuz-ev-nasil-tasinir/` | Yeni rehber sayfası | "Asansörsüz ev taşıma" arama amacının birincil sayfası yoktu; yalnızca SSS cevabıydı | Yeni arama amacı kapsandı. Rakiplerin "asansörlü taşıma" vurgusuna karşı doğal konumlanma. `/evden-eve-nakliyat` ve `/hizmet-bolgeleri`'nden iç link |
| `src/app/evden-eve-nakliyat/page.tsx`, `src/app/hizmet-bolgeleri/page.tsx` | Yeni rehbere iç link | İç link mimarisi | Yeni sayfanın taranması ve bağlam kazanması |

### Testler (regresyon koruması)

| Test | Neyi kilitliyor |
| --- | --- |
| `seo.test.ts` → sitemap lastmod | Tüm sayfaların "bugün" damgalanmasını yakalar |
| `seo.test.ts` → rehber tarihi | Sitemap tarihi ile sayfada görünen tarihin aynı kalmasını |
| `schema.test.ts` → adres | İl/ilçe alanlarının ters yazılmasını |
| `schema.test.ts` → logo/image | Görsellerin mutlak URL olmasını |
| `schema.test.ts` → WebSite | İkinci bir işletme entity'si üretilmemesini |

**Doğrulama:** typecheck ✓ · lint ✓ · 58 test ✓ · build 24/24 ✓ ·
`seo:audit` 17 sayfa 0 sorun ✓

---

## 2026-08-24 — Site ikonu

`icon.tsx` yer tutucusu kaldırıldı; `icon.svg` (KC monogramı) ve
`apple-icon.tsx` (180×180) eklendi. Gerçek boyutlarda (16–180 px) test edilip
harf aralığı ve kenar boşluğu düzeltildi.
**SEO etkisi:** Google arama sonuçlarında ve sekmede marka tanınırlığı.

---

## 2026-08-24 — Tanıtım görselleri

Üç pazarlama grafiği eklendi ama **"İşlerimizden" galerisine konmadı**;
"Tanıtım Görsellerimiz" başlığı altında ayrı bölümde yayınlanıyor.
Beş araçlık filo görseli, sahip olunan araç sayısını yanlış ima ettiği için
eklenmedi.
**SEO etkisi:** Görsel içerik arttı; yanıltıcı iddia üretilmedi (E-E-A-T).

---

## 2026-08-24 — Header'a Instagram

Tek renk Instagram bağlantısı eklendi, `sameAs` ile yapısal veriye bağlandı.
1024 px'te header taşması ve 768–1023 px'te çift ikon sorunu düzeltildi.
**SEO etkisi:** Sosyal varlık sinyali.

---

## 2026-08-24 — Marka adı GBP ile hizalandı

`business.name`: "Kansu Can Nakliye" → **"Kansu Can Nakliyat"**.
Araç/Instagram/alan adı "Nakliye" yazımını kullandığı için
`alternateName: "Kansu Can Nakliye"` yapısal veriye eklendi.
**SEO etkisi:** NAP tutarlılığı (yerel SEO'nun en kritik sinyali). İki yazımın
tek işletme olarak eşleşmesi; "kansu can nakliye" marka aramasında da çıkma.

---

## 2026-08-24 — İletişim ve görseller

Telefon, WhatsApp, e-posta, Instagram girildi; gerçek araç ve ekip fotoğrafı
eklendi. Görsel ölçüleri dosya başlığından okunuyor (CLS = 0).
**SEO etkisi:** Dönüşüm kanalları açıldı; gerçek fotoğraf E-E-A-T sinyali.

---

## 2026-08-24 — Vercel dağıtımı ve kanonik güvenlik

`vercel.json` ile framework sabitlendi. `NEXT_PUBLIC_SITE_URL` yoksa
`VERCEL_PROJECT_PRODUCTION_URL`e düşen güvenli zincir kuruldu; yer tutucu
kullanıldığında derleme loguna uyarı basılıyor.
**SEO etkisi:** Env unutulduğunda sitemap/canonical'ın yanlış alan adına
işaret etmesi (sessiz SEO hatası) engellendi.

---

## 2026-08-23 — İlk yayın

Next.js 16 App Router, 22 rota, tamamı statik. Arama amacı haritası, kanonik
strateji (https + www + trailing slash yok), robots, sitemap, MovingCompany +
Service + FAQPage + BreadcrumbList + Article yapısal verisi, GA4 dönüşüm
olayları, 3 rehber içeriği, KVKK/gizlilik sayfaları.

**Baştan uygulanan kurallar:** doğrulanmamış bilgi uydurulmaz; ilçe/rota
sayfaları programatik üretilmez; sahte yorum/puan/fiyat yayınlanmaz.
