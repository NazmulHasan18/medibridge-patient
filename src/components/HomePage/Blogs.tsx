"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import BlogCard from "../blogs/blog-card";
import { useGetAllBlogs } from "@/hooks/blog/useBlog";
import BlogsBackground from "../Interactive/BlogsBackgorund";

const Blogs = () => {
  const { data: blogRes, isPending } = useGetAllBlogs({ page: 1, limit: 3 });
  const diseaseResearchBlogs = blogRes?.data;

  return (
    <BlogsBackground className="py-24">
      <div className="container mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur dark:border-blue-800/60 dark:bg-blue-950/60 dark:text-blue-300">
            From Our Doctors
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Research worth reading
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Insights, findings, and practical guidance from the specialists behind your care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isPending
            ? diseaseResearchBlogs?.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
                >
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
              ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Link href="/blogs">
            <Button className="group rounded-full px-6 shadow-sm transition-all duration-300 hover:shadow-md">
              Show more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </BlogsBackground>
  );
};

export default Blogs;
