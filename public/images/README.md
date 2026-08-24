# public/images

Firmanın **gerçek** görselleri buraya konur. Stok fotoğraf kullanılmaz.

Bu klasördeki dosyalar `src/config/photos.ts` içinden referans verilir.
Dosya burada YOKSA ilgili görsel sitede **gösterilmez** (kırık görsel çıkmaz);
dosyayı bu klasöre bırakmak yayına almak için yeterlidir.

## Şu an beklenen dosyalar

| Dosya | Nerede kullanılır | İçerik |
| --- | --- | --- |
| `kansu-can-nakliye-arac.webp` | Ana sayfa ve hizmet sayfalarının hero görseli | Firma logosu ve iletişim bilgisi taşıyan araç |
| `kansu-can-nakliye-ekip.webp` | "İşlerimizden" galerisi | Ekip, aracın önünde |

Dosya adları birebir bu şekilde olmalı. Farklı ad kullanacaksanız
`src/config/photos.ts` içindeki `src` değerlerini de güncelleyin.

## Ölçü ve format

- En/boy oranı **serbest**. Kartlar sabit oranlı kutu kullandığı için hangi
  ölçüde olursa olsun düzen kaymaz (CLS oluşmaz).
- Tercihen `.webp`. Uzun kenar 1600 px yeterli; daha büyüğü gereksiz yük.
- 400 KB üzerindeki dosyaları sıkıştırın (mobil ilk yükleme süresi).

## Adlandırma kuralı

Dosya adına anahtar kelime doldurulmaz. `alt` metni fotoğrafta gerçekten
ne görünüyorsa onu anlatır — `photos.ts` içinde tanımlıdır.
