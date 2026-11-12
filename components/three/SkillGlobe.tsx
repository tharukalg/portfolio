"use client";

import { useEffect, useMemo, useRef } from "react";

type Tag = { label: string; group: number };

/**
 * A draggable 3D sphere of tags. Points sit on a Fibonacci sphere, are rotated
 * in JS every frame and projected with perspective; depth drives scale,
 * opacity and stacking. Drag to spin (with inertia), idles with a slow turn.
 */
export default function SkillGlobe({
  tags,
  activeGroup,
  className = "",
}: {
  tags: Tag[];
  activeGroup: number | null;
  className?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const active = useRef(activeGroup);
  active.current = activeGroup;

  const points = useMemo(() => {
    const n = tags.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return tags.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return [Math.cos(th) * r, y, Math.sin(th) * r] as [number, number, number];
    });
  }, [tags]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rx = -0.35;
    let ry = 0.4;
    let vx = 0;
    let vy = reduced ? 0 : 0.0028;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let visible = true;

    const render = () => {
      // smaller radius on narrow screens so long tags stay inside the frame
      const R = el.clientWidth * (el.clientWidth < 520 ? 0.3 : 0.38);
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      points.forEach(([x, y, z], i) => {
        const node = nodes.current[i];
        if (!node) return;
        // rotate around Y then X
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const persp = 2.4 / (2.4 - z2);
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        const isOn = active.current === null || tags[i].group === active.current;
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R * persp}px, ${y2 * R * persp}px, 0) scale(${0.55 + depth * 0.65})`;
        node.style.opacity = String((isOn ? 0.25 : 0.08) + depth * (isOn ? 0.75 : 0.22));
        node.style.zIndex = String(Math.round(depth * 100));
        node.dataset.on = isOn && active.current !== null ? "1" : "0";
      });
    };

    const loop = () => {
      if (!dragging) {
        ry += vy;
        rx += vx;
        if (!reduced) {
          vy += (0.0028 - vy) * 0.02;
          vx *= 0.95;
        }
      }
      rx = Math.max(-1.2, Math.min(1.2, rx));
      render();
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vy = dx * 0.006;
      vx = -dy * 0.006;
      ry += vy;
      rx += vx;
      if (reduced) render();
    };
    const up = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    io.observe(el);
    const ro = new ResizeObserver(render);
    ro.observe(el);
    render();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [points, tags]);

  // re-render immediately when the highlighted group changes (reduced motion has no loop)
  useEffect(() => {
    nodes.current.forEach((n, i) => {
      if (!n) return;
      n.dataset.on = activeGroup !== null && tags[i].group === activeGroup ? "1" : "0";
    });
  }, [activeGroup, tags]);

  return (
    <div
      ref={stage}
      data-cursor="drag"
      className={`relative aspect-square touch-none select-none ${className}`}
      role="img"
      aria-label={`Skill globe: ${tags.map((t) => t.label).join(", ")}`}
    >
      {/* wireframe hint */}
      <div aria-hidden className="absolute inset-[10%] rounded-full border border-paper/20" />
      <div aria-hidden className="absolute inset-[10%] rounded-[50%] border border-paper/10 [transform:scaleX(0.35)]" />
      <div aria-hidden className="absolute inset-[10%] rounded-[50%] border border-paper/10 [transform:scaleY(0.35)]" />
      {tags.map((t, i) => (
        <span
          key={t.label + i}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          aria-hidden
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] font-bold sm:px-3 sm:text-[13px] text-paper will-change-transform data-[on='1']:bg-verm data-[on='1']:text-ink"
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}
