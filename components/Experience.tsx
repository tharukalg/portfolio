"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { workExperience } from "@/data";
import { useLiveProgress } from "./arcade/useLiveProgress";

function Role({ job, index }: { job: (typeof workExperience)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useLiveProgress(ref, ["start", 0.85], ["start", 0.35]);
  // The company name "charges up": outline fills with petrol left → right.
  const fill = useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <article ref={ref} className="relative grid gap-8 py-14 md:grid-cols-12 md:gap-10">
      <span
        aria-hidden
        className="absolute -left-[calc(var(--rail-x)+7px)] top-[4.4rem] hidden h-3.5 w-3.5 rounded-full border-2 border-paper bg-verm md:block"
      />

      <header className="md:col-span-5">
        <p className="font-mono text-xs font-bold">
          <span className="text-verm">LVL {String(workExperience.length - index).padStart(2, "0")}</span> ·{" "}
          {job.period}
        </p>
        <h3 className="display relative mt-3 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.9]">
          <span className="stroke-text">{job.company}</span>
          <motion.span
            aria-hidden
            className="absolute inset-0 text-petrol motion-reduce:![clip-path:none]"
            style={{ clipPath: fill }}
          >
            {job.company}
          </motion.span>
        </h3>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs font-bold">
          <span className="rounded-full bg-verm px-3 py-1">{job.badge}</span>
          <span className="rounded-full border border-ink/25 px-3 py-1">{job.type}</span>
          <span className="rounded-full border border-ink/25 px-3 py-1">{job.location}</span>
        </div>
      </header>

      <div className="md:col-span-7" data-reveal="rise">
        <p className="text-xl font-extrabold tracking-tight">{job.title}</p>
        <p className="mt-3 max-w-[62ch] leading-relaxed text-mute">{job.desc}</p>
        <ul className="mt-6 space-y-3">
          {job.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed">
              <span aria-hidden className="mt-[0.55em] h-1.5 w-3 shrink-0 bg-petrol" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useLiveProgress(ref, ["start", 0.7], ["end", 0.6]);
  const rail = useSpring(progress, { stiffness: 140, damping: 30 });

  return (
    <section id="experience" className="on-paper relative mx-auto max-w-[88rem] gutter py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 data-reveal="skew" className="section-title">
          XP <span className="text-petrol">Log</span>
        </h2>
        <p className="max-w-[40ch] text-mute" data-reveal="fade">
          Production systems, enterprise teams and real users. The levels so far.
        </p>
      </div>

      <div ref={ref} className="relative mt-10 [--rail-x:2rem] md:pl-[var(--rail-x)]">
        <div aria-hidden className="absolute left-0 top-0 hidden h-full w-[3px] bg-ink/10 md:block" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 hidden h-full w-[3px] origin-top bg-petrol md:block"
          style={{ scaleY: rail }}
        />
        <div className="divide-y-2 divide-ink/10">
          {workExperience.map((job, i) => (
            <Role key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
