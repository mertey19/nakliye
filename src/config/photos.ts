/**
 * GERÇEK İŞ FOTOĞRAFLARI
 * ======================
 * Dizi BOŞ olduğu sürece galeri bölümü GÖRÜNMEZ.
 * Buraya SADECE firmaya ait gerçek fotoğraflar eklenir. Stok fotoğraf kullanılmaz.
 *
 * Dosyalar /public/images/ altına konur. Önerilen adlandırma:
 *   kansu-can-nakliye-arac.webp
 *   kansu-can-nakliye-ekip.webp
 *   evden-eve-nakliyat.webp
 *   esya-paketleme.webp
 *
 * alt metni fotoğrafta GERÇEKTEN ne varsa onu anlatmalı; anahtar kelime doldurulmaz.
 */
export type Photo = {
  /** /images/... ile başlayan yol */
  src: string;
  /** Fotoğrafta gerçekten görüneni anlatan alt metni */
  alt: string;
  width: number;
  height: number;
  /** Opsiyonel kısa açıklama */
  caption?: string;
};

export const photos: Photo[] = [];

/**
 * HERO FOTOĞRAFI — firmanın kendi aracının/işinin fotoğrafı.
 * null olduğu sürece hero'da STOK GÖRSEL KULLANILMAZ; yerine marka plakası
 * (koyu panel) gösterilir. Gerçek fotoğraf eklendiğinde hero otomatik olarak
 * iki sütunlu görselli düzene geçer.
 *
 * Örnek:
 *   export const heroPhoto: Photo | null = {
 *     src: "/images/kansu-can-nakliye-arac.webp",
 *     alt: "Kansu Can Nakliye taşıma aracı",
 *     width: 1200,
 *     height: 900,
 *   };
 */
export const heroPhoto: Photo | null = null;
