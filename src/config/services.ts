import { business } from "./business";

const city = business.primaryCity;

export type ServiceDef = {
  slug: string;
  /** Menüde görünen kısa ad */
  navLabel: string;
  /** Sayfanın tek H1'i */
  h1: string;
  /** <title> */
  title: string;
  /** meta description */
  description: string;
  /** Ana sayfa/kart özeti */
  summary: string;
  /** Kartlarda listelenen somut kapsam maddeleri */
  highlights: string[];
  /** schema.org Service adı */
  schemaServiceType: string;
  /** Bu sayfadan açılan WhatsApp mesajının gövdesi */
  whatsappMessage: string;
  /** Teklif formunda ön seçili taşınma türü */
  quoteType: string;
  /** Sitemap önceliği */
  priority: number;
};

/**
 * HİZMET KAYITLARI — sadece firmanın GERÇEKTEN verdiği hizmetler.
 * Verilmeyen hizmet buradan silinir; menü, sitemap, ana sayfa kartları,
 * JSON-LD ve iç linkler otomatik güncellenir.
 *
 * Not: "şehir içi nakliyat" için AYRI sayfa açılmadı. Arama amacı
 * "evden eve nakliyat" ile birebir örtüştüğü için yamyamlaşmayı (cannibalization)
 * önlemek adına /evden-eve-nakliyat sayfasında bir H2 bölümü olarak ele alındı.
 */
export const services: ServiceDef[] = [
  {
    slug: "evden-eve-nakliyat",
    navLabel: "Evden Eve Nakliyat",
    h1: `${city} Evden Eve Nakliyat`,
    title: `${city} Evden Eve Nakliyat | ${business.name}`,
    description: `${city}'de evden eve nakliyat için ${business.name} ile iletişime geçin. Taşınma detaylarınızı paylaşın, eviniz için uygun taşıma planını ve teklifi hızlıca alın.`,
    summary: `${city} içinde ve ${city} dışına ev taşıma. Sökme, paketleme, yükleme, taşıma ve kurulum tek ekiple planlanır.`,
    highlights: [
      "Mobilya sökme ve yeniden kurulum",
      "Kırılabilir eşya için ayrı paketleme",
      "Asansörsüz bina ve dar sokak planlaması",
      "Taşınma günü için saat bazlı program",
    ],
    schemaServiceType: "Evden Eve Nakliyat",
    whatsappMessage: `Merhaba ${business.name},\nevden eve nakliyat hizmetiniz için fiyat almak istiyorum.`,
    quoteType: "Evden eve (ev taşıma)",
    priority: 1.0,
  },
  {
    slug: "sehirler-arasi-nakliyat",
    navLabel: "Şehirler Arası Nakliyat",
    h1: `${city} Şehirler Arası Nakliyat`,
    title: `${city} Şehirler Arası Nakliyat | ${business.name}`,
    description: `${city}'den diğer illere ev ve ofis taşıma. Çıkış-varış adresinizi ve tahmini tarihi paylaşın, ${business.name} size uygun şehirler arası taşıma planını çıkarsın.`,
    summary: `${city}'den Türkiye'nin diğer illerine ev ve ofis taşıma. Rota, tarih ve eşya miktarına göre planlanır.`,
    highlights: [
      "Çıkış ve varış adresine göre rota planı",
      "Uzun yol için güçlendirilmiş paketleme",
      "Yükleme ve teslim günü ayrı planlanır",
      "Tek seferde tam ev veya kısmi yük",
    ],
    schemaServiceType: "Şehirler Arası Nakliyat",
    whatsappMessage: `Merhaba ${business.name},\nşehirler arası nakliyat için teklif almak istiyorum.\nNereden:\nNereye:\nTahmini tarih:`,
    quoteType: "Şehirler arası taşıma",
    priority: 0.9,
  },
  {
    slug: "ofis-tasima",
    navLabel: "Ofis Taşıma",
    h1: `${city} Ofis Taşıma`,
    title: `${city} Ofis Taşıma | ${business.name}`,
    description: `${city}'de ofis ve işyeri taşıma. Çalışma düzeninizi en az kesintiyle taşımak için ${business.name} ile plan yapın, teklif alın.`,
    summary: `Ofis, mağaza ve işyeri taşıma. Mesai kaybını azaltmak için taşıma programı önceden çıkarılır.`,
    highlights: [
      "Masa, dolap ve bölme sistemlerinin sökümü",
      "Bilgisayar ve elektronik için ayrı paketleme",
      "Departman bazlı kutu etiketleme",
      "Hafta sonu / mesai dışı taşıma planı",
    ],
    schemaServiceType: "Ofis Taşıma",
    whatsappMessage: `Merhaba ${business.name},\nofis taşıma hizmetiniz için fiyat almak istiyorum.`,
    quoteType: "Ofis / işyeri taşıma",
    priority: 0.8,
  },
  {
    slug: "parca-esya-tasima",
    navLabel: "Parça Eşya Taşıma",
    h1: `${city} Parça Eşya Taşıma`,
    title: `${city} Parça Eşya Taşıma | ${business.name}`,
    description: `Tek koltuk, buzdolabı, beyaz eşya veya birkaç parça eşya taşıtmak için tam ev taşıma paketi gerekmez. ${city} içi parça eşya taşıma için ${business.name}'ye yazın.`,
    summary: `Tek parça mobilya, beyaz eşya veya birkaç kutuluk yük için ölçekli çözüm.`,
    highlights: [
      "Tek koltuk, dolap, beyaz eşya taşıma",
      "Merdiven ve kapı ölçüsüne göre planlama",
      "Sadece taşınan parça kadar ücret",
      "Alım ve teslim aynı gün planlanabilir",
    ],
    schemaServiceType: "Parça Eşya Taşıma",
    whatsappMessage: `Merhaba ${business.name},\nparça eşya taşıma için fiyat almak istiyorum.\nTaşınacak eşya:\nNereden:\nNereye:`,
    quoteType: "Parça eşya taşıma",
    priority: 0.8,
  },
  {
    slug: "esya-paketleme",
    navLabel: "Eşya Paketleme",
    h1: `${city} Eşya Paketleme Hizmeti`,
    title: `${city} Eşya Paketleme Hizmeti | ${business.name}`,
    description: `Taşınmadan önce eşyalarınızın profesyonel paketlenmesi. ${business.name} ${city}'de paketleme malzemesi ve işçiliğiyle taşınmaya hazırlık yapar.`,
    summary: `Kırılabilir eşya, mutfak, giysi ve elektronik için taşımaya hazır paketleme.`,
    highlights: [
      "Tabak, bardak ve cam eşya için ayrı ambalaj",
      "Giysi dolabı için askılı koli",
      "Kutu etiketleme ve oda bazlı ayrım",
      "Sadece paketleme veya taşımayla birlikte",
    ],
    schemaServiceType: "Eşya Paketleme",
    whatsappMessage: `Merhaba ${business.name},\neşya paketleme hizmetiniz için bilgi ve fiyat almak istiyorum.`,
    quoteType: "Sadece paketleme",
    priority: 0.7,
  },
];

export const serviceBySlug = (slug: string): ServiceDef | undefined =>
  services.find((s) => s.slug === slug);

/** Teklif formundaki taşınma türü seçenekleri. */
export const quoteTypes: string[] = services.map((s) => s.quoteType);
