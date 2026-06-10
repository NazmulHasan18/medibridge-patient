"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlogForm, BlogFormValues } from "./blog-form";
import { Blog } from "@/types/blog.types";
import { useUpdateBlog } from "@/hooks/blog/useBlog";

interface EditBlogDialogProps {
  blog: Blog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBlogDialog({ blog, open, onOpenChange }: EditBlogDialogProps) {
  const { mutate: updateBlog, isPending } = useUpdateBlog();

  const handleSubmit = (values: BlogFormValues) => {
    updateBlog({ publicId: blog.publicId, data: values }, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <BlogForm
          defaultValues={blog}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
