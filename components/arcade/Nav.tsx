"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, personalDetails } from "@/data";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // also watch sections without a nav entry so the pill clears over them
    const ids = ["top", "approach", ...navItems.map((n) => n.link.replace("#", ""))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-nav h-[2px] origin-left bg-verm"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-nav gutter transition-[padding] duration-500 ease-expo ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[88rem] items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full bg-paper p-1 shadow-[0_8px_30px_-12px_oklch(var(--ink)/0.35)] sm:pr-4"
            data-cursor="top"
          >
            <span className="display flex h-9 w-9 items-center justify-center rounded-full bg-verm text-lg text-ink transition-transform duration-500 ease-expo group-hover:rotate-[-12deg]">
              TL
            </span>
            <span className="hidden font-mono text-xs font-bold text-ink sm:block">
              tharuka<span className="text-verm">.dev</span>
              <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-verm" />
            </span>
          </a>

          <ul
            className={`hidden items-center gap-1 rounded-full border p-1 backdrop-blur-md transition-colors duration-500 lg:flex ${
              scrolled ? "border-ink/10 bg-paper/90 shadow-[0_8px_30px_-12px_oklch(var(--ink)/0.35)]" : "border-transparent bg-paper"
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.link;
              return (
                <li key={item.link} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <a
                    href={item.link}
                    className={`relative block rounded-full px-4 py-2 font-mono text-xs font-bold transition-colors duration-300 ${
                      isActive ? "text-paper" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${personalDetails.email}`}
              className="hidden items-center gap-2 rounded-full bg-verm px-4 py-2.5 font-mono text-xs font-bold text-ink shadow-[0_8px_30px_-12px_oklch(var(--ink)/0.35)] sm:inline-flex"
              data-cursor="mail"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-ink" />
              Available
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-paper shadow-[0_6px_20px_-8px_oklch(var(--ink)/0.5)] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={`h-[2px] w-5 bg-ink transition-transform duration-500 ease-expo ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-ink transition-transform duration-500 ease-expo ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-overlay flex flex-col justify-end bg-verm gutter pb-12 pt-28 text-ink lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-[var(--gutter)] top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink font-mono text-lg font-bold"
            >
              <span className="sr-only">Close menu</span>✕
            </button>
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.link}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="display block text-[clamp(3rem,14vw,5rem)] leading-[0.95]"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-sm font-bold">{personalDetails.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
