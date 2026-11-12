"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const WORDS = [
  "Flutter",
  "NestJS",
  "React",
  "Next.js",
  ".NET Core",
  "AWS",
  "TypeScript",
  "Supabase",
  "MariaDB",
  "TensorFlow",
  "Docker",
  "BLoC",
];

function Band({ reverse = false, tone }: { reverse?: boolean; tone: "verm" | "ink" }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="display text-[clamp(2rem,5vw,3.5rem)]">{w}</span>
          <span aria-hidden className={tone === "verm" ? "text-paper" : "text-verm"}>
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={
        tone === "verm"
          ? "overflow-hidden bg-verm py-3 text-ink"
          : "overflow-hidden bg-ink py-3 text-paper"
      }
    >
      <div
        className={`flex w-max motion-safe-only ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        style={{ ["--marquee-speed" as string]: reverse ? "44s" : "36s" }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

/** Two crossed ticker bands whose tilt reacts to scroll velocity. */
export default function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 40 });
  const skew = useTransform(smooth, [-2500, 0, 2500], [-7, 0, 7], { clamp: true });
  const skewRev = useTransform(skew, (v) => -v);

  return (
    <section aria-label="Tech stack" className="relative z-raised -my-6 select-none py-10">
      <motion.div style={{ rotate: -2.5, skewX: skew }} className="motion-reduce:!transform-none">
        <Band tone="verm" />
      </motion.div>
      <motion.div style={{ rotate: 1.8, skewX: skewRev }} className="-mt-3 motion-reduce:!transform-none">
        <Band tone="ink" reverse />
      </motion.div>
    </section>
  );
}
