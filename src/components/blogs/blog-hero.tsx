"use client";

import Image from "next/image";

import { Calendar, Clock, MessageSquare } from "lucide-react";
import { Blog } from "@/types/blog.types";
import moment from "moment";

interface Props {
  blog: Blog;
}

// Rough reading time estimate
function readingTime(content: string) {
  const words = content?.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function BlogHero({ blog }: Props) {
  return (
    <div>
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{blog.title}</h1>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {moment(new Date(blog.createdAt)).fromNow()}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readingTime(blog.content)} min read
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" />
          {blog.comments?.length ?? blog._count?.comments ?? 0} comments
        </span>
      </div>
    </div>
  );
}
