import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Blog } from "@/types/blog.types";
import Image from "next/image";
import moment from "moment";
import { Button } from "../ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Card key={blog.id} className="bg-transparent shadow-md border-0 rounded-none">
        <CardHeader className="bg-transparent p-0">
          <Image
            src={blog.thumbnail || ""}
            alt={blog.title}
            height={190}
            width={400}
            className="w-full max-h-60 mb-5"
          ></Image>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardTitle>{blog.title}</CardTitle>
          <CardContent className="flex p-0 gap-6 items-center">
            <CardTitle>{blog.doctorName}</CardTitle>
            <CardDescription>{blog?.doctor?.specialization}</CardDescription>
          </CardContent>
          <CardDescription className="flex justify-between items-center">
            <p>
              <span className="font-semibold text-gray-900 dark:text-gray-200">Publish Date : </span>{" "}
              {moment(blog.createdAt).format("MMM Do YY")}
            </p>
            <p className="flex gap-2 items-center">
              <MessageSquare width={16} height={16} /> : {blog._count?.comments}
            </p>
          </CardDescription>
          <CardDescription>{blog.content}</CardDescription>

          <Button variant="outline" size={"sm"}>
            <Link href={`/blogs/${blog.publicId}`}>Read More...</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default BlogCard;
