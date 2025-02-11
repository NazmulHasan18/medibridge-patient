import React from "react";
import diseaseResearchBlogs from "../../../data/blogsData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Blogs = () => {
   return (
      <section>
         <div className="container mx-auto p-5 lg:p-10">
            <div className="flex flex-col items-center justify-center">
               <h1 className="text-4xl font-semibold">Blogs</h1>
               <p className="text-2xl">Some wise research from our expert doctors</p>
               <div className="w-full md:w-96 h-1 bg-black"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
               {diseaseResearchBlogs.slice(0, 3).map((blog) => (
                  <Card key={blog.id} className="bg-transparent shadow-md border-0 rounded-none">
                     <CardHeader className="bg-transparent p-0">
                        <Image
                           src={blog.image}
                           alt={blog.title}
                           height={190}
                           width={400}
                           className="w-full mb-5"
                        ></Image>
                     </CardHeader>
                     <CardContent className="space-y-3">
                        <CardTitle>{blog.title}</CardTitle>
                        <CardContent className="flex p-0 gap-6 items-center">
                           <CardTitle>{blog.doctor}</CardTitle>
                           <CardDescription>{blog.specialty}</CardDescription>
                        </CardContent>
                        <CardDescription>
                           <span className="font-semibold text-gray-900">Publish Date: </span>{" "}
                           {blog.publishedDate}
                        </CardDescription>
                        <CardDescription>{blog.summary}</CardDescription>
                        <Button variant="link" className="p-0">
                           Read More...
                        </Button>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Blogs;
