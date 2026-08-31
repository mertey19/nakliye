import { business } from "./business";

const city = business.primaryCity;

/**
 * ANA SAYFA kopyası — arama amacı: "mersin nakliye", "mersin nakliyat"
 * (geniş şehir + sektör). "mersin evden eve nakliyat" kanonik H1'i
 * /evden-eve-nakliyat'tadır; buradaki H1 onunla aynı olmaz.
 *
 * Title ~65, description ~155–160 karakter bütçesine göre yazılır.
 * Anahtar kelime yığılmaz; sorgu yazımı ("nakliye") doğal cümlede geçer.
 */
export const homeH1 = `${city} Nakliye ve Evden Eve Taşıma`;

export const homeTitle = `${homeH1} | ${business.name}`;

export const homeDescription = `${city}'de şehir içi ve şehirler arası nakliye. Yenişehir'den ev, ofis ve parça eşya taşıma için detaylarınızı paylaşın, ${business.name}'tan teklif alın.`;

export const homeOgDescription = `${city} içinde ve dışında nakliye: evden eve, ofis ve parça eşya taşıma. Yenişehir üssünden planlayın, teklif alın.`;
