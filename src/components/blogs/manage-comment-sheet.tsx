"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDeleteComment, useGetBlog } from "@/hooks/blog/useBlog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

interface ManageCommentsSheetProps {
  blogPublicId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageCommentsSheet({ blogPublicId, open, onOpenChange }: ManageCommentsSheetProps) {
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;

  const { data: blogRes, isLoading } = useGetBlog(blogPublicId, { enabled: !!blogPublicId && open }, token);
  const blog = blogRes?.data;
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(token);

  const handleDeleteComment = (commentPublicId: string) => {
    if (!blogPublicId) return;
    deleteComment({ blogPublicId, commentPublicId });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Manage Comments
          </SheetTitle>
          {blog && <p className="line-clamp-1 text-sm text-muted-foreground">{blog.title}</p>}
        </SheetHeader>

        <Separator className="my-4" />

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : !blog?.comments?.length ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
            <MessageSquare className="h-8 w-8 opacity-40" />
            <p className="text-sm">No comments yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-160px)] pr-2">
            <div className="space-y-4">
              {blog.comments.map((comment) => (
                <div key={comment.publicId} className="group rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user?.profilePhoto} />
                        <AvatarFallback className="text-xs">
                          {comment.user?.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{comment.user?.name ?? "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                      disabled={isDeleting}
                      onClick={() => handleDeleteComment(comment.publicId)}
                      aria-label="Delete comment"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{comment.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
