"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import whyChooseUs from "../../../data/whyWeData";
import { AnimatedBackground } from "../Interactive/AnimatedBackground";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const WhyWe = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Section-wide spotlight: tracks the cursor and lights up the area
  // beneath it. Pure CSS-variable updates, no re-renders.
  const handleSectionMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    sectionRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  // Per-card glow: highlights the border/background at the cursor's
  // position inside that specific card.
  const handleCardMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties}
      className="group relative overflow-hidden py-24 md:py-32"
    >
      <AnimatedBackground />

      {/* cursor spotlight */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--spot-x) var(--spot-y), hsl(var(--primary)/0.10), transparent 70%)",
          }}
        />
      )}

      <div className="container relative mx-auto px-6 md:px-10">
        {/* Intro */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium tracking-wide text-primary">
            Why MediBridge
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Care, backed by a team that never cuts corners
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Every feature is built alongside licensed clinicians, so what feels effortless for patients stays
            rigorous behind the scenes.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:gap-8 lg:grid-cols-3"
        >
          {whyChooseUs.map((info, i) => (
            <motion.div key={i} variants={cardVariants} className="h-full">
              <Card
                onMouseMove={handleCardMouseMove}
                style={{ "--x": "50%", "--y": "50%" } as React.CSSProperties}
                className={cn(
                  "group/card relative h-full overflow-hidden rounded-2xl border border-border/60",
                  "bg-card/70 shadow-sm backdrop-blur-xl transition-all duration-300",
                  "hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg",
                  info.color,
                )}
              >
                {/* cursor-tracking glow, local to this card */}
                {!prefersReducedMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                    style={{
                      background:
                        "radial-gradient(220px circle at var(--x) var(--y), hsl(var(--primary)/0.14), transparent 65%)",
                    }}
                  />
                )}

                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover/card:bg-primary/15">
                    {info.icon}
                  </div>
                  <CardTitle className="mt-5 text-lg font-semibold text-foreground">{info.title}</CardTitle>
                  <CardDescription className="mt-2 text-left text-sm leading-relaxed text-muted-foreground">
                    {info.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWe;
