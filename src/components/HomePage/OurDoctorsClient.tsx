// components/doctors/OurDoctorsClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDoctors } from "@/hooks/doctor/useDoctor";
import { Doctor } from "@/types/doctor.types";
import { OurDoctorBackground } from "../Interactive/OurDoctorBackground";
import { DoctorCard } from "../DoctorCard/DoctorCard";

interface Props {
  initialDoctors: Doctor[];
  specializations: string[];
}

export function OurDoctorsClient({ initialDoctors, specializations }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...specializations];

  const { data, isLoading, isError, error, isFetching } = useDoctors({
    page: 1,
    limit: 6,
    specialization: activeCategory === "All" ? undefined : activeCategory,
  });

  if (isError) {
    toast.error(error instanceof Error ? error.message : "Something went wrong");
  }

  const doctors = data?.data?.data ?? initialDoctors;

  return (
    <section className="relative py-20 md:py-28">
      <OurDoctorBackground />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Intro */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="mb-4 inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
            Our Specialists
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Meet Our Doctors
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Experienced, board-certified specialists dedicated to giving you calm, attentive, and modern care.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mx-auto mb-12 flex h-auto w-full max-w-3xl flex-wrap justify-center gap-2 rounded-2xl border border-border/60 bg-white/60 p-2 backdrop-blur-md dark:bg-white/5">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-blue-600/20"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <DoctorGridSkeleton />
            ) : doctors.length === 0 ? (
              <p className="text-center text-muted-foreground">No doctors found in this category.</p>
            ) : (
              <div
                className={`grid grid-cols-1 gap-6 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${
                  isFetching ? "opacity-50" : "opacity-100"
                }`}
              >
                {doctors.map((doctor, i) => (
                  <div
                    key={doctor.id}
                    className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
                    style={{ animationDelay: `${i * 60}ms`, animationDuration: "500ms" }}
                  >
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-14 flex justify-center">
          <Link href="/doctors">
            <Button
              size="lg"
              className="rounded-full px-8 shadow-sm shadow-blue-600/20 transition-transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-600/30"
            >
              View All Doctors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

const DoctorGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse space-y-4 rounded-2xl border border-border/60 bg-card p-6">
        <div className="mx-auto h-40 w-40 rounded-full bg-muted" />
        <div className="mx-auto h-4 w-2/3 rounded bg-muted" />
        <div className="mx-auto h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="mx-auto h-9 w-1/2 rounded-full bg-muted" />
      </div>
    ))}
  </div>
);
