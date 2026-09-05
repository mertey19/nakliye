"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { createJourneyMotion, journeyChapters } from "@/config/journey";
import { useExperienceQuality } from "@/hooks/useExperienceQuality";
import { useJourneyAudio } from "@/hooks/useJourneyAudio";

const JourneyCanvas = dynamic(() => import("./JourneyCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ScrollExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [motion] = useState(createJourneyMotion);
  const quality = useExperienceQuality();
  const [forceStatic, setForceStatic] = useState(false);
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [onscreen, setOnscreen] = useState(true);
  const audio = useJourneyAudio(motion);
  const is3d = !forceStatic && (quality === "desktop" || quality === "mobile");
  const fallback = useCallback(() => setForceStatic(true), []);
  const onReady = useCallback(() => setReady(true), []);
  const onIntroDone = useCallback(() => setIntroDone(true), []);
  const stopAudio = audio.stop;
  useEffect(() => { if (!is3d) stopAudio(); }, [is3d, stopAudio]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    let offsets: number[] = [];
    const update = () => {
      frame = 0;
      const y = window.scrollY + 72;
      let index = 0;
      for (let i = 0; i < offsets.length; i++) if (y >= offsets[i]) index = i;
      const next = offsets[index + 1];
      motion.target = Math.min(6, index + (next ? Math.max(0, (y - offsets[index]) / (next - offsets[index])) : 0));
      if (motion.target > 0.025) motion.skip = true;
      setChapter(Math.min(6, Math.floor(motion.target + 0.45)));
    };
    const measure = () => {
      offsets = Array.from(element.querySelectorAll<HTMLElement>("[data-journey-chapter]")).map(panel => panel.getBoundingClientRect().top + window.scrollY);
      update();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      motion.pointerX = event.clientX / window.innerWidth * 2 - 1;
      motion.pointerY = event.clientY / window.innerHeight * 2 - 1;
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      motion.active = entry.isIntersecting;
      setOnscreen(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(element);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => { resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onPointer); };
  }, [motion]);

  useEffect(() => {
    if (!is3d || ready) return;
    const timeout = window.setTimeout(fallback, 16000);
    return () => window.clearTimeout(timeout);
  }, [is3d, ready, fallback]);

  const skip = () => { motion.skip = true; setIntroDone(true); };
  const togglePaused = () => { motion.paused = !paused; setPaused(!paused); };
  return (
    <div ref={root} className="journey" data-mode={is3d ? "3d" : "static"} data-intro={ready && !introDone ? "playing" : "done"} data-ready={ready}>
      <div className="journey-stage" aria-hidden="true">
        <div className="journey-still">
          <Image src="/images/kansu-can-nakliye-arac.webp" alt="" fill priority sizes="100vw" />
        </div>
        {is3d && <SceneBoundary onError={fallback}>
          <JourneyCanvas motion={motion} mobile={quality === "mobile"} running={onscreen && !paused} onReady={onReady} onIntroDone={onIntroDone} onFailure={fallback} />
        </SceneBoundary>}
        <div className="journey-shade" />
        <div className="journey-grain" />
      </div>

      {is3d && !ready && <div className="journey-loader" role="status"><BrandLogo size={56} className="journey-loader-logo" /><span>KANSU CAN NAKLİYE</span><div className="loading-road"><i /></div><p>Yolculuk hazırlanıyor…</p></div>}

      <div className="journey-content">{children}</div>

      <div className="journey-hud" data-visible={onscreen} inert={!onscreen} aria-hidden={!onscreen}>
        <nav className="journey-chapters" aria-label="Yolculuk bölümleri">
          {journeyChapters.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-label={item.label} aria-current={chapter === index ? "step" : undefined} onClick={skip}><span>{String(index + 1).padStart(2, "0")}</span><i /><b>{item.label}</b></a>)}
        </nav>
        <div className="journey-status"><span className="journey-status-dot" />{journeyChapters[chapter].short}<span className="journey-status-count">{String(chapter + 1).padStart(2, "0")} / 07</span></div>
        <div className="journey-controls">
          {is3d && !introDone && <button onClick={skip} className="intro-skip">Girişi atla ↗</button>}
          {is3d && <button onClick={togglePaused} aria-pressed={paused} aria-label={paused ? "Animasyonu sürdür" : "Animasyonu duraklat"}>{paused ? "Devam et" : "Duraklat"}</button>}
          {is3d && <button onClick={() => void audio.toggle().catch(() => {})} aria-pressed={audio.enabled}>{audio.enabled ? "Ses açık" : "Sesi aç"}<span aria-hidden="true">{audio.enabled ? " ▥" : " ▱"}</span></button>}
          {is3d ? <button onClick={() => { setForceStatic(true); if (audio.enabled) void audio.toggle(); }}>Hareketsiz görünüm</button> : quality !== "pending" && <span className="journey-static-label">Hareketsiz görünüm</span>}
        </div>
      </div>
    </div>
  );
}
