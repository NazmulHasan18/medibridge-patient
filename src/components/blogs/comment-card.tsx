"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react"; // or your auth hook
import { cn } from "@/lib/utils";
import { useDeleteComment } from "@/hooks/blog/useBlog";
import { BlogComment } from "@/types/blog.types";

interface Props {
  comment: BlogComment;
  blogPublicId: string;
}

export function CommentCard({ comment, blogPublicId }: Props) {
  const { data: session } = useSession();
  const { mutate: deleteComment, isPending } = useDeleteComment(session?.token || session?.user.token);

  // Allow delete if: own comment OR doctor owner OR admin
  const canDelete =
    session?.user?.id === comment.user?.id ||
    session?.user?.role === "ADMIN" ||
    session?.user?.role === "DOCTOR"; // doctor sees this only on their own blog page

  return (
    <div
      className={cn(
        "group flex gap-3 rounded-xl border bg-card p-4 transition-colors",
        isPending && "opacity-50",
      )}
    >
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarImage src={comment.user?.profilePhoto} alt={comment.user?.name} />
        <AvatarFallback className="text-xs font-medium">
          {comment.user?.name?.charAt(0) ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {/* Name + time */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-sm font-semibold">{comment.user?.name ?? "Unknown"}</span>
            <span className="ml-2 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>

          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
              disabled={isPending}
              aria-label="Delete comment"
              onClick={() => deleteComment({ blogPublicId, commentPublicId: comment.publicId })}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Comment body */}
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{comment.content}</p>
      </div>
    </div>
  );
}
