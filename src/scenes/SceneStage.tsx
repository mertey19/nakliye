"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { JourneyMotion } from "@/config/journey";

/** Keep objects allocated, but cull whole chapters instead of drawing the full world. */
export function SceneStage({ index, motion, children }: { index: number; motion: JourneyMotion; children: ReactNode }) {
  const group = useRef<Group>(null);
  useFrame(() => { if (group.current) group.current.visible = Math.abs(motion.current - index) < 1.25; });
  return <group ref={group} position={[0, 0, -index * 55]} visible={false}>{children}</group>;
}
