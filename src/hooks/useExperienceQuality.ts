"use client";

import { useEffect, useState } from "react";

export type ExperienceQuality = "pending" | "static" | "mobile" | "desktop";

/** Do not download Three.js when the visitor prefers a still experience. */
export function useExperienceQuality() {
  const [quality, setQuality] = useState<ExperienceQuality>("pending");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const choose = () => {
      if (reduced.matches || nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 2) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2)) {
        setQuality("static");
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
      if (!gl) { setQuality("static"); return; }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      setQuality(mobile.matches ? "mobile" : "desktop");
    };
    choose();
    reduced.addEventListener("change", choose);
    mobile.addEventListener("change", choose);
    return () => { reduced.removeEventListener("change", choose); mobile.removeEventListener("change", choose); };
  }, []);
  return quality;
}
