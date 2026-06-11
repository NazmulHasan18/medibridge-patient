"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Blog } from "@/types/blog.types";
import { Textarea } from "../ui/textarea";
import FormInput from "../Form/FormInput";
import FormFileInput from "../Form/FormFileInput";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  thumbnail: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), "Only image files are allowed")
    .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "Image must be 2MB or smaller"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  defaultValues?: Partial<Blog>;
  onSubmit: (values: BlogFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function BlogForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Publish Blog",
}: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput name="title" label="Title" placeholder="Enter your blog title" form={form} type="text" />

        <FormFileInput
          name="thumbnail"
          form={form}
          label="Thumbnail Image"
          accept="image/*"
          formDescription="Upload a JPG, PNG, or WebP image up to 2MB."
        ></FormFileInput>

        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog content..."
                  className="focus-visible:ring-0 rounded-md border-blue-400 bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-blue-400 hover:bg-accent min-h-[220px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
