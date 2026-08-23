import { ImageResponse } from "next/og";
import { business } from "@/config/business";
import { hasPhone, phoneLabel } from "@/lib/business";

export const alt = `${business.name} — ${business.primaryCity} nakliyat`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Paylaşım görseli.
 * Türkiye'de site bağlantıları çoğunlukla WhatsApp üzerinden paylaşılıyor;
 * önizlemede firma adı, şehir ve hizmetin görünmesi tıklamayı doğrudan etkiler.
 * Görsel derleme sırasında bir kez üretilir, çalışma zamanı maliyeti yoktur.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2440",
          padding: "72px 80px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#fbbf24",
              fontWeight: 700,
            }}
          >
            {business.name.toLocaleUpperCase("tr-TR")}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 74,
              lineHeight: 1.1,
              fontWeight: 800,
              maxWidth: 900,
            }}
          >
            {`${business.primaryCity} Nakliyat ve Evden Eve Taşıma`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              "Evden Eve",
              "Şehirler Arası",
              "Ofis Taşıma",
              "Parça Eşya",
              "Paketleme",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "2px solid #1b5e9e",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 25,
                  color: "#d7e7f7",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          {hasPhone && (
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fbbf24" }}>
              {phoneLabel}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
