"use client";

import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace, DoubleSide } from "three";
import { brand } from "@/config/brand";

type V3 = [number, number, number];

export function Box({ position = [0, 0, 0], size = [1, 1, 1], color = "#b1b4af", metal = 0, rough = 0.7, rotation = [0, 0, 0] }: { position?: V3; size?: V3; color?: string; metal?: number; rough?: number; rotation?: V3 }) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={rough} metalness={metal} /></mesh>;
}

export function Cylinder({ position = [0, 0, 0], radius = .1, height = 1, color = "#343c40", rotation = [0, 0, 0], top }: { position?: V3; radius?: number; height?: number; color?: string; rotation?: V3; top?: number }) {
  return <mesh position={position} rotation={rotation} castShadow><cylinderGeometry args={[top ?? radius, radius, height, 10]} /><meshStandardMaterial color={color} roughness={.75} /></mesh>;
}

/** Canvas text stays local: no external fonts/textures and readable Turkish glyphs. */
export function useLabelTexture(lines: string[], options: { color?: string; background?: string; width?: number; height?: number; fontSize?: number } = {}) {
  const { color = "#f4f5ed", background = "#111a1e", width = 1024, height = 512, fontSize = 105 } = options;
  const text = lines.join("\n");
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `800 ${fontSize}px Arial, sans-serif`;
    const rows = text.split("\n");
    rows.forEach((line, i) => ctx.fillText(line, width / 2, height / 2 + (i - (rows.length - 1) / 2) * fontSize * 1.15, width * .91));
    const map = new CanvasTexture(canvas); map.colorSpace = SRGBColorSpace; map.anisotropy = 4;
    return map;
  }, [text, color, background, width, height, fontSize]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export function Sign({ text, position, size = [3, 1], rotation = [0, 0, 0], background = "#0a0a0a", color = "#f4f6ed" }: { text: string; position: V3; size?: [number, number]; rotation?: V3; background?: string; color?: string }) {
  const texture = useLabelTexture(text.split("\n"), { background, color, fontSize: 105 });
  return <mesh position={position} rotation={rotation}><planeGeometry args={size} /><meshBasicMaterial map={texture} side={DoubleSide} toneMapped={false} /></mesh>;
}

export function LogoDisc({ position, scale = 1 }: { position: V3; scale?: number }) {
  const texture = useTexture(brand.logo);
  texture.colorSpace = SRGBColorSpace;
  return (
    <mesh position={position} scale={scale}>
      <circleGeometry args={[1, 48]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

useTexture.preload(brand.logo);

export function Palm({ position, scale = 1 }: { position: V3; scale?: number }) {
  return <group position={position} scale={scale}>
    <Cylinder position={[0, 2.4, 0]} radius={.17} top={.09} height={4.8} color="#74604a" rotation={[0, 0, -.045]} />
    {Array.from({ length: 7 }, (_, i) => <group key={i} position={[.2, 4.75, 0]} rotation={[0, i * Math.PI * 2 / 7, 0]}>
      <mesh position={[.9, -.16, 0]} rotation={[0, 0, -.17]} scale={[1.6, .06, .27]} castShadow><sphereGeometry args={[1, 8, 4]} /><meshStandardMaterial color="#465440" roughness={.85} /></mesh>
    </group>)}
  </group>;
}

export function Carton({ position = [0, 0, 0], scale = 1 }: { position?: V3; scale?: number }) {
  return <group position={position} scale={scale}><Box position={[0, .35, 0]} size={[.65, .7, .6]} color="#b49b74" /><Box position={[0, .705, 0]} size={[.085, .012, .61]} color="#d3bc97" /><Box position={[0, .36, -.306]} size={[.087, .7, .01]} color="#cfb48d" /></group>;
}

export function Building({ position, floors = 4, office = false }: { position: V3; floors?: number; office?: boolean }) {
  const height = floors * 2.1;
  return <group position={position}>
    <Box position={[0, height / 2, 0]} size={[6, height, 5]} color={office ? "#526769" : "#bcbbac"} metal={office ? .5 : .05} />
    <Box position={[0, height + .18, 0]} size={[6.5, .36, 5.4]} color="#bcc1b9" />
    {Array.from({ length: floors }, (_, y) => <group key={y}>
      {[0, 1, 2].map(x => <Box key={x} position={[-2 + x * 2, 1.25 + y * 2.1, -2.53]} size={[office ? 1.8 : 1.15, 1.25, .09]} color={office ? "#9bafb0" : "#344849"} metal={.6} rough={.2} />)}
      <Box position={[0, y * 2.1 + .25, -2.65]} size={[6.3, .15, .45]} color="#929990" />
    </group>)}
    <Box position={[0, 1, -2.59]} size={[1.2, 2, .08]} color="#18252a" />
  </group>;
}
