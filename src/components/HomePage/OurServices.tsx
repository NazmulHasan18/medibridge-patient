"use server";
import React from "react";
import hospitalServices from "../../../data/serviceData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const OurServices = async () => {
   return (
      <section className="bg-blue-900 text-white">
         <div className="container mx-auto p-10">
            <h1 className="text-4xl font-semibold">Our Services</h1>
            <p className="text-2xl">Comprehensive Healthcare Services at Your Fingertips</p>
            <div className="w-full md:w-96 h-1 bg-white"></div>

            <div className="my-16">
               <Carousel
                  opts={{
                     align: "start",
                  }}
                  className="w-full"
               >
                  <CarouselContent>
                     {hospitalServices.map((service) => (
                        <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
                           <Link href={`/service/${service.id}`}>
                              <Card className="bg-white hover:bg-gray-100 flex flex-row min-h-[250px]">
                                 <Image
                                    src={service.image}
                                    height={250}
                                    width={150}
                                    alt={service.title}
                                    className="rounded-l-xl p-0 m-0"
                                 ></Image>

                                 <CardContent className="py-5 p-5 space-y-4">
                                    <CardTitle className="text-xl line-clamp-2">{service.title}</CardTitle>
                                    <CardTitle>{service.category}</CardTitle>
                                    <CardDescription className="line-clamp-5">
                                       {service.description}
                                    </CardDescription>
                                 </CardContent>
                              </Card>
                           </Link>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12 bg-white text-black" />
                  <CarouselNext className="-right-12 bg-white text-black" />
               </Carousel>
            </div>
         </div>
      </section>
   );
};

export default OurServices;
