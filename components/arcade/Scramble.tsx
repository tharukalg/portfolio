"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useBootDone } from "./boot";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01$%&";

type Props = {
  text: string;
  className?: string;
  /** "boot": run once the boot screen lifts. "view": run when scrolled into view. */
  trigger?: "boot" | "view";
  duration?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "div";
};

/** Text that decodes itself from noise. The real text is rendered on the
 *  server and stays in the accessible name the whole time. */
export default function Scramble({
  text,
  className,
  trigger = "view",
  duration = 900,
  delay = 0,
  as: Tag = "span",
}: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const bootDone = useBootDone();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current || prefersReducedMotion()) return;

    const run = () => {
      if (ran.current) return;
      ran.current = true;
      const start = performance.now() + delay;
      let raf = 0;
      const frame = (now: number) => {
        const t = Math.max(0, (now - start) / duration);
        const out = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            const reveal = i / text.length;
            if (t >= reveal * 0.85 + 0.15) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setDisplay(out);
        if (t < 1) raf = requestAnimationFrame(frame);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(raf);
    };

    if (trigger === "boot") {
      if (bootDone) run();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [bootDone, delay, duration, text, trigger]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
