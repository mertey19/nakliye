import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tarayıcı sekmesi ikonu — marka monogramı. */
export default function Icon() {
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
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        KC
      </div>
    ),
    size,
  );
}
