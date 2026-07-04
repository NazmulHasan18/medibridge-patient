// components/doctors/MeshGridBackground.tsx
"use client";

import { useEffect, useRef } from "react";

export function OurDoctorBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let targetX = 50;
    let targetY = 50;
    let curX = 50;
    let curY = 50;

    // Listen on window, not the pointer-events-none div — it never receives events itself
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // guard against div(0) if rect briefly has 0 width/height
      if (!rect.width || !rect.height) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // only update if the cursor is roughly within this section
      // (comment out this clamp if you want it to react from anywhere on the page)
      targetX = Math.min(100, Math.max(0, x));
      targetY = Math.min(100, Math.max(0, y));
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.setProperty("--mx", `${curX}%`);
      el.style.setProperty("--my", `${curY}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // @ts-expect-error custom properties
        "--mx": "50%",
        "--my": "40%",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "rgb(59 130 246)",
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(500px circle at var(--mx) var(--my), rgba(96,165,250,0.16), transparent 70%),
            radial-gradient(700px circle at calc(100% - var(--mx)) calc(100% - var(--my)), rgba(56,189,248,0.10), transparent 70%)
          `,
        }}
      />

      <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute -top-20 right-1/4 h-56 w-56 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-500/10" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
