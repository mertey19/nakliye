import { business } from "@/config/business";

/** Sayfa bağlamı bilinmediğinde kullanılan genel WhatsApp mesajı. */
export const defaultWhatsAppMessage = `Merhaba ${business.name},
nakliyat hizmetiniz için fiyat almak istiyorum.`;

/** İletişim sayfası için mesaj. */
export const contactWhatsAppMessage = `Merhaba ${business.name},
taşınma planım hakkında bilgi almak istiyorum.`;
