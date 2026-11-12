"use client";

import React from "react";
import dynamic from "next/dynamic";

const Retro3DScene = dynamic(() => import("./Retro3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] flex flex-col items-center justify-center bg-[#F2EDE4] rounded-2xl border-2 border-stone-800 border-dashed p-6 text-center">
      <div className="w-14 h-14 rounded-xl bg-amber-400 border-2 border-stone-800 flex items-center justify-center text-xl font-mono font-bold shadow-[2px_2px_0px_#1c1917] animate-pulse">
        3D
      </div>
      <div className="mt-3 font-mono text-xs font-bold text-stone-800 uppercase tracking-wider">
        Loading Retro 3D Hardware...
      </div>
      <div className="text-[11px] font-mono text-stone-500 mt-1">
        Three.js Engine Initializing
      </div>
    </div>
  ),
});

export default function Retro3D() {
  return (
    <div className="w-full h-full">
      <Retro3DScene />
    </div>
  );
}
