import { business } from "@/config/business";

/** Teklif formu değerleri. */
export type QuoteValues = {
  from: string;
  to: string;
  type: string;
  date: string;
  phone: string;
  notes: string;
};

/**
 * Türkiye telefon numarası kontrolü.
 * "0532 123 45 67", "+90 532 123 45 67", "5321234567" kabul edilir.
 */
export function isValidTrPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("90")
    ? digits.slice(2)
    : digits.replace(/^0/, "");
  return national.length === 10;
}

/**
 * Formdaki bilgileri firmaya gidecek okunaklı bir mesaja çevirir.
 * Boş alanlar mesaja eklenmez.
 */
export function buildQuoteMessage(v: QuoteValues): string {
  const lines = [
    `Merhaba ${business.name}, nakliyat teklifi almak istiyorum.`,
    "",
    `Taşınma türü: ${v.type}`,
    `Nereden: ${v.from}`,
    `Nereye: ${v.to}`,
  ];
  if (v.date.trim()) lines.push(`Tahmini tarih: ${v.date}`);
  lines.push(`Telefon: ${v.phone}`);
  if (v.notes.trim()) lines.push(`Ek bilgi: ${v.notes.trim()}`);
  return lines.join("\n");
}
