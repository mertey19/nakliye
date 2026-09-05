/**
 * GÖRSEL KAYITLARI
 * photos = gerçek iş fotoğrafı (galeri).
 * promoPhotos = tanıtım / üretilmiş görseller — "İşlerimizden"e karışmaz.
 */

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

export const photos: Photo[] = [
  {
    src: "/images/kansu-can-nakliye-ekip.webp",
    alt: "Kansu Can Nakliyat ekibi, taşıma aracının önünde el sıkışırken",
    caption: "Teslimat sonrası — Mersin",
  },
];

export const promoPhotos: Photo[] = [
  {
    src: "/images/tanitim-sinematik-kamyon.webp",
    alt: "Tanıtım görseli: gün batımında Mersin sahil yolunda Kansu Can Nakliye kamyonu",
    caption: "Sinematik marka afişi",
  },
  {
    src: "/images/tanitim-tasinmanin-guvenli-adresi.webp",
    alt: "Tanıtım görseli: Taşınmanın Güvenli Adresi başlıklı marka afişi ve taşıma aracı",
    caption: "Taşınmanın güvenli adresi",
  },
  {
    src: "/images/sahne-mersin-sahil.webp",
    alt: "Tanıtım görseli: Mersin sahil yolunda palmiyeler arasında markalı nakliye kamyonu",
    caption: "Mersin sahil hattı",
  },
  {
    src: "/images/sahne-mezitli-nakliye.webp",
    alt: "Tanıtım görseli: Mezitli sahil siteleri önünde markalı kamyon ve yükleme",
    caption: "Mezitli",
  },
  {
    src: "/images/sahne-yenisehir-nakliye.webp",
    alt: "Tanıtım görseli: Yenişehir konut sokağında markalı kamyon ve ekip",
    caption: "Yenişehir",
  },
  {
    src: "/images/sahne-erdemli-nakliye.webp",
    alt: "Tanıtım görseli: Erdemli sahil atmosferinde markalı nakliye kamyonu",
    caption: "Erdemli",
  },
  {
    src: "/images/sahne-silifke-nakliye.webp",
    alt: "Tanıtım görseli: Silifke yaklaşımında markalı nakliye kamyonu",
    caption: "Silifke",
  },
  {
    src: "/images/sahne-tarsus-nakliye.webp",
    alt: "Tanıtım görseli: Tarsus sokaklarında markalı kamyon ve taşınan koltuk",
    caption: "Tarsus",
  },
  {
    src: "/images/sahne-ofis-tasima.webp",
    alt: "Tanıtım görseli: Mersin ofis lobisinde markalı kamyon ve ofis taşıma ekibi",
    caption: "Ofis taşıma",
  },
  {
    src: "/images/sahne-fabrika-tasima.webp",
    alt: "Tanıtım görseli: fabrika rampasında forklift ve markalı nakliye kamyonu",
    caption: "Fabrika taşıma",
  },
  {
    src: "/images/sahne-arac-tasima.webp",
    alt: "Tanıtım görseli: Mersin sahil yolunda motosiklet ve araç taşıma kamyonu",
    caption: "Araç taşıma",
  },
  {
    src: "/images/sahne-ofis-fabrika-arac.webp",
    alt: "Tanıtım görseli: ofis, fabrika ve motosiklet taşıma sahneleri bir arada",
    caption: "Ofis · Fabrika · Araç",
  },
  {
    src: "/images/tanitim-arac.webp",
    alt: "Kansu Can Nakliyat tanıtım görseli: firma aracı ile ev, ofis ve şehirler arası taşıma hizmetleri",
    caption: "Ev · Ofis · Şehirler arası",
  },
  {
    src: "/images/tanitim-yukleme.webp",
    alt: "Kansu Can Nakliyat tanıtım görseli: üniformalı ekip kutuları araca yüklerken",
    caption: "Paketleme ve yükleme",
  },
  {
    src: "/images/tanitim-teslimat.webp",
    alt: "Kansu Can Nakliyat tanıtım görseli: ekip üyesi ev önünde müşteriyle el sıkışırken",
    caption: "Evden eve taşıma",
  },
];

export const heroPhoto: Photo | null = {
  src: "/images/tanitim-sinematik-kamyon.webp",
  alt: "Tanıtım görseli: Kansu Can Nakliye kamyonu, Mersin sahil gün batımında",
};

export const locationScenePhotos: Record<string, string> = {
  "mersin-nakliye": "/images/sahne-mersin-sahil.webp",
  "mezitli-nakliye": "/images/sahne-mezitli-nakliye.webp",
  "yenisehir-nakliye": "/images/sahne-yenisehir-nakliye.webp",
  "erdemli-nakliye": "/images/sahne-erdemli-nakliye.webp",
  "silifke-nakliye": "/images/sahne-silifke-nakliye.webp",
  "tarsus-nakliye": "/images/sahne-tarsus-nakliye.webp",
  "mersin-ucuz-nakliye": "/images/tanitim-tasinmanin-guvenli-adresi.webp",
};

export const serviceHeroPhotos: Record<string, string> = {
  "evden-eve-nakliyat": "/images/tanitim-tasinmanin-guvenli-adresi.webp",
  "sehirler-arasi-nakliyat": "/images/sahne-mersin-sahil.webp",
  "ofis-tasima": "/images/sahne-ofis-tasima.webp",
  "parca-esya-tasima": "/images/tanitim-yukleme.webp",
  "esya-paketleme": "/images/tanitim-yukleme.webp",
};

export const featuredPromoPhotos: string[] = [
  "/images/tanitim-sinematik-kamyon.webp",
  "/images/tanitim-tasinmanin-guvenli-adresi.webp",
  "/images/sahne-mersin-sahil.webp",
  "/images/sahne-ofis-tasima.webp",
];
