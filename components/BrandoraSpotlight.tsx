"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const TABS = {
  architecture: {
    cmd: "cat architecture.md",
    label: "Architecture",
    points: [
      "Decoupled, modular backend services with high-concurrency database queries and clean RESTful endpoints.",
      "Production authentication, role management, and transactional integrity for commercial workloads.",
      "Cloud edge deployment with continuous integration pipelines for zero-downtime releases.",
    ],
  },
  frontend: {
    cmd: "cat frontend-ux.md",
    label: "Frontend & UX",
    points: [
      "Next.js App Router with Server Components for instantaneous initial page rendering.",
      "Tailored responsive design with tactile micro-interactions and mobile ergonomics.",
      "Adaptive layouts engineered to display flawlessly across high-res displays down to budget handsets.",
    ],
  },
  performance: {
    cmd: "cat core-vitals.md",
    label: "Core Vitals",
    points: [
      "Targeting 95+ Google Lighthouse scores with optimized asset compression and font preloading.",
      "Zero Cumulative Layout Shift (CLS = 0) and sub-100ms First Input Delay (FID).",
      "Query caching, edge-cached assets, and minimal client-side JS bundle sizes.",
    ],
  },
} as const;

type TabKey = keyof typeof TABS;

const BOOT_LINES: { t: string; c?: string }[] = [
  { t: "$ whoami", c: "text-paper font-bold" },
  { t: "tharuka · software engineer @ brandora" },
  { t: "$ ping thebrandora.com", c: "text-paper font-bold" },
  { t: "200 OK · edge cached · < 120ms", c: "text-verm" },
  { t: "$ cat stack.json", c: "text-paper font-bold" },
  { t: '["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Edge Caching", "Docker"]' },
];

function useTypedLines(start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(BOOT_LINES.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= BOOT_LINES.length) window.clearInterval(id);
    }, 260);
    return () => window.clearInterval(id);
  }, [start]);
  return count;
}

export default function BrandoraSpotlight() {
  const [tab, setTab] = useState<TabKey>("architecture");
  const termRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const typed = useTypedLines(inView);
  // Server render, no-JS and already-visible terminals show everything.
  const shown = armed ? typed : BOOT_LINES.length;

  return (
    <section id="brandora" className="on-paper relative mx-auto max-w-[88rem] gutter py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-bold text-petrol">★ ALSO WORKING AT</p>
          <h2 data-reveal="skew" className="section-title mt-4">
            Brandora
          </h2>
          <a
            href="https://thebrandora.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="visit"
            className="group mt-3 inline-flex items-center gap-2 rounded-full bg-verm px-4 py-2 font-mono text-sm font-bold"
          >
            thebrandora.com
            <FiArrowUpRight className="transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <p className="mt-8 max-w-[52ch] leading-relaxed text-mute">
            Alongside my role at Savinda Graphic Systems, I work as a software engineer at Brandora.
          </p>
          <h3 className="mt-10 text-2xl font-extrabold tracking-tight">Building thebrandora.com for Speed &amp; Scale</h3>
          <p className="mt-3 max-w-[56ch] leading-relaxed text-mute">
            As a software engineer on thebrandora.com, I help build a fast, modern digital commerce and brand
            elevation platform. Utilizing Next.js Server Components, modular APIs, and edge caching, the platform
            delivers instantaneous response times and seamless UX.
          </p>
        </div>

        {/* Terminal */}
        <div className="lg:col-span-7" ref={termRef}>
          <div
            data-reveal="zoom"
            className="overflow-hidden rounded-[2rem] bg-ink text-paper shadow-[14px_14px_0_0_oklch(var(--petrol))]"
          >
            <div className="flex items-center justify-between border-b border-paper/15 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-verm" />
                <span className="h-3 w-3 rounded-full bg-paper/30" />
                <span className="h-3 w-3 rounded-full bg-petrol" />
              </div>
              <span className="font-mono text-[11px] text-paper/70">brandora — zsh — 80×24</span>
              <span className="rounded bg-verm px-2 py-0.5 font-mono text-[10px] font-bold text-ink">200 OK</span>
            </div>

            <div className="p-5 font-mono text-[13px] leading-7 sm:p-7">
              <div className="text-paper/60">{"// Software Engineer: Tharuka Lakshan"}</div>
              {BOOT_LINES.slice(0, shown).map((l, i) => (
                <div key={i} className={`break-words ${l.c ?? "text-paper/75"}`}>
                  {l.t}
                </div>
              ))}

              <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Brandora engineering focus">
                {(Object.keys(TABS) as TabKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors duration-300 ${
                      tab === k ? "bg-verm text-ink" : "bg-ink-2 text-paper/75 hover:text-paper"
                    }`}
                  >
                    $ {TABS[k].cmd}
                  </button>
                ))}
              </div>

              <div className="mt-5 min-h-[12rem]" role="tabpanel">
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={tab}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="space-y-3"
                  >
                    <li className="font-bold text-[oklch(0.82_0.07_200)]"># {TABS[tab].label}</li>
                    {TABS[tab].points.map((p) => (
                      <li key={p} className="flex gap-3 text-paper/90">
                        <span className="text-verm">›</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-2 text-verm">
                <span>Pipeline: Continuous Deployment Active</span>
                <span className="inline-block h-4 w-2 animate-blink bg-verm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
