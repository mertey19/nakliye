import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
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
      {
        source: "/models/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    // Eski site URL'leri buraya tek tek 301 olarak eklenir (README "301 Yönlendirmeler").
    // Toplu "hepsi -> /" yönlendirmesi YAPILMAZ.
    return [
      // /hizmetler diye bir sayfa hiç olmadı; ancak Türkçe sitelerde çok
      // yaygın bir tahmin-URL'i olduğu için 404 yerine ana ticari sayfaya
      // yönlendiriliyor. Eski siteden gelen gerçek URL'ler de buraya eklenir.
      { source: "/hizmetler", destination: "/evden-eve-nakliyat", permanent: true },
    ];
  },
};

export default nextConfig;
