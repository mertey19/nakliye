import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyContactBar } from "@/components/contact/MobileStickyContactBar";
import { FloatingContactDock } from "@/components/contact/FloatingContactDock";
import { Analytics } from "@/components/Analytics";
import { DevChecklist } from "@/components/DevChecklist";
import { JsonLd } from "@/components/JsonLd";
import { movingCompanySchema } from "@/lib/schema";
import { business } from "@/config/business";
import { site, siteUrl } from "@/config/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.primaryCity} Evden Eve Nakliyat | ${business.name}`,
    template: `%s`,
  },
  description: `${business.primaryCity} içinde ve ${business.primaryCity} dışına evden eve nakliyat, ofis taşıma ve parça eşya taşıma. ${business.name} ile taşınma planınızı çıkarın, teklif alın.`,
  applicationName: business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: business.name,
  },
  formatDetection: { telephone: true, address: false, email: false },
  ...(site.gscVerification
    ? { verification: { google: site.gscVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#13181c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-900 focus:shadow-lg"
        >
          İçeriğe geç
        </a>

        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        {/* Kalıcı iletişim sistemi: mobilde alt bar, masaüstünde sağ alt dock */}
        <MobileStickyContactBar />
        <FloatingContactDock />
        <DevChecklist />

        {/* Yerel işletme varlığı — her sayfada tek kez. */}
        <JsonLd data={movingCompanySchema()} />
        <Analytics />
      </body>
    </html>
  );
}
