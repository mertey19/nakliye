"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { ExtrudeGeometry, MathUtils, QuadraticBezierCurve3, Shape, TubeGeometry, Vector3, type Group, type Mesh } from "three";
import type { JourneyMotion } from "@/config/journey";
import { turkeyOutline } from "@/lib/turkeyOutline";
import { Box, Sign } from "@/components/3d/ScenePrimitives";
import { SceneStage } from "./SceneStage";

// Equirectangular projection adjusted for latitude: east +X, north -Z.
const project = (lng: number, lat: number) => new Vector3((lng - 35.45) * 1.2, .7, (39 - lat) * 1.55);
const origin = project(34.634, 36.812);
const cities = [{ name: "İSTANBUL", lng: 28.978, lat: 41.008 }, { name: "ANKARA", lng: 32.86, lat: 39.933 }, { name: "İZMİR", lng: 27.143, lat: 38.424 }, { name: "ANTALYA", lng: 30.713, lat: 36.897 }, { name: "ADANA", lng: 35.321, lat: 37.0 }];

function Route({ point, index, motion }: { point: Vector3; index: number; motion: JourneyMotion }) {
  const route = useMemo(() => {
    const middle = origin.clone().lerp(point, .5); middle.y = 3 + origin.distanceTo(point) * .1;
    const curve = new QuadraticBezierCurve3(origin, middle, point);
    return { curve, geometry: new TubeGeometry(curve, 48, .023, 4, false) };
  }, [point]);
  const marker = useRef<Group>(null);
  useEffect(() => () => route.geometry.dispose(), [route]);
  useFrame(({ clock }) => {
    const reveal = MathUtils.smoothstep(motion.current, 4.55 + index * .045, 4.98 + index * .015);
    route.geometry.setDrawRange(0, Math.floor(reveal * route.geometry.index!.count / 6) * 6);
    if (!marker.current || motion.paused || !motion.active) return;
    const t = (clock.elapsedTime * .075 + index * .17) % 1;
    marker.current.visible = reveal > .9;
    marker.current.position.copy(route.curve.getPoint(t));
    const tangent = route.curve.getTangent(t);
    marker.current.rotation.y = Math.atan2(-tangent.x, -tangent.z);
  });
  return <>
    <mesh geometry={route.geometry}><meshBasicMaterial color="#e10600" toneMapped={false} /></mesh>
    <group ref={marker} scale={.18}><Box position={[0, .55, 0]} size={[1.1, 1.1, 2.1]} color="#f2f2f2" /><Box position={[0, .4, -1.5]} size={[1, .8, .9]} color="#e10600" /></group>
  </>;
}

export function TurkeyRoutesScene({ motion }: { motion: JourneyMotion }) {
  const map = useMemo(() => turkeyOutline.map(ring => {
    const shape = new Shape();
    ring.forEach(([lng, lat], i) => { const p = project(lng, lat); if (i === 0) shape.moveTo(p.x, -p.z); else shape.lineTo(p.x, -p.z); });
    shape.closePath();
    return new ExtrudeGeometry(shape, { depth: .45, bevelEnabled: true, bevelThickness: .08, bevelSize: .04, bevelSegments: 1, steps: 1 });
  }), []);
  const points = useMemo(() => cities.map(city => project(city.lng, city.lat)), []);
  const group = useRef<Group>(null);
  const halo = useRef<Mesh>(null);
  useEffect(() => () => map.forEach(geometry => geometry.dispose()), [map]);
  useFrame(({ clock }) => {
    if (group.current) group.current.scale.setScalar(MathUtils.smoothstep(motion.current, 4.4, 4.93) * MathUtils.smoothstep(5.65 - motion.current, 0, .35));
    if (halo.current && !motion.paused) halo.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.5) * .18);
  });
  return <SceneStage index={5} motion={motion}>
    <group ref={group} position={[0, 4, 0]}>
      <Box position={[0, -.15, 0]} size={[28, .2, 15]} color="#132c36" metal={.35} rough={.65} />
      {map.map((geometry, i) => <mesh key={i} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><meshStandardMaterial color="#4f7979" metalness={.55} roughness={.4} /></mesh>)}
      {points.map((point, i) => <group key={cities[i].name}><Route point={point} index={i} motion={motion} /><mesh position={point}><sphereGeometry args={[.1, 10, 6]} /><meshBasicMaterial color="#ffd0c8" /></mesh><Billboard position={[point.x, 1.2, point.z - .35]}><Sign text={cities[i].name} position={[0, 0, 0]} size={[i === 0 ? 2.6 : 2.1, .55]} background="#140808" /></Billboard></group>)}
      <mesh position={origin} ref={halo} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.3, .36, 32]} /><meshBasicMaterial color="#e10600" toneMapped={false} /></mesh>
      <mesh position={origin}><sphereGeometry args={[.19, 12, 6]} /><meshBasicMaterial color="#ff4a2a" toneMapped={false} /></mesh>
      <Billboard position={[origin.x, 1.2, origin.z + .9]}><Sign text="MERSİN" position={[0, 0, 0]} size={[2.6, .68]} background="#e10600" color="#ffffff" /></Billboard>
    </group>
    {[-1, 1].map(side => <group key={side} position={[side * 25, 0, 15]}><mesh><coneGeometry args={[15, 16, 5]} /><meshStandardMaterial color="#344d56" /></mesh><mesh position={[side * 16, -2, 10]}><coneGeometry args={[20, 22, 5]} /><meshStandardMaterial color="#344d56" /></mesh></group>)}
    <Sign text="MERSİN → TÜRKİYE" position={[7, 3.5, 18]} size={[4, 1.2]} rotation={[0, Math.PI, 0]} />
  </SceneStage>;
}
