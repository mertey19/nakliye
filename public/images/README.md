# public/images

Firmanın **gerçek** iş fotoğrafları ve ayrı tutulan tanıtım görselleri buraya konur.
Stok fotoğraf, `photos` galerisine karıştırılmaz.

Dosyalar `src/config/photos.ts` içinden referans verilir. Dosya yoksa ilgili
görsel sitede gösterilmez (kırık görsel çıkmaz).

## Gerçek iş fotoğrafları (`photos`)

| Dosya | Kullanım |
| --- | --- |
| `kansu-can-nakliye-ekip.webp` | "İşlerimizden" galerisi |

## Tanıtım / üretilmiş görseller (`promoPhotos`)

| Dosya | Kullanım |
| --- | --- |
| `kansu-can-nakliye-logo.png` | Header, footer, loader, favicon/OG |
| `tanitim-sinematik-kamyon.webp` | Varsayılan hero, marka afişi |
| `tanitim-tasinmanin-guvenli-adresi.webp` | Evden eve hero, uygun fiyat sayfası |
| `sahne-mersin-sahil.webp` | Mersin / şehirler arası / bölgeler |
| `sahne-mezitli-nakliye.webp` | Mezitli landing |
| `sahne-yenisehir-nakliye.webp` | Yenişehir landing |
| `sahne-erdemli-nakliye.webp` | Erdemli landing |
| `sahne-silifke-nakliye.webp` | Silifke landing |
| `sahne-tarsus-nakliye.webp` | Tarsus landing |
| `sahne-ofis-tasima.webp` | Ofis taşıma hero |
| `sahne-fabrika-tasima.webp` | Fabrika / ağır eşya tanıtımı |
| `sahne-arac-tasima.webp` | Motosiklet ve araç taşıma tanıtımı |
| `sahne-ofis-fabrika-arac.webp` | Ofis · fabrika · araç derleme |
| `tanitim-arac.webp`, `tanitim-yukleme.webp`, `tanitim-teslimat.webp` | Ek tanıtım şeridi |
| `kansu-can-nakliye-arac.webp` | Arşiv araç görseli |

Tanıtım görsellerinin `alt` metni "Tanıtım görseli" ifadesini taşır; bunlar
tamamlanmış iş fotoğrafı gibi sunulmaz.

## Ölçü ve format

- Tercihen `.webp`. Uzun kenar 1600 px yeterli.
- 400 KB üzerindeki dosyaları sıkıştırın.
