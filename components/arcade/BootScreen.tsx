"use client";

import { useEffect, useState } from "react";
import { markBootDone, prefersReducedMotion } from "./boot";

const LINES = [
  "> booting tharuka.os v2.6",
  "> mounting modules: flutter · nestjs · react · .net · aws",
  "> handshake: savinda graphic systems ........ ok",
  "> handshake: thebrandora.com ................ ok",
  "> signal locked. welcome, player one.",
];

const SEEN_KEY = "tl-boot-seen";

export default function BootScreen() {
  const [phase, setPhase] = useState<"run" | "exit" | "gone">("run");
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    if (seen || prefersReducedMotion()) {
      setPhase("gone");
      markBootDone();
      return;
    }

    const total = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setVisibleLines(Math.min(LINES.length, Math.floor(t * (LINES.length + 0.6))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("exit");
        markBootDone();
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        window.setTimeout(() => setPhase("gone"), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="boot-screen fixed inset-0 z-boot flex items-end bg-petrol text-paper gutter pb-[12vh]"
      data-phase={phase}
    >
      <div className="absolute inset-0 blueprint" />
      <div className="relative w-full max-w-3xl font-mono text-xs sm:text-sm text-paper/80">
        {LINES.map((line, i) => (
          <div
            key={line}
            className="leading-7 transition-opacity duration-200"
            style={{ opacity: i < visibleLines ? 1 : 0 }}
          >
            <span className={i === LINES.length - 1 ? "font-bold text-paper" : ""}>{line}</span>
          </div>
        ))}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/20">
            <div
              className="h-full bg-verm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-12 text-right tabular-nums font-bold text-paper">{progress}%</span>
        </div>
      </div>

      <style jsx>{`
        .boot-screen {
          /* failsafe: never trap the page if JS stalls */
          animation: boot-failsafe 0.6s ease 3.2s forwards;
          clip-path: inset(0 0 0 0);
          transition: clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .boot-screen[data-phase="exit"] {
          clip-path: inset(0 0 100% 0);
        }
        @keyframes boot-failsafe {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .boot-screen {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
