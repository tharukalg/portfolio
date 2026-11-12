"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import { personalDetails, projects } from "@/data";
import { useLiveProgress } from "./arcade/useLiveProgress";

const categories = ["All", "Featured & Active", "Enterprise", "IoT & AI", "Mobile", "Tools & Games"];

type Project = (typeof projects)[number];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Cartridge({ item, index, tilt }: { item: Project; index: number; tilt: boolean }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 24 });
  const sry = useSpring(ry, { stiffness: 200, damping: 24 });
  const glare = useMotionTemplate`radial-gradient(28rem circle at ${gx}% ${gy}%, oklch(var(--verm) / 0.22), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const hasLink = "link" in item && !!item.link;
  const isDownload = "download" in item && !!item.download;
  const linkText = ("linkText" in item && item.linkText) || "View Details";

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1100 } : undefined}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border-2 border-paper/10 bg-ink-2 p-6 text-paper transition-colors duration-500 hover:border-verm sm:p-8"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />

      <div className="relative flex items-start justify-between gap-4">
        <span className="display stroke-text stroke-paper text-[5.5rem] leading-[0.8] transition-colors duration-500 group-hover:text-verm group-hover:[--stroke:oklch(var(--verm))]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end gap-2 text-right">
          {item.featured && (
            <span className="rounded-full bg-verm px-2.5 py-1 font-mono text-[10px] font-bold text-ink">FEATURED</span>
          )}
          <span className="font-mono text-[11px] text-paper/70">{item.metrics}</span>
        </div>
      </div>

      <p className="relative mt-8 font-mono text-xs font-bold text-verm">{item.tag}</p>
      <h3
        className="glitch relative mt-2 text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-3xl"
        data-text={item.title}
      >
        {item.title}
      </h3>
      <p className="relative mt-4 text-[0.95rem] leading-relaxed text-paper/75">{item.des}</p>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <div className="flex items-center">
          {item.iconLists.map((icon) => (
            <span
              key={icon}
              className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-2 bg-ink first:ml-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" className="h-4 w-4 object-contain" />
            </span>
          ))}
        </div>

        {hasLink && (
          <a
            href={item.link}
            {...(isDownload ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
            data-cursor={isDownload ? "grab it" : "open"}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-paper px-4 py-2.5 font-mono text-xs font-bold text-ink transition-colors duration-300 hover:bg-verm"
          >
            {linkText}
            {isDownload ? <FiDownload /> : <FiArrowUpRight />}
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function RecentProjects() {
  const [active, setActive] = useState("All");
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active || (active === "Featured & Active" && p.featured));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pinned = desktop && !reduced;

  // horizontal track measurement
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useIsoLayoutEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, filtered.length]);

  const scrollYProgress = useLiveProgress(wrapRef, ["start", 0], ["end", 1]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const sx = useSpring(x, { stiffness: 160, damping: 32, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pickCategory = (cat: string) => {
    setActive(cat);
    // keep the pinned section anchored at its start when the set changes
    if (pinned && wrapRef.current) {
      const top = wrapRef.current.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "auto" });
    }
  };

  const header = (
    <div className="mx-auto flex w-full max-w-[88rem] flex-wrap items-end justify-between gap-6 gutter">
      <div>
        <h2 className="section-title">
          Key <span className="stroke-text stroke-paper">Projects</span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-paper/75">
          From scaling high-concurrency enterprise applications to cutting-edge IoT/ML research and
          engineering work on thebrandora.com.
        </p>
      </div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => pickCategory(cat)}
            aria-pressed={active === cat}
            className={`relative rounded-full px-4 py-2 font-mono text-xs font-bold transition-colors duration-300 ${
              active === cat ? "text-ink" : "border border-paper/25 text-paper/80 hover:border-verm hover:text-verm"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 rounded-full bg-verm"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const endCard = (
    <a
      href={personalDetails.github}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="github"
      className="group flex h-full min-h-[18rem] w-full flex-col justify-between rounded-[1.75rem] bg-petrol p-8 text-paper"
    >
      <FiGithub className="text-4xl" />
      <span className="display text-[clamp(3rem,5vw,4.5rem)] leading-[0.88]">
        More on
        <br />
        GitHub
        <FiArrowUpRight className="ml-2 inline transition-transform duration-500 ease-expo group-hover:-translate-y-2 group-hover:translate-x-2" />
      </span>
      <span className="font-mono text-xs font-bold">github.com/{personalDetails.githubUsername}</span>
    </a>
  );

  if (!pinned) {
    return (
      <section id="projects" className="relative bg-ink py-24 text-paper sm:py-32">
        {header}
        <div className="mx-auto mt-12 grid max-w-[88rem] gap-5 gutter md:grid-cols-2">
          {filtered.map((item) => (
            <div key={item.id} data-reveal="rise">
              <Cartridge item={item} index={projects.indexOf(item)} tilt={false} />
            </div>
          ))}
          <div data-reveal="rise">{endCard}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative bg-ink text-paper">
      <div ref={wrapRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-16">
          {header}
          <motion.div
            ref={trackRef}
            style={{
              x: sx,
              paddingLeft: "max(var(--gutter), calc((100vw - 88rem) / 2 + var(--gutter)))",
              paddingRight: "var(--gutter)",
            }}
            className="flex w-max gap-6 will-change-transform"
          >
            {filtered.map((item) => (
              <div key={item.id} className="min-h-[min(30rem,52vh)] w-[min(30rem,38vw)] shrink-0">
                <Cartridge item={item} index={projects.indexOf(item)} tilt />
              </div>
            ))}
            <div className="min-h-[min(30rem,52vh)] w-[min(22rem,28vw)] shrink-0">{endCard}</div>
          </motion.div>
          <div className="mx-auto flex w-full max-w-[88rem] items-center gap-4 gutter font-mono text-[11px] text-paper/70">
            <span>SCROLL</span>
            <div className="h-px flex-1 bg-paper/20">
              <motion.div className="h-px bg-verm" style={{ width: bar }} />
            </div>
            <span className="tabular-nums">
              {String(filtered.length).padStart(2, "0")} ITEMS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
