"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JourneyMotion } from "@/config/journey";

/** Opt-in synthesized engine ambience. No autoplay, recordings, or tracking. */
export function useJourneyAudio(motion: JourneyMotion) {
  const [enabled, setEnabled] = useState(false);
  const audio = useRef<{ context: AudioContext; oscillator: OscillatorNode; gain: GainNode } | null>(null);
  const stop = useCallback(() => {
    const current = audio.current;
    audio.current = null;
    if (current && current.context.state !== "closed") void current.context.close().catch(() => {});
    setEnabled(false);
  }, []);
  const toggle = useCallback(async () => {
    if (audio.current) { stop(); return; }
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = 44;
    filter.type = "lowpass";
    filter.frequency.value = 130;
    gain.gain.value = 0.035;
    oscillator.connect(filter).connect(gain).connect(context.destination);
    oscillator.start();
    audio.current = { context, oscillator, gain };
    try {
      await context.resume();
      if (audio.current?.context === context) setEnabled(true);
    } catch { stop(); }
  }, [stop]);
  useEffect(() => {
    if (!enabled) return;
    const tick = window.setInterval(() => {
      const current = audio.current;
      if (!current) return;
      const quiet = document.hidden || !motion.active || motion.paused;
      current.gain.gain.setTargetAtTime(quiet ? 0 : 0.025, current.context.currentTime, 0.25);
      current.oscillator.frequency.setTargetAtTime(40 + Math.min(45, Math.abs(motion.target - motion.current) * 180) + (1 - motion.intro) * 22, current.context.currentTime, 0.15);
    }, 160);
    return () => window.clearInterval(tick);
  }, [enabled, motion]);
  useEffect(() => () => { void audio.current?.context.close(); }, []);
  return { enabled, toggle, stop };
}
