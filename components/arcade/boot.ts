"use client";

import { useEffect, useState } from "react";

/** Tiny shared flag so the hero choreography can wait for the boot screen. */
let done = false;
const listeners = new Set<() => void>();

export function markBootDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function isBootDone() {
  return done;
}

export function useBootDone() {
  const [isDone, setIsDone] = useState(done);
  useEffect(() => {
    if (done) {
      setIsDone(true);
      return;
    }
    const fn = () => setIsDone(true);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return isDone;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
