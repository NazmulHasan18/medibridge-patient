"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface HospitalService {
  id: string | number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ServiceCard({ service, index }: { service: HospitalService; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/service/${service.id}`}
        className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card
          className="
            relative flex h-full min-h-[280px] flex-col overflow-hidden
            rounded-2xl border border-border/60 bg-card/70
            shadow-sm backdrop-blur-sm
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10
          "
        >
          {/* image */}
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* legibility scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
            <Badge
              variant="secondary"
              className="absolute left-3 top-3 rounded-full border-0 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm dark:bg-black/60 dark:text-slate-200"
            >
              {service.category}
            </Badge>
          </div>

          {/* content */}
          <CardContent className="flex flex-1 flex-col gap-2 p-5">
            <CardTitle className="line-clamp-2 text-lg font-semibold tracking-tight text-foreground">
              {service.title}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </CardDescription>

            <div className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary opacity-90">
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                Learn more
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
