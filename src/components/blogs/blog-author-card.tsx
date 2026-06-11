"use client";

import { Stethoscope } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/blog.types";

interface Props {
  blog: Blog;
}

export function BlogAuthorCard({ blog }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Avatar placeholder using initials */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
          {blog.doctorName.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{blog.doctorName}</p>
          <p className="text-xs text-muted-foreground">Author</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          This article was written by a verified doctor on our platform. Always consult your physician before
          acting on medical advice.
        </p>
      </div>
    </div>
  );
}
