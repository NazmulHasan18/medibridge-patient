// components/DoctorCard/DoctorCard.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, BadgeCheck, GraduationCap, Clock } from "lucide-react";
import { Button } from "../ui/button";
import type { Doctor } from "@/types/doctor.types";

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:border-blue-400/30"
    >
      {/* cursor-follow spotlight, only visible on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgba(59,130,246,0.14), transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Fee badge */}
        <div className="absolute -top-2 right-0 rounded-full border border-blue-200/60 bg-blue-50/90 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
          ৳{doctor.consultationFee}
          <span className="ml-0.5 font-normal text-blue-500/80 dark:text-blue-300/70">/visit</span>
        </div>

        {/* Avatar */}
        <div className="relative mx-auto mb-4 h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-sky-300/20 blur-md transition-transform duration-300 group-hover:scale-110" />
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-50 shadow-md dark:border-white/10 dark:bg-white/5">
            {doctor.user?.profileImage ? (
              <Image
                src={doctor.user.profileImage}
                alt={doctor.user.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <User className="h-14 w-14 text-blue-300" />
            )}
          </div>
          {/* verified badge */}
          <div className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1 shadow-md ring-2 ring-white dark:ring-background">
            <BadgeCheck className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Name & specialization */}
        <h3 className="text-lg font-semibold text-foreground">{doctor.user.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">{doctor.specialization}</p>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {doctor.experience}+ yrs
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1 truncate">
            <GraduationCap className="h-3.5 w-3.5" />
            {doctor.qualification}
          </span>
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="mx-auto mt-4 line-clamp-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {doctor.bio}
          </p>
        )}

        {/* CTA */}
        <Link href={`/patient/appointments/create?doctorId=${doctor.publicId}`} className="mt-5 block">
          <Button className="w-full rounded-full shadow-sm shadow-blue-600/20 transition-transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-600/30">
            Book Appointment
          </Button>
        </Link>
      </div>
    </div>
  );
};
