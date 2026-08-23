import type { ReactNode } from "react";
import { Container } from "../Container";

/**
 * BÖLÜM RİTMİ
 * Sayfa boyunca OFF-WHITE → WHITE → DARK dönüşümü, sitenin tek renk ve düz
 * görünmesini engeller. Koyu bölümler `section-dark` sınıfını alır; bu sınıf
 * odak halkasını ve prose renklerini otomatik olarak ters çevirir.
 */
export type SectionTone = "light" | "white" | "dark";

const tones: Record<SectionTone, string> = {
  light: "bg-surface text-ink-800",
  white: "bg-white text-ink-800",
  dark: "section-dark bg-ink-900 text-ink-300",
};

export function Section({
  tone = "light",
  children,
  className = "",
  id,
  labelledBy,
  ariaLabel,
}: {
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={`${tones[tone]} py-14 sm:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Bölüm başlığı — güçlü tipografi, isteğe bağlı üst etiket ve açıklama. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: SectionTone;
}) {
  const dark = tone === "dark";
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className={`eyebrow mb-4 ${dark ? "text-ink-300" : "text-ink-500"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`headline text-[28px] sm:text-[36px] ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-[16px] leading-relaxed ${
            dark ? "text-ink-300" : "text-ink-700"
          }`}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
