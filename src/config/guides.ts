import { business } from "./business";

export type GuideDef = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  /** Liste kartındaki özet */
  summary: string;
  /** ISO tarih — makale güncellendikçe elle güncellenir */
  updated: string;
  /** Bu rehberin doğal olarak yönlendirdiği ticari sayfa */
  ctaServiceSlug: string;
  readingMinutes: number;
};

/**
 * REHBERLER — gerçek müşteri sorularına cevap veren az sayıda, işe yarar içerik.
 * Trafik için değil, taşınma niyeti olan kullanıcıyı hizmete bağlamak için var.
 */
export const guides: GuideDef[] = [
  {
    slug: "ev-tasirken-yapilmasi-gerekenler",
    title: `Ev Taşırken Yapılması Gerekenler | ${business.name}`,
    h1: "Ev Taşırken Yapılması Gerekenler",
    description:
      "Taşınmadan 4 hafta önce başlayan gerçekçi bir kontrol listesi: abonelikler, paketleme sırası, taşınma günü ve yeni evde ilk gün. Adım adım anlatım.",
    summary:
      "Taşınmadan 4 hafta öncesinden yeni evdeki ilk güne kadar sırayla ne yapılmalı?",
    updated: "2026-08-23",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
  },
  {
    slug: "nakliye-firmasi-secerken",
    title: `Nakliye Firması Nasıl Seçilir? | ${business.name}`,
    h1: "Nakliye Firması Seçerken Nelere Dikkat Edilmeli?",
    description:
      "Telefonda sorulması gereken sorular, tekliflerin neden farklı çıktığı ve düşük fiyatın hangi durumda risk olduğu. Nakliye firması seçerken kullanabileceğiniz pratik kriterler.",
    summary:
      "Teklifleri karşılaştırırken hangi soruları sormalı, düşük fiyat ne zaman risk?",
    updated: "2026-08-23",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 5,
  },
  {
    slug: "asansorsuz-ev-nasil-tasinir",
    title: `Asansörsüz Ev Nasıl Taşınır? | ${business.name}`,
    h1: "Asansörsüz Ev Nasıl Taşınır?",
    description:
      "Asansörsüz binada taşınma süreci nasıl planlanır, hangi eşyalar merdivenden çıkmaz, süre ve maliyet ne kadar artar? Taşınmadan önce bilmeniz gereken pratik bilgiler.",
    summary:
      "Asansör yoksa taşıma nasıl planlanır, hangi eşyalar sorun çıkarır, süre ne kadar uzar?",
    updated: "2026-08-24",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
  },
  {
    slug: "esyalar-nasil-paketlenir",
    title: `Eşyalar Nasıl Paketlenir? | ${business.name}`,
    h1: "Eşyalar Nasıl Paketlenir?",
    description:
      "Mutfak, yatak odası, salon ve elektronik eşyalar için oda oda paketleme yöntemleri, doğru malzeme seçimi ve kutu etiketleme. Kırılan eşya sayısını azaltan pratik yöntemler.",
    summary:
      "Mutfaktan elektroniğe oda oda paketleme yöntemi, malzeme seçimi ve etiketleme.",
    updated: "2026-08-23",
    ctaServiceSlug: "esya-paketleme",
    readingMinutes: 7,
  },
];

export const guideBySlug = (slug: string): GuideDef | undefined =>
  guides.find((g) => g.slug === slug);
