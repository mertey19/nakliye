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
 * HERO FOTOĞRAFI — ana sayfa ve hizmet sayfalarının üst bölümünde kullanılır.
 *
 * `null` bırakılırsa ya da dosya bulunamazsa hero'da STOK GÖRSEL KULLANILMAZ;
 * yerine koyu marka plakası gösterilir.
 */
export const heroPhoto: Photo | null = {
  src: "/images/kansu-can-nakliye-arac.webp",
  alt: "Kansu Can Nakliye taşıma aracı, üzerinde firma logosu ve iletişim bilgileri",
};
