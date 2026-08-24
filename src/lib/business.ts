import { business } from "@/config/business";
import { reviews } from "@/config/reviews";
import { photos } from "@/config/photos";

/**
 * business.ts içindeki ham veriden türetilen guard'lar.
 * Bileşenler doğrudan business.phone'a bakmaz; buradaki bayrakları kullanır.
 * Böylece "veri yoksa gizle" kuralı tek yerde uygulanır.
 */

/** "+905321234567" -> "0532 123 45 67" */
export function formatTrPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  // "+905321234567", "905321234567", "05321234567" ve "5321234567" desteklenir.
  const national =
    digits.length === 12 && digits.startsWith("90")
      ? digits.slice(2)
      : digits.replace(/^0/, "");
  if (national.length !== 10) return e164;
  return `0${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(
    6,
    8,
  )} ${national.slice(8, 10)}`;
}

export const hasPhone: boolean = business.phone.trim().length > 0;

/** tel: linki. Telefon yoksa boş string döner (bileşen zaten render etmez). */
export const telHref: string = hasPhone
  ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
  : "";

export const phoneLabel: string = hasPhone
  ? business.phoneDisplay.trim() || formatTrPhone(business.phone)
  : "";

export const hasWhatsApp: boolean =
  business.whatsapp.replace(/\D/g, "").length >= 10;

/**
 * Bağlama özel WhatsApp linki üretir. Mesaj URL-encode edilir,
 * satır sonları korunur.
 */
export function whatsappLink(message: string): string {
  const number = business.whatsapp.replace(/\D/g, "");
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const hasEmail: boolean = business.email.trim().length > 0;

/** Adres ancak sokak VE ilçe doluysa yayınlanabilir sayılır. */
export const hasAddress: boolean =
  business.address.street.trim().length > 0 &&
  business.address.district.trim().length > 0;

export const addressOneLine: string = hasAddress
  ? [
      business.address.street,
      business.address.district,
      business.address.postalCode,
      business.address.city,
    ]
      .filter((p) => p.trim().length > 0)
      .join(", ")
  : "";

export const hasCoordinates: boolean = business.coordinates !== null;
export const hasOpeningHours: boolean = business.openingHours.length > 0;
export const hasDirections: boolean =
  business.googleMapsDirectionsUrl.trim().length > 0;
export const hasMapEmbed: boolean =
  business.googleMapsEmbedUrl.trim().length > 0;
export const hasGbp: boolean =
  business.googleBusinessProfileUrl.trim().length > 0;
export const hasReviewLink: boolean = business.googleReviewUrl.trim().length > 0;
export const hasReviews: boolean = reviews.length > 0;
export const hasPhotos: boolean = photos.length > 0;

export const socialLinks: { label: string; url: string }[] = [
  { label: "Instagram", url: business.instagram },
  { label: "Facebook", url: business.facebook },
  { label: "Google İşletme Profili", url: business.googleBusinessProfileUrl },
].filter((s) => s.url.trim().length > 0);

export const hasSocial: boolean = socialLinks.length > 0;

/** En az bir doğrudan iletişim kanalı var mı? */
export const hasDirectContact: boolean = hasPhone || hasWhatsApp;

/**
 * Eksik iş bilgilerinin listesi. Yalnızca geliştirme ortamında ekranda,
 * her ortamda README kontrol listesinde kullanılır.
 */
export function missingBusinessData(): string[] {
  const missing: string[] = [];
  if (!hasPhone) missing.push("business.phone (+ phoneDisplay) — telefon numarası");
  if (!hasWhatsApp) missing.push("business.whatsapp — WhatsApp numarası");
  if (!hasEmail) missing.push("business.email — e-posta");
  if (!hasAddress) missing.push("business.address.street / district — açık adres");
  if (!hasOpeningHours) missing.push("business.openingHours — çalışma saatleri");
  if (!hasGbp)
    missing.push("business.googleBusinessProfileUrl — Google İşletme Profili linki");
  if (!hasDirections)
    missing.push("business.googleMapsDirectionsUrl — yol tarifi linki");
  if (!hasCoordinates) missing.push("business.coordinates — enlem/boylam");
  if (!hasPhotos) missing.push("config/photos.ts — gerçek iş fotoğrafı listesi boş");
  if (!hasReviews) missing.push("config/reviews.ts — gerçek müşteri yorumları");
  if (!process.env.NEXT_PUBLIC_SITE_URL)
    missing.push("NEXT_PUBLIC_SITE_URL — kanonik alan adı (.env.local)");
  if (!process.env.NEXT_PUBLIC_GA_ID) missing.push("NEXT_PUBLIC_GA_ID — GA4 ölçüm kimliği");
  return missing;
}
