"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Color, Fog, ACESFilmicToneMapping, Object3D, type DirectionalLight, type InstancedMesh } from "three";
import type { JourneyMotion } from "@/config/journey";
import { KansuCanTruck } from "./KansuCanTruck";
import { CinematicCamera } from "./CinematicCamera";
import { PerformanceManager } from "./PerformanceManager";
import { Box, Building, Palm, Sign } from "./ScenePrimitives";
import { HomeMovingScene } from "@/scenes/HomeMovingScene";
import { OfficeMovingScene } from "@/scenes/OfficeMovingScene";
import { FactoryScene } from "@/scenes/FactoryScene";
import { VehicleTransportScene } from "@/scenes/VehicleTransportScene";
import { TurkeyRoutesScene } from "@/scenes/TurkeyRoutesScene";
import { DepotScene } from "@/scenes/DepotScene";

function Ready({ onReady }: { onReady: () => void }) { useEffect(onReady, [onReady]); return null; }
function Atmosphere({ motion }: { motion: JourneyMotion }) {
  const colors = useMemo(() => ({ day: new Color("#1a0c0c"), night: new Color("#050505"), active: new Color() }), []);
  useFrame(({ scene }) => {
    const night = Math.max(0, 1 - Math.abs(motion.current - 5));
    colors.active.copy(colors.day).lerp(colors.night, night);
    scene.background = colors.active;
    if (scene.fog instanceof Fog) scene.fog.color.copy(colors.active);
  });
  return null;
}

function RoadMarkings() {
  const mesh = useRef<InstancedMesh>(null);
  useEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    for (let i = 0; i < 75; i++) { transform.position.set(0, .025, 90 - i * 7); transform.updateMatrix(); mesh.current.setMatrixAt(i, transform.matrix); }
    mesh.current.instanceMatrix.needsUpdate = true; mesh.current.computeBoundingSphere();
  }, []);
  return <instancedMesh ref={mesh} args={[undefined, undefined, 75]}><boxGeometry args={[.1, .02, 2.3]} /><meshStandardMaterial color="#d8d5c4" /></instancedMesh>;
}
function Sun({ motion, mobile }: { motion: JourneyMotion; mobile: boolean }) {
  const sun = useRef<DirectionalLight>(null);
  const target = useMemo(() => new Object3D(), []);
  useFrame(() => {
    if (!sun.current) return;
    const z = -motion.current * 55;
    sun.current.position.set(-18, 22, z - 12); target.position.set(0, 0, z); target.updateMatrixWorld();
    sun.current.intensity = 3.1 - Math.max(0, 1 - Math.abs(motion.current - 5)) * 2.2;
  });
  return <directionalLight ref={sun} target={target} position={[-18, 22, -12]} color="#ff6a3a" intensity={3.1} castShadow={!mobile} shadow-mapSize={[1024, 1024]} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} shadow-normalBias={.08} shadow-bias={-.0002} />;
}
function Road({ mobile }: { mobile: boolean }) {
  return <group>
    <Box position={[0, -.18, -140]} size={[240, .25, 600]} color="#777f73" />
    <Box position={[0, -.035, -135]} size={[12, .1, 530]} color="#303b3c" rough={.44} />
    {[-6.5, 6.5].map(x => <Box key={x} position={[x, .02, -135]} size={[1, .2, 530]} color="#a4a69b" />)}
    {[-5.35, 5.35].map(x => <Box key={x} position={[x, .025, -135]} size={[.07, .02, 530]} color="#d7d5bd" />)}
    <RoadMarkings />
    {Array.from({ length: mobile ? 5 : 8 }, (_, i) => <Palm key={i} position={[i % 2 ? -8 : 8, 0, 40 - i * 12]} scale={1 + i % 3 * .16} />)}
    {(mobile ? [0, 1] : [0, 1, 2, 3]).map(i => <Building key={i} position={[-18 - i % 2 * 6, 0, 15 + i * 17]} floors={3 + i % 3} />)}
    <Sign text={"MERSİN\nAKDENİZ SAHİL YOLU"} position={[7.5, 3.8, 12]} size={[3.8, 1.6]} rotation={[0, Math.PI, 0]} />
    <Box position={[7.5, 1.8, 12]} size={[.1, 3.6, .1]} color="#889291" metal={.7} />
  </group>;
}

export default function JourneyCanvas({ motion, mobile, running, onReady, onIntroDone, onFailure }: { motion: JourneyMotion; mobile: boolean; running: boolean; onReady: () => void; onIntroDone: () => void; onFailure: () => void }) {
  return <Canvas shadows={!mobile} dpr={mobile ? 1 : [1, 1.5]} camera={{ position: [2, 1.1, -14], fov: 42, near: .1, far: 230 }} gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance", toneMapping: ACESFilmicToneMapping }} fallback={null}>
    <fog attach="fog" args={["#1a0c0c", 38, 150]} />
    <ambientLight intensity={.55} color="#4a2a24" />
    <hemisphereLight args={["#ff7a4a", "#1a1210", 1.35]} />
    <Sun motion={motion} mobile={mobile} />
    <Suspense fallback={null}>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[20, 10, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffd0c0" position={[5, 2, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={3.2} color="#ff3b1f" position={[-5, 3, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 2, 1]} />
      </Environment>
      <Road mobile={mobile} />
      <HomeMovingScene motion={motion} /><OfficeMovingScene motion={motion} /><FactoryScene motion={motion} /><VehicleTransportScene motion={motion} /><TurkeyRoutesScene motion={motion} /><DepotScene motion={motion} />
      <KansuCanTruck motion={motion} />
      <CinematicCamera motion={motion} mobile={mobile} onIntroDone={onIntroDone} />
      <Ready onReady={onReady} />
    </Suspense>
    <Atmosphere motion={motion} />
    <PerformanceManager motion={motion} mobile={mobile} running={running} onFailure={onFailure} />
  </Canvas>;
}
