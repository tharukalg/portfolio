"use client";

import { useEffect } from "react";

/**
 * Content ships visible. On mount, anything with [data-reveal] that sits
 * below the fold is "armed" (hidden by CSS) and released when it scrolls in.
 * Nothing is ever hidden for no-JS visitors, crawlers, or above-fold content.
 */
export default function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.removeAttribute("data-armed");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.95) {
        el.setAttribute("data-armed", "");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
