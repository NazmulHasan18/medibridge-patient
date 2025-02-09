import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import doctors from "../../../data/doctorsData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OurDoctors = () => {
   const categories = [...new Set(doctors.map((doc) => doc.category))];

   return (
      <section className="container mx-auto p-5 md:p-10">
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">Our Doctors</h1>
            <p className="text-2xl">Our Experts Doctors For The Patients</p>
            <div className="w-full md:w-72 h-1 bg-black"></div>
         </div>

         <div className="my-5">
            <Tabs defaultValue={categories[0]}>
               <TabsList className="w-full flex-wrap h-full gap-1 bg-transparent mx-auto my-5 md:gap-5">
                  {categories.map((category, i) => (
                     <TabsTrigger
                        key={i}
                        value={category}
                        className=" p-3 rounded-full disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-2 data-[state=active]:border-pink-400 hover:border-2 hover:border-pink-500"
                     >
                        {category}
                     </TabsTrigger>
                  ))}
               </TabsList>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {doctors.map((doctor) => (
                     <TabsContent key={doctor.id} value={doctor.category}>
                        <Card className="text-center bg-transparent border-blue-400">
                           <CardHeader className="bg-transparent">
                              <div className="rounded-full h-[200px] overflow-hidden flex items-center justify-center w-fit mx-auto border-[6px] border-primary mb-4">
                                 <Image src={doctor.image} alt={doctor.name} height={190} width={190}></Image>
                              </div>
                           </CardHeader>
                           <CardContent className="space-y-3">
                              <CardTitle>{doctor.name}</CardTitle>
                              <CardDescription>{doctor.experience}</CardDescription>
                              <CardTitle>{doctor.specialty}</CardTitle>
                              <CardDescription>{doctor.description}</CardDescription>
                              <Button>Book Appointment</Button>
                           </CardContent>
                           <CardFooter className="flex h-10 justify-between items-center">
                              <Link href={"facebook"}>
                                 <Facebook color="blue" size={30} />
                              </Link>
                              <Link href={"facebook"}>
                                 <Instagram color="red" size={30} />
                              </Link>
                              <Link href={"facebook"}>
                                 <Linkedin color="blue" size={30} />
                              </Link>
                              <Link href={"facebook"}>
                                 <Twitter color="skyblue" size={30} />
                              </Link>
                              <Link href={"facebook"}>
                                 <Youtube color="red" size={30} />
                              </Link>
                           </CardFooter>
                        </Card>
                     </TabsContent>
                  ))}
               </div>
            </Tabs>
         </div>
      </section>
   );
};

export default OurDoctors;
