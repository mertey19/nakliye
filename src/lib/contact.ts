import { business } from "@/config/business";
import { services } from "@/config/services";

/**
 * İLETİŞİM AKSİYON KATMANI
 * ========================
 * Telefon ve WhatsApp bağlantılarının üretildiği tek yer. Kalıcı (floating /
 * sticky) CTA sistemi, header, footer ve sayfa içi CTA'lar hep buradan beslenir.
 *
 * Kural: numara yoksa link üretilmez -> ilgili buton hiç render edilmez.
 * Ölü buton ve placeholder link YASAK.
 */

/** "+905321234567" | "05321234567" -> "0532 123 45 67" */
export function formatPhoneForDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith("90")
      ? digits.slice(2)
      : digits.replace(/^0/, "");
  if (national.length !== 10) return raw;
  return `0${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(
    6,
    8,
  )} ${national.slice(8, 10)}`;
}

/** tel: bağlantısı için E.164'e yakın, güvenli biçim. Numara yoksa "" döner. */
export function formatPhoneForTel(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (cleaned.replace(/\D/g, "").length < 10) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned.replace(/^0/, "90")}`;
}

/**
 * wa.me bağlantısı. Mesaj URL-encode edilir, satır sonları korunur.
 * Numara yoksa "" döner.
 */
export function createWhatsAppUrl(message: string): string {
  const number = business.whatsapp.replace(/\D/g, "");
  if (number.length < 10) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Kalıcı CTA sisteminin genel "bilgi al" mesajı. */
export const generalInfoMessage = `Merhaba ${business.name},
nakliye hizmetiniz hakkında bilgi almak istiyorum.`;

/** Belirli bir hizmet için bağlama özel "bilgi al" mesajı. */
export function serviceInfoMessage(navLabel: string): string {
  return `Merhaba ${business.name},
${navLabel.toLocaleLowerCase("tr-TR")} hizmetiniz için bilgi almak istiyorum.`;
}

export type PageContext = {
  /** GA4'e gönderilecek sayfa bağlamı: hizmet slug'ı veya "homepage"/"other". */
  context: string;
  /** O sayfaya uygun WhatsApp mesajı. */
  whatsappMessage: string;
  /** Varsa ilgili hizmet slug'ı. */
  service?: string;
};

/**
 * Bulunulan yola göre CTA bağlamını çözer.
 * Hizmet sayfasındaysak mesaj o hizmete özel olur.
 */
export function resolvePageContext(pathname: string): PageContext {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (slug === "") {
    return { context: "homepage", whatsappMessage: generalInfoMessage };
  }
  const service = services.find((s) => s.slug === slug);
  if (service) {
    return {
      context: service.slug,
      service: service.slug,
      whatsappMessage: serviceInfoMessage(service.navLabel),
    };
  }
  return { context: slug, whatsappMessage: generalInfoMessage };
}
