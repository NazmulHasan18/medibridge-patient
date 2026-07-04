"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import {
  CalendarCheck,
  FileText,
  Stethoscope,
  BedDouble,
  Users2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import InteractiveGlow from "@/components/Interactive/InteractiveGlow";

const services = [
  {
    icon: CalendarCheck,
    title: "Appointment Scheduling",
    description:
      "Book, reschedule, and manage appointments with real-time availability and instant notifications.",
  },
  {
    icon: FileText,
    title: "Electronic Health Records",
    description:
      "Store and retrieve patient histories, prescriptions, and diagnostics — securely, in one place.",
  },
  {
    icon: Stethoscope,
    title: "Billing & Invoicing",
    description: "Automated billing for treatments, with insurance claims and payment tracking built in.",
  },
  {
    icon: BedDouble,
    title: "Inpatient & Outpatient Care",
    description: "Manage admissions, discharges, bed occupancy, and patient flow, without the spreadsheets.",
  },
  {
    icon: Users2,
    title: "Doctor & Staff Management",
    description: "Assign roles, manage schedules, and organize departments across every location.",
  },
  {
    icon: ShieldCheck,
    title: "Access Control",
    description: "Role-based permissions keep patient data private and access exactly where it should be.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const ServicesPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <InteractiveGlow />

      {/* Ambient background blobs — matches Hero's layered gradient treatment */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-[360px] w-[360px] rounded-full bg-sky-300/20 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-indigo-300/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            What we offer
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything your practice needs,
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              {" "}
              in one platform
            </span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            From scheduling to billing to records, MediBridge brings every part of patient care into a single,
            calm workspace.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-7 text-card-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 focus-within:-translate-y-1 focus-within:shadow-lg"
              >
                {/* Subtle top-corner glow on hover */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-400/0 blur-2xl transition-colors duration-300 group-hover:bg-blue-400/20" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-400/10 text-blue-600 ring-1 ring-inset ring-blue-500/10 transition-transform duration-300 group-hover:scale-105 dark:text-blue-400">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href="#"
                  className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100 dark:text-blue-400"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
