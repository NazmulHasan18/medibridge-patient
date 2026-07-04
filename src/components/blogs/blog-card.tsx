import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { MessageSquare, ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Blog } from "@/types/blog.types";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900/60">
      <Link href={`/blogs/${blog.publicId}`} className="block">
        <CardHeader className="relative aspect-[16/10] overflow-hidden p-0">
          <Image
            src={blog.thumbnail || "/placeholder-blog.jpg"}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </CardHeader>
      </Link>

      <CardContent className="flex flex-col gap-3 p-6">
        {blog?.doctor?.specialization && (
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
            {blog.doctor.specialization}
          </span>
        )}

        <Link href={`/blogs/${blog.publicId}`}>
          <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {blog.title}
          </CardTitle>
        </Link>

        <CardDescription className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {blog.content}
        </CardDescription>

        <div className="flex items-center gap-2 pt-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">{blog.doctorName}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span>{moment(blog.createdAt).format("MMM Do YY")}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-slate-100 p-6 pt-4 dark:border-white/5">
        <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
          {blog._count?.comments ?? 0}
        </span>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="group/btn h-auto p-0 font-medium text-blue-600 hover:bg-transparent hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <Link href={`/blogs/${blog.publicId}`} className="flex items-center gap-1.5">
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
