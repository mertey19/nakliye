export const journeyChapters = [
  { id: "baslangic", label: "Yola çıkış", short: "BAŞLANGIÇ", place: "MERSİN · AKDENİZ" },
  { id: "ev-tasima", label: "Ev taşıma", short: "EV TAŞIMA", place: "YENİŞEHİR · YENİ BİR BAŞLANGIÇ" },
  { id: "ofis-tasima", label: "Ofis taşıma", short: "OFİS TAŞIMA", place: "İŞİNİZİN YENİ ADRESİ" },
  { id: "fabrika-tasima", label: "Endüstriyel taşıma", short: "BÜYÜK YÜKLER", place: "ENDÜSTRİYEL ÇÖZÜMLER" },
  { id: "arac-tasima", label: "Araç taşıma", short: "ARAÇ TAŞIMA", place: "HER DETAYIYLA ÖZENLİ" },
  { id: "turkiye-rotalari", label: "Türkiye rotaları", short: "TÜRKİYE ROTALARI", place: "MERSİN'DEN TÜRKİYE'YE" },
  { id: "yola-hazir", label: "Teklif alın", short: "BİRLİKTE YOLA ÇIKALIM", place: "YOLCULUK SİZİNLE BAŞLAR" },
] as const;

export const JOURNEY_MODEL_URL = "/models/kansu-can-truck.glb";
export const INTRO_SECONDS = 5.2;

/** Mutable animation state stays outside React's reconciliation loop. */
export type JourneyMotion = {
  target: number;
  current: number;
  intro: number;
  skip: boolean;
  paused: boolean;
  active: boolean;
  pointerX: number;
  pointerY: number;
};

export function createJourneyMotion(): JourneyMotion {
  return { target: 0, current: 0, intro: 0, skip: false, paused: false, active: true, pointerX: 0, pointerY: 0 };
}

export const journeyWhatsAppMessage = "Merhaba Kansu Can Nakliye, taşınma hizmetiniz hakkında fiyat bilgisi almak istiyorum.";
