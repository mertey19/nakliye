"use client";

import type { JourneyMotion } from "@/config/journey";
import { Box, Building, Carton, Cylinder, Sign } from "@/components/3d/ScenePrimitives";
import { SceneStage } from "./SceneStage";

function Desk({ x, z }: { x: number; z: number }) {
  return <group position={[x, 0, z]}>
    <Box position={[0, 1.05, 0]} size={[1.7, .12, .8]} color="#c8beaa" />
    {[-.7, .7].map(x => <Box key={x} position={[x, .5, 0]} size={[.05, 1, .7]} color="#798783" metal={.6} />)}
    <Box position={[0, 1.52, .08]} size={[.83, .5, .06]} color="#1a282e" />
    <Cylinder position={[0, 1.21, .08]} radius={.04} height={.3} />
    <Box position={[0, 1.123, -.21]} size={[.55, .03, .16]} color="#586665" />
    <Carton position={[1.15, 0, -.1]} />
  </group>;
}
export function OfficeMovingScene({ motion }: { motion: JourneyMotion }) {
  return <SceneStage index={2} motion={motion}>
    <Building position={[-10, 0, 7]} floors={7} office />
    <Building position={[-18, 0, 16]} floors={9} office />
    <Box position={[-8, 3.1, 2]} size={[9, .2, 3]} color="#a8b6ae" metal={.6} />
    <Sign text="BUSINESS CENTER" position={[-9, 3.6, 1.7]} size={[5, .8]} rotation={[0, Math.PI, 0]} />
    <Desk x={3.6} z={2.5} /><Desk x={4} z={5} />
    <Box position={[4.7, 1.1, -1]} size={[.8, 2.2, .6]} color="#7b8b85" />
    {[0, 1, 2].map(i => <Carton key={i} position={[3.3, i * .7, -2.5]} />)}
  </SceneStage>;
}
