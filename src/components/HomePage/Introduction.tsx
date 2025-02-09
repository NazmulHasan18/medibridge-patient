import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { ClipboardPlus, HandCoins, MonitorSmartphone, ShieldPlus } from "lucide-react";
import Image from "next/image";
import React from "react";

const Introduction = () => {
   const introductionData = {
      title: "Welcome to Medibridge",
      description:
         "Medibridge connects you to trusted healthcare providers for a seamless and convenient medical experience. Whether it's booking appointments, receiving prescriptions, accessing lab reports, or consulting with doctors via telemedicine, we make healthcare accessible from the comfort of your home.",
      uniqueValue: [
         {
            text: "Ease of Access: Book appointments and access healthcare services with just a few clicks.",
            icon: <ClipboardPlus color="green" size={60} />,
            class: "border-4 bg-white hover:bg-green-200 border-green-200",
         },
         {
            text: "Affordable Healthcare: Medibridge ensures that medical care is affordable and within your reach.",
            icon: <HandCoins color="#ffba00" size={60} />,
            class: "border-4 bg-white hover:bg-gray-200 border-gray-200",
         },
         {
            text: "Trusted Professionals: Our network consists of certified doctors and healthcare professionals who are committed to providing the best care.",
            icon: <ShieldPlus color="red" size={60} />,
            class: "border-4 bg-white hover:bg-amber-200 border-amber-200",
         },
         {
            text: "Telemedicine: Consult with doctors remotely, saving time and effort, all while maintaining quality healthcare.",
            icon: <MonitorSmartphone color="blue" size={60} />,
            class: "border-4 bg-white hover:bg-blue-200 border-blue-200",
         },
      ],
   };

   return (
      <section className="grid grid-cols-11 gap-6 my-14 justify-items-center items-center">
         <Image
            src={"/images/image9.jpg"}
            className="rounded-full h-full w-full border-4 p-4 border-green-300 col-span-4"
            height={500}
            width={350}
            alt="about image"
         ></Image>

         <div className="py-14 px-6 md:px-16 bg-pink-300 bg-[url(/images/image6.jpg)] bg-blend-soft-light bg-cover bg-center bg-opacity-50 rounded-xl col-span-7 h-auto">
            <h2 className="text-4xl text-green-100 font-bold mb-4">{introductionData.title}</h2>
            <p className="text-gray-900 mb-8 bg-white rounded-lg p-7">{introductionData.description}</p>
            <div className="text-sm grid grid-cols-2 gap-5">
               {introductionData.uniqueValue.map((point, index) => (
                  <Card
                     key={index}
                     className={clsx("flex items-center space-x-3 h-36", point.class ? point.class : "")}
                  >
                     <CardHeader className="flex gap-4 justify-center items-center flex-row">
                        <CardTitle>{point.icon}</CardTitle>
                        <CardDescription className="text-gray-700 text-sm">{point.text}</CardDescription>
                     </CardHeader>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Introduction;
