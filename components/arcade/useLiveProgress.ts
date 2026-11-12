"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

type Edge = "start" | "end";
type Anchor = [Edge, number]; // [element edge, viewport fraction]

/**
 * Scroll progress (0→1) of an element, measured live on every scroll.
 * framer's useScroll({ target }) caches offsets and goes stale when the page
 * height changes after mount (pinned sections, font swaps), so we read the
 * element's rect directly instead.
 *
 * from/to mirror framer's offsets: ["start", 0.85] == "start 85%".
 */
export function useLiveProgress(
  ref: RefObject<HTMLElement>,
  from: Anchor,
  to: Anchor
): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, () => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const top0 = from[1] * vh - (from[0] === "end" ? r.height : 0);
    const top1 = to[1] * vh - (to[0] === "end" ? r.height : 0);
    if (top0 === top1) return 0;
    const p = (top0 - r.top) / (top0 - top1);
    return Math.min(1, Math.max(0, p));
  });
}
