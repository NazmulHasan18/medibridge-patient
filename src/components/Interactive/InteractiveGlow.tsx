"use client";

import { useEffect, useRef } from "react";

/**
 * InteractiveGlow
 * ----------------
 * A quiet, premium ambient background: a cursor-tracked soft blue spotlight
 * plus two slow-drifting blurred orbs and a faint dot-grid, all built from
 * theme CSS variables so it reads correctly in light and dark mode.
 *
 * Pointer tracking is done with a rAF-throttled mousemove + CSS custom
 * properties (no re-renders). Motion is skipped entirely for users who
 * prefer reduced motion.
 */
export default function InteractiveGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    let targetX = 50;
    let targetY = 35;
    let x = 50;
    let y = 35;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      // ease toward the pointer so the glow trails softly instead of snapping
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      el.style.setProperty("--glow-x", `${x}%`);
      el.style.setProperty("--glow-y", `${y}%`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "35%",
        } as React.CSSProperties
      }
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* faint dot grid, fades toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* cursor-follow spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--glow-x) var(--glow-y), hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />

      {/* slow drifting orbs */}
      <div className="motion-safe:animate-[drift-a_18s_ease-in-out_infinite] absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-primary/20 blur-[90px] dark:bg-primary/25" />
      <div className="motion-safe:animate-[drift-b_22s_ease-in-out_infinite] absolute top-1/3 right-[6%] h-80 w-80 rounded-full bg-sky-400/15 blur-[100px] dark:bg-sky-300/10" />

      {/* soft bottom fade so content sections beneath stay clean */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <style jsx global>{`
        @keyframes drift-a {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 40px) scale(1.08);
          }
        }
        @keyframes drift-b {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
