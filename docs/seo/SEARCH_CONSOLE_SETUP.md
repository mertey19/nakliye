# Google Search Console Kurulumu

**Mülk adresi:** `https://www.kansucannakliye.com.tr`

---

## 1. Doğrulama — mevcut durum

HTML dosya yöntemi hazır ve **canlıda çalışıyor**:

```
public/googlef1d5a46ab1e079ef.html
→ https://www.kansucannakliye.com.tr/googlef1d5a46ab1e079ef.html   (HTTP 200 ✅)
```

`tests/verification.test.ts` bu dosyanın varlığını ve içeriğini kilitler.
**Silmeyin:** Google dosyayı periyodik olarak yeniden kontrol eder; kaybolursa
doğrulama düşer ve mülkün tüm geçmiş verisine erişim kapanır.

### Adımlar

1. [search.google.com/search-console](https://search.google.com/search-console) → **Mülk ekle**
2. **URL öneki** sekmesine `https://www.kansucannakliye.com.tr` yazın
3. Doğrulama yöntemi: **HTML dosyası**
4. **Doğrula**'ya basın (dosya yayında hazır)

### Ayrıca Domain mülkü ekleyin (önerilir)

HTML dosya yöntemi yalnızca `https://www.` öneki için geçerlidir.
**Domain (DNS) mülkü** dört varyantı da (http/https, www/non-www) tek yerde
toplar ve alt alan adlarını kapsar.

1. Mülk ekle → **Domain** → `kansucannakliye.com.tr`
2. Google'ın verdiği **TXT kaydını** alan adı DNS panelinize ekleyin
3. Yayılmayı bekleyin (10 dk – birkaç saat), doğrulayın

İkisi bir arada kullanılabilir.

---

## 2. Sitemap gönderimi

1. Sol menü → **Site Haritaları**
2. Adres alanına: `sitemap.xml`
3. Gönder

Beklenen: **17 URL**, durum "Başarılı".

> Sitemap'teki `lastmod` değerleri gerçek içerik tarihidir, derleme tarihi
> değil. Bir sayfanın içeriğini anlamlı biçimde değiştirdiğinizde
> `src/config/routes.ts` içindeki tarihi güncelleyin.

---

## 3. İlk indeksleme

Sol üstteki arama kutusuna URL yapıştırıp **URL Denetimi**:

| Sıra | URL | Neden öncelikli |
| --- | --- | --- |
| 1 | `/` | Marka + geniş sorgu |
| 2 | `/evden-eve-nakliyat` | En yüksek niyetli sorgu |
| 3 | `/sehirler-arasi-nakliyat` | İkinci ticari sayfa |
| 4 | `/ofis-tasima` | Kurumsal sorgu |
| 5 | `/hizmet-bolgeleri` | Yerel sorgular |

Her biri için: **Canlı URL'yi test et** → **Dizine ekleme iste**.

> Günlük istek kotası vardır; 5-10 URL sonrası sıraya alınır. Kalan sayfalar
> sitemap üzerinden zaten taranır, acele etmeyin.

---

## 4. Zengin sonuç doğrulaması

[Rich Results Test](https://search.google.com/test/rich-results) ile kontrol edin:

| URL | Beklenen yapısal veri |
| --- | --- |
| `/` | MovingCompany, WebSite, FAQPage |
| `/evden-eve-nakliyat` | Service, BreadcrumbList, FAQPage |
| `/rehber/asansorsuz-ev-nasil-tasinir` | Article, BreadcrumbList |

Ayrıca [Schema Markup Validator](https://validator.schema.org/) ile hata
kontrolü yapın. Beklenen: **0 hata.**

---

## 5. Düzenli takip

### Haftalık (ilk ay)

- **Sayfalar** raporu: kaç sayfa dizine eklendi? Hata var mı?
- **Site Haritaları**: durum hâlâ "Başarılı" mı?

### Aylık

**Performans** raporunda takip edilecek sorgular:

```
mersin nakliyat
mersin nakliye
mersin evden eve nakliyat
mersin evden eve nakliye
mersin şehirler arası nakliyat
mersin nakliyat firması
mersin ofis taşıma
mersin parça eşya taşıma
kansu can nakliyat
```

Her biri için kaydedin: **gösterim · tıklama · CTR · ortalama konum**

Basit bir tablo tutun:

| Ay | Sorgu | Gösterim | Tıklama | CTR | Ort. konum |
| --- | --- | --- | --- | --- | --- |
| 2026-09 | mersin evden eve nakliyat | | | | |

### Ne aramalısınız

| Bulgu | Anlamı | Aksiyon |
| --- | --- | --- |
| Gösterim var, tıklama yok | Başlık/açıklama zayıf | Title + description'ı iyileştir |
| Konum 11-20 | Sayfa tanınıyor ama zayıf | İçeriği derinleştir, iç link ver |
| Aynı sorguda iki sayfa | Yamyamlaşma | `KEYWORD_MAP.md`'ye göre birleştir |
| Gösterim alan ama sayfası olmayan sorgu | İçerik boşluğu | Yeni sayfa değerlendir (eşik: `KEYWORD_MAP.md`) |
| İlçe sorgusunda gösterim | İlçe sayfası zamanı gelmiş olabilir | Koşulları kontrol et |

---

## 6. Diğer kontroller

| Rapor | Beklenen | Sıklık |
| --- | --- | --- |
| **Core Web Vitals** | Tümü "İyi" | Aylık (veri 28 günde birikir) |
| **Mobil Kullanılabilirlik** | 0 hata | Aylık |
| **Manuel İşlemler** | "Sorun tespit edilmedi" | Aylık |
| **Güvenlik Sorunları** | "Sorun tespit edilmedi" | Aylık |
| **HTTPS** | Tüm sayfalar HTTPS | Aylık |

> **Manuel İşlemler** bölümünde bir uyarı görürseniz hemen bakın. Bu sitede
> spam teknik kullanılmadığı için beklenmiyor; çıkarsa sebebi büyük olasılıkla
> dışarıdan gelen spam bağlantılardır.

---

## 7. GA4 ile birleştirme

Search Console'u GA4'e bağlayın:

GA4 → Yönetici → **Ürün bağlantıları** → Search Console bağlantıları

Böylece "hangi sorgudan gelen ziyaretçi telefon tıkladı" sorusunu tek yerde
görebilirsiniz.

### GA4'te anahtar etkinlik olarak işaretlenecekler

- `phone_click`
- `whatsapp_click`
- `quote_form_success`

GA4 → Yönetici → Etkinlikler → ilgili satırda "Anahtar etkinlik olarak işaretle"
