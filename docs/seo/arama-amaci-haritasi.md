# Arama Amacı Haritası — Kansu Can Nakliye (Mersin)

Bu dosya, **hangi aramanın hangi sayfaya gideceğini** tanımlar. Amaç: her arama
amacı için **tek bir kanonik sayfa** olması ve sayfaların birbirini yememesi
(keyword cannibalization).

Yeni sayfa açmadan önce bu tabloya bakın. Buradaki bir amacı zaten karşılayan
sayfa varsa **yeni sayfa açılmaz**, mevcut sayfa güçlendirilir.

---

## 1. MONEY KEYWORDS (satın alma niyeti yüksek)

| Arama                                                                                   | Kanonik sayfa            | Neden                                                                     |
| --------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------- |
| mersin nakliyat · mersin nakliye · mersin nakliyat firması · mersin nakliye firması · nakliyeci mersin | `/`                      | Geniş şehir + sektör araması. Ana sayfa tüm hizmetleri kapsayan giriş noktası. |
| mersin evden eve nakliyat · mersin evden eve taşıma · evden eve nakliyat mersin · mersin ev taşıma · ev taşıma mersin | `/evden-eve-nakliyat`    | En güçlü ticari sayfa. Ana sayfadan **ayrı** H1/başlık ile ayrıştırıldı.   |
| mersin şehir içi nakliyat · mersin şehir içi taşıma                                       | `/evden-eve-nakliyat#sehir-ici` | Ayrı sayfa AÇILMADI. Arama amacı evden eve ile örtüşüyor; H2 bölümü olarak ele alındı. |
| mersin şehirler arası nakliyat · mersin şehirlerarası nakliyat · mersinden … nakliyat     | `/sehirler-arasi-nakliyat` | İl dışı taşımanın planlaması farklı; ayrı sayfa hak ediyor.                |
| mersin ofis taşıma · mersin işyeri taşıma · mersin ofis nakliyat                          | `/ofis-tasima`           | Farklı müşteri (kurumsal), farklı süreç.                                   |
| mersin parça eşya taşıma · mersin tek eşya taşıma · mersin beyaz eşya taşıma              | `/parca-esya-tasima`     | Farklı ölçek ve fiyatlama mantığı.                                         |
| mersin eşya paketleme · mersin paketleme hizmeti                                          | `/esya-paketleme`        | Tek başına satılabilen hizmet.                                             |

## 2. FİYAT NİYETİ (price intent)

| Arama                                                             | Kanonik sayfa                          | Nasıl karşılanıyor                                                                                     |
| ----------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| mersin evden eve nakliyat fiyatları · nakliyat fiyatları · ev taşıma fiyatı | `/evden-eve-nakliyat#fiyat`            | **Uydurma fiyat listesi YOK.** Fiyatı belirleyen gerçek etkenler tablo halinde açıklanıyor, ardından teklife yönlendiriliyor. |
| şehirler arası nakliyat fiyatları                                 | `/sehirler-arasi-nakliyat#fiyat`       | Aynı yaklaşım, rota bazlı etkenlerle.                                                                    |
| nakliyat teklif al · nakliyat fiyat teklifi                       | `/teklif-al`                           | 3 adımlı düşük sürtünmeli huni + süreç SSS'i.                                                            |

## 3. YEREL (local) ARAMALAR

| Arama                                                      | Kanonik sayfa        | Karar                                                                                                                                                  |
| ---------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mezitli nakliyat · yenişehir nakliyat · toroslar nakliyat · akdeniz nakliyat | `/hizmet-bolgeleri`  | **İlçe başına ayrı sayfa AÇILMADI.** İlçe için özgün bilgi (o bölgeye ait gerçek iş, fotoğraf, taşıma koşulu) biriktiğinde açılabilir. Aynı metnin ilçe adı değiştirilerek çoğaltılması doorway page davranışıdır. |

**İlçe sayfası açma koşulları (hepsi sağlanmalı):**

1. O ilçede gerçekten iş yapılmış olması,
2. Sayfada o ilçeye özgü, başka sayfada olmayan bilgi bulunması
   (ör. o bölgedeki bina tipi, sokak/park koşulu, tamamlanan iş fotoğrafı),
3. Search Console'da o sorgu için gösterim alınıyor olması.

## 4. ROTA (şehir → şehir) ARAMALARI

| Arama                                          | Şu anki durum                | Karar                                                                                                    |
| ---------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| mersinden istanbula nakliyat · mersin ankara nakliyat · mersin adana nakliyat | `/sehirler-arasi-nakliyat`   | **Rota sayfaları programatik olarak ÜRETİLMEDİ.** Yüzlerce kombinasyon üretmek spam davranışıdır.        |

**Rota sayfası açma koşulları:**

1. O rotada gerçekten düzenli iş yapılıyor olması,
2. Sayfada özgün bilgi olması (tipik süre, teslim planı, o rotaya özgü notlar),
3. Search Console'da o rota için gösterim/tıklama verisi olması.

## 5. BİLGİ AMAÇLI (informational) ARAMALAR

| Arama                                                                       | Kanonik sayfa                                | Ticari sayfaya bağlantısı |
| --------------------------------------------------------------------------- | -------------------------------------------- | ------------------------- |
| ev taşırken nelere dikkat edilmeli · ev taşıma kontrol listesi · taşınma öncesi yapılacaklar | `/rehber/ev-tasirken-yapilmasi-gerekenler`   | → `/evden-eve-nakliyat`   |
| nakliye firması nasıl seçilir · nakliyat firması seçerken nelere dikkat edilmeli | `/rehber/nakliye-firmasi-secerken`           | → `/evden-eve-nakliyat`   |
| eşyalar nasıl paketlenir · taşınma kolisi hazırlama · koli nasıl paketlenir  | `/rehber/esyalar-nasil-paketlenir`           | → `/esya-paketleme`       |
| asansörsüz ev nasıl taşınır · asansör yoksa nakliyat                          | `/rehber/asansorsuz-ev-nasil-tasinir`        | → `/evden-eve-nakliyat`   |
| nakliyat fiyatı nasıl hesaplanır · ev taşıma fiyatı neye göre değişir         | `/rehber/nakliyat-fiyati-nasil-hesaplanir`   | → `/evden-eve-nakliyat`   |
| şehirler arası ev nasıl taşınır · il dışına ev taşıma                         | `/rehber/sehirler-arasi-ev-tasima`           | → `/sehirler-arasi-nakliyat` |
| ofis taşırken nelere dikkat · işyeri taşıma kontrol listesi                   | `/rehber/ofis-tasirken-nelere-dikkat`        | → `/ofis-tasima`          |
| beyaz eşya nasıl taşınır · buzdolabı nasıl taşınır                            | `/rehber/beyaz-esya-nasil-tasinir`           | → `/parca-esya-tasima`    |
| öğrenci evi taşıma · dönem sonu eşya taşıma                                   | `/rehber/ogrenci-evi-nasil-tasinir`          | → `/parca-esya-tasima`    |
| taşınma günü kontrol listesi · taşınma günü neler yapılır                     | `/rehber/tasinma-gunu-kontrol-listesi`       | → `/evden-eve-nakliyat`   |

## 6. MARKA VE KURUMSAL

| Arama                            | Kanonik sayfa   |
| -------------------------------- | --------------- |
| kansu can nakliye · kansu can nakliyat | `/`             |
| kansu can nakliye iletişim/telefon | `/iletisim`     |
| kansu can nakliye hakkında       | `/hakkimizda`   |

---

## Yamyamlaşma (cannibalization) kararları — kayıt

| Karar                                                                                       | Gerekçe                                                                                                                          |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ana sayfa H1 = "Mersin Nakliyat ve Evden Eve Taşıma", money page H1 = "Mersin Evden Eve Nakliyat" | İki sayfaya aynı başlığı vermek (ör. ikisine de "Mersin Evden Eve Nakliyat") Google'ı hangi sayfayı sıralayacağı konusunda ikileme sokar. |
| `/mersin-nakliyat`, `/mersin-nakliye`, `/mersin-nakliyat-firmasi` gibi eş anlamlı URL'ler açılmadı | Hepsi aynı arama amacını karşılıyor; ayrı sayfa açmak değer üretmez, düşük kaliteli sayfa sayısını artırır.                       |
| `/sehir-ici-nakliyat` ayrı sayfa olarak açılmadı                                              | "şehir içi nakliyat" ve "evden eve nakliyat" aynı işi arıyor. Ayrı sayfa iki zayıf sayfa üretirdi; tek güçlü sayfa tercih edildi. |
| Ayrı bir `/yorumlar` sayfası açılmadı                                                          | Gerçek yorum verisi yok. Yorum toplandığında `config/reviews.ts` doldurulur; yorumlar hizmet sayfalarında karar noktalarında görünür. |

## Yeni sayfa açma kontrol listesi

Yeni bir sayfa açmadan önce şu üç sorunun **hepsine** "evet" demelisiniz:

1. Bu arama amacını karşılayan başka bir sayfam **yok** mu?
2. Bu sayfa, mevcut sayfalarda **olmayan** bilgi verecek mi?
3. Bu sayfayı arayan kişi, firmanın gerçekten yaptığı bir işi mi arıyor?

Üçünden biri "hayır" ise: yeni sayfa açmayın, mevcut sayfayı güçlendirin.
