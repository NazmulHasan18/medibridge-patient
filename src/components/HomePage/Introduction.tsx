"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { ClipboardPlus, HandCoins, MonitorSmartphone, ShieldPlus } from "lucide-react";
import Image from "next/image";

const introductionData = {
  eyebrow: "Why MediBridge",
  title: "Healthcare that meets you where you are",
  description:
    "MediBridge connects you to trusted healthcare providers for a seamless and convenient medical experience. Whether it's booking appointments, receiving prescriptions, accessing lab reports, or consulting with doctors via telemedicine, we make healthcare accessible from the comfort of your home.",
  uniqueValue: [
    {
      title: "Easy access",
      text: "Book appointments and access healthcare services in just a few clicks.",
      icon: ClipboardPlus,
      from: "from-sky-500/15",
      icon_color: "text-sky-600 dark:text-sky-400",
      ring: "ring-sky-500/15",
    },
    {
      title: "Affordable care",
      text: "MediBridge keeps quality medical care affordable and within reach.",
      icon: HandCoins,
      from: "from-cyan-500/15",
      icon_color: "text-cyan-600 dark:text-cyan-400",
      ring: "ring-cyan-500/15",
    },
    {
      title: "Trusted professionals",
      text: "Our network is built from certified doctors committed to great care.",
      icon: ShieldPlus,
      from: "from-indigo-500/15",
      icon_color: "text-indigo-600 dark:text-indigo-400",
      ring: "ring-indigo-500/15",
    },
    {
      title: "Telemedicine",
      text: "Consult with doctors remotely, saving time without losing quality.",
      icon: MonitorSmartphone,
      from: "from-violet-500/15",
      icon_color: "text-violet-600 dark:text-violet-400",
      ring: "ring-violet-500/15",
    },
  ],
};

const Introduction = () => {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="border-t border-border/60 py-14 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative order-2 mx-auto w-full max-w-sm lg:order-1 lg:col-span-5 lg:max-w-none"
        >
          <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-3xl bg-primary/10" />
          <Image
            src="/images/image9.jpg"
            className="aspect-[4/5] w-full rounded-3xl border border-border object-cover shadow-lg"
            height={600}
            width={480}
            alt="Doctor consulting a patient through MediBridge"
          />
        </motion.div>

        {/* Content */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-medium uppercase tracking-wide text-primary"
          >
            {introductionData.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {introductionData.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {introductionData.description}
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {introductionData.uniqueValue.map((point) => {
              const Icon = point.icon;
              return (
                <motion.div key={point.title} variants={fadeUp}>
                  <Card
                    className={clsx(
                      "group h-full border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300",
                      "hover:-translate-y-1 hover:border-primary/30 hover:shadow-md",
                    )}
                  >
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div
                        className={clsx(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br to-transparent ring-1 transition-transform duration-300 group-hover:scale-110",
                          point.from,
                          point.icon_color,
                          point.ring,
                        )}
                      >
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-foreground">
                          {point.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {point.text}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
