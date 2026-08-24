/**
 * GERÇEK İŞ FOTOĞRAFLARI
 * ======================
 * Buraya SADECE firmaya ait gerçek görseller girilir. Stok fotoğraf kullanılmaz.
 *
 * ÖNEMLİ: Bu dosya yalnızca "hangi görseller olmalı" listesidir. Dosya
 * `public/` altında GERÇEKTEN yoksa ilgili görsel sitede GÖSTERİLMEZ
 * (bkz. src/lib/photos.server.ts). Böylece dosya eklenmeden kırık görsel
 * yayınlanmaz; dosyayı klasöre bırakmak yayına almak için yeterlidir.
 *
 * Dosyalar `public/images/` altına konur. En/boy oranı serbesttir; kartlar
 * sabit oranlı kutu kullandığı için hangi ölçüde olursa olsun CLS oluşmaz.
 *
 * alt metni fotoğrafta GERÇEKTEN ne varsa onu anlatır; anahtar kelime
 * doldurulmaz.
 */
export type Photo = {
  /** /images/... ile başlayan yol (public/ köküne göre) */
  src: string;
  /** Fotoğrafta gerçekten görüneni anlatan alt metni */
  alt: string;
  /** Opsiyonel kısa açıklama (galeride kartın altında görünür) */
  caption?: string;
};

/**
 * "İşlerimizden" galerisi.
 * Dosya eklendikçe bu listeye satır eklenir.
 */
export const photos: Photo[] = [
  {
    src: "/images/kansu-can-nakliye-ekip.webp",
    alt: "Kansu Can Nakliye ekibi, taşıma aracının önünde el sıkışırken",
    caption: "Teslimat sonrası — Mersin",
  },
];

/**
 * TANITIM GÖRSELLERİ
 * ==================
 * Firmanın kendi pazarlama grafikleri (afiş/poster). Bunlar TAMAMLANMIŞ İŞ
 * FOTOĞRAFI DEĞİLDİR; kompozit/üretilmiş görsellerdir. Bu yüzden bilinçli
 * olarak `photos` listesinden AYRI tutulur ve sitede "İşlerimizden" değil,
 * "Tanıtım Görsellerimiz" başlığı altında gösterilir.
 *
 * Sebep: ziyaretçi bir görseli "sizin yaptığınız taşıma" sanıp gerçekte
 * farklısıyla karşılaşırsa güven, tam da kazanılması gereken anda kırılır.
 * Etiketi doğru koymak hem dürüst hem de uzun vadede daha çok dönüşüm getirir.
 *
 * alt metni, görselin bir tanıtım grafiği olduğunu belirtir — ekran okuyucu
 * kullanan ziyaretçi de neye baktığını bilir.
 */
export const promoPhotos: Photo[] = [
  {
    src: "/images/tanitim-arac.webp",
    alt: "Kansu Can Nakliye tanıtım görseli: firma aracı ile ev, ofis ve şehirler arası taşıma hizmetleri",
    caption: "Ev · Ofis · Şehirler arası",
  },
  {
    src: "/images/tanitim-yukleme.webp",
    alt: "Kansu Can Nakliye tanıtım görseli: üniformalı ekip kutuları araca yüklerken",
    caption: "Paketleme ve yükleme",
  },
  {
    src: "/images/tanitim-teslimat.webp",
    alt: "Kansu Can Nakliye tanıtım görseli: ekip üyesi ev önünde müşteriyle el sıkışırken",
    caption: "Evden eve taşıma",
  },
];

/**
 * HERO FOTOĞRAFI — ana sayfa ve hizmet sayfalarının üst bölümünde kullanılır.
 *
 * `null` bırakılırsa ya da dosya bulunamazsa hero'da STOK GÖRSEL KULLANILMAZ;
 * yerine koyu marka plakası gösterilir.
 */
export const heroPhoto: Photo | null = {
  src: "/images/kansu-can-nakliye-arac.webp",
  alt: "Kansu Can Nakliye taşıma aracı, üzerinde firma logosu ve iletişim bilgileri",
};
