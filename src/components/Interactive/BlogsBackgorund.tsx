"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface BlogsBackgroundProps {
  children: ReactNode;
  className?: string;
}

const NODES = [
  { x: "8%", y: "18%" },
  { x: "22%", y: "62%" },
  { x: "40%", y: "28%" },
  { x: "63%", y: "12%" },
  { x: "80%", y: "58%" },
  { x: "92%", y: "24%" },
];

const LINKS: [number, number][] = [
  [0, 2],
  [2, 3],
  [3, 5],
  [1, 2],
  [3, 4],
];

// Max pixel travel for each depth layer — tune to taste
const NETWORK_RANGE = 18;
const WASH_RANGE = 36;

const SPRING_CONFIG = { stiffness: 60, damping: 20, mass: 0.6 };

const BlogsBackground = ({ children, className }: BlogsBackgroundProps) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Two independent motion-value pairs, each pre-scaled to its own
  // depth layer's travel range — no derived hooks, no invalid nesting.
  const networkRawX = useMotionValue(0);
  const networkRawY = useMotionValue(0);
  const washRawX = useMotionValue(0);
  const washRawY = useMotionValue(0);

  const networkX = useSpring(networkRawX, SPRING_CONFIG);
  const networkY = useSpring(networkRawY, SPRING_CONFIG);
  const washX = useSpring(washRawX, { ...SPRING_CONFIG, stiffness: 40 });
  const washY = useSpring(washRawY, { ...SPRING_CONFIG, stiffness: 40 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalize to -1..1 from section center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    networkRawX.set(x * NETWORK_RANGE);
    networkRawY.set(y * NETWORK_RANGE);
    washRawX.set(x * WASH_RANGE);
    washRawY.set(y * WASH_RANGE);
  };

  const handlePointerLeave = () => {
    networkRawX.set(0);
    networkRawY.set(0);
    washRawX.set(0);
    washRawY.set(0);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 ${className ?? ""}`}
    >
      {/* Paper grain, for an editorial / journal warmth */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035] dark:opacity-[0.06]">
        <filter id="blogs-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#blogs-grain)" />
      </svg>

      {/*
        Citation network — wrapped in a motion.div (not motion.svg).
        Framer Motion maps x/y on an <svg> root to the SVG x/y *attributes*,
        which do nothing on a root element. A div correctly gets a CSS
        transform: translate(), which is what actually produces movement.
      */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ x: networkX, y: networkY }}
      >
        <svg className="h-full w-full" preserveAspectRatio="none">
          {LINKS.map(([a, b], i) => (
            <motion.line
              key={`link-${i}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-300/40 dark:text-blue-700/30"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15 * i, ease: "easeOut" }}
            />
          ))}
          {NODES.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r="3"
              className="fill-blue-400/60 dark:fill-blue-500/50"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 * i }}
              {...(!prefersReducedMotion && {
                animate: { opacity: [0.6, 1, 0.6] },
                transition: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
              })}
            />
          ))}
        </svg>
      </motion.div>

      {/* Signature element: a health pulse line drawing itself across the top */}
      <svg
        aria-hidden
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 w-full text-blue-400/50 dark:text-blue-600/40"
      >
        <motion.path
          d="M0,40 L280,40 L310,10 L335,70 L360,40 L400,40 L420,25 L440,40 L900,40 L925,15 L945,55 L965,40 L1200,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Ambient wash — background depth layer, larger travel range than the network */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10"
        style={{ x: washX, y: washY }}
      />

      <div className="relative">{children}</div>
    </section>
  );
};

export default BlogsBackground;
