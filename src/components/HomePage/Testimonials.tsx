"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import testimonials from "../../../data/testimonialsData";

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = sectionRef.current;
    if (!node) return;

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      setSpotlight({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    node.addEventListener("mousemove", handleMove);
    return () => node.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-white py-24 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-950"
    >
      {/* Cursor-reactive spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-300 ease-out dark:opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(59,130,246,0.14), transparent 70%)`,
        }}
      />

      {/* Floating ambient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/10"
        animate={prefersReducedMotion ? undefined : { y: [0, 24, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/10"
        animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint grid, fading toward the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div className="container relative mx-auto px-5 md:px-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur dark:border-blue-800/60 dark:bg-blue-950/60 dark:text-blue-300">
            Patient Stories
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Real people, real recoveries
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Hear directly from patients who trusted MediBridge with their care — and found a smoother, calmer
            path to feeling better.
          </p>
        </motion.div>

        {/* Infocards */}
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((data) => (
              <CarouselItem key={data.id} className="md:basis-4/5 lg:basis-3/5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-2"
                >
                  <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900/60">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/5" />
                    <CardContent className="relative flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-10">
                      <Quote className="h-8 w-8 text-blue-300 dark:text-blue-700" strokeWidth={1.5} />

                      <p className="max-w-xl text-balance text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                        “{data.testimonial}”
                      </p>

                      <div className="flex flex-col items-center gap-3 pt-2">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-blue-100 ring-offset-2 ring-offset-white dark:ring-blue-900/60 dark:ring-offset-slate-900">
                          <Image
                            src={data.image}
                            alt={data.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{data.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Age {data.age}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
                          {data.condition}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-y-0 rounded-full border-slate-200 bg-white/80 backdrop-blur hover:bg-blue-50 dark:border-white/10 dark:bg-slate-900/70" />
            <CarouselDots />
            <CarouselNext className="static translate-y-0 rounded-full border-slate-200 bg-white/80 backdrop-blur hover:bg-blue-50 dark:border-white/10 dark:bg-slate-900/70" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
