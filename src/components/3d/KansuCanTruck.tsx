"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh } from "three";
import { JOURNEY_MODEL_URL, type JourneyMotion } from "@/config/journey";
import { useLabelTexture } from "./ScenePrimitives";

/** Replace modelUrl with a production GLB; preserve named wheel/body pivots. */
export function KansuCanTruck({ motion, modelUrl = JOURNEY_MODEL_URL }: { motion: JourneyMotion; modelUrl?: string }) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => scene.clone(true), [scene]);
  const root = useRef<Group>(null);
  const previousZ = useRef(70);
  const brand = useLabelTexture(["KANSU CAN", "NAKLİYE"], { fontSize: 140, background: "#0a0a0a", color: "#ffffff" });
  const website = useLabelTexture(["kansucannakliye.com.tr"], { fontSize: 50, height: 128, background: "#0a0a0a", color: "#e10600" });
  const wheels = useMemo(() => ["wheel_fl", "wheel_fr", "wheel_rl", "wheel_rr"].map(name => model.getObjectByName(name)).filter(Boolean), [model]);
  const body = useMemo(() => model.getObjectByName("body"), [model]);
  useEffect(() => { model.traverse(object => { if (object instanceof Mesh) { object.castShadow = true; object.receiveShadow = true; } }); }, [model]);
  useFrame((_, delta) => {
    if (!root.current) return;
    const t = motion.intro;
    const approach = Math.pow(1 - Math.min(1, t / .7), 3) * 70;
    const z = -motion.current * 55 + approach;
    const traveled = z - previousZ.current;
    for (const wheel of wheels) if (wheel) wheel.rotation.x += traveled / .56;
    const speed = Math.min(1, Math.abs(traveled) / Math.max(delta, .001) / 20);
    root.current.position.set(0, Math.sin(z * 1.7) * .022 * speed, z);
    root.current.visible = t > .1 && Math.abs(motion.current - 5) > .38;
    if (body) body.rotation.x = Math.sin(t * Math.PI * 12) * .017 * Math.max(0, 1 - Math.abs(t - .7) * 14);
    previousZ.current = z;
  });
  return <group ref={root}>
    <primitive object={model} />
    {[1, -1].map(side => <group key={side} position={[side * 1.237, 2.35, .85]} rotation={[0, side * Math.PI / 2, 0]}>
      <mesh><planeGeometry args={[4.1, 1.9]} /><meshStandardMaterial map={brand} roughness={.42} metalness={.2} /></mesh>
      <mesh position={[0, -.98, .003]}><planeGeometry args={[3.7, .35]} /><meshStandardMaterial map={website} roughness={.45} /></mesh>
    </group>)}
    <mesh position={[0, 1.3, -3.85]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[4, 8]} /><meshBasicMaterial color="#e10600" transparent opacity={.04} depthWrite={false} /></mesh>
  </group>;
}

useGLTF.preload(JOURNEY_MODEL_URL);
