"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { INTRO_SECONDS, type JourneyMotion } from "@/config/journey";

const desktop = [[12, 4.9, -14], [13, 6.8, -14], [10, 3.1, -10], [17, 13, -19], [11, 5.5, -13], [-10, 29, 16], [12, 5.3, -17]];
const handheld = [[11, 5, -16], [13, 7, -17], [12, 6, -15], [19, 14, -23], [13, 7, -17], [0, 32, 22], [13, 6, -18]];
const clamp = (n: number) => MathUtils.clamp(n, 0, 1);
export function CinematicCamera({ motion, mobile, onIntroDone }: { motion: JourneyMotion; mobile: boolean; onIntroDone: () => void }) {
  const vectors = useMemo(() => ({ eye: new Vector3(), look: new Vector3(), offset: new Vector3(), notified: false }), []);
  useFrame(({ camera }, dt) => {
    if (!motion.active || motion.paused) return;
    const delta = Math.min(dt, .05);
    motion.current = MathUtils.damp(motion.current, motion.target, 6, delta);
    if (motion.skip) motion.intro = 1;
    else motion.intro = Math.min(1, motion.intro + delta / INTRO_SECONDS);
    if (motion.intro === 1 && !vectors.notified) { vectors.notified = true; onIntroDone(); }
    const index = Math.min(5, Math.floor(motion.current));
    const local = motion.current - index;
    const f = local * local * (3 - 2 * local);
    const points = mobile ? handheld : desktop;
    vectors.offset.fromArray(points[index]).lerp(vectors.eye.fromArray(points[index + 1]), f);
    const truckZ = -motion.current * 55;
    const introOrbit = clamp((motion.intro - .64) / .36);
    const orbit = introOrbit * introOrbit * (3 - 2 * introOrbit);
    vectors.eye.set(MathUtils.lerp(mobile ? 4 : 2, vectors.offset.x, orbit), MathUtils.lerp(1.1, vectors.offset.y, orbit), truckZ + vectors.offset.z);
    const mapWeight = Math.max(0, 1 - Math.abs(motion.current - 5));
    vectors.look.set(mobile ? 0 : MathUtils.lerp(5.8, -10, mapWeight), mobile ? 4.5 + mapWeight * 9 : MathUtils.lerp(1.6, 4, mapWeight), truckZ + .6);
    vectors.eye.x += motion.pointerX * .35 * (1 - mapWeight);
    vectors.eye.y += motion.pointerY * .12 * (1 - mapWeight);
    const brake = Math.max(0, 1 - Math.abs(motion.intro - .7) * 24);
    vectors.eye.y += Math.sin(motion.intro * 160) * .025 * brake;
    camera.position.copy(vectors.eye);
    camera.lookAt(vectors.look);
    if (camera instanceof PerspectiveCamera) { const fov = mobile ? 55 : 42; if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); } }
  }, -2);
  return null;
}
