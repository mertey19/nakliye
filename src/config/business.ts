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
  /**
   * Google İşletme Profili'ndeki isimle BİREBİR aynı olmalı.
   * DOĞRULANDI: GBP kaydında "Kansu Can Nakliyat" yazıyor.
   */
  name: "Kansu Can Nakliyat",

  /**
   * Firmanın görünür olduğu ikinci yazım.
   * Araç kaplamasında, afişte ve Instagram'da "Kansu Can Nakliye" geçiyor;
   * alan adı da kansucannakliye.com. Aynı işletmeye ait bu yazım JSON-LD'de
   * `alternateName` olarak bildirilir ki Google iki adı tek işletme olarak
   * eşleştirsin ve "kansu can nakliye" aramasında da site çıksın.
   *
   * İki yazımdan biri tamamen terk edilirse burası boşaltılmalıdır.
   */
  alternateName: "Kansu Can Nakliye",

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
  email: "kansucannakliyat@gmail.com",

  /**
   * Fiziksel adres. street VE district dolu değilse adres bloğu, harita ve
   * JSON-LD "address" alanı gizlenir.
   */
  address: {
    street: "Çiftlikköy, 3201. Sk. No:15",
    district: "Yenişehir",
    city: "Mersin",
    postalCode: "33150",
    countryCode: "TR",
  } satisfies PostalAddress,

  /** { lat, lng } — sadece gerçek konum. BOŞ -> JSON-LD "geo" üretilmez. */
  coordinates: { lat: 36.7680863, lng: 34.5484853 } as {
    lat: number;
    lng: number;
  } | null,

  /** BOŞ dizi -> çalışma saatleri bölümü ve JSON-LD openingHours üretilmez. */
  openingHours: [] as OpeningHour[],

  /** Google İşletme Profili linki. BOŞ -> ilgili CTA'lar gizlenir. */
  googleBusinessProfileUrl:
    "https://www.google.com/maps?cid=12748944597433871515",
  /** "Yol Tarifi Al" için Google Maps linki. BOŞ -> buton gizlenir. */
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=36.7680863%2C34.5484853&travelmode=driving",
  /** Yorum bırakma linki. BOŞ -> gizlenir. */
  googleReviewUrl: "",
  /** Google Maps embed src (place/embed URL). BOŞ -> harita gömülmez. */
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Kansucan%20Nakliye%2C%20%C3%87iftlikk%C3%B6y%2C%203201.%20Sk.%20No%3A15%2C%2033150%20Yeni%C5%9Fehir%2FMersin&output=embed",

  instagram: "https://www.instagram.com/kansucan_nakliye33/",
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
