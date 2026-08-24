# SEO Denetimi — Kansu Can Nakliyat

**Denetim tarihi:** 24 Ağustos 2026
**Canlı adres:** https://www.kansucannakliye.com.tr
**Yöntem:** Canlı siteye HTTP isteği (`npm run seo:audit`) + kaynak kod incelemesi

---

## 1. Mevcut mimari (tespit)

| Alan | Durum |
| --- | --- |
| Framework | Next.js 16.3 (App Router) |
| Rendering | Tamamı statik üretim (24 rota, SSR/ISR yok) |
| Metadata | Next `Metadata` API, sayfa başına `export const metadata` |
| Sitemap | `src/app/sitemap.ts` → `src/config/routes.ts` |
| robots.txt | `src/app/robots.ts` |
| Canonical | Sayfa başına `alternates.canonical`, `absoluteUrl()` üzerinden |
| JSON-LD | `src/lib/schema.ts` → `JsonLd` bileşeni (sunucuda üretilir) |
| Analytics | GA4 (env'e bağlı) + Vercel Web Analytics |
| Search Console | HTML dosya doğrulaması, `public/googlef1d5a46ab1e079ef.html` |
| Görsel | `next/image`, WebP, ölçü dosya başlığından okunuyor |
| Font | `next/font/google` Inter, self-hosted, `display: swap` |
| Redirect | `next.config.ts` → `redirects()` |
| www / non-www | www kanonik; 4 varyantın hepsi doğru yönleniyor |
| HTTP / HTTPS | http → https 301, karışık içerik yok |

---

## 2. Alan adı davranışı (ölçüldü)

| Giriş | Sonuç | Adım |
| --- | --- | --- |
| `http://kansucannakliye.com.tr` | `https://www.kansucannakliye.com.tr/` | 2 |
| `https://kansucannakliye.com.tr` | `https://www.kansucannakliye.com.tr/` | 1 |
| `http://www.kansucannakliye.com.tr` | `https://www.kansucannakliye.com.tr/` | 1 |
| `https://www.kansucannakliye.com.tr` | 200 (kanonik) | 0 |

Sonuç: **doğru.** Yönlendirme zinciri yok, kanonik host tek.

> ⚠️ **KRİTİK BULGU:** Araç kaplamasında ve tanıtım görsellerinde
> `www.kansucannakliye.com` yazıyor. Bu alan adı **kayıtlı değil** —
> DNS çözümlenmiyor. Aracı görüp adresi elle yazan her müşteri hiçbir yere
> ulaşamıyor. Bkz. "Sahip için manuel işler".

---

## 3. Denetim matrisi (canlı, 24 Ağustos 2026)

Tüm sayfalar: HTTP 200 · tek H1 · benzersiz title · benzersiz description ·
kanonik doğru · `index, follow` · JSON-LD geçerli · teklif + telefon + WhatsApp
CTA'sı mevcut · 16 iç link.

| URL | Arama amacı | Title (kar.) | Kelime | Schema | Sorun |
| --- | --- | --- | --- | --- | --- |
| `/` | mersin nakliyat (geniş) | 56 | 1265 | FAQPage, MovingCompany, WebSite | — |
| `/evden-eve-nakliyat` | mersin evden eve nakliyat | 46 | 912 | Service, Breadcrumb, FAQ | — |
| `/sehirler-arasi-nakliyat` | mersin şehirler arası nakliyat | 51 | 859 | Service, Breadcrumb, FAQ | — |
| `/ofis-tasima` | mersin ofis taşıma | 39 | 743 | Service, Breadcrumb, FAQ | — |
| `/parca-esya-tasima` | mersin parça eşya taşıma | 45 | 691 | Service, Breadcrumb, FAQ | — |
| `/esya-paketleme` | mersin eşya paketleme | 50 | 620 | Service, Breadcrumb, FAQ | — |
| `/hizmet-bolgeleri` | mersin nakliyat bölgeleri | 53 | 516 | Breadcrumb, FAQ | — |
| `/teklif-al` | nakliyat teklif al | 40 | 407 | Breadcrumb, FAQ | — |
| `/iletisim` | marka + iletişim | 40 | 358 | Breadcrumb | — |
| `/hakkimizda` | marka + kurumsal | 55 | 453 | Breadcrumb | — |
| `/rehber` | rehber hub | 36 | 354 | Breadcrumb | — |
| `/rehber/ev-tasirken-yapilmasi-gerekenler` | bilgi | 53 | 803 | Article, Breadcrumb | — |
| `/rehber/asansorsuz-ev-nasil-tasinir` | bilgi | 47 | ~900 | Article, Breadcrumb | **YENİ** |
| `/rehber/nakliye-firmasi-secerken` | bilgi | 51 | 687 | Article, Breadcrumb | — |
| `/rehber/esyalar-nasil-paketlenir` | bilgi | 46 | 721 | Article, Breadcrumb | — |
| `/gizlilik-politikasi` | yasal | 40 | 345 | Breadcrumb | — |
| `/kvkk-aydinlatma-metni` | yasal | 42 | 418 | Breadcrumb | — |

**Yinelenen metadata:** yok. **Orphan sayfa:** yok. **Thin content:** yok.
**Redirect zinciri:** yok. **Broken link:** yok.

---

## 4. Bu denetimde bulunan ve DÜZELTİLEN sorunlar

### P0

**1. Sitemap `lastmod` her derlemede "bugün" basıyordu**
16 URL'nin hepsi aynı build timestamp'ini taşıyordu
(`2026-08-24T15:59:46.244Z`). Google böyle bir sitemap'in `lastmod` sinyaline
güvenmez ve tamamen yok sayar.
→ `src/config/routes.ts` içinde her rota gerçek içerik tarihini taşıyor.
Rehber yazılarının tarihi sayfada görünen "Güncelleme" tarihiyle aynı kaynaktan
geliyor. `tests/seo.test.ts` "hepsi bugün" durumunu yakalıyor.

**2. Yer tutucu alan adı kayıtlı olmayan `.com`'u gösteriyordu**
`NEXT_PUBLIC_SITE_URL` bir gün silinirse tüm canonical'lar ve sitemap
`https://kansucannakliye.com` adresine (DNS'i olmayan bir alan adı) işaret
edecekti.
→ Yedek değer `https://www.kansucannakliye.com.tr` olarak düzeltildi.

### P1

**3. İşletme şemasında `logo` ve `image` yoktu**
Google'ın işletmeyi tanıması ve Google İşletme Profili kaydıyla eşleştirmesi
için görsel sinyal eksikti.
→ `logo` (site ikonu) ve `image` (gerçek araç + ekip fotoğrafı) eklendi.
Yalnızca dosyası gerçekten var olan görseller yayınlanıyor.

**4. `WebSite` düğümü yoktu**
Site ile işletme arasındaki ilişki yapısal veriyle bildirilmiyordu.
→ `WebSite` düğümü eklendi, `publisher` ile işletmeye bağlandı. Çelişen ikinci
bir işletme entity'si üretilmedi. Site içi arama olmadığı için `SearchAction`
bilinçli olarak eklenmedi.

**5. `/index.html` için uydurma 301 vardı**
Böyle bir URL hiç var olmadı; eski site varsayımıydı.
→ Kaldırıldı. `/hizmetler` yönlendirmesi korundu (yaygın tahmin-URL'i,
404 yerine ana ticari sayfaya gidiyor) ve gerekçesi koda yazıldı.

**6. Adres yapısal verisinde İL/İLÇE alanları TERSTİ**
Denetim sırasında işletme adresi, koordinatları ve Google İşletme Profili
bağlantısı sisteme girildi. Ancak eşleme hatalıydı:
`addressLocality = Mersin`, `addressRegion = Yenişehir`.
Türkiye adres yapısında `addressLocality` **ilçe**, `addressRegion` **il**
olmalıdır; ters yazım Google'ın işletmeyi yanlış idari birimle eşleştirmesine
yol açar.
→ Düzeltildi: `addressLocality = Yenişehir`, `addressRegion = Mersin`.
`tests/schema.test.ts` ikisinin ters yazılmasını ve aynı değere ayarlanmasını
yakalıyor.

**7. Görsel `alt` metinlerinde marka adı NAP'tan farklıydı**
`alt` metinleri "Kansu Can Nakliye" diyordu; işletme adı "Kansu Can Nakliyat".
→ Hepsi NAP ile hizalandı.

### P2

**8. "Asansörsüz ev taşıma" arama amacının birincil sayfası yoktu**
Konu yalnızca SSS cevabı olarak geçiyordu. Türkiye'de taşınma öncesi en çok
endişe yaratan başlıklardan biri ve rakiplerin "asansörlü taşıma" vurgusuna
karşı doğal bir konumlanma.
→ `/rehber/asansorsuz-ev-nasil-tasinir` eklendi; `/evden-eve-nakliyat` ve
`/hizmet-bolgeleri` sayfalarından iç link verildi.

---

## 5. Düzeltilmeyen / bilinçli bırakılanlar

| Konu | Karar | Gerekçe |
| --- | --- | --- |
| İlçe sayfaları (`/mezitli-nakliyat` vb.) | Açılmadı | İlçeye özgü gerçek veri yok. Aynı metnin ilçe adı değiştirilerek çoğaltılması doorway page davranışıdır. Koşullar `arama-amaci-haritasi.md`'de. |
| Rota sayfaları (`mersin-ankara` vb.) | Açılmadı | O rotalarda gerçekten iş yapıldığı ve özgün bilgi verilebileceği doğrulanmadı. |
| `aggregateRating` / `review` | Yok | Gerçek yorum yok. Sahte puan/yorum kesinlikle üretilmedi. |
| `openingHours` | Yok | Çalışma saatleri doğrulanmadı. Uydurma saat şemaya girmedi. |
| `googleReviewUrl` | Yok | Yorum bırakma linki girilmedi; ilgili CTA gizli. |
| `legalName` | Yok | Ticari unvan doğrulanmadı. |
| `priceRange` | Yok | Doğrulanmadı. |
| Sigorta / garanti iddiaları | Site metninde yok | Tanıtım görsellerinde yazıyor ama işletmeden teyit alınmadı. |
| `/index.html` dışındaki eski URL 301'leri | Yok | Eski bir site olduğuna dair kanıt yok. |

---

## 6. Yerel varlık (local entity) durumu

Denetim sırasında işletme verisi tamamlandı. Yapısal veride şu an yayınlanan
**gerçek** alanlar:

| Alan | Değer |
| --- | --- |
| `name` | Kansu Can Nakliyat |
| `alternateName` | Kansu Can Nakliye (araç/Instagram/eski alan adı yazımı) |
| `telephone` | +905464199007 |
| `email` | kansucannakliyat@gmail.com |
| `streetAddress` | Çiftlikköy, 3201. Sk. No:15 |
| `addressLocality` (ilçe) | Yenişehir |
| `addressRegion` (il) | Mersin |
| `postalCode` | 33150 |
| `geo` | 36.7680863, 34.5484853 |
| `sameAs` | Instagram + Google İşletme Profili (cid) |
| `logo` | /icon.svg |
| `image` | Gerçek araç + ekip fotoğrafı |
| `areaServed` | Mersin + Akdeniz, Mezitli, Toroslar, Yenişehir |

Bu, denetim başındaki duruma göre yerel SEO açısından en büyük kazanç:
işletme artık Google'a **adresi, konumu ve GBP kaydıyla bağı olan gerçek bir
yerel işletme** olarak bildiriliyor.

**Hâlâ eksik:** `openingHours`, `googleReviewUrl`, `legalName`, gerçek müşteri
yorumları, sigorta teyidi.

---

## 7. Kalan işler

Kod tarafında yapılabilecek P0/P1 işi **kalmadı.** Bundan sonraki kazanç
işletme verisinden ve site dışı sinyallerden gelir — bkz. `LOCAL_SEO_PLAN.md`,
`GOOGLE_BUSINESS_PROFILE_CHECKLIST.md` ve `LOCAL_BACKLINK_PLAN.md`.
