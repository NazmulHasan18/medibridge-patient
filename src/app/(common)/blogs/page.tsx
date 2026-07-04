"use client";

import BlogCard from "@/components/blogs/blog-card";
import BlogsBackground from "@/components/Interactive/BlogsBackgorund";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogs } from "@/hooks/blog/useBlog";
import React from "react";

const BlogsPage = () => {
  const { data: blogRes, isPending } = useGetAllBlogs({ page: 1, limit: 10 });

  const diseaseResearchBlogs = blogRes?.data;

  return (
    <BlogsBackground className="py-24">
      <div className="container mx-auto p-5 lg:p-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">Blogs</h1>
          <p className="text-2xl">Some wise research from our expert doctors</p>
          <div className="w-full md:w-96 h-1 bg-black"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {!isPending ? (
            diseaseResearchBlogs?.map((blog) => <BlogCard key={blog.id} blog={blog}></BlogCard>)
          ) : (
            <>
              <Skeleton className="w-96 h-96 flex flex-col gap-4 items-center justify-center p-6">
                <Skeleton className="w-80 h-40"></Skeleton>
                <Skeleton className="w-80 h-52"></Skeleton>
              </Skeleton>
              <Skeleton className="w-96 h-96 flex flex-col gap-4 items-center justify-center p-6">
                <Skeleton className="w-80 h-40"></Skeleton>
                <Skeleton className="w-80 h-52"></Skeleton>
              </Skeleton>
              <Skeleton className="w-96 h-96 flex flex-col gap-4 items-center justify-center p-6">
                <Skeleton className="w-80 h-40"></Skeleton>
                <Skeleton className="w-80 h-52"></Skeleton>
              </Skeleton>
            </>
          )}
        </div>
      </div>
    </BlogsBackground>
  );
};

export default BlogsPage;
