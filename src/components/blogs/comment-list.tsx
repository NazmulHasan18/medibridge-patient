"use client";

import { BlogComment } from "@/types/blog.types";
import { MessageSquareDashed } from "lucide-react";
import { CommentCard } from "./comment-card";

interface Props {
  comments: BlogComment[];
  blogPublicId: string;
}

export function CommentList({ comments, blogPublicId }: Props) {
  if (!comments.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
        <MessageSquareDashed className="h-10 w-10 opacity-30" />
        <p className="text-sm">No comments yet. Be the first to share your thoughts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.publicId} comment={comment} blogPublicId={blogPublicId} />
      ))}
    </div>
  );
}
