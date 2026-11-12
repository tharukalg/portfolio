"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { gridItems, personalDetails, publishedResearch } from "@/data";
import Magnetic from "./arcade/Magnetic";

const STACK = ["Flutter", "NestJS", "React.js", "AWS", ".NET Core", "TypeScript", "Supabase", "MariaDB", "Python", "TensorFlow"];
const SAVINDA_TAGS = ["Flutter", "NestJS", "MariaDB", "Angular", "Docker", "REST APIs"];

function Radar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[15rem]">
      {[1, 0.7, 0.42].map((s) => (
        <div
          key={s}
          className="absolute rounded-full border border-paper/25"
          style={{ inset: `${((1 - s) / 2) * 100}%` }}
        />
      ))}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper/15" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper/15" />
      <div
        className="absolute inset-0 animate-sweep rounded-full motion-safe-only"
        style={{
          background: "conic-gradient(from 0deg, oklch(var(--paper) / 0.5), oklch(var(--paper) / 0) 22%, transparent 100%)",
        }}
      />
      <div className="absolute left-[38%] top-[58%]">
        <span className="absolute -inset-2 animate-pulsering rounded-full bg-verm motion-safe-only" />
        <span className="relative block h-3 w-3 rounded-full bg-verm ring-2 ring-paper" />
      </div>
    </div>
  );
}

export default function About() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const copy = () => {
    navigator.clipboard?.writeText(personalDetails.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const card1 = gridItems.find((g) => g.id === 1)!;

  return (
    <section id="about" className="on-paper relative mx-auto max-w-[88rem] gutter py-28 sm:py-36">
      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 data-reveal="skew" className="section-title">
            Player
            <br />
            <span className="stroke-text">Profile</span>
          </h2>

          <p
            data-reveal="rise"
            className="mt-10 max-w-[36ch] text-[clamp(1.35rem,2.4vw,1.9rem)] font-semibold leading-snug"
          >
            {personalDetails.bio}
          </p>

          <div
            data-reveal="rise"
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="mt-14 border-t-2 border-ink pt-8"
          >
            <p className="font-mono text-xs font-bold text-petrol">{card1.description}</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{card1.title}</h3>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-mute">
              Delivered 5 production-grade applications serving 400+ employees across manufacturing operations,
              real-time floor monitoring, and a high-concurrency 600+ daily orders platform at Savinda Graphic
              Systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SAVINDA_TAGS.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-6">
          <div data-reveal="zoom" className="rounded-[2rem] bg-ink p-6 text-paper sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-paper/70">LOCATION</p>
                <p className="mt-1 text-lg font-bold leading-tight">Western Province, Sri Lanka</p>
                <p className="mt-1 text-sm text-paper/70">Available worldwide · remote &amp; hybrid ready</p>
              </div>
              <span className="shrink-0 rounded-full bg-verm px-3 py-1 font-mono text-xs font-bold text-ink tabular-nums">
                {time || "--:--"} LKT
              </span>
            </div>
            <div className="mt-6">
              <Radar />
            </div>
            <p className="mt-5 text-center font-mono text-xs text-paper/70">6.9271° N, 79.8612° E · UTC+5:30</p>
          </div>

          <div data-reveal="rise" className="rounded-[2rem] border-2 border-ink p-6 sm:p-8">
            <p className="font-mono text-xs font-bold">CORE STACK · MOBILE, FULL-STACK &amp; CLOUD</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-ink/[0.06] px-3 py-1.5 font-mono text-xs font-bold transition-colors duration-300 hover:bg-petrol hover:text-paper"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <a
            data-reveal="rise"
            href={publishedResearch.conferenceLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="read"
            className="group relative overflow-hidden rounded-[2rem] bg-petrol p-6 text-paper sm:p-8"
          >
            <p className="font-mono text-xs font-bold">★ IEEE PUBLISHED AUTHOR · SLIIT HONOURS</p>
            <p className="mt-3 line-clamp-3 text-lg font-extrabold leading-snug">{publishedResearch.title}</p>
            <div className="mt-5 flex items-center justify-between font-mono text-xs font-bold">
              <span>SLIIT — BSc (Hons) IT (SE) · CGPA 3.34</span>
              <FiArrowUpRight className="text-lg transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </a>
        </div>
      </div>

      <div
        data-reveal="wipe"
        className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-verm p-6 sm:flex-row sm:items-center sm:p-8"
      >
        <div>
          <p className="display text-[clamp(2rem,4.5vw,3.5rem)]">Let&apos;s build something exceptional</p>
          <p className="mt-2 max-w-[52ch] text-sm font-semibold">
            Have a project, role, or venture idea in mind? Let&apos;s build high-performance software. Direct:{" "}
            {personalDetails.phone}
          </p>
        </div>
        <Magnetic strength={0.2}>
          <button
            type="button"
            onClick={copy}
            data-cursor="copy"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-sm font-bold text-paper"
          >
            {copied ? <FiCheck /> : <FiCopy />}
            <span aria-live="polite">{copied ? `Copied: ${personalDetails.email}` : `Copy: ${personalDetails.email}`}</span>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
