"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

/**
 * Ambient, cursor-reactive background for use behind a section.
 *
 * - Three soft blue/teal blobs drift on a slow loop and pick up a
 *   little parallax as the pointer moves across the section.
 * - A faint dot grid adds texture without competing with content.
 * - Colors come from CSS variables (--primary / --secondary), so it
 *   adapts automatically to light/dark theme.
 * - aria-hidden and fully inert: all motion is skipped when the user
 *   has requested reduced motion.
 *
 * Usage: place as the first child of a `relative` section wrapper.
 *   <section className="relative overflow-hidden">
 *     <AnimatedBackground />
 *     ...your content...
 *   </section>
 */
export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 55, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Different depths so blobs don't move in lockstep.
  const x1 = useTransform(smoothX, (v) => v * 30);
  const y1 = useTransform(smoothY, (v) => v * 24);
  const x2 = useTransform(smoothX, (v) => v * -46);
  const y2 = useTransform(smoothY, (v) => v * 34);
  const x3 = useTransform(smoothX, (v) => v * 20);
  const y3 = useTransform(smoothY, (v) => v * -28);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    container.addEventListener("pointermove", handlePointerMove);
    return () => container.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        "[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]",
        className,
      )}
    >
      {/* clinical dot grid */}
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: x1, y: y1 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-[-4rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.30),transparent_70%)] blur-3xl"
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: x2, y: y2 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[-6rem] top-1/3 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary,210_60%_70%)/0.26),transparent_70%)] blur-3xl"
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: x3, y: y3 }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[-5rem] left-1/3 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.20),transparent_70%)] blur-3xl"
      />
    </div>
  );
}
