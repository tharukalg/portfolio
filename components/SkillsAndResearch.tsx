"use client";

import { useMemo, useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { education, publishedResearch, technicalSkills } from "@/data";
import Scramble from "./arcade/Scramble";
import Magnetic from "./arcade/Magnetic";
import SkillGlobe from "./three/SkillGlobe";

function Skills() {
  const [active, setActive] = useState<number | null>(null);
  const total = technicalSkills.reduce((n, g) => n + g.skills.length, 0);

  const tags = useMemo(
    () => technicalSkills.flatMap((g, gi) => g.skills.map((s) => ({ label: s, group: gi }))),
    []
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-petrol text-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint" />
      <div className="relative mx-auto max-w-[88rem] gutter py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-reveal="skew" className="section-title">
            Skill <span className="stroke-text stroke-paper">Tree</span>
          </h2>
          <p data-reveal="fade" className="max-w-[44ch] text-paper/85">
            Engineering capabilities refined across production mobile apps, high-concurrency enterprise services,
            and published peer-reviewed AI research.{" "}
            <span className="font-mono font-bold text-paper">{total} techs unlocked — drag the globe.</span>
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-5" aria-label="Skill categories">
            {technicalSkills.map((g, i) => {
              const on = i === active;
              return (
                <li key={g.category} className="border-b border-paper/20 first:border-t">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(on ? null : i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
                  >
                    <span
                      className={`display text-[clamp(1.6rem,3vw,2.5rem)] leading-none transition-all duration-500 ease-expo ${
                        on ? "translate-x-3 rounded-md bg-paper px-2 text-petrol" : "text-paper"
                      }`}
                    >
                      {g.category}
                    </span>
                    <span className="font-mono text-xs font-bold tabular-nums text-paper/75">
                      {String(g.skills.length).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-7" onPointerLeave={() => setActive(null)}>
            <SkillGlobe tags={tags} activeGroup={active} className="mx-auto w-full max-w-[40rem]" />
            {/* accessible / no-JS listing */}
            <ul className="sr-only">
              {technicalSkills.map((g) => (
                <li key={g.category}>
                  {g.category}: {g.skills.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="on-paper relative py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] gutter">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <span className="rounded-full bg-verm px-3 py-1">★ IEEE PUBLISHED PAPER</span>
              <span className="text-mute">DOC ID: {publishedResearch.documentId}</span>
              <span className="text-mute">· {publishedResearch.year}</span>
            </div>

            <Scramble
              as="h2"
              text={publishedResearch.title}
              duration={1400}
              className="mt-8 block text-[clamp(1.85rem,3.6vw,3.1rem)] font-extrabold leading-[1.06] tracking-tight"
            />

            <p data-reveal="rise" className="mt-8 max-w-[64ch] leading-relaxed text-mute">
              {publishedResearch.abstract}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {publishedResearch.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Magnetic>
                <a
                  href={publishedResearch.conferenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-cursor="read"
                >
                  View On IEEE Xplore <FiArrowUpRight />
                </a>
              </Magnetic>
              <span className="font-mono text-xs text-mute">PUBLISHER: {publishedResearch.publisher}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-reveal="zoom" className="relative rounded-[2rem] bg-ink p-6 text-paper sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-paper/70">EDUCATION · {education.period}</p>
                <div className="text-right">
                  <p className="display text-6xl leading-none text-verm">3.34</p>
                  <p className="font-mono text-[10px] text-paper/70">CGPA</p>
                </div>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight">{education.degree}</h3>
              <p className="mt-2 font-semibold text-[oklch(0.82_0.07_200)]">{education.specialization}</p>
              <p className="mt-2 text-sm text-paper/70">{education.institution}</p>

              <p className="mt-6 rounded-xl bg-petrol px-4 py-3 text-sm font-bold">★ Second Class Upper Division Honours</p>

              <p className="mt-8 font-mono text-xs text-paper/70">CORE COURSEWORK</p>
              <ul className="mt-3 space-y-2.5">
                {education.coursework.map((c, i) => (
                  <li
                    key={c}
                    data-reveal="rise"
                    style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-verm text-ink">
                      <FiCheck className="text-xs" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SkillsAndResearch() {
  return (
    <>
      <Skills />
      <Research />
    </>
  );
}
