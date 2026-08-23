import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Kanonikleştirme: tek strateji -> trailing slash YOK, non-www, https.
  // (Bkz. README "Kanonikleştirme" bölümü ve hosting redirect kuralları.)
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    // Eski site URL'leri buraya tek tek 301 olarak eklenir (README "301 Yönlendirmeler").
    // Toplu "hepsi -> /" yönlendirmesi YAPILMAZ.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/hizmetler", destination: "/evden-eve-nakliyat", permanent: true },
    ];
  },
};

export default nextConfig;
