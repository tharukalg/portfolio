"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { personalDetails, quickStats } from "@/data";
import Scramble from "./arcade/Scramble";
import Magnetic from "./arcade/Magnetic";
import { isBootDone, useBootDone } from "./arcade/boot";

const EASE = [0.16, 1, 0.3, 1] as const;

function useColomboClock() {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function CountUp({ value, start }: { value: string; start: boolean }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(target ?? 0);

  useEffect(() => {
    if (target === null || !start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    setN(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  if (target === null) return <>{value}</>;
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const boot = useBootDone();
  const clock = useColomboClock();
  const copyEmail = () => {
    navigator.clipboard?.writeText(personalDetails.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  // Visible on the server; hidden only after hydration while the boot screen covers it.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!isBootDone()) setArmed(true);
  }, []);

  const enter = (delay: number) => ({
    initial: false as const,
    animate: armed && !boot ? "out" : "in",
    variants: {
      out: { opacity: 0, y: 44, filter: "blur(10px)", transition: { duration: 0 } },
      in: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, delay, ease: EASE } },
    },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-petrol text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle,oklch(var(--verm)/0.16),transparent_65%)] blur-2xl"
      />

      <div className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col gutter pb-10 pt-28 sm:pt-32">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] sm:text-xs">
          <span className="flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulsering rounded-full bg-verm motion-safe-only" />
              <span className="relative h-2 w-2 rounded-full bg-verm" />
            </span>
            <span>
              NOW<span className="hidden sm:inline">: Software Engineer</span> @{" "}
              <span className="font-bold">Savinda Graphic Systems</span>
            </span>
          </span>
          <span className="rounded-full border border-paper/40 px-3 py-1.5 tabular-nums">
            COLOMBO <span className="font-bold">{clock}</span> · UTC+5:30
          </span>
        </div>

        <h1 className="display relative z-0 mt-auto pt-14 text-[clamp(4.5rem,15vw,10.5rem)] leading-[0.8]">
          <Scramble text="Tharuka" trigger="boot" duration={900} className="block" />
          <Scramble
            text="Lakshan"
            trigger="boot"
            duration={1100}
            delay={120}
            className="stroke-text stroke-paper block pl-[0.6em]"
          />
        </h1>

        <div className="relative z-10 mt-8 grid items-end gap-8 lg:grid-cols-12">
          <motion.p {...enter(0.35)} className="max-w-[56ch] text-base leading-relaxed text-paper/85 sm:text-lg lg:col-span-7">
            Hi, I&apos;m <strong className="font-bold text-paper">Tharuka Lakshan</strong> — Software Engineer
            based in Western Province, Sri Lanka. 2+ years production experience delivering enterprise systems
            across <strong className="font-bold text-paper">Flutter, NestJS, React, .NET, AWS</strong>. Currently a
            Software Engineer at{" "}
            <strong className="bg-paper px-1 font-bold text-petrol">Savinda Graphic Systems</strong>, and also working
            as a software engineer at <strong className="font-bold text-paper">thebrandora.com</strong>.
          </motion.p>

          <motion.div {...enter(0.5)} className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Magnetic>
              <a href="#projects" className="btn-primary" data-cursor="go">
                View My Work <FiArrowDownRight />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button type="button" onClick={copyEmail} className="btn-ghost" data-cursor="copy">
                {copied ? <FiCheck /> : <FiCopy />}
                <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="https://thebrandora.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                data-cursor="visit"
              >
                thebrandora.com <FiArrowUpRight />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.dl
          {...enter(0.65)}
          className="relative z-10 mt-10 grid grid-cols-2 border-t-2 border-paper/30 md:grid-cols-4"
        >
          {quickStats.map((s, i) => (
            <div
              key={s.label}
              className={`group py-5 ${i % 2 === 1 ? "pl-4" : "pr-4"} md:px-0 ${i > 0 ? "md:pl-5" : ""} ${
                i > 1 ? "border-t border-paper/20 md:border-t-0" : ""
              }`}
            >
              <dt className="font-mono text-[11px] uppercase text-paper/75">{s.label}</dt>
              <dd className="display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] tabular-nums transition-colors duration-300 group-hover:text-verm">
                <CountUp value={s.value} start={boot} />
              </dd>
              <dd className="mt-1 text-xs text-paper/75">{s.subtext}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
