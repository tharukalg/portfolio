"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import * as THREE from "three";
import StudioEnv from "./StudioEnv";

/** Builds an extruded monogram from straight-edged letter outlines. */
function useMonogram() {
  return useMemo(() => {
    const T = new THREE.Shape();
    // T: crossbar 1.3 × 0.34, stem 0.36 wide, total height 1.5
    T.moveTo(-0.65, 0.75);
    T.lineTo(0.65, 0.75);
    T.lineTo(0.65, 0.41);
    T.lineTo(0.18, 0.41);
    T.lineTo(0.18, -0.75);
    T.lineTo(-0.18, -0.75);
    T.lineTo(-0.18, 0.41);
    T.lineTo(-0.65, 0.41);
    T.closePath();

    const L = new THREE.Shape();
    // L: stem 0.36 wide, foot 1.0 × 0.34
    L.moveTo(-0.5, 0.75);
    L.lineTo(-0.14, 0.75);
    L.lineTo(-0.14, -0.41);
    L.lineTo(0.5, -0.41);
    L.lineTo(0.5, -0.75);
    L.lineTo(-0.5, -0.75);
    L.closePath();

    const opts: THREE.ExtrudeGeometryOptions = {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.06,
      bevelSegments: 6,
      curveSegments: 1,
    };
    const t = new THREE.ExtrudeGeometry(T, opts);
    const l = new THREE.ExtrudeGeometry(L, opts);
    t.translate(-0.62, 0, -0.21);
    l.translate(0.78, 0, -0.21);
    return [t, l] as const;
  }, []);
}

function Monogram({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [t, l] = useMonogram();

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const ty = reduced ? -0.35 : state.pointer.x * 0.9 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    const tx = reduced ? 0.15 : -state.pointer.y * 0.5;
    g.rotation.y += (ty - g.rotation.y) * 0.06;
    g.rotation.x += (tx - g.rotation.x) * 0.06;
  });

  return (
    <Float speed={reduced ? 0 : 1.6} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
      <group ref={group} scale={1.05}>
        <mesh geometry={t}>
          <meshStandardMaterial color="#eef0ff" metalness={1} roughness={0.08} envMapIntensity={1.4} />
        </mesh>
        <mesh geometry={l}>
          <meshStandardMaterial color="#ff8a66" metalness={1} roughness={0.12} envMapIntensity={1.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ChromeLogo({
  eventSource,
  className = "",
}: {
  eventSource: RefObject<HTMLElement>;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        eventSource={eventSource as MutableRefObject<HTMLElement>}
        eventPrefix="client"
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <StudioEnv />
        <Monogram reduced={reduced} />
      </Canvas>
    </div>
  );
}
