import { services } from "@/config/services";

export type NavItem = { label: string; href: string };

/** Masaüstü ana menü — kısa tutulur, açılır menü (JS) gerektirmez. */
export const primaryNav: NavItem[] = [
  { label: "Evden Eve", href: "/evden-eve-nakliyat" },
  { label: "Şehirler Arası", href: "/sehirler-arasi-nakliyat" },
  { label: "Ofis Taşıma", href: "/ofis-tasima" },
  { label: "Bölgeler", href: "/hizmet-bolgeleri" },
  { label: "Rehber", href: "/rehber" },
  { label: "İletişim", href: "/iletisim" },
];

/** Mobil menüde tüm hizmetler + kurumsal sayfalar listelenir. */
export const mobileNav: NavItem[] = [
  ...services.map((s) => ({ label: s.navLabel, href: `/${s.slug}` })),
  { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
  { label: "Rehber", href: "/rehber" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];
