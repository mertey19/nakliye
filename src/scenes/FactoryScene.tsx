"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { JourneyMotion } from "@/config/journey";
import { Box, Carton, Cylinder, LogoDisc, Sign } from "@/components/3d/ScenePrimitives";
import { SceneStage } from "./SceneStage";

export function Warehouse({ branded = false }: { branded?: boolean }) {
  return <group position={[-10, 0, 7]}>
    <Box position={[0, 3, 0]} size={[14, 6, 10]} color="#788784" metal={.5} />
    <Box position={[0, 6.2, 0]} size={[14.5, .35, 10.5]} color="#45575b" metal={.7} />
    {[-4.7, 0, 4.7].map(x => <group key={x}><Box position={[x, 1.7, -5.03]} size={[3.7, 3.4, .12]} color="#283b40" />{[0, 1, 2, 3, 4, 5].map(i => <Box key={i} position={[x, .4 + i * .48, -5.12]} size={[3.65, .025, .07]} color="#94a39a" />)}</group>)}
    <Sign text={branded ? "KANSU CAN NAKLİYE" : "LOJİSTİK & ENDÜSTRİ"} position={[0, 4.65, -5.13]} size={[10.8, 1.3]} rotation={[0, Math.PI, 0]} background="#0a0a0a" color={branded ? "#ffffff" : "#f2f2f2"} />
    {branded && <LogoDisc position={[-5.7, 4.65, -5.14]} scale={0.42} />}
    <Box position={[0, .12, -7]} size={[15, .22, 4]} color="#9ba39b" />
  </group>;
}
function Forklift({ motion }: { motion: JourneyMotion }) {
  const lift = useRef<Group>(null);
  useFrame(({ clock }) => { if (lift.current && motion.active && !motion.paused && Math.abs(motion.current - 3) < 1.2) lift.current.position.z = 3 + Math.sin(clock.elapsedTime * .35) * 2; });
  return <group ref={lift} position={[4.1, 0, 3]} rotation={[0, .1, 0]}>
    <Box position={[0, .65, 0]} size={[1.2, .8, 1.8]} color="#c2ad6c" metal={.4} />
    <Box position={[0, 2.2, .2]} size={[1.25, .1, 1.5]} color="#28393a" />
    {[-.52, .52].map(x => <group key={x}><Box position={[x, 1.55, .77]} size={[.07, 1.3, .07]} color="#263638" /><Box position={[x, 1.3, -.82]} size={[.1, 2.5, .12]} color="#354744" /><Box position={[x, .45, -1.55]} size={[.13, .1, 1.6]} color="#75847c" />{[-.6, .65].map(z => <Cylinder key={z} position={[x * 1.2, .36, z]} radius={.35} height={.24} rotation={[0, 0, Math.PI / 2]} color="#1d282a" />)}</group>)}
    <Carton position={[0, .51, -1.4]} scale={1.2} />
  </group>;
}
export function FactoryScene({ motion }: { motion: JourneyMotion }) {
  return <SceneStage index={3} motion={motion}>
    <Warehouse /><Forklift motion={motion} />
    {[0, 1, 2].map(i => <group key={i} position={[-6.8 - i * 2.4, 0, -4]}><Box position={[0, .14, 0]} size={[1.8, .28, 1.4]} color="#9c8c6d" /><Box position={[0, 1, 0]} size={[1.4, 1.4, 1.2]} color="#5e817d" metal={.55} /><Cylinder position={[0, 1.8, 0]} radius={.38} height={.3} color="#bcc6ba" /><Box position={[.3, 1.4, -.63]} size={[.5, .3, .08]} color="#152c31" /></group>)}
    <Cylinder position={[-18, 6, 12]} radius={.8} height={12} color="#708081" />
  </SceneStage>;
}
