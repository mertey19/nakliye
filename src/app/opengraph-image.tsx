import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/config/business";
import { homeH1 } from "@/config/home";
import { hasPhone, phoneLabel } from "@/lib/business";

export const alt = `${business.name} — ${business.primaryCity} nakliyat`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/kansu-can-nakliye-logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "56px 72px",
          color: "#ffffff",
          borderBottom: "10px solid #e10600",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={src} width={92} height={92} alt="" />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#ffd6d6",
              fontWeight: 700,
            }}
          >
            {business.alternateName.toLocaleUpperCase("tr-TR")}
          </div>
        </div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.08,
            fontWeight: 800,
            maxWidth: 980,
          }}
        >
          {homeH1}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Evden Eve", "Şehirler Arası", "Ofis Taşıma", "Parça Eşya"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "1px solid #e10600",
                  borderRadius: 999,
                  padding: "8px 20px",
                  fontSize: 22,
                  color: "#ffffff",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          {hasPhone && (
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#e10600" }}>
              {phoneLabel}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
