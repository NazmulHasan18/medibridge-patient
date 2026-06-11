"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react"; // or your auth hook
import Link from "next/link";
import { useAddComment } from "@/hooks/blog/useBlog";

interface Props {
  blogPublicId: string;
}

export function CommentForm({ blogPublicId }: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const { mutate: addComment, isPending } = useAddComment(session?.token || session?.user.token);

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    addComment(
      { blogPublicId, content: trimmed },
      {
        onSuccess: () => setContent(""),
      },
    );
  };

  if (!session) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/40 px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-primary underline underline-offset-4">
            Sign in
          </Link>{" "}
          to leave a comment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts on this article..."
        className="min-h-[100px] resize-none"
        disabled={isPending}
        onKeyDown={(e) => {
          // Ctrl/Cmd + Enter to submit
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Ctrl</kbd> +{" "}
          <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to post
        </p>
        <Button size="sm" onClick={handleSubmit} disabled={isPending || !content.trim()}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="mr-2 h-4 w-4" />
          )}
          Post Comment
        </Button>
      </div>
    </div>
  );
}
