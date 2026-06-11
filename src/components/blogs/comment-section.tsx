"use client";

import { Blog } from "@/types/blog.types";
import { CommentList } from "./comment-list";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "./comment-form";

interface Props {
  blog: Blog;
}

export function CommentsSection({ blog }: Props) {
  const count = blog.comments?.length ?? 0;

  return (
    <section id="comments">
      {/* Heading */}
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          {count > 0 ? `${count} Comment${count !== 1 ? "s" : ""}` : "Comments"}
        </h2>
      </div>

      {/* Write a comment */}
      <CommentForm blogPublicId={blog.publicId} />

      {/* Existing comments */}
      <div className="mt-8">
        <CommentList comments={blog.comments ?? []} blogPublicId={blog.publicId} />
      </div>
    </section>
  );
}
