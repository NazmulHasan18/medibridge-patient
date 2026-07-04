"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Ambulance, ArrowRight, MapPinHouse, Stethoscope, MessageCircleHeart } from "lucide-react";
import clsx from "clsx";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type InfoItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accent: keyof typeof accentStyles;
};

const accentStyles = {
  blue: {
    from: "from-blue-500/15",
    icon: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/15",
    glow: "group-hover:shadow-blue-500/10",
  },
  rose: {
    from: "from-rose-500/15",
    icon: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-500/15",
    glow: "group-hover:shadow-rose-500/10",
  },
  emerald: {
    from: "from-emerald-500/15",
    icon: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/15",
    glow: "group-hover:shadow-emerald-500/10",
  },
  amber: {
    from: "from-amber-500/15",
    icon: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/15",
    glow: "group-hover:shadow-amber-500/10",
  },
} as const;

const infoContent: InfoItem[] = [
  {
    title: "Get Your Doctors",
    description: "Browse verified specialists and book a visit in minutes.",
    icon: <Stethoscope size={22} strokeWidth={1.75} />,
    href: "/doctors",
    accent: "blue",
  },
  {
    title: "Need Ambulance?",
    description: "24/7 emergency dispatch. Call +8801XXXXXXXX now.",
    icon: <Ambulance size={22} strokeWidth={1.75} />,
    href: "/emergency",
    accent: "rose",
  },
  {
    title: "Our Patients Say",
    description: "Real stories from people who trusted us with their care.",
    icon: <MessageCircleHeart size={22} strokeWidth={1.75} />,
    href: "/testimonials",
    accent: "emerald",
  },
  {
    title: "Reach Out to Us",
    description: "Find our location, contact details, and support options.",
    icon: <MapPinHouse size={22} strokeWidth={1.75} />,
    href: "/about",
    accent: "amber",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const InfoCard = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
    >
      {infoContent.map((info) => {
        const styles = accentStyles[info.accent];
        return (
          <motion.div key={info.title} variants={cardVariants}>
            <Link
              href={info.href}
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card
                className={clsx(
                  "relative h-full overflow-hidden border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur-sm",
                  "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg",
                  "motion-reduce:transform-none motion-reduce:transition-none",
                  styles.glow,
                )}
              >
                {/* subtle top-edge highlight, appears on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <CardHeader className="gap-3 p-0">
                  <div
                    className={clsx(
                      "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br to-transparent ring-1 transition-transform duration-300 group-hover:scale-110",
                      styles.from,
                      styles.icon,
                      styles.ring,
                    )}
                  >
                    {info.icon}
                  </div>

                  <CardTitle className="text-base font-semibold tracking-tight text-card-foreground">
                    {info.title}
                  </CardTitle>

                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {info.description}
                  </CardDescription>

                  <div className="flex items-center gap-1 pt-1 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                    Learn more
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default InfoCard;
