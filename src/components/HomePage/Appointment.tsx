"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BriefcaseMedical, Headset, ShieldCheck, Users, Clock, Stethoscope } from "lucide-react";
import { Button } from "../ui/button";

// Small stat/info cards shown beside the appointment copy.
// Content is factual and specific rather than generic filler,
// so each card earns its place instead of decorating empty space.
const infoCards = [
  {
    icon: Users,
    label: "12,400+ patients",
    detail: "treated across our network",
  },
  {
    icon: Stethoscope,
    label: "180+ specialists",
    detail: "across 20 medical fields",
  },
  {
    icon: Clock,
    label: "Same-day slots",
    detail: "for most departments",
  },
  {
    icon: ShieldCheck,
    label: "HIPAA compliant",
    detail: "your records stay private",
  },
];

const Appointment = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white py-20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 sm:py-28">
      {/* Ambient decoration: fixed soft blobs, purely atmospheric */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10"
      />

      <div className="container relative mx-auto px-6">
        <div
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          className="group relative overflow-hidden rounded-3xl border border-blue-100/80 bg-white/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_60px_-25px_rgba(37,99,235,0.25)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_80px_-25px_rgba(37,99,235,0.35)] dark:border-white/10 dark:bg-slate-900/60"
        >
          {/* Interactive cursor-following glow, disabled for reduced-motion users */}
          {!reduceMotion && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(500px circle at ${coords.x}% ${coords.y}%, rgba(59,130,246,0.14), transparent 60%)`,
              }}
            />
          )}

          {/* Subtle grid texture, very low opacity so it never competes with content */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#1d4ed8_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed8_1px,transparent_1px)] [background-size:32px_32px]"
          />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            {/* Copy + CTAs */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                  <BriefcaseMedical className="h-3.5 w-3.5" />
                  Book in under 2 minutes
                </span>

                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Need expert medical
                  <br className="hidden sm:block" /> advice today?
                </h2>

                <p className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
                  Connect with our trusted doctors for personalized care, clear guidance, and the right next
                  step for your health.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/patient/appointments/create">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-xl bg-blue-600 px-7 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md sm:w-auto"
                  >
                    <BriefcaseMedical className="h-5 w-5" />
                    Book an appointment
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-slate-200 px-7 text-base font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 sm:w-auto"
                  >
                    <Headset className="h-5 w-5" />
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Info card grid */}
            <div className="grid grid-cols-2 gap-4">
              {infoCards.map(({ icon: Icon, label, detail }, i) => (
                <div
                  key={label}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className="group/card rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/20"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover/card:bg-blue-600 group-hover/card:text-white dark:bg-blue-400/10 dark:text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
