# Google İşletme Profili — Kontrol Listesi

Bu liste **işletme sahibi tarafından** Google İşletme Profili panelinde
yapılacak işleri içerir. Kod tarafından değiştirilemez.

Mevcut kayıt: `https://www.google.com/maps?cid=12748944597433871515`
(sitede `sameAs` ile bildiriliyor)

> **Yerel SEO'da en güçlü tek sinyal Google İşletme Profili'dir.** Web sitesi
> bu kaydı destekler, yerine geçmez.

---

## 1. Kimlik tutarlılığı (NAP) — EN KRİTİK

Aşağıdaki üç değer GBP'de, sitede ve her dizinde **harfi harfine aynı** olmalı.

| Alan | Doğru değer |
| --- | --- |
| İşletme adı | `Kansu Can Nakliyat` |
| Telefon | `0546 419 90 07` |
| Adres | `Çiftlikköy, 3201. Sk. No:15, 33150 Yenişehir / Mersin` |
| Web sitesi | `https://www.kansucannakliye.com.tr` |

- [ ] GBP'deki isim tam olarak **Kansu Can Nakliyat** mı? (Sitedeki değerle karşılaştır)
- [ ] Telefon birebir aynı mı?
- [ ] Adres birebir aynı mı?

> ❌ **İsme anahtar kelime EKLEMEYİN.**
> `Kansu Can Nakliyat Mersin Evden Eve En Ucuz Nakliyat` gibi bir isim Google
> politikalarını ihlal eder; rakip ihbarıyla kayıt askıya alınabilir.

### Marka yazımı uyuşmazlığı — çözülmesi gereken

| Nerede | Yazım |
| --- | --- |
| Google İşletme Profili | Kansu Can **Nakliyat** |
| Site | Kansu Can **Nakliyat** ✅ |
| Araç kaplaması | Kansu Can **Nakliye** |
| Instagram | kansucan_**nakliye**33 |
| Alan adı | kansucan**nakliye**.com.tr |

Site şu an GBP ile hizalı ve ikinci yazımı `alternateName` olarak bildiriyor.
Kalıcı çözüm: **birinde birleşmek.** Araç kaplaması basılı olduğu için en
düşük maliyetli yol Instagram kullanıcı adını `kansucan_nakliyat33` yapmaktır.

---

## 2. Kategoriler

- [ ] **Birincil kategori:** `Nakliyat şirketi` (Moving company)
- [ ] İkincil kategoriler — **yalnızca gerçekten yapılan işler:**
  - `Nakliye hizmeti` / `Kurye hizmeti` (yapılıyorsa)
  - `Depolama tesisi` (depolama hizmeti **veriliyorsa**)

> Vermediğiniz bir hizmetin kategorisini eklemeyin. Yanlış kategori, alakasız
> aramalarda gösterilip CTR'yi ve profil kalitesini düşürür.

---

## 3. Hizmetler

GBP'ye sitedeki hizmetlerle **aynı adlarla** ekleyin:

- [ ] Evden Eve Nakliyat
- [ ] Şehirler Arası Nakliyat
- [ ] Ofis Taşıma
- [ ] Parça Eşya Taşıma
- [ ] Eşya Paketleme

Her hizmete kısa açıklama yazın (sitedeki özet cümleleri kullanılabilir).

---

## 4. Hizmet bölgesi

- [ ] Mersin
- [ ] Akdeniz
- [ ] Mezitli
- [ ] Toroslar
- [ ] Yenişehir

Sitedeki `serviceAreas` ile aynı olmalı. Merkez dışına da gidiyorsanız
(Tarsus, Erdemli vb.) hem GBP'ye hem `src/config/business.ts`'ye ekleyin.

---

## 5. Çalışma saatleri — ŞU AN EKSİK

- [ ] GBP'de gerçek çalışma saatlerini girin
- [ ] Aynı saatleri `src/config/business.ts` → `openingHours` alanına girin

Girildiğinde sitede çalışma saatleri bölümü ve yapısal veride
`openingHoursSpecification` otomatik olarak açılır. Şu an ikisi de gizli.

> Tatil/özel gün saatlerini de girin. Google, kapalıyken "açık" görünen
> işletmelerin profil kalitesini düşürür.

---

## 6. Web sitesi bağlantısı — UTM'li girin

```
https://www.kansucannakliye.com.tr/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Böylece Haritalar'dan gelen trafiği GA4'te ayırt edebilirsiniz. Bu parametreler
kanonik URL'lere **girmez** (kodda engellendi).

- [ ] GBP web sitesi alanına UTM'li adres girildi

---

## 7. Fotoğraflar

- [ ] **Logo:** site ikonuyla aynı KC monogramı
- [ ] **Kapak:** markalı araç fotoğrafı
- [ ] **Araç fotoğrafları:** en az 3
- [ ] **Ekip fotoğrafları:** en az 2
- [ ] **İş fotoğrafları:** yükleme, paketleme, teslim — her tamamlanan işten 1-2 kare
- [ ] Fotoğrafları **düzenli** ekleyin (ayda birkaç kare), tek seferde 50 tane değil

> Gerçek iş fotoğrafı, bu sektörde rakiplerin çoğunda eksik olan sinyaldir.
> Aynı fotoğrafları `src/config/photos.ts` → `photos` dizisine ekleyerek
> sitedeki "İşlerimizden" bölümünde de yayınlayabilirsiniz.

---

## 8. Açıklama

Sitedeki "Hakkımızda" diliyle tutarlı, anahtar kelime doldurmadan yazın.
Örnek çerçeve:

> Kansu Can Nakliyat, Mersin'de evden eve nakliyat, ofis taşıma, parça eşya
> taşıma ve eşya paketleme hizmeti verir. Taşınma öncesinde eşya miktarı, kat
> ve asansör durumu netleştirilir; iş saat programına bağlanır. Şehir içi ve
> şehirler arası taşımalar aynı ekip tarafından planlanır.

❌ Şunları yazmayın: "Mersin'in en iyi/en ucuz nakliyat firması",
"%100 hasarsız", doğrulanmamış yıl/müşteri sayısı.

---

## 9. Soru-Cevap

Sitedeki SSS'lerden 4-5 tanesini GBP Soru-Cevap bölümüne ekleyin:

- [ ] Nakliyat fiyatı nasıl belirleniyor?
- [ ] Taşınmadan kaç gün önce iletişime geçmeliyim?
- [ ] Eşyaları kim paketliyor?
- [ ] Asansör olmayan binalarda taşıma yapılıyor mu?
- [ ] Şehirler arası taşıma yapıyor musunuz?

Cevaplar sitedekiyle çelişmemeli.

---

## 10. Gönderiler (Posts)

- [ ] Ayda 2-4 gönderi: tamamlanan iş, hizmet tanıtımı, sezonluk hatırlatma
- [ ] Her gönderide "Teklif al" veya "Ara" düğmesi

---

## 11. Mesajlaşma

- [ ] GBP mesajlaşma açık mı? Açıksa **hızlı yanıtlayın**; yavaş yanıt profil
      kalitesini düşürür. Yanıtlayamayacaksanız kapatın.

---

## Aylık rutin (15 dakika)

1. Yeni fotoğraf ekle (1-3 kare)
2. Yeni yorumları yanıtla
3. Soru-Cevap'ta yeni soru var mı bak
4. GBP Performans: arama sayısı, yol tarifi isteği, telefon tıklaması
5. Çalışma saatleri hâlâ doğru mu
