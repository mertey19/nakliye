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
  /** Ana sayfa ve footer'da gösterilsin mi */
  featured: boolean;
  /** Yazı altındaki "diğer rehberler" sırası */
  relatedSlugs: string[];
  /**
   * `district`: Mersin merkez ilçe bilgi yazısı.
   * Ticari "[ilçe] nakliyat" sorgusu /hizmet-bolgeleri'ndedir; bu yazı HOW.
   */
  topic?: "district";
};

/**
 * REHBERLER — gerçek müşteri sorularına cevap veren az sayıda, işe yarar içerik.
 * Trafik için değil, taşınma niyeti olan kullanıcıyı hizmete bağlamak için var.
 *
 * Yamyamlaşma kuralı: H1/title "Mersin Nakliye", "Mersin Evden Eve Nakliyat"
 * gibi ticari sorguları kopyalamaz. O sorguların birincil sayfası hizmet
 * sayfalarındadır; rehber bilgi amacını karşılar ve oraya besleme yapar.
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
    featured: true,
    relatedSlugs: [
      "tasinma-gunu-kontrol-listesi",
      "nakliye-firmasi-secerken",
      "esyalar-nasil-paketlenir",
      "nakliyat-fiyati-nasil-hesaplanir",
    ],
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
    featured: true,
    relatedSlugs: [
      "nakliyat-fiyati-nasil-hesaplanir",
      "ev-tasirken-yapilmasi-gerekenler",
      "ofis-tasirken-nelere-dikkat",
      "sehirler-arasi-ev-tasima",
    ],
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
    featured: true,
    relatedSlugs: [
      "nakliyat-fiyati-nasil-hesaplanir",
      "tasinma-gunu-kontrol-listesi",
      "toroslar-ev-tasima",
      "akdeniz-ev-tasima",
    ],
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
    featured: true,
    relatedSlugs: [
      "beyaz-esya-nasil-tasinir",
      "sehirler-arasi-ev-tasima",
      "ev-tasirken-yapilmasi-gerekenler",
      "tasinma-gunu-kontrol-listesi",
    ],
  },
  {
    slug: "nakliyat-fiyati-nasil-hesaplanir",
    title: `Nakliyat Fiyatı Neye Göre Belirlenir? | ${business.name}`,
    h1: "Nakliyat Fiyatı Neye Göre Belirlenir?",
    description:
      "Ev taşıma fiyatını mesafe, eşya miktarı, kat, asansör, paketleme ve tarih nasıl değiştirir? Teklifleri karşılaştırmadan önce bilinmesi gereken fiyat etkenleri.",
    summary:
      "Sabit liste fiyatı neden yanıltıcı, teklif isterken hangi bilgileri vermelisiniz?",
    updated: "2026-08-27",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 7,
    featured: true,
    relatedSlugs: [
      "nakliye-firmasi-secerken",
      "asansorsuz-ev-nasil-tasinir",
      "sehirler-arasi-ev-tasima",
      "ev-tasirken-yapilmasi-gerekenler",
    ],
  },
  {
    slug: "sehirler-arasi-ev-tasima",
    title: `Şehirler Arası Ev Nasıl Taşınır? | ${business.name}`,
    h1: "Şehirler Arası Ev Nasıl Taşınır?",
    description:
      "İl dışına ev taşırken yükleme ve teslim nasıl planlanır, hangi eşyalar yanınızda kalmalı, paketleme neden farklıdır? Şehirler arası taşınma için pratik plan.",
    summary:
      "Uzun yolda yükleme-teslim ayrımı, güçlendirilmiş paketleme ve yanınızda tutulacaklar.",
    updated: "2026-08-27",
    ctaServiceSlug: "sehirler-arasi-nakliyat",
    readingMinutes: 7,
    featured: true,
    relatedSlugs: [
      "esyalar-nasil-paketlenir",
      "nakliyat-fiyati-nasil-hesaplanir",
      "tasinma-gunu-kontrol-listesi",
      "nakliye-firmasi-secerken",
    ],
  },
  {
    slug: "ofis-tasirken-nelere-dikkat",
    title: `Ofis Taşırken Nelere Dikkat Edilir? | ${business.name}`,
    h1: "Ofis Taşırken Nelere Dikkat Edilmeli?",
    description:
      "İşyeri taşırken etiketleme, mesai kesintisi, arşiv ve elektronik ekipman nasıl planlanır? Ofis taşıma öncesi yapılacaklar listesi.",
    summary:
      "Mesai kaybını azaltmak için etiketleme, sıra ve hafta sonu zamanlaması.",
    updated: "2026-08-27",
    ctaServiceSlug: "ofis-tasima",
    readingMinutes: 6,
    featured: false,
    relatedSlugs: [
      "akdeniz-ev-tasima",
      "nakliye-firmasi-secerken",
      "sehirler-arasi-ev-tasima",
      "nakliyat-fiyati-nasil-hesaplanir",
    ],
  },
  {
    slug: "beyaz-esya-nasil-tasinir",
    title: `Beyaz Eşya Nasıl Taşınır? | ${business.name}`,
    h1: "Beyaz Eşya Nasıl Taşınır?",
    description:
      "Buzdolabı, çamaşır makinesi, bulaşık makinesi ve televizyon taşırken suyu boşaltma, sabitleme ve kapı ölçüsü. Beyaz eşya taşıma öncesi kontrol listesi.",
    summary:
      "Buzdolabı, çamaşır makinesi ve ekranlar için söküm, su boşaltma ve sabitleme.",
    updated: "2026-08-27",
    ctaServiceSlug: "parca-esya-tasima",
    readingMinutes: 6,
    featured: false,
    relatedSlugs: [
      "esyalar-nasil-paketlenir",
      "asansorsuz-ev-nasil-tasinir",
      "ogrenci-evi-nasil-tasinir",
      "tasinma-gunu-kontrol-listesi",
    ],
  },
  {
    slug: "ogrenci-evi-nasil-tasinir",
    title: `Öğrenci Evi Nasıl Taşınır? | ${business.name}`,
    h1: "Öğrenci Evi Nasıl Taşınır?",
    description:
      "Dönem başı ve sonunda öğrenci evi, stüdyo veya paylaşımlı ev nasıl taşınır? Az eşya, kısa süre ve parça taşıma ile tam ev taşıma arasındaki fark.",
    summary:
      "Dönem sonu yoğunluğu, paylaşımlı ev ve az eşyayla taşınmada nelere bakmalı?",
    updated: "2026-08-27",
    ctaServiceSlug: "parca-esya-tasima",
    readingMinutes: 6,
    featured: false,
    relatedSlugs: [
      "yenisehir-ev-tasima",
      "beyaz-esya-nasil-tasinir",
      "ev-tasirken-yapilmasi-gerekenler",
      "nakliyat-fiyati-nasil-hesaplanir",
    ],
  },
  {
    slug: "tasinma-gunu-kontrol-listesi",
    title: `Taşınma Günü Kontrol Listesi | ${business.name}`,
    h1: "Taşınma Günü Kontrol Listesi",
    description:
      "Taşınma sabahından yeni evdeki ilk geceye kadar yapılacaklar: ekiple karşılama, son tur, sayaç notu ve ilk gün kutusu. Taşınma günü kontrol listesi.",
    summary:
      "Sabah hazırlık, yükleme, eski evin son turu ve yeni evdeki ilk saatler.",
    updated: "2026-08-27",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 5,
    featured: false,
    relatedSlugs: [
      "ev-tasirken-yapilmasi-gerekenler",
      "asansorsuz-ev-nasil-tasinir",
      "esyalar-nasil-paketlenir",
      "sehirler-arasi-ev-tasima",
    ],
  },
  {
    slug: "yenisehir-ev-tasima",
    title: `Yenişehir'de Ev Taşıma Rehberi | ${business.name}`,
    h1: "Yenişehir'de Ev Taşırken Nelere Dikkat Edilmeli?",
    description:
      "Yenişehir'de ev taşırken Çiftlikköy, Pozcu ve site girişleri nasıl planlanır? GMK trafiği, asansör ve yönetim saati. Taşınma öncesi pratik notlar.",
    summary:
      "Çiftlikköy, Pozcu ve sitelerde araç yaklaşımı, yönetim saati ve kampüs dönemi.",
    updated: "2026-08-28",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
    featured: false,
    topic: "district",
    relatedSlugs: [
      "mezitli-ev-tasima",
      "toroslar-ev-tasima",
      "akdeniz-ev-tasima",
      "ogrenci-evi-nasil-tasinir",
    ],
  },
  {
    slug: "mezitli-ev-tasima",
    title: `Mezitli'de Ev Taşıma Rehberi | ${business.name}`,
    h1: "Mezitli'de Ev Taşırken Nelere Dikkat Edilmeli?",
    description:
      "Mezitli'de ev taşırken Viranşehir, Tece ve sahil siteleri nasıl planlanır? D-400, yazlık dönem ve site bariyeri. Taşınma öncesi pratik notlar.",
    summary:
      "Sahil siteleri, D-400 yoğunluğu, yazlık dönem ve Tece–Davultepe bina farkı.",
    updated: "2026-08-28",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
    featured: false,
    topic: "district",
    relatedSlugs: [
      "yenisehir-ev-tasima",
      "akdeniz-ev-tasima",
      "toroslar-ev-tasima",
      "nakliyat-fiyati-nasil-hesaplanir",
    ],
  },
  {
    slug: "toroslar-ev-tasima",
    title: `Toroslar'da Ev Taşıma Rehberi | ${business.name}`,
    h1: "Toroslar'da Ev Taşırken Nelere Dikkat Edilmeli?",
    description:
      "Toroslar'da ev taşırken eğimli sokak, asansörsüz bina ve yağmur nasıl planı değiştirir? Çağlayan, Arpaçsuyu, Korukent. Taşınma öncesi pratik notlar.",
    summary:
      "Eğimli sokak, asansörsüz stok ve yağmurda yokuş: Toroslar'a özgü plan.",
    updated: "2026-08-28",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
    featured: false,
    topic: "district",
    relatedSlugs: [
      "asansorsuz-ev-nasil-tasinir",
      "akdeniz-ev-tasima",
      "yenisehir-ev-tasima",
      "mezitli-ev-tasima",
    ],
  },
  {
    slug: "akdeniz-ev-tasima",
    title: `Akdeniz'de Ev Taşıma Rehberi | ${business.name}`,
    h1: "Akdeniz'de Ev Taşırken Nelere Dikkat Edilmeli?",
    description:
      "Akdeniz ilçesinde ev ve işyeri taşırken merkez trafiği, park yasağı ve eski bina merdiveni nasıl planlanır? Çankaya, İhsaniye, Kültür. Pratik notlar.",
    summary:
      "Merkez caddeleri, park yasağı, eski bina merdiveni ve ofis-dükkan karışımı.",
    updated: "2026-08-28",
    ctaServiceSlug: "evden-eve-nakliyat",
    readingMinutes: 6,
    featured: false,
    topic: "district",
    relatedSlugs: [
      "ofis-tasirken-nelere-dikkat",
      "asansorsuz-ev-nasil-tasinir",
      "yenisehir-ev-tasima",
      "toroslar-ev-tasima",
    ],
  },
];

export const guideBySlug = (slug: string): GuideDef | undefined =>
  guides.find((g) => g.slug === slug);

export const featuredGuides = guides.filter((g) => g.featured);

export const districtGuides = guides.filter((g) => g.topic === "district");

export const generalGuides = guides.filter((g) => g.topic !== "district");

export const districtGuideSlug = (areaSlug: string) => `${areaSlug}-ev-tasima`;

export function relatedGuides(slug: string): GuideDef[] {
  const current = guideBySlug(slug);
  if (!current?.relatedSlugs.length) {
    return guides.filter((g) => g.slug !== slug).slice(0, 4);
  }
  return current.relatedSlugs
    .map(guideBySlug)
    .filter((g): g is GuideDef => g !== undefined && g.slug !== slug);
}
