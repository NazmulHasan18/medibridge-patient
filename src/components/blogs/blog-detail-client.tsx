"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetBlog } from "@/hooks/blog/useBlog";
import { useSession } from "next-auth/react";
import { BlogDetailSkeleton } from "./blog-details-skeleton";
import { BlogHero } from "./blog-hero";
import { BlogContent } from "./blog-content";
import { CommentsSection } from "./comment-section";
import { BlogAuthorCard } from "./blog-author-card";

interface Props {
  publicId: string;
}

export function BlogDetailClient({ publicId }: Props) {
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;

  const { data: blogRes, isLoading, isError } = useGetBlog(publicId, { enabled: true }, token);
  const blog = blogRes?.data;

  if (isLoading) return <BlogDetailSkeleton />;

  if (isError || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground opacity-40" />
        <p className="text-lg font-medium">Blog not found</p>
        <p className="text-sm text-muted-foreground">
          This article may have been removed or doesn&lsquo;t exist.
        </p>
        <Button asChild variant="outline">
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
        <Link href="/blogs">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          All Articles
        </Link>
      </Button>

      {/* Hero — thumbnail + title + meta */}
      <BlogHero blog={blog} />

      {/* Two-column layout on lg: content left, author sticky right */}
      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <BlogContent content={blog.content} />

          {/* Divider */}
          <div className="my-12 border-t" />

          {/* Comments */}
          <CommentsSection blog={blog} />
        </div>

        {/* Sticky author sidebar */}
        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-64">
          <BlogAuthorCard blog={blog} />
        </aside>
      </div>
    </div>
  );
}
