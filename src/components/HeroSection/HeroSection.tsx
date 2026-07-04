"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BriefcaseMedical, HeadsetIcon, CalendarCheck, Users, Activity } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 30, y: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  const activeSpecialists = 10;
  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Cursor-reactive glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(650px circle at ${glow.x}% ${glow.y}%, rgba(0,168,232,0.14), transparent 70%)`,
        }}
      />

      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#00A8E8]/20 dark:bg-[#00A8E8]/10 blur-3xl"
        style={{ animation: "mb-float 9s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-[#0077B6]/20 dark:bg-[#0077B6]/10 blur-3xl"
        style={{ animation: "mb-float 11s ease-in-out infinite reverse" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0077B6]/20 bg-[#0077B6]/5 dark:bg-[#00A8E8]/10 dark:border-[#00A8E8]/20 px-4 py-1.5 text-sm font-medium text-[#0077B6] dark:text-[#00A8E8] mb-6">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-[#00A8E8] opacity-75"
                style={{ animation: "mb-ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00A8E8]" />
            </span>
            128 doctors online right now
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1E293B] dark:text-white mb-6 leading-[1.1]">
            Care that keeps
            <span className="block bg-gradient-to-r from-[#0077B6] to-[#00A8E8] bg-clip-text text-transparent">
              pace with you.
            </span>
          </h1>

          <p className="text-lg text-[#64748B] dark:text-slate-400 mb-9 leading-relaxed">
            Book appointments, message your care team, and track your health in one calm, connected place. No
            hold music, no paperwork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/patient/appointments/create">
              <Button size="lg" className="text-base px-7 py-6 bg-[#0077B6] hover:bg-[#00669c]">
                <BriefcaseMedical className="mr-1" /> Book an Appointment
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-7 py-6 border-[#0077B6]/30 text-[#0077B6] hover:bg-[#0077B6]/5 dark:text-[#00A8E8] dark:border-[#00A8E8]/30 dark:hover:bg-[#00A8E8]/10"
              >
                <HeadsetIcon className="mr-1" size={20} /> Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Interactive signature panel */}
        <div className="relative h-[420px] flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
            {/* EKG pulse line */}
            <svg viewBox="0 0 400 100" className="w-full h-24 mb-6" fill="none">
              <path
                d="M0 50 H120 L140 20 L160 80 L180 10 L200 90 L220 50 H400"
                stroke="url(#mbPulseGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="0.22 0.78"
                style={{
                  animation: "mb-dash 2.6s linear infinite",
                  filter: "drop-shadow(0 0 6px rgba(0,168,232,0.55))",
                }}
              />
              <path
                d="M0 50 H120 L140 20 L160 80 L180 10 L200 90 L220 50 H400"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <defs>
                <linearGradient id="mbPulseGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0077B6" />
                  <stop offset="100%" stopColor="#00A8E8" />
                </linearGradient>
              </defs>
            </svg>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 hover:bg-[#0077B6]/5 dark:hover:bg-[#00A8E8]/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#0077B6]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center">
                    <CalendarCheck className="h-4 w-4 text-[#0077B6] dark:text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1E293B] dark:text-white">
                      Next slot available
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Today, 4:30 PM</p>
                  </div>
                </div>
                <Link
                  href="/patient/appointments/create"
                  className="text-xs font-medium text-[#0077B6] dark:text-[#00A8E8]"
                >
                  Book →
                </Link>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 hover:bg-[#0077B6]/5 dark:hover:bg-[#00A8E8]/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#0077B6]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center">
                    <Users className="h-4 w-4 text-[#0077B6] dark:text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1E293B] dark:text-white">Care team online</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">
                      {activeSpecialists} specialists active
                    </p>
                  </div>
                </div>
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    style={{ animation: "mb-ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 hover:bg-[#0077B6]/5 dark:hover:bg-[#00A8E8]/10 transition-colors">
                <Link href="/patient/appointments/create" className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#0077B6]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-[#0077B6] dark:text-[#00A8E8]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1E293B] dark:text-white">
                      Appointment confirmed
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">
                      Dr. David Parker · Endocrinology
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating wait-time badge */}
          <div
            className="absolute -top-4 -right-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg px-4 py-2.5 flex items-center gap-2"
            style={{ animation: "mb-float 6s ease-in-out infinite" }}
          >
            <div className="h-8 w-8 rounded-full bg-[#0077B6]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center">
              <Activity className="h-4 w-4 text-[#0077B6] dark:text-[#00A8E8]" />
            </div>
            <div>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400 leading-none mb-0.5">
                Avg. wait time
              </p>
              <p className="text-sm font-bold text-[#1E293B] dark:text-white leading-none">3 min</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mb-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }
        @keyframes mb-dash {
          to {
            stroke-dashoffset: -1;
          }
        }
        @keyframes mb-ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
