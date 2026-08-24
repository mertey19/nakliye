import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "Kansu Can Nakliyat";

/**
 * iOS ana ekran ikonu (apple-touch-icon).
 *
 * icon.svg ile aynı KC monogramı, iki farkla:
 *  - Köşeler YUVARLATILMAZ: iOS kendi maskesini uygular, biz de yuvarlatırsak
 *    çift yuvarlama olur ve kenarlar kırpılmış görünür.
 *  - Saydamlık yok; tam kare, dolu zemin.
 *
 * Monogram, 64'lük tasarım ızgarasından 180'e ölçeklenir (×2.8125).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#13181c",
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#FFFFFF"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.75 21V43" />
            <path d="M15.75 32L24.25 21.5" />
            <path d="M15.75 32L25.25 42.5" />
            <path d="M46.05 26.7A7.5 7.5 0 1 0 46.05 37.3" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
