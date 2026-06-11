"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteBlog } from "@/hooks/blog/useBlog";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface DeleteBlogDialogProps {
  publicId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteBlogDialog({ publicId, open, onOpenChange }: DeleteBlogDialogProps) {
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;

  const { mutate: deleteBlog, isPending } = useDeleteBlog(token);

  const handleDelete = () => {
    deleteBlog({ publicId }, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the blog and all its comments. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Blog
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
