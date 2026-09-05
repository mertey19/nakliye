"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { JourneyMotion } from "@/config/journey";

export function PerformanceManager({ motion, mobile, running, onFailure }: { motion: JourneyMotion; mobile: boolean; running: boolean; onFailure: () => void }) {
  const { gl, setDpr, setFrameloop, invalidate } = useThree();
  const sample = useRef({ elapsed: 0, frames: 0, low: 0, downgraded: false });
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    const visibility = () => {
      sample.current.frames = 0; sample.current.elapsed = 0;
      setFrameloop(document.hidden || !running ? "never" : "always");
      if (!document.hidden && running) invalidate();
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { canvas.removeEventListener("webglcontextlost", lost); document.removeEventListener("visibilitychange", visibility); };
  }, [gl, invalidate, onFailure, running, setFrameloop]);
  useFrame((state, delta) => {
    const s = sample.current;
    if (document.hidden || !motion.active || motion.paused || motion.intro < 1) return;
    s.elapsed += Math.min(delta, .25); s.frames++;
    if (s.elapsed < 3) return;
    const fps = s.frames / s.elapsed;
    if (fps < 27) {
      s.low++;
      if (!s.downgraded) { setDpr(.85); gl.shadowMap.enabled = false; s.downgraded = true; }
      else if (s.low >= 3 && fps < 20) onFailure();
    } else s.low = 0;
    if (mobile && !s.downgraded && state.viewport.dpr > 1.25) setDpr(1.25);
    s.frames = 0; s.elapsed = 0;
  });
  return null;
}
