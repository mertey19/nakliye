"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Header kabuğu.
 * Scroll edildiğinde `data-scrolled="true"` işaretini basar; renk geçişi
 * tamamen CSS'te (globals.css → .site-header) yapılır. Böylece header'ın
 * içeriği sunucu bileşeni olarak kalır, istemciye sadece bu ince kabuk iner.
 *
 * Yükseklik sabittir → tema değişimi CLS üretmez.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className="site-header sticky top-0 z-50"
      data-scrolled={scrolled ? "true" : "false"}
    >
      {children}
    </header>
  );
}
