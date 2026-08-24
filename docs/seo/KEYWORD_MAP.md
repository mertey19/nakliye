# Anahtar Kelime → Sayfa Haritası

**Kural:** Her arama amacının **tek** birincil sayfası vardır. Aynı sorgu için
iki sayfa yarıştırılmaz (keyword cannibalization).

Yeni sayfa açmadan önce bu tabloya bakın. Buradaki bir amacı zaten karşılayan
sayfa varsa **yeni sayfa açılmaz**, mevcut sayfa güçlendirilir.

---

## Birincil eşleme

| Anahtar kelime kümesi | Arama amacı | İniş sayfası | Durum | Öncelik |
| --- | --- | --- | --- | --- |
| mersin nakliye · mersin nakliyat · mersin nakliyat firması · mersin nakliye firması · mersin taşımacılık · mersin nakliyeci · mersin taşıma şirketi | Ticari, geniş (şehir + sektör) | `/` | Mevcut | **P0** |
| mersin evden eve nakliyat · mersin evden eve nakliye · mersin ev taşıma · mersin ev taşıma firması · mersin eşya taşıma · mersin şehir içi nakliyat | Ticari, en yüksek niyet | `/evden-eve-nakliyat` | Mevcut | **P0** |
| mersin şehirler arası nakliyat · mersinden … nakliyat · şehirler arası ev taşıma mersin | Ticari | `/sehirler-arasi-nakliyat` | Mevcut | P1 |
| mersin ofis taşıma · mersin işyeri taşıma · mersin ofis nakliyat | Ticari (kurumsal) | `/ofis-tasima` | Mevcut | P1 |
| mersin parça eşya taşıma · mersin tek eşya taşıma · beyaz eşya taşıma mersin | Ticari (küçük ölçek) | `/parca-esya-tasima` | Mevcut | P1 |
| mersin eşya paketleme · mersin paketleme hizmeti · taşınma paketleme | Ticari (yardımcı) | `/esya-paketleme` | Mevcut | P2 |
| mersin nakliyat hizmet bölgeleri · yenişehir/mezitli/toroslar/akdeniz nakliyat | Yerel | `/hizmet-bolgeleri` | Mevcut | P1 |
| nakliyat teklif al · mersin nakliyat fiyat teklifi | İşlem | `/teklif-al` | Mevcut | **P0** |

## Fiyat niyeti (price intent)

| Anahtar kelime | İniş sayfası | Nasıl karşılanıyor |
| --- | --- | --- |
| mersin nakliyat fiyatları · mersin evden eve nakliyat fiyatları · ev taşıma fiyatı | `/evden-eve-nakliyat#fiyat` | **Uydurma fiyat listesi YOK.** Fiyatı belirleyen gerçek etkenler tablo halinde; ardından teklife yönlendirme. |
| şehirler arası nakliyat fiyatları | `/sehirler-arasi-nakliyat#fiyat` | Rota bazlı etkenlerle aynı yaklaşım. |
| uygun mersin nakliyat · ucuz nakliyat | — | **Ayrı sayfa açılmadı.** "En ucuz" iddiası doğrulanamaz; fiyat bölümleri bu niyeti dürüstçe karşılıyor. |

## Bilgi amaçlı (rehber)

| Anahtar kelime | İniş sayfası | Beslediği ticari sayfa |
| --- | --- | --- |
| ev taşırken nelere dikkat edilmeli · taşınma kontrol listesi | `/rehber/ev-tasirken-yapilmasi-gerekenler` | `/evden-eve-nakliyat` |
| nakliye firması nasıl seçilir · nakliyat firması seçerken | `/rehber/nakliye-firmasi-secerken` | `/evden-eve-nakliyat` |
| eşyalar nasıl paketlenir · koli nasıl hazırlanır | `/rehber/esyalar-nasil-paketlenir` | `/esya-paketleme` |
| asansörsüz ev nasıl taşınır · asansör yoksa nakliyat · asansörsüz bina taşınma | `/rehber/asansorsuz-ev-nasil-tasinir` | `/evden-eve-nakliyat` |

## Marka

| Anahtar kelime | İniş sayfası |
| --- | --- |
| kansu can nakliyat · kansu can nakliye | `/` |
| kansu can nakliyat telefon / iletişim | `/iletisim` |
| kansu can nakliyat hakkında | `/hakkimizda` |

> `alternateName` yapısal veride bildirildiği için "kansu can **nakliye**"
> araması da işletmeyle eşleşir. Araç, Instagram ve eski alan adı bu yazımı
> kullanıyor.

---

## Yamyamlaşma kararları (kayıt)

| Karar | Gerekçe |
| --- | --- |
| Ana sayfa H1 "Mersin Nakliyat ve Evden Eve Taşıma", money page H1 "Mersin Evden Eve Nakliyat" | İkisine aynı başlığı vermek Google'ı hangi sayfayı sıralayacağı konusunda ikileme sokar. |
| `/sehir-ici-nakliyat` açılmadı | "şehir içi nakliyat" ile "evden eve nakliyat" aynı işi arıyor. Ayrı sayfa iki zayıf sayfa üretirdi; `/evden-eve-nakliyat#sehir-ici` H2 bölümü olarak ele alındı. |
| `/mersin-nakliyat`, `/mersin-nakliye` gibi eş anlamlı URL'ler açılmadı | Hepsi ana sayfanın amacını tekrar eder; index bloat üretir. |
| İlçe sayfaları açılmadı | İlçeye özgü gerçek veri yok. Koşullar aşağıda. |
| Rota sayfaları açılmadı | O rotalarda iş yapıldığı doğrulanmadı. |
| `/yorumlar` açılmadı | Gerçek yorum verisi yok. |

---

## Yeni sayfa açma eşiği

Üç sorunun **hepsine** "evet" gerekir:

1. Bu arama amacını karşılayan başka sayfam **yok** mu?
2. Bu sayfa mevcut sayfalarda **olmayan** bilgi verecek mi?
3. Bu sayfayı arayan kişi, firmanın **gerçekten yaptığı** bir işi mi arıyor?

### İlçe sayfası için ek koşullar (hepsi gerekli)

1. O ilçede gerçekten iş yapılmış olması,
2. Sayfada o ilçeye özgü, başka sayfada olmayan bilgi bulunması
   (bina tipi, sokak/park koşulu, tamamlanan iş fotoğrafı),
3. Search Console'da o sorgu için gösterim alınıyor olması.

### Rota sayfası için ek koşullar (hepsi gerekli)

1. O rotada düzenli iş yapılıyor olması,
2. Tipik süre, teslim planı gibi özgün bilgi verilebilmesi,
3. Search Console'da o rota için gösterim/tıklama verisi olması.

---

## Takip edilecek sorgular (Search Console)

Aylık: gösterim · tıklama · CTR · ortalama konum

```
mersin nakliyat
mersin nakliye
mersin evden eve nakliyat
mersin evden eve nakliye
mersin nakliyat firması
mersin şehirler arası nakliyat
mersin ofis taşıma
mersin parça eşya taşıma
kansu can nakliyat
```
