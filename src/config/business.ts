/**
 * KANSU CAN NAKLİYE — TEK DOĞRULUK KAYNAĞI (NAP + iş bilgileri)
 * ============================================================
 * Sitedeki HER firma bilgisi (header, footer, iletişim, JSON-LD, WhatsApp linkleri)
 * bu dosyadan okunur. Başka hiçbir yere telefon/adres yazılmaz.
 *
 * KURAL: Doğrulanmamış bilgi BOŞ bırakılır. Boş alanlar sitede otomatik gizlenir.
 * Asla uydurulmaz: yorum, puan, telefon, adres, fiyat, müşteri sayısı, deneyim yılı,
 * sigorta, ruhsat, çalışma saatleri, hizmet bölgesi.
 *
 * Buradaki bilgiler Google İşletme Profili ile HARFİ HARFİNE aynı olmalıdır.
 */

export type PostalAddress = {
  /** Cadde/sokak, no. Örn: "Menderes Mah. 1234 Sk. No:5" */
  street: string;
  /** İlçe. Örn: "Yenişehir" */
  district: string;
  /** İl. */
  city: string;
  /** Posta kodu. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 */
  countryCode: "TR";
};

export type OpeningHour = {
  /** schema.org günleri */
  days: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  /** "08:00" */
  opens: string;
  /** "19:00" */
  closes: string;
};

export type ServiceArea = {
  name: string;
  slug: string;
};

export const business = {
  /** Google İşletme Profili'ndeki isimle birebir aynı olmalı. */
  name: "Kansu Can Nakliye",
  /** Ticari unvan (varsa). Bilinmiyorsa boş bırakın; footer'da gizlenir. */
  legalName: "",

  /** DOĞRULANDI: ana hizmet şehri. */
  primaryCity: "Mersin",
  primaryCitySlug: "mersin",

  /**
   * E.164 biçiminde telefon. Örn: "+905321234567"
   * BOŞ -> tüm "Hemen Ara" butonları ve tel: linkleri otomatik gizlenir.
   */
  phone: "+905464199007",
  /** Ekranda görünen biçim. Örn: "0532 123 45 67" */
  phoneDisplay: "0546 419 90 07",

  /**
   * WhatsApp numarası, sadece rakam + ülke kodu. Örn: "905321234567"
   * BOŞ -> tüm WhatsApp butonları otomatik gizlenir, teklif formu yerine
   *        alternatif akışa düşer.
   */
  whatsapp: "905464199007",

  /** BOŞ -> e-posta satırı gizlenir. */
  email: "",

  /**
   * Fiziksel adres. street VE district dolu değilse adres bloğu, harita ve
   * JSON-LD "address" alanı gizlenir.
   */
  address: {
    street: "",
    district: "",
    city: "Mersin",
    postalCode: "",
    countryCode: "TR",
  } satisfies PostalAddress,

  /** { lat, lng } — sadece gerçek konum. BOŞ -> JSON-LD "geo" üretilmez. */
  coordinates: null as { lat: number; lng: number } | null,

  /** BOŞ dizi -> çalışma saatleri bölümü ve JSON-LD openingHours üretilmez. */
  openingHours: [] as OpeningHour[],

  /** Google İşletme Profili linki. BOŞ -> ilgili CTA'lar gizlenir. */
  googleBusinessProfileUrl: "",
  /** "Yol Tarifi Al" için Google Maps linki. BOŞ -> buton gizlenir. */
  googleMapsDirectionsUrl: "",
  /** Yorum bırakma linki. BOŞ -> gizlenir. */
  googleReviewUrl: "",
  /** Google Maps embed src (place/embed URL). BOŞ -> harita gömülmez. */
  googleMapsEmbedUrl: "",

  instagram: "",
  facebook: "",

  /**
   * HİZMET BÖLGELERİ — Mersin merkez ilçeleri.
   * Hizmet VERİLMEYEN ilçe varsa buradan SİLİN. Merkez dışı ilçe (Tarsus,
   * Erdemli, Silifke vb.) ancak gerçekten hizmet veriliyorsa eklenmelidir.
   */
  serviceAreas: [
    { name: "Akdeniz", slug: "akdeniz" },
    { name: "Mezitli", slug: "mezitli" },
    { name: "Toroslar", slug: "toroslar" },
    { name: "Yenişehir", slug: "yenisehir" },
  ] as ServiceArea[],

  /**
   * DOĞRULANMAMIŞ SAYISAL İDDİALAR — hepsi null.
   * Değer girilmediği sürece sitede hiçbir yerde "X yıl deneyim",
   * "X mutlu müşteri" gibi ifade GÖRÜNMEZ.
   */
  foundedYear: null as number | null,
  completedJobs: null as number | null,
  teamSize: null as number | null,
  /** Taşıma sigortası var mı? null = bilinmiyor -> hiçbir iddia gösterilmez. */
  hasTransportInsurance: null as boolean | null,
  /** K belgesi / yetki belgesi no. BOŞ -> gösterilmez. */
  licenseNumber: "",
  /** schema.org priceRange. Doğrulanmadıkça BOŞ kalmalı. */
  priceRange: "",
} as const;

export type Business = typeof business;
