"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { personalDetails } from "@/data";
import Magnetic from "./arcade/Magnetic";

const ChromeLogo = dynamic(() => import("./three/ChromeLogo"), { ssr: false });

// OKLCH channels; interpolated by hand because framer can't mix oklch strings.
const PAPER = [0.966, 0.006, 200];
const VERM = [0.67, 0.215, 33 + 360];
// lighter petrol so it still reads on the dark footer
const PETROL = [0.78, 0.09, 200 + 360];

/** A letter that stretches tall and recolours as the cursor approaches. */
function Letter({ ch, mouseX, active }: { ch: string; mouseX: MotionValue<number>; active: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const el = ref.current;
    if (!el) return 999;
    const r = el.getBoundingClientRect();
    return Math.abs(x - (r.left + r.width / 2));
  });
  const proximity = useTransform([distance, active] as MotionValue<number>[], ([d, a]: number[]) =>
    Math.max(0, 1 - d / 260) * a
  );
  const p = useSpring(proximity, { stiffness: 260, damping: 30 });
  const scaleY = useTransform(p, [0, 1], [1, 1.35]);
  const color = useTransform(p, (v) => {
    const [from, to, t] = v < 0.5 ? [PAPER, VERM, v / 0.5] : [VERM, PETROL, (v - 0.5) / 0.5];
    const mix = (i: number) => from[i] + (to[i] - from[i]) * t;
    return `oklch(${mix(0)} ${mix(1)} ${mix(2) % 360})`;
  });

  if (ch === " ") return <span className="inline-block w-[0.25em]" />;
  return (
    <motion.span ref={ref} style={{ scaleY, color }} className="inline-block origin-bottom motion-reduce:!transform-none">
      {ch}
    </motion.span>
  );
}

function StretchWord({ text, className = "" }: { text: string; className?: string }) {
  const mouseX = useMotionValue(-9999);
  const active = useMotionValue(0);
  return (
    <p
      aria-label={text}
      onPointerMove={(e) => {
        mouseX.set(e.clientX);
        active.set(1);
      }}
      onPointerLeave={() => active.set(0)}
      className={`display select-none whitespace-nowrap text-[clamp(3.25rem,13vw,9rem)] leading-[0.84] ${className}`}
    >
      <span aria-hidden>
        {text.split("").map((ch, i) => (
          <Letter key={i} ch={ch} mouseX={mouseX} active={active} />
        ))}
      </span>
    </p>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const copy = () => {
    navigator.clipboard?.writeText(personalDetails.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer ref={footerRef} id="contact" className="relative overflow-hidden bg-ink pt-24 text-paper sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 blueprint opacity-60" />
      <div className="relative mx-auto max-w-[88rem] gutter">
        <p className="font-mono text-xs font-bold">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-verm" />
          CONTACT &amp; COLLABORATION · INSERT COIN
        </p>

        <div className="mt-6 grid items-center gap-6 border-b border-paper/20 pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StretchWord text="LET'S BUILD" />
            <StretchWord text="SOMETHING" className="stroke-text stroke-paper" />
          </div>
          <div className="relative lg:col-span-5">
            <ChromeLogo eventSource={footerRef} className="mx-auto aspect-square w-full max-w-[26rem]" />
            <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-paper/60">
              move your cursor — it&apos;s watching
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-tight tracking-tight">
              Ready to scale your next <span className="bg-verm px-1.5 text-ink">high-impact</span> digital product?
            </h2>
            <p className="mt-4 max-w-[56ch] leading-relaxed text-paper/75">
              Whether you need a seasoned full-stack engineer, high-performance mobile application, or IoT/cloud
              architecture — let&apos;s connect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${personalDetails.email}`} className="btn-primary" data-cursor="say hi">
                  Let&apos;s Talk Directly <FiArrowUpRight />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button type="button" onClick={copy} className="btn-ghost" data-cursor="copy">
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span aria-live="polite">{copied ? "Copied to clipboard" : personalDetails.email}</span>
                </button>
              </Magnetic>
            </div>
          </div>

          <ul className="lg:col-span-5">
            {[
              { icon: FiMail, label: personalDetails.email, href: `mailto:${personalDetails.email}` },
              { icon: FiPhone, label: personalDetails.phone, href: `tel:${personalDetails.phone.replace(/\s/g, "")}` },
              { icon: FiMapPin, label: "Western Province, Sri Lanka" },
              { icon: FiGithub, label: `github.com/${personalDetails.githubUsername}`, href: personalDetails.github },
              { icon: FiLinkedin, label: `linkedin.com/in/${personalDetails.linkedinUsername}`, href: personalDetails.linkedin },
            ].map(({ icon: Icon, label, href }) => {
              const inner = (
                <>
                  <span className="flex items-center gap-4">
                    <Icon className="text-lg text-verm" />
                    <span>{label}</span>
                  </span>
                  {href && (
                    <FiArrowUpRight className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </>
              );
              const cls =
                "group flex items-center justify-between gap-4 border-b border-paper/15 py-4 font-mono text-sm transition-colors duration-300";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${cls} hover:text-verm`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={`${cls} text-paper/75`}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-paper/15 py-8 font-mono text-xs text-paper/70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} <span className="text-paper">{personalDetails.name}</span> · Built with
            Next.js, Three.js &amp; Framer Motion
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://thebrandora.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-paper transition-colors hover:text-verm"
            >
              thebrandora.com <FiArrowUpRight />
            </a>
            <a href="#top" className="inline-flex items-center gap-1.5 text-paper transition-colors hover:text-verm">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
