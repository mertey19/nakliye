"use client";

import type { JourneyMotion } from "@/config/journey";
import { Palm, Box } from "@/components/3d/ScenePrimitives";
import { Warehouse } from "./FactoryScene";
import { SceneStage } from "./SceneStage";

export function DepotScene({ motion }: { motion: JourneyMotion }) {
  return <SceneStage index={6} motion={motion}><Warehouse branded /><Palm position={[-5.9, 0, -4]} scale={1.25} /><Palm position={[7, 0, 7]} scale={1.4} /><Box position={[0, .03, -5.8]} size={[10, .02, .14]} color="#c9d4b5" /></SceneStage>;
}
