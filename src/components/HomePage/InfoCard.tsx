import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, ChevronsRight, MapPinHouse, Stethoscope } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const InfoCard = () => {
   const infoContent = [
      {
         title: "Get Your Doctors",
         description: "Access complete visitor details while adhering to all terms and conditions.",
         icon: <Stethoscope size={30} />,
         color: "bg-blue-200 hover:bg-blue-100",
      },
      {
         title: "Need Ambulance?",
         description: "Get emergency medical assistance quickly and efficiently. Call +8801XXXXXXXX now.",
         icon: <Ambulance size={30} />,
         color: "bg-red-200 hover:bg-red-100",
      },
      {
         title: "Our Patients Say",
         description: "Hear from our patients about their experiences with our healthcare services.",
         icon: <Ambulance size={30} />,
         color: "bg-green-200 hover:bg-green-100",
      },
      {
         title: "Reach Out to Us",
         description:
            "Need assistance or want to visit us? Find our location, contact details, and support options here.     ",
         icon: <MapPinHouse size={30} />,
         color: "bg-gray-200 hover:bg-gray-100",
      },
   ];

   return (
      <section className="flex gap-4 justify-around items-center flex-col md:flex-row flex-wrap">
         {infoContent.map((info, i) => (
            <Card
               key={i}
               className={clsx(
                  "md:h-56 w-full md:w-[17rem] p-2 flex flex-col justify-between",
                  info.color ? info.color : ""
               )}
            >
               <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex gap-4 items-center justify-center pb-4">
                     {info.icon} {info.title}
                  </CardTitle>
                  <CardDescription>{info.description}</CardDescription>
               </CardHeader>
               <CardFooter>
                  <Link href="/about-us">
                     <Button className="pl-0" variant="link">
                        Details Info <ChevronsRight />
                     </Button>
                  </Link>
               </CardFooter>
            </Card>
         ))}
      </section>
   );
};

export default InfoCard;
