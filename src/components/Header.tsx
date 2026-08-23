import Link from "next/link";
import { Container } from "./Container";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { mobileNav, primaryNav } from "./nav";
import { CallLinkWithNumber } from "./cta/ConversionButtons";
import { HeaderQuoteButton } from "./HeaderQuoteButton";
import { business } from "@/config/business";
import { hasPhone } from "@/lib/business";

/**
 * Masaüstü: logo · menü · telefon · Teklif Al
 * Mobil:    logo · ara ikonu · menü
 *
 * Renkler HeaderShell'in bastığı data-scrolled durumuna göre CSS'ten gelir.
 */
export function Header() {
  return (
    <HeaderShell>
      <Container className="relative">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo bağlantısının erişilebilir adı, görünen metnin kendisidir. */}
          <Link href="/" className="flex shrink-0 flex-col py-1 leading-none">
            <span className="brand-name text-[17px] font-extrabold tracking-[-0.03em] md:text-[19px]">
              {business.name}
            </span>
            <span className="brand-sub mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] md:text-[11px]">
              {business.primaryCity} Nakliyat
            </span>
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-6">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link inline-block whitespace-nowrap py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-4 md:flex xl:gap-5">
            {hasPhone && <CallLinkWithNumber location="header" />}
            <HeaderQuoteButton />
          </div>

          <MobileNav items={mobileNav} />
        </div>
      </Container>
    </HeaderShell>
  );
}
