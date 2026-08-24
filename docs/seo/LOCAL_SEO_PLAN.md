# Yerel SEO Planı — Kansu Can Nakliyat

**Hedef:** Google'ın Kansu Can Nakliyat'ı *Mersin'de faaliyet gösteren gerçek
ve güvenilir bir nakliyat işletmesi* olarak anlaması.

> Sıralama garantisi verilemez. Bu plan, sıralamayı belirleyen sinyalleri
> gerçek veriyle güçlendirmeye yöneliktir.

---

## 1. Varlık (entity) sinyalleri — durum

| Sinyal | Durum | Not |
| --- | --- | --- |
| İşletme adı tutarlılığı | ✅ | Site = GBP = "Kansu Can Nakliyat" |
| Telefon tutarlılığı | ✅ | 0546 419 90 07 (site, GBP, görseller) |
| Adres | ✅ | Çiftlikköy, 3201. Sk. No:15, Yenişehir/Mersin |
| Koordinat (geo) | ✅ | 36.7680863, 34.5484853 |
| GBP ↔ site bağı | ✅ | `sameAs` içinde GBP cid bağlantısı |
| Instagram ↔ site bağı | ✅ | `sameAs` |
| Logo / görsel | ✅ | `logo` + gerçek araç ve ekip fotoğrafı |
| Hizmet bölgeleri | ✅ | Mersin + 4 merkez ilçe (`areaServed`) |
| Çalışma saatleri | ❌ | GBP'ye ve `business.ts`'ye girilmeli |
| Gerçek yorumlar | ❌ | Hiç yok — en büyük eksik |
| Yorum bırakma linki | ❌ | `googleReviewUrl` boş |
| Ticari unvan | ❌ | `legalName` boş |
| Sigorta teyidi | ❌ | Görsellerde yazıyor, teyit edilmedi |

---

## 2. Öncelik sırası

### P0 — Bu hafta

1. **Araçtaki alan adını düzeltin.** Araç ve tanıtım görsellerinde
   `www.kansucannakliye.com` yazıyor; bu alan adı **kayıtlı değil.**
   Aracı görüp adresi elle yazan müşteri hiçbir yere ulaşamıyor.
   - Kısa vadeli çözüm: `kansucannakliye.com` alan adını alın ve
     `www.kansucannakliye.com.tr`ye 301 yönlendirin (yıllık birkaç yüz lira).
   - Uzun vadeli: araç kaplaması yenilenirken `.com.tr` yazılsın.
2. **Çalışma saatlerini girin** (GBP + `business.ts`).
3. **Yorum toplamaya başlayın** (aşağıdaki süreç).

### P1 — Bu ay

4. GBP'yi eksiksiz doldurun → `GOOGLE_BUSINESS_PROFILE_CHECKLIST.md`
5. GBP web sitesi alanına UTM'li adresi girin.
6. Gerçek iş fotoğraflarını hem GBP'ye hem siteye ekleyin.
7. Search Console'da sitemap gönderin → `SEARCH_CONSOLE_SETUP.md`
8. Instagram kullanıcı adını marka yazımıyla hizalayın.

### P2 — 2-3. ay

9. Yerel dizin kayıtları → `LOCAL_BACKLINK_PLAN.md`
10. Search Console sorgu verisine göre içerik/başlık iyileştirmesi.
11. Sigorta durumu netleşirse siteye ve GBP'ye ekleyin.

### P3 — 3. ay ve sonrası

12. Veriyle kanıtlanmış ilçe sayfaları (koşullar `KEYWORD_MAP.md`'de).
13. Gerçekten iş yapılan rotalar için rota sayfaları.
14. Yerel iş birlikleri ve referans bağlantıları.

---

## 3. Yorum toplama süreci

Yorumlar, yerel sıralamada ve tıklama oranında en güçlü ikinci sinyaldir.
Şu an **sıfır** yorum var; her yeni yorum belirgin fark yaratır.

### Kurulum

1. GBP panelinden **yorum bırakma kısa linkini** alın
   (Profil → Yorum iste → bağlantıyı kopyala).
2. Bu linki `src/config/business.ts` → `googleReviewUrl` alanına girin.
   Girildiğinde sitede "Google'da yorum bırakın" bağlantısı otomatik açılır.

### Mesaj şablonu (taşıma bittikten sonra WhatsApp)

```
Merhaba [Ad],
bugünkü taşımanız için bizi tercih ettiğiniz teşekkür ederiz.
Hizmetimizden memnun kaldıysanız deneyiminizi Google'da paylaşmanız
bize çok yardımcı olur:

[yorum linki]

İyi günler dileriz.
Kansu Can Nakliyat
```

### Kurallar

- Taşıma **bittikten sonra**, aynı gün veya ertesi gün gönderin.
- Herkese gönderin; sadece memnun göründüğü tahmin edilenlere değil.
- **Yorumun olumlu olmasını şart koşmayın.** İndirim/hediye karşılığı yorum
  istemek Google politikası ihlalidir.
- Aynı cihazdan/IP'den toplu yorum yazdırmayın; kayıt askıya alınır.
- Sahte yorum, satın alınmış yorum, bot yorum: **kesinlikle yok.**

### Yorumlara cevap

Her yoruma cevap verin. **Normal insan gibi**, anahtar kelime doldurmadan.

✅ İyi:
> Teşekkür ederiz Ahmet Bey. Asansörsüz kata rağmen günü sarkıtmadan
> bitirebildiğimize sevindik. Yeni evinizde bol şans dileriz.

❌ Kötü:
> Mersin nakliyat firmamız Mersin evden eve nakliyat konusunda Mersin'in
> en iyi hizmetini sunmaktadır...

**Olumsuz yorumda:** savunmaya geçmeyin, somut olun, çözümü yazın. Olumsuz bir
yoruma verilen iyi cevap, on olumlu yorumdan daha ikna edicidir.

### Yorumları siteye taşıma

Gerçek yorumlar geldikçe `src/config/reviews.ts` dosyasına ekleyin.
Eklendiğinde sitede yorum bölümü ve yapısal veride `review` /
`aggregateRating` **otomatik** açılır. Dizi boşken hiçbiri üretilmez —
sahte puan riski kod düzeyinde engellenmiştir.

---

## 4. Yerel içerik

Mevcut yerel içerik: `/hizmet-bolgeleri` (tek güçlü sayfa).

İlçe sayfaları **bilinçli olarak açılmadı**: aynı metnin ilçe adı
değiştirilerek çoğaltılması doorway page davranışıdır ve uzun vadede
sıralamayı düşürür.

**Açma koşulu:** Search Console'da "mezitli nakliyat" gibi bir sorgu için
gösterim almaya başladığınızda VE o ilçede gerçek iş fotoğrafı/vaka
biriktiğinde açılır. Koşullar `KEYWORD_MAP.md`'de.

---

## 5. Ölçüm

| Soru | Nereden |
| --- | --- |
| Haritalar'da kaç kez göründük? | GBP → Performans → Arama sayısı |
| Kaç yol tarifi istendi? | GBP → Performans → Yol tarifi |
| GBP'den kaç telefon geldi? | GBP → Performans → Aramalar |
| GBP'den siteye kaç kişi geldi? | GA4 → Kampanya = `gbp` |
| Organik hangi sorgudan geliyoruz? | Search Console → Sorgular |
| Dönüşüm oldu mu? | GA4 → `phone_click`, `whatsapp_click`, `quote_form_success` |

**Aylık kontrol:** GBP Performans + Search Console Performans + GA4 dönüşüm
olayları. Üçünü birlikte bakın; tek başına hiçbiri resmi vermez.
