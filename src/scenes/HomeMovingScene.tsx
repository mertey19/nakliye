"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { JourneyMotion } from "@/config/journey";
import { Box, Building, Carton, Cylinder, Palm, Sign } from "@/components/3d/ScenePrimitives";
import { SceneStage } from "./SceneStage";

function Worker({ motion, offset = 0, packing = false }: { motion: JourneyMotion; offset?: number; packing?: boolean }) {
  const worker = useRef<Group>(null);
  const legs = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!worker.current || motion.paused || !motion.active || Math.abs(motion.current - 1) > 1.25) return;
    const t = clock.elapsedTime * .55 + offset;
    worker.current.position.set(3 + Math.sin(t) * (packing ? .1 : 1.25), .025 * Math.sin(t * 9), 3 + offset * .9);
    worker.current.rotation.y = packing ? -.6 : Math.cos(t) > 0 ? Math.PI / 2 : -Math.PI / 2;
    if (legs.current) legs.current.rotation.x = Math.sin(t * 9) * (packing ? .02 : .13);
  });
  return <group ref={worker} scale={.95}>
    <Cylinder position={[0, 1.72, 0]} radius={.15} height={.3} color="#c79b7b" />
    <Box position={[0, 1.24, 0]} size={[.48, .6, .28]} color="#c41212" />
    <Box position={[0, 1.17, -.148]} size={[.5, .07, .01]} color="#eef3d6" />
    <group ref={legs}>{[-.14, .14].map(x => <Box key={x} position={[x, .55, 0]} size={[.18, .8, .22]} color="#253038" />)}</group>
    {[-.3, .3].map(x => <Box key={x} position={[x, 1.08, -.2]} size={[.13, .14, .45]} color="#c49b7a" />)}
    <Carton position={[0, .96, -.48]} scale={.7} />
  </group>;
}

export function HomeMovingScene({ motion }: { motion: JourneyMotion }) {
  return <SceneStage index={1} motion={motion}>
    <Building position={[-9, 0, 5]} floors={4} />
    <Building position={[-16, 0, 14]} floors={5} />
    <Palm position={[-6.8, 0, -5]} scale={1.2} />
    <Box position={[-8, .12, -.2]} size={[7, .25, 3]} color="#b5b4a3" />
    <Box position={[3.2, .22, 4.6]} size={[3.5, .4, 2.3]} color="#707b74" />
    <Box position={[1.1, .64, 5]} size={[2.1, .12, 3.1]} color="#85918f" metal={.6} rotation={[-.36, 0, 0]} />
    {Array.from({ length: 6 }, (_, i) => <Carton key={i} position={[3.9 + i % 2 * .8, .44 + (i > 3 ? .7 : 0), 3.7 + i % 4 * .7]} />)}
    <Worker motion={motion} /><Worker motion={motion} offset={2.3} packing />
    <Sign text="YENİ BİR BAŞLANGIÇ" position={[-9, 2.7, 2.45]} size={[4.8, .65]} rotation={[0, Math.PI, 0]} background="#283d3e" />
  </SceneStage>;
}
