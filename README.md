# Kansu Can Nakliye — Mersin Nakliyat Lead Üretim Sitesi

Bu bir "kurumsal tanıtım sitesi" değil. Amacı tek şey:

```
Google araması → tıklama → güven → telefon / WhatsApp / teklif talebi → müşteri
```

Her sayfa, her buton ve her teknik karar bu huniyi iyileştirmek için var.

---

## Hızlı başlangıç

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL'i kendi alan adınızla doldurun
npm run dev
```

Üretim derlemesi ve tüm kontroller:

```bash
npm run verify
```

`verify` sırasıyla şunları çalıştırır: `typecheck` → `lint` → `test` → `build`.

Çalışan siteye karşı SEO denetimi (önce `npm run build && npm start`):

```bash
npm run seo:audit -- http://localhost:3000
```

| Komut               | Ne yapar                                                        |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Geliştirme sunucusu. Eksik iş bilgisi uyarısı sayfada görünür.   |
| `npm run build`     | Üretim derlemesi (tüm sayfalar statik üretilir).                 |
| `npm start`         | Derlenmiş siteyi sunar.                                          |
| `npm run typecheck` | TypeScript tip kontrolü.                                         |
| `npm run lint`      | ESLint (Next core-web-vitals kuralları dahil).                   |
| `npm test`          | Birim testleri: iş verisi guard'ları, JSON-LD, SEO kuralları.    |
| `npm run seo:audit` | Çalışan siteye HTTP atarak SEO QA matrisi üretir.                |

---

## ⚠️ YAYINA ALMADAN ÖNCE DOLDURULMASI ZORUNLU

Site **doğrulanmamış hiçbir bilgi içermiyor**. Telefon, WhatsApp, e-posta,
Instagram ve gerçek fotoğraflar girildi. Aşağıdaki alanlar hâlâ boş ve dolana
kadar ilgili bölümler **otomatik gizli** kalır.

> **Firma adı:** Google İşletme Profili'ndeki yazım esas alındı →
> **Kansu Can Nakliyat**. Araç kaplaması, afiş, Instagram ve alan adı
> "Kansu Can Nakliye" yazımını kullanıyor; bu ikinci yazım JSON-LD'de
> `alternateName` olarak bildiriliyor ki Google iki adı tek işletme sayabilsin.
> Kalıcı çözüm için ikisinden birinde birleşilmesi gerekir (bkz. GBP kontrol
> listesi).

Tümü tek dosyada: **`src/config/business.ts`**

| Alan                             | Durum      | Etkisi                                                                     |
| -------------------------------- | ---------- | -------------------------------------------------------------------------- |
| `phone` + `phoneDisplay`         | ✅ DOLU    | `+905464199007` / `0546 419 90 07` — arama CTA'ları aktif.                  |
| `whatsapp`                       | ✅ DOLU    | `905464199007` — tüm WhatsApp CTA'ları ve teklif formu WhatsApp'a bağlı.    |
| `email`                          | ✅ DOLU    | `kansucannakliyat@gmail.com`                                                |
| `address.street` / `.district`   | ✅ DOLU    | Google İşletme Profiliyle aynı açık adres yayınlanıyor.                     |
| `coordinates`                    | ✅ DOLU    | Doğrulanmış Google Haritalar konumu JSON-LD `geo` içinde yayınlanıyor.       |
| `openingHours`                   | BOŞ 🟠     | Çalışma saatleri bölümü ve `openingHoursSpecification` yok.                 |
| `googleBusinessProfileUrl`       | ✅ DOLU    | GBP bağlantısı ve `sameAs` sinyali etkin.                                   |
| `googleMapsDirectionsUrl`        | ✅ DOLU    | "Yol Tarifi Al" butonu Google Haritalar rotasını açıyor.                    |
| `googleMapsEmbedUrl`             | ✅ DOLU    | Ana sayfa ve iletişim sayfasında işletme konumu gösteriliyor.                |
| `instagram`                      | ✅ DOLU    | `kansucan_nakliye33` — footer, iletişim ve JSON-LD `sameAs` içinde.          |
| `facebook`                       | BOŞ 🟡     | Varsa eklenir; yoksa bağlantı gösterilmez.                                  |
| `serviceAreas`                   | Varsayılan 🟠 | Mersin merkez 4 ilçe listeli. **Hizmet verilmeyen ilçe varsa SİLİN**, merkez dışına da gidiliyorsa EKLEYİN. |
| `legalName`                      | BOŞ 🟡     | Footer'da ticari unvan gösterilmiyor.                                       |
| `foundedYear`, `completedJobs`, `teamSize`, `hasTransportInsurance`, `licenseNumber`, `priceRange` | `null` / boş | **Bilinçli olarak boş.** Doğrulanmadan doldurulmamalı. |
| `config/reviews.ts`              | BOŞ 🟠     | Yorum bölümü gizli, `aggregateRating`/`review` şeması üretilmiyor.          |
| `config/photos.ts`               | ✅ 5 GÖRSEL | Hero + 1 gerçek iş fotoğrafı + 3 tanıtım görseli. Ayrım için aşağıya bakın. |
| `NEXT_PUBLIC_SITE_URL`           | Varsayılan 🔴 | Kanonik URL'ler ve sitemap `https://kansucannakliye.com` varsayıyor.      |
| `NEXT_PUBLIC_GA_ID`              | BOŞ 🟠     | Hiçbir dönüşüm ölçülmüyor.                                                  |

> Geliştirme modunda (`npm run dev`) eksik alanlar sayfanın altında liste
> halinde görünür. Üretimde bu liste hiç render edilmez.

### Doldurma örneği

```ts
phone: "+905321234567",
phoneDisplay: "0532 123 45 67",
whatsapp: "905321234567",          // sadece rakam, ülke kodu dahil
email: "info@kansucannakliye.com",
address: {
  street: "Menderes Mah. 1234 Sk. No:5",
  district: "Yenişehir",
  city: "Mersin",
  postalCode: "33110",
  countryCode: "TR",
},
coordinates: { lat: 36.7951, lng: 34.6180 },
openingHours: [
  { days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "19:00" },
],
```

Değişiklik sonrası `npm run verify` çalıştırın.

---

## Mimari

```
src/
├── config/            ← TEK DOĞRULUK KAYNAĞI (buradan başlayın)
│   ├── business.ts    ← NAP, hizmet bölgeleri, doğrulanmamış alanlar
│   ├── services.ts    ← Hizmet sayfası kayıtları (başlık, meta, WhatsApp mesajı)
│   ├── guides.ts      ← Rehber yazısı kayıtları
│   ├── routes.ts      ← Sitemap'e girecek kanonik yollar
│   ├── reviews.ts     ← Gerçek yorumlar (boşsa bölüm gizli)
│   ├── photos.ts      ← Gerçek fotoğraflar (boşsa galeri gizli)
│   └── site.ts        ← Kanonik alan adı, GA4 kimliği
├── lib/
│   ├── business.ts    ← "veri varsa göster" guard'ları (hasPhone, hasWhatsApp…)
│   ├── contact.ts     ← createWhatsAppUrl / formatPhoneForTel / formatPhoneForDisplay
│   │                     + resolvePageContext (sayfaya özel WhatsApp mesajı)
│   ├── schema.ts      ← JSON-LD üreticileri (sadece doğrulanmış alanlar)
│   ├── analytics.ts   ← GA4 olayları + kazanım (utm/gclid) takibi
│   └── quote.ts       ← Telefon doğrulama + teklif mesajı üretimi
├── components/
│   ├── contact/       ← Kalıcı iletişim CTA sistemi
│   │   ├── ContactActionButton.tsx     ← tek buton primitifi
│   │   ├── MobileStickyContactBar.tsx  ← mobil alt bar (md altı)
│   │   └── FloatingContactDock.tsx     ← masaüstü sağ-alt dock (md üstü)
│   └── sections/      ← Hero, TrustBar, WhyUs, Section, ServiceCards…
└── app/               ← App Router sayfaları
```

### Neden bu kadar çok "koşullu gizleme" var?

Çünkü kural şu: **doğrulanmamış bilgi uydurulmaz, boş bırakılır ve gizlenir.**
Sahte yorum, sahte puan, uydurma "10 yıllık deneyim" veya uydurma fiyat
listesi kısa vadede tıklama getirir, uzun vadede hem güveni hem sıralamayı
yok eder. Bu yüzden `business.ts`'de veri yoksa ilgili blok hiç render edilmez
ve JSON-LD'ye de girmez (bunu `tests/schema.test.ts` kilitler).

### İstemci JS'i nerede?

Sadece beş yerde: mobil menü, kalıcı iletişim CTA sistemi (mobil bar +
masaüstü dock), scroll ile koyulaşan header kabuğu, teklif formu ve tıklama
ölçümü. SSS bölümleri `<details>` ile kurulduğu için JavaScript gerektirmez —
içerik ham HTML'de bulunur ve taranabilir. Sayfa metinleri ve tüm iç linkler
sunucuda üretilir.

---

## Dönüşüm sistemi

### Kanallar

1. **Telefon** — header (masaüstü, numara açık), mobil header ikonu, mobil alt bar, masaüstü dock, sayfa içi CTA'lar.
2. **WhatsApp** — sayfaya özel hazır mesajla. Örn. şehirler arası sayfasında mesaj "Nereden / Nereye / Tahmini tarih" alanlarıyla açılır.
3. **Teklif formu** — 3 adım: (1) nereden-nereye, (2) tür + tarih, (3) telefon + not.

### Kalıcı iletişim CTA sistemi

Ziyaretçi sayfanın neresinde olursa olsun aramak / WhatsApp yazmak / teklif
istemek için başa dönmek zorunda kalmaz.

| Ekran | Bileşen | Davranış |
| --- | --- | --- |
| Mobil (md altı) | `MobileStickyContactBar` | Alt sabit bar: **Ara · WhatsApp · Teklif Al**. Scroll'da gizlenip görünmez (titreme ve yanlış tıklama üretiyordu); sabit kalır. `<body>` alt boşluğu sayesinde içeriği kapatmaz, iPhone safe-area destekli. |
| Masaüstü (md üstü) | `FloatingContactDock` | Sağ altta dikey dock: **Hemen Ara · WhatsApp'tan Bilgi Al · Ücretsiz Teklif Al**. Hero'nun altına inildiğinde (>420px) yumuşakça belirir; görünmezken `inert` ile klavye ve ekran okuyucu dışında kalır. |

Kurallar:

* **Ölü buton yok.** Telefon yoksa arama CTA'sı, WhatsApp yoksa WhatsApp CTA'sı hiç render edilmez. Hiçbir kanal kalmazsa dock tamamen gizlenir. `/teklif-al` sayfasında "Teklif Al" tekrar etmez.
* **Mesaj bağlama özeldir.** `resolvePageContext()` bulunulan yolu çözer; hizmet sayfasındaysanız mesaj o hizmete göre üretilir (ör. "…evden eve nakliyat hizmetiniz için bilgi almak istiyorum.").
* **İkisi asla aynı anda görünmez** (mobil bar `md:hidden`, dock `hidden md:block`). 8 genişlikte test edildi.
* **Mikro etkileşim minimal:** hover'da 1px yükselme + gölge artışı, dock için tek seferlik giriş animasyonu. Zıplama veya yanıp sönme yok; `prefers-reduced-motion` desteklenir.
* **Erişilebilirlik:** gerçek `<a>` semantiği, görünür metin (ikon tek başına bırakılmaz), 48px dokunma yüksekliği, görünür odak halkası, erişilebilir ad görünen metinle başlar (WCAG 2.5.3 Label in Name).

### Teklif formu nasıl çalışıyor?

Form içeriği **sunucuya gönderilmez**. Bilgiler kullanıcının cihazında hazır
mesaja dönüşür ve kullanıcı kendi WhatsApp'ından gönderir. Sonuç:

- backend, veritabanı ve sunucu maliyeti yok → statik hosting yeterli,
- kişisel veri saklanmadığı için KVKK yükü minimum,
- lead doğrudan firmanın WhatsApp'ına düşer.

WhatsApp yapılandırılmamışsa e-postaya, o da yoksa kopyalanabilir özete düşer.

### Ölçülen olaylar (GA4)

Sayfa içi CTA ve form:
`phone_click` · `whatsapp_click` · `quote_form_view` · `quote_form_start` ·
`quote_form_step_1` · `quote_form_step_2` · `quote_form_submit` ·
`quote_form_success` · `quote_form_error` · `directions_click` · `service_view`

Sosyal:
`instagram_click` (header'daki Instagram bağlantısı — dışa giden tıklama)

Kalıcı CTA sistemi (masaüstü dock ve mobil bar ayrı ölçülür):
`floating_phone_click` · `floating_whatsapp_click` · `floating_quote_click` ·
`sticky_mobile_phone_click` · `sticky_mobile_whatsapp_click` ·
`sticky_mobile_quote_click`

Her olayla birlikte gönderilen parametreler: `cta_location`, `page_context`
(ana sayfa veya hizmet slug'ı), `device_type` (mobile/desktop), `service`,
`page_path`, `lead_source`, `lead_medium`, `lead_campaign`, `landing_page`.

> **Form içeriği (ad, telefon, adres, not) analytics'e ASLA gönderilmez.**
> Bunu `tests` ve tarayıcı testiyle doğruladık.

### Lead kaynağı (attribution)

İlk girişteki `utm_*` ve `gclid` parametreleri oturum boyunca saklanır ve
dönüşüm olaylarına `lead_source` / `lead_medium` / `lead_campaign` olarak
eklenir. Böylece "bu teklif Google organikten mi, Ads'ten mi, Instagram'dan mı
geldi?" sorusu GA4'ten cevaplanır. Bu parametreler **kanonik URL'lere girmez**.

---

## Fotoğraf ekleme

Yeni bir iş fotoğrafı yayınlamak için **kod bilmeye gerek yok**:

1. Görseli `public/images/` klasörüne kopyalayın (tercihen `.webp`, 400 KB altı).
2. `src/config/photos.ts` içindeki `photos` dizisine bir satır ekleyin:

```ts
{
  src: "/images/dosya-adi.webp",
  alt: "Fotoğrafta gerçekten ne görünüyorsa onun tarifi",
  caption: "Kısa açıklama (opsiyonel)",
},
```

Ölçü yazmanız **gerekmez** — genişlik ve yükseklik derleme sırasında dosyanın
kendisinden okunur (`src/lib/image-size.ts`). Bu sayede:

* fotoğraf değişse bile düzen kayması (CLS) oluşmaz,
* dikey/yatay fark etmez, görsel kırpılmadan yerleşir,
* **dosya klasörde yoksa görsel sitede hiç gösterilmez** — kırık görsel yayınlanmaz.

Geliştirme modunda (`npm run dev`) listede olup dosyası bulunmayan görseller
sayfanın altındaki uyarı kutusunda listelenir.

> Stok fotoğraf kullanılmaz. Galeri yalnızca firmanın gerçek işini gösterir.

### İki ayrı görsel listesi — neden?

`config/photos.ts` içinde iki liste var ve **karıştırılmamalıdır**:

| Liste | Sitedeki başlık | İçerik |
| --- | --- | --- |
| `photos` | **İşlerimizden** | Gerçekten tamamlanmış işlerin fotoğrafları |
| `promoPhotos` | **Tanıtım Görsellerimiz** | Pazarlama grafikleri (afiş/poster, kompozit görseller) |

Tanıtım grafikleri tamamlanmış iş fotoğrafı değildir. "İşlerimizden" altında
gösterilirlerse ziyaretçi bunları sizin yaptığınız taşıma sanır; gerçek ekiple
karşılaşınca güven tam da kazanılması gereken anda kırılır. Ayrıca bu tür
görsellerin `alt` metni, bir tanıtım grafiği olduğunu belirtir.

`tests/photos.test.ts` iki listenin karışmasını ve alt metni kuralını kilitler.

## Tasarım sistemi

Marka kimliği **siyah / beyaz / metalik gri**. Sistemde aksan rengi yoktur;
vurgu kontrast, tipografi ve yüzey geçişleriyle kurulur. Amaç, sitenin firmanın
kendi aracının dijital uzantısı gibi durması.

| Rol | Değer | Kullanım |
| --- | --- | --- |
| Black | `#13181C` | Navbar (scroll sonrası), footer, koyu bölümler, birincil CTA, mobil bar |
| Charcoal | `#18191B` | Gövde metni rengi, koyu yüzeyler |
| Dark Gray | `#3C4247` | Uzun metin gövdesi |
| CTA hover | `#30353A` | Birincil buton hover |
| Metal Gray | `#51565A` | İkincil metin, outline ikon stroke, kenarlık |
| Light Gray | `#D3D4D5` | Ayraç; koyu zeminde gövde metni |
| Soft border | `#E3E3E3` | Kart kenarlığı |
| Off White | `#F4F4F3` | Sayfanın ana açık zemini, form input yüzeyi |
| White | `#FFFFFF` | Kart, koyu zeminde birincil CTA |
| Card (dark) | `#1C2226` | Koyu bölümlerdeki kartlar |
| WhatsApp | `#25D366` | **Sadece** WhatsApp ikonunda. Sisteme yayılmaz. |

**Sosyal ikonlar tek renktir.** Instagram'ın renkli gradienti bilinçli olarak
kullanılmadı: sistemde aksan rengi yok ve gradient premium duruşu düşürür.
Glif tek renkte de anında tanınıyor. Header'daki Instagram butonu `.icon-btn`
sınıfını kullandığı için scroll ile koyulaşan header'da otomatik beyaza döner.

**Header ikon hiyerarşisi:** telefon `.icon-btn-primary` (dolu yüzey),
Instagram ve menü `.icon-btn` (outline). Dönüşüm aksiyonu görsel olarak önde
kalır. Instagram üst barda 360px–767px ve 768px+ aralıklarında tek kez görünür;
320px altında üst bardan düşer, mobil menü panelindeki satır devrede kalır.

Tokenlar `src/app/globals.css` içinde `@theme` bloğunda tanımlı; Tailwind
sınıfları (`bg-ink-900`, `text-ink-500`, `border-line-soft` …) buradan türer.

**Kontrast notu:** `ink-500` koyu zeminde 2.47:1 verir — koyu bölümlerde gövde
metni için kullanılmaz, `ink-300` kullanılır (12:1).

**Bölüm ritmi:** OFF-WHITE → DARK → WHITE → OFF-WHITE → DARK → WHITE → …
`Section` bileşeninin `tone` proposu ile yönetilir. Koyu bölümler `section-dark`
sınıfı alır; bu sınıf odak halkasını ve uzun metin renklerini otomatik ters
çevirir.

**Navbar:** açık zeminde başlar, 24px scroll sonrası koyuya döner
(`HeaderShell` → `data-scrolled`). Yükseklik sabit 72px olduğu için CLS üretmez.

**Site ikonu (favicon):** `src/app/icon.svg` — KC monogramı, siyah zemin
(#13181C) üzerine beyaz. Tek kaynak, SVG olduğu için her boyutta keskin.
16px'te okunabilirlik için hız çizgisi gibi ince öğe yok; K ile C arasında
bilinçli boşluk var. `src/app/apple-icon.tsx` aynı monogramı iOS ana ekranı
için 180×180 üretir — köşeleri yuvarlatmaz (iOS kendi maskesini uygular) ve
saydamlık içermez. `theme-color` (#13181c) ikonla aynı tonda.

Monogram değişirse `icon.svg` ile `apple-icon.tsx` içindeki yol verileri
BİRLİKTE güncellenmelidir; ikisi aynı 64'lük tasarım ızgarasını kullanır.

**Fotoğraf:** `.photo` sınıfı `saturate(0.85) contrast(1.03)` uygular — site
temasına oturur ama siyah-beyaza çevrilmez. Hover'da en fazla `scale(1.02)`.
`config/photos.ts` içindeki `heroPhoto` doldurulduğunda hero iki sütunlu
görselli düzene otomatik geçer; doldurulmadığı sürece stok görsel kullanılmaz,
yerine koyu marka plakası gösterilir.

## Google Search Console kurulumu

### Doğrulama durumu

HTML dosya yöntemi kullanıldı ve dosya repoda hazır:

```
public/googlef1d5a46ab1e079ef.html
→ https://kansucannakliye.com/googlef1d5a46ab1e079ef.html
```

`tests/verification.test.ts` bu dosyanın varlığını ve içeriğini kilitler.
**Silmeyin:** Google dosyayı periyodik olarak yeniden kontrol eder; kaybolursa
doğrulama düşer ve mülkün tüm geçmiş verisine erişim kapanır.

> **Sıra önemli:** dosya ancak alan adı Vercel'e bağlandıktan ve dağıtım
> yapıldıktan sonra erişilebilir olur. Domain bağlanmadan "Doğrula"ya
> basarsanız başarısız olur.

**Mülk tipi:** HTML dosya yöntemi yalnızca *URL öneki* mülkünü doğrular
(`https://kansucannakliye.com/`). İleride `www`, `http` ve olası alt alan
adlarını tek çatıda toplamak isterseniz ayrıca bir **Domain (DNS)** mülkü
ekleyip DNS TXT kaydıyla doğrulayın — ikisi bir arada kullanılabilir.

Alternatif olarak HTML meta etiketi yöntemi de destekleniyor:
`NEXT_PUBLIC_GSC_VERIFICATION` değişkenine kodu yazarsanız `<head>` içine
otomatik eklenir.

### Kurulum adımları

1. **Mülk ekleme** — Search Console'da URL öneki mülkü olarak `https://kansucannakliye.com` ekleyin.
2. **Doğrulama** — "HTML dosyası" yöntemini seçip **Doğrula**'ya basın (dosya yayında hazır).
3. **Sitemap gönderimi** — Sitemaps → `https://ALANADI/sitemap.xml`
4. **URL denetimi** — Ana sayfa ve `/evden-eve-nakliyat` için "Canlı URL'yi test et" → "Dizine ekleme iste".
5. **Zengin sonuç kontrolü** — [Rich Results Test](https://search.google.com/test/rich-results) ile `/evden-eve-nakliyat` (Service + FAQ + Breadcrumb) ve ana sayfa (MovingCompany + FAQ) doğrulanmalı.
6. **Core Web Vitals** — Deneyim → Core Web Vitals. Veri birikmesi 28 gün sürer.
7. **Manuel işlemler** — Güvenlik ve Manuel İşlemler sekmesi boş olmalı.
8. **HTTPS** — Hosting sağlayıcısında HTTP → HTTPS yönlendirmesi açık olmalı.

---

## Google İşletme Profili (GBP) kontrol listesi

Bu site GBP'yi güçlendirmek üzere kuruldu. Aşağıdakileri **işletme sahibi**
kendi yapmalı; site tarafından değiştirilemez.

| Alan              | Ne yapılmalı                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| İşletme adı       | **Kansu Can Nakliye** — sitedeki yazımla birebir aynı. Ada anahtar kelime eklemeyin ("Mersin En İyi..." vb. politika ihlali). |
| Kategori          | Birincil: **Nakliyat şirketi** (Moving company). İkincil: Depolama/Kurye vb. sadece gerçekten yapılıyorsa. |
| Telefon           | `business.ts`'deki numarayla **aynı**.                                                                      |
| Adres             | Adres gösterilecekse `business.ts` ile birebir aynı olmalı.                                                 |
| Hizmet bölgeleri  | `business.ts` → `serviceAreas` ile aynı ilçeler.                                                            |
| Çalışma saatleri  | `business.ts` → `openingHours` ile aynı.                                                                    |
| Web sitesi        | UTM'li girin: `https://ALANADI/?utm_source=google&utm_medium=organic&utm_campaign=gbp` — böylece GBP'den gelen trafik GA4'te ayrışır. |
| Fotoğraflar       | Araç, ekip, yükleme, paketleme, tamamlanmış iş. **Stok fotoğraf yüklemeyin.**                              |
| Hizmetler         | Sitedeki 5 hizmetle aynı adlarla girin.                                                                     |
| Açıklama          | Sitedeki "Hakkımızda" diliyle tutarlı, anahtar kelime doldurmadan.                                          |
| Yorumlar          | Her tamamlanan işten sonra yorum isteyin. Olumsuz yorumlara **mutlaka** cevap verin.                        |
| Soru-Cevap        | Sitedeki SSS'lerden 3-5 tanesini GBP Soru-Cevap'a ekleyin.                                                  |

**NAP tutarlılığı en kritik yerel SEO sinyalidir.** Firma adı, adres ve telefon
sitede, GBP'de ve dizinlerde harfi harfine aynı yazılmalı.

Gerçek yorum toplandıkça `src/config/reviews.ts` dosyasına ekleyin — yorumlar
o zaman sitede görünür ve JSON-LD'ye girer.

---

## Kanonikleştirme ve yönlendirmeler

**Seçilen kanonik biçim:** `https://` + **www YOK** + sondaki eğik çizgi YOK.

Örnek: `https://kansucannakliye.com/evden-eve-nakliyat`

Uygulama tarafında bu garanti altında:

- her sayfa `alternates.canonical` ile mutlak kanonik URL yayınlar,
- `absoluteUrl()` sorgu parametrelerini ve fragment'ı kanonikten atar (test edildi),
- `next.config.ts` → `trailingSlash: false`.

**Hosting tarafında yapılması gerekenler (Vercel/Netlify/nginx):**

1. `www.ALANADI` → `ALANADI` **301**
2. `http://` → `https://` **301**
3. `ALANADI/sayfa/` → `ALANADI/sayfa` **301**

### Eski site varsa (301 planı)

Eski siteyi kapatmadan **önce** URL listesini çıkarın (Screaming Frog, eski
sitemap veya Search Console → Sayfalar). Sonra `next.config.ts` içindeki
`redirects()` dizisine **tek tek** ekleyin:

```ts
{ source: "/eski-evden-eve", destination: "/evden-eve-nakliyat", permanent: true },
```

> ❌ "Her şeyi `/`'a yönlendir" YAPMAYIN. Bu, biriken tüm sayfa otoritesini yakar.

---

## Yayına alma

Site tamamen statik üretiliyor (20 rota), bu yüzden herhangi bir Node hosting
veya Vercel'de sorunsuz çalışır.

**Vercel:**

1. Repoyu bağlayın. Ek ayar gerekmez; `next build` olduğu gibi çalışır.
2. **Environment Variables → `NEXT_PUBLIC_SITE_URL`** (Production + Preview).
   Sonunda `/` olmadan, gerçek alan adınız: `https://alanadiniz.com`
3. İsteğe bağlı: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`.
4. Alan adını ekleyin, www → non-www yönlendirmesini Vercel Domains ekranından açın.
5. Deploy sonrası: `/sitemap.xml` ve `/robots.txt` adreslerini tarayıcıda açıp
   `<loc>` değerlerinin gerçek alan adınızı gösterdiğini doğrulayın.

### `NEXT_PUBLIC_SITE_URL` girilmezse ne olur?

Derleme **başarısız olmaz** — önizleme dağıtımları çalışsın diye bilinçli olarak
kırmıyoruz. Bunun yerine kanonik adres şu sırayla çözülür:

| Sıra | Kaynak | Sonuç |
| --- | --- | --- |
| 1 | `NEXT_PUBLIC_SITE_URL` | İstenen durum. |
| 2 | `VERCEL_PROJECT_PRODUCTION_URL` | Vercel otomatik verir. Site en azından **kendi** adresine canonical verir; yanlış bir alan adına işaret etmez. |
| 3 | Yer tutucu | Yalnızca yerel geliştirme. Derleme log'una uyarı basılır. |

Derleme log'unda şu satırı görüyorsanız env değişkeni eksiktir:

```
[site] NEXT_PUBLIC_SITE_URL tanımlı değil. Kanonik adres ...
```

Bu sessiz bir SEO hatasıdır: dağıtım yeşil görünür ama Google'a yanlış URL'ler
bildirilir. Domain'i bağlar bağlamaz bu değişkeni girip yeniden dağıtın.

---

## Ölçüm ve raporlama planı

İşletme sahibinin ayda bir bakması gereken sorular ve nereden bakılacağı:

| Soru                                   | Nereden                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| Organik trafik artıyor mu?             | GA4 → Edinme → Trafik edinme → `Organic Search`                       |
| Kaç telefon tıklaması geldi?           | GA4 → Etkinlikler → `phone_click`                                     |
| Kaç WhatsApp tıklaması geldi?          | GA4 → Etkinlikler → `whatsapp_click`                                  |
| Kaç teklif talebi tamamlandı?          | GA4 → Etkinlikler → `quote_form_success`                              |
| Formda nerede bırakılıyor?             | `quote_form_view` → `start` → `step_1` → `step_2` → `submit` hunisi   |
| Hangi sayfalar lead getiriyor?         | GA4 → Sayfalar ve ekranlar + olay parametresi `cta_location`          |
| Lead nereden geldi?                    | Olay parametresi `lead_source` / `lead_medium`                        |
| Google Maps'ten kaç ziyaretçi geldi?   | GA4 → Kaynak = `google` / Kampanya = `gbp` (GBP'ye UTM'li URL girildiyse) |
| Hangi sorgudan geliniyor?              | Search Console → Performans → Sorgular                                |
| Hangi sayfa hangi sorguda görünüyor?   | Search Console → Performans → Sayfalar → sorgu filtresi               |
| Dönüşüm oranı                          | (`phone_click` + `whatsapp_click` + `quote_form_success`) ÷ organik oturum |

**GA4'te dönüşüm olarak işaretleyin:** `phone_click`, `whatsapp_click`,
`quote_form_success`. (Yönetici → Etkinlikler → "Anahtar etkinlik olarak işaretle")

**Sayfa görüntülemeyi tek başına başarı ölçüsü saymayın.** Bu sitenin işi
görüntülenme değil, telefon ve WhatsApp üretmek.

---

## 90 günlük plan

### 1-7. gün — Ölçüm ve indeksleme altyapısı

- [ ] `business.ts` doldurulur (telefon + WhatsApp öncelikli)
- [ ] `NEXT_PUBLIC_SITE_URL` gerçek alan adıyla ayarlanır
- [ ] GA4 mülkü açılır, `NEXT_PUBLIC_GA_ID` girilir
- [ ] `phone_click` / `whatsapp_click` / `quote_form_success` anahtar etkinlik yapılır
- [ ] Search Console mülkü doğrulanır, sitemap gönderilir
- [ ] GBP'ye UTM'li site adresi girilir
- [ ] `npm run seo:audit` canlı adrese karşı çalıştırılır
- [ ] Rich Results Test ile şemalar doğrulanır

### 2-4. hafta — Güven ve içerik

- [ ] Gerçek fotoğraflar çekilir ve `config/photos.ts`'e eklenir (araç, ekip, yükleme, paketleme)
- [ ] Tamamlanan her işten sonra Google yorumu istenir
- [ ] Gelen gerçek yorumlar `config/reviews.ts`'e eklenir
- [ ] `hakkimizda` sayfasına gerçek firma hikâyesi/ekip bilgisi eklenir
- [ ] GBP'ye haftalık fotoğraf/gönderi eklenir

### 2. ay — Veriye göre iyileştirme

- [ ] Search Console sorguları incelenir: hangi sorguda gösterim var ama tıklama yok?
- [ ] Düşük CTR'li sayfaların title/description'ı iyileştirilir
- [ ] Gösterim alan ama sayfası olmayan sorgular için içerik planlanır
- [ ] Yamyamlaşma kontrolü: aynı sorguda iki sayfa mı görünüyor?
- [ ] Formda en çok bırakılan adım tespit edilip sadeleştirilir

### 3. ay — Genişleme

- [ ] Search Console verisi ilçe sorgusu gösteriyorsa `/hizmet-bolgeleri/<ilce>` sayfası açılır (koşullar: `docs/seo/arama-amaci-haritasi.md`)
- [ ] Gerçekten iş yapılan rotalar için rota sayfası açılır
- [ ] Gerçek müşteri sorularından yeni rehber yazısı üretilir
- [ ] CTA metinleri ve hero mesajı üzerinde A/B denemesi

> İçeriği körlemesine üretmeyin. 3. aydan itibaren **ne yazılacağına Search
> Console verisi karar verir.**

---

## Yapılmayacaklar listesi

Bu proje aşağıdakileri bilinçli olarak **yapmaz**; sonradan da eklenmemeli:

- Sahte yorum, sahte puan, sahte `aggregateRating` şeması
- Uydurma fiyat listesi, uydurma deneyim yılı / müşteri sayısı
- Aynı metnin ilçe adı değiştirilerek çoğaltıldığı doorway sayfalar
- Programatik olarak üretilmiş yüzlerce rota/ilçe sayfası
- Anahtar kelime doldurma (başlıkta, alt metninde, paragrafta)
- Gizli metin, beyaz üzerine beyaz yazı
- Satın alınmış/otomatik üretilmiş backlink
- Ziyaretçinin kişisel verisinin analytics'e gönderilmesi
- Renkli gradient, mavi/turuncu/kırmızı lojistik teması, mor SaaS teması
- Her yerde glassmorphism, neon, aşırı gölge, dev yuvarlak floating balon
- Sürekli zıplayan veya yanıp sönen dikkat çekme efektleri
- Stok/üretilmiş görselin firmanın gerçek işi gibi gösterilmesi
- Sahip olunmayan araç sayısını ima eden filo görselleri

---

## Dokümantasyon

| Dosya | İçerik |
| --- | --- |
| [`docs/seo/SEO_AUDIT.md`](docs/seo/SEO_AUDIT.md) | Canlı site denetimi: mimari, alan adı davranışı, sayfa matrisi, bulunan ve düzeltilen sorunlar |
| [`docs/seo/KEYWORD_MAP.md`](docs/seo/KEYWORD_MAP.md) | Hangi sorgu hangi sayfayı hedefliyor; yamyamlaşma kararları; yeni sayfa açma eşiği |
| [`docs/seo/arama-amaci-haritasi.md`](docs/seo/arama-amaci-haritasi.md) | Arama amacı matrisi (ayrıntılı) |
| [`docs/seo/LOCAL_SEO_PLAN.md`](docs/seo/LOCAL_SEO_PLAN.md) | Yerel varlık sinyalleri, öncelik sırası, yorum toplama süreci |
| [`docs/seo/GOOGLE_BUSINESS_PROFILE_CHECKLIST.md`](docs/seo/GOOGLE_BUSINESS_PROFILE_CHECKLIST.md) | İşletme sahibinin GBP panelinde yapacağı işler |
| [`docs/seo/LOCAL_BACKLINK_PLAN.md`](docs/seo/LOCAL_BACKLINK_PLAN.md) | Dizin kayıtları, gerçek yerel bağlantı fırsatları (spam yok) |
| [`docs/seo/SEARCH_CONSOLE_SETUP.md`](docs/seo/SEARCH_CONSOLE_SETUP.md) | Doğrulama, sitemap, indeksleme, takip edilecek sorgular |
| [`docs/seo/SEO_CHANGELOG.md`](docs/seo/SEO_CHANGELOG.md) | Her değişiklik: ne, neden, SEO etkisi |
| `scripts/seo-audit.mjs` | Çalışan siteye karşı SEO QA matrisi üreten denetim scripti |

Canlı siteyi denetlemek için:

```bash
npm run seo:audit -- https://www.kansucannakliye.com.tr
```
