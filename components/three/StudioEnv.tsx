"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Procedural studio reflections for chrome: no HDR download.
 *  A bright periwinkle sky with dark horizon strips reads as polished silver;
 *  vermilion and petrol strips tint the edges with the site's own colours. */
export default function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#d3e2e4"]} />
      {/* dark bands give chrome its contrast */}
      <Lightformer form="rect" intensity={1} color="#0c1a1e" position={[0, -1.2, -6]} scale={[30, 2.6, 1]} />
      <Lightformer form="rect" intensity={1} color="#12262c" position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={[30, 30, 1]} />
      <group rotation={[-Math.PI / 4, 0, 0.6]}>
        <Lightformer form="circle" intensity={8} color="#ffffff" position={[0, 5, -9]} scale={3} />
        <Lightformer form="rect" intensity={5} color="#ffffff" position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[20, 1.2, 1]} />
        <Lightformer form="rect" intensity={6} color="#ff5a36" position={[-6, -0.5, -1]} rotation-y={Math.PI / 2} scale={[20, 1.6, 1]} />
        <Lightformer form="rect" intensity={4} color="#1f5866" position={[-6, 2.5, -1]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
        <Lightformer form="ring" intensity={3} color="#ffffff" position={[0, 0, 9]} scale={10} />
      </group>
    </Environment>
  );
}
