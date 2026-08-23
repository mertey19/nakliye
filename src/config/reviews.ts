/**
 * GERÇEK MÜŞTERİ YORUMLARI
 * ========================
 * Bu dizi BOŞ olduğu sürece sitede yorum bölümü GÖRÜNMEZ ve JSON-LD içinde
 * "review" / "aggregateRating" alanı ÜRETİLMEZ.
 *
 * ASLA uydurma yorum eklenmez. Sadece gerçekten alınmış, kaynağı gösterilebilir
 * yorumlar girilir (Google İşletme Profili, Instagram yorumu, yazılı geri bildirim).
 */
export type Review = {
  /** Yorumu bırakan kişinin gösterilecek adı (izin verdiği biçimde). */
  name: string;
  text: string;
  source?: "google" | "instagram" | "other";
  /** 1-5. Bilinmiyorsa boş bırakın. */
  rating?: number;
  /** Yorumun doğrulanabileceği link. */
  sourceUrl?: string;
  /** ISO tarih */
  date?: string;
};

export const reviews: Review[] = [];
