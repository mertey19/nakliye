"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import type { JourneyMotion } from "@/config/journey";
import { Box, Cylinder, Sign } from "@/components/3d/ScenePrimitives";
import { SceneStage } from "./SceneStage";

function Motorcycle({ motion }: { motion: JourneyMotion }) {
  const bike = useRef<Group>(null);
  useFrame(() => {
    if (!bike.current || motion.paused) return;
    const t = MathUtils.smoothstep(motion.current, 3.75, 4.12);
    bike.current.position.set(2.8, .08 + t * .75, 7.5 - t * 2.8);
    bike.current.rotation.x = -.25 * Math.sin(t * Math.PI);
  });
  return <group ref={bike}>
    {[-.8, .8].map(z => <group key={z} position={[0, .45, z]} rotation={[0, Math.PI / 2, 0]}><mesh castShadow><torusGeometry args={[.32, .11, 8, 16]} /><meshStandardMaterial color="#18262b" /></mesh><mesh><cylinderGeometry args={[.26, .26, .1, 12]} /><meshStandardMaterial color="#a2b1ad" metalness={.8} /></mesh></group>)}
    <Box position={[0, .82, 0]} size={[.35, .25, 1.25]} color="#778d85" metal={.7} />
    <Box position={[0, 1.05, .38]} size={[.42, .13, .64]} color="#253237" />
    <mesh position={[0, 1.03, -.15]} scale={[.26, .23, .45]} castShadow><sphereGeometry args={[1, 12, 6]} /><meshStandardMaterial color="#e10600" metalness={.5} roughness={.35} /></mesh>
    {[-.12, .12].map(x => <Cylinder key={x} position={[x, .8, -.65]} height={.9} radius={.035} rotation={[-.25, 0, 0]} color="#b6c8bf" />)}
    <Cylinder position={[0, 1.35, -.51]} radius={.045} height={.85} rotation={[0, 0, Math.PI / 2]} color="#bac9bc" />
    <Box position={[0, .54, .1]} size={[.42, .45, .45]} color="#495d5e" metal={.9} />
  </group>;
}
export function VehicleTransportScene({ motion }: { motion: JourneyMotion }) {
  return <SceneStage index={4} motion={motion}>
    <Box position={[-10, .02, 3]} size={[9, .12, 20]} color="#657875" />
    <Box position={[-10, 3, 10]} size={[9, 6, 5]} color="#536b6b" metal={.4} />
    <Sign text="ÖZENLE YÜKLENİR. GÜVENLE TAŞINIR." position={[-10, 3.8, 7.46]} size={[8, 1]} rotation={[0, Math.PI, 0]} />
    <Box position={[2.8, .75, 4.5]} size={[2.4, .18, 3.3]} color="#718983" metal={.7} />
    <Box position={[2.8, .4, 7]} size={[1, .1, 2.6]} color="#a1b4aa" metal={.8} rotation={[-.3, 0, 0]} />
    <Motorcycle motion={motion} />
    {[-1, 1].map(side => <Box key={side} position={[2.8 + side * .6, 1.25, 4.85]} size={[.04, 1.3, .05]} color="#dfb95a" rotation={[.2, 0, side * -.65]} />)}
    {[-4, -1, 2].map(z => <Cylinder key={z} position={[-5.8, .35, z]} radius={.2} top={.03} height={.7} color="#c9ac6d" />)}
  </SceneStage>;
}
