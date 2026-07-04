"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { useCallback, ReactNode } from "react";

interface InteractiveBackgroundProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  showGrid?: boolean;
  showBlobs?: boolean;
}

/**
 * Wraps its children with an ambient, theme-aware backdrop: a faint dot
 * grid, two soft primary-tinted blobs, and a cursor-following spotlight.
 * The mousemove listener lives on the outer wrapper; every decorative
 * layer is `pointer-events-none` so it can never intercept hover/click
 * on the real content, which renders in normal flow above it.
 */
const InteractiveBackground = ({
  children,
  className,
  spotlightSize = 480,
  showGrid = true,
  showBlobs = true,
}: InteractiveBackgroundProps) => {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.10), transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [shouldReduceMotion, mouseX, mouseY],
  );

  return (
    <div onMouseMove={handleMouseMove} className={clsx("relative overflow-hidden", className)}>
      {/* decorative layer — never receives pointer events */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {showGrid && (
          <div
            className="absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:opacity-[0.15]"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--foreground) / 0.25) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {showBlobs && (
          <>
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          </>
        )}

        {!shouldReduceMotion && <motion.div className="absolute inset-0" style={{ background }} />}
      </div>

      {/* real content — normal flow, fully interactive */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default InteractiveBackground;
