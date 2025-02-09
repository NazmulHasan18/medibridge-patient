import React from "react";
import whyChooseUs from "../../../data/whyWeData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

const WhyWe = () => {
   return (
      <section className="container mx-auto p-5 md:p-10">
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">Why We?</h1>
            <p className="text-2xl">Expert & Experienced Professionals</p>
            <div className="w-full md:w-64 h-1 bg-black"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10">
            {whyChooseUs.map((info, i) => (
               <Card
                  key={i}
                  className={clsx(
                     " w-full p-2 flex flex-col justify-between bg-transparent border-0 shadow-none",
                     info.color ? info.color : ""
                  )}
               >
                  <CardContent>
                     <CardTitle className="text-5xl flex gap-4 items-center justify-center pb-4">
                        {info.icon}
                     </CardTitle>
                     <CardTitle className="text-lg flex gap-4 items-center justify-center pb-4">
                        {info.title}
                     </CardTitle>
                     <CardDescription className="text-justify">{info.description}</CardDescription>
                  </CardContent>
               </Card>
            ))}
         </div>
      </section>
   );
};

export default WhyWe;
