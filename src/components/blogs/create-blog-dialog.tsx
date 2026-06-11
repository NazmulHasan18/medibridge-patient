"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { BlogForm, BlogFormValues } from "./blog-form";
import { useState } from "react";
import { useCreateBlog } from "@/hooks/blog/useBlog";
import { useSession } from "next-auth/react";
import { uploadImageToCloudinary } from "@/helpers/fileUploader";

export function CreateBlogDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;
  const { mutate: createBlog } = useCreateBlog(token);

  const handleSubmit = async (values: BlogFormValues) => {
    try {
      let thumbnailUrl = "";
      setIsPending(true);
      if (values.thumbnail) {
        thumbnailUrl = await uploadImageToCloudinary(values.thumbnail);
      }
      console.log(thumbnailUrl);

      createBlog(
        {
          title: values.title,
          content: values.content,
          thumbnail: thumbnailUrl,
        },
        {
          onSuccess: () => setOpen(false),
        },
      );
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PenLine className="mr-2 h-4 w-4" />
          Write Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write a New Blog</DialogTitle>
        </DialogHeader>
        <BlogForm onSubmit={handleSubmit} isSubmitting={isPending} submitLabel="Publish Blog" />
      </DialogContent>
    </Dialog>
  );
}
