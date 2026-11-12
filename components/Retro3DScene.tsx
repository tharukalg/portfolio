"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Retro Vintage Computer Model built with Three.js primitives
function RetroComputer() {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle subtle breathing rotation
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* --- Monitor Case (Beige Retro Plastic) --- */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 1.4, 1.2]} />
        <meshStandardMaterial color="#E6DCB8" roughness={0.4} />
      </mesh>

      {/* Monitor Bevel / Front Border */}
      <mesh position={[0, 0.8, 0.61]}>
        <boxGeometry args={[1.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#D4C9A8" roughness={0.5} />
      </mesh>

      {/* CRT Screen (Dark with Phosphor Green Emissive Glow) */}
      <mesh ref={screenRef} position={[0, 0.85, 0.63]}>
        <boxGeometry args={[1.25, 0.95, 0.03]} />
        <meshStandardMaterial
          color="#0F2B1D"
          emissive="#22C55E"
          emissiveIntensity={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Floppy Slot on Monitor Base */}
      <mesh position={[0.35, 0.25, 0.62]}>
        <boxGeometry args={[0.45, 0.04, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Power LED Indicator */}
      <mesh position={[-0.5, 0.25, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.9} />
      </mesh>

      {/* --- Monitor Stand / Neck --- */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color="#D4C9A8" roughness={0.5} />
      </mesh>

      {/* --- Keyboard Base --- */}
      <mesh position={[0, -0.1, 0.7]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.12, 0.75]} />
        <meshStandardMaterial color="#E6DCB8" roughness={0.4} />
      </mesh>

      {/* Keyboard Keypad Area */}
      <mesh position={[0, -0.04, 0.7]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.4, 0.04, 0.55]} />
        <meshStandardMaterial color="#C4B896" />
      </mesh>

      {/* Retro Red/Orange Accent Key (e.g. Return / Esc) */}
      <mesh position={[0.55, -0.01, 0.65]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.12]} />
        <meshStandardMaterial color="#FF5722" />
      </mesh>

      {/* Retro Blue Accent Key */}
      <mesh position={[-0.55, -0.01, 0.5]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.12]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>

      {/* Spacebar */}
      <mesh position={[0, -0.01, 0.85]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.65, 0.05, 0.1]} />
        <meshStandardMaterial color="#FAF5E4" />
      </mesh>

      {/* --- Retro Mouse --- */}
      <mesh position={[1.1, -0.12, 0.6]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.4]} />
        <meshStandardMaterial color="#E6DCB8" roughness={0.4} />
      </mesh>
      {/* Mouse Button */}
      <mesh position={[1.1, -0.05, 0.5]}>
        <boxGeometry args={[0.2, 0.03, 0.15]} />
        <meshStandardMaterial color="#FF5722" />
      </mesh>
    </group>
  );
}

// Floating Retro Accessories (3.5" Floppy Disk & Geometric Bauhaus Shapes)
function FloatingAccessories() {
  const diskRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (diskRef.current) {
      diskRef.current.position.y = 1.3 + Math.sin(t * 1.2) * 0.15;
      diskRef.current.rotation.y = t * 0.4;
      diskRef.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.position.y = 0.2 + Math.cos(t * 1.4) * 0.12;
      torusRef.current.rotation.x = t * 0.5;
      torusRef.current.rotation.y = t * 0.3;
    }
    if (cubeRef.current) {
      cubeRef.current.position.y = 1.6 + Math.sin(t * 0.9 + 1) * 0.1;
      cubeRef.current.rotation.x = t * 0.6;
      cubeRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <>
      {/* 3.5" Retro Blue Floppy Disk */}
      <group ref={diskRef} position={[1.3, 1.3, -0.2]}>
        {/* Main disk body */}
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.65, 0.05]} />
          <meshStandardMaterial color="#2563EB" roughness={0.3} />
        </mesh>
        {/* Metal slider */}
        <mesh position={[0, 0.16, 0.03]}>
          <boxGeometry args={[0.42, 0.3, 0.02]} />
          <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Paper label */}
        <mesh position={[0, -0.12, 0.03]}>
          <boxGeometry args={[0.5, 0.3, 0.01]} />
          <meshStandardMaterial color="#FFFBEB" />
        </mesh>
      </group>

      {/* Retro Tangerine Torus Ring */}
      <mesh ref={torusRef} position={[-1.4, 0.2, 0.3]} castShadow>
        <torusGeometry args={[0.26, 0.09, 16, 32]} />
        <meshStandardMaterial color="#FF5722" roughness={0.3} />
      </mesh>

      {/* Retro Sunflower Yellow Geometric Dodecahedron */}
      <mesh ref={cubeRef} position={[-1.3, 1.6, -0.4]} castShadow>
        <dodecahedronGeometry args={[0.22]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.3} />
      </mesh>
    </>
  );
}

export default function Retro3DScene() {
  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 42 }}
        shadows
        style={{ pointerEvents: "auto" }}
      >
        {/* Ambient Warm Studio Lighting */}
        <ambientLight intensity={0.9} color="#FFFBF0" />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.4}
          color="#FFF8E7"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#93C5FD" />
        <pointLight position={[0, 1, 1.2]} intensity={0.6} color="#4ADE80" />

        {/* Floating Scene */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <RetroComputer />
          <FloatingAccessories />
        </Float>

        {/* Soft Floor Shadow */}
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.4}
          scale={5}
          blur={2.4}
          far={3}
          color="#3E3427"
        />

        {/* Orbit Controls (constrained for comfortable viewing) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />
      </Canvas>

      {/* Interactive Helper Overlay Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-900/80 text-stone-200 border border-stone-700/60 text-[10px] font-mono tracking-wider backdrop-blur-sm pointer-events-none flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>3D RETRO WORKSTATION // DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
