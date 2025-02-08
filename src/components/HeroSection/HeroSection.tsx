import React from "react";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BriefcaseMedical, HeadsetIcon } from "lucide-react";

const HeroSection = () => {
   const heroContent = [
      {
         image: "/images/hero1.jpg",
         title: "Your Health, Our Priority",
         description:
            "Access top healthcare and consultations with just a click. We're here to support you on your health journey.",
      },
      {
         image: "/images/hero4.jpg",
         title: "Personalized Healthcare Services",
         description:
            "Get tailored health solutions from certified professionals. Your well-being is our top concern.",
      },
      {
         image: "/images/hero2.jpg",
         title: "Expert Doctors & Medical Care",
         description:
            "Our network of doctors ensures you receive the best medical care. Your health is in safe hands.",
      },
   ];

   return (
      <div>
         <Carousel>
            <CarouselContent className=" h-[500px]">
               {heroContent.map((element, i) => (
                  <CarouselItem key={i}>
                     <div
                        className="relative h-full bg-pink-300 bg-opacity-60 bg-cover bg-center bg-blend-soft-light px-16 py-8"
                        style={{ backgroundImage: `url(${element.image})` }}
                     >
                        <div className="relative z-10 text-blue-900 px-6 py-16 md:px-16 md:py-24">
                           <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-6">
                              {element.title}
                           </h1>
                           <p className="text-lg sm:text-xl mb-8">{element.description}</p>
                           <div>
                              <Link href="/book-appointment" className="mr-10">
                                 <Button className="text-lg px-7 py-6" variant="default" size="lg">
                                    <BriefcaseMedical className="text-xl" /> Book an Appointment
                                 </Button>
                              </Link>
                              <Link href="/contact-us" className="mr-10">
                                 <Button className="text-lg px-7 py-6" variant="outline" size="lg">
                                    <HeadsetIcon size={40} />
                                    Contact Us
                                 </Button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="bg-transparent" />
            <CarouselNext className="bg-transparent" />
         </Carousel>
      </div>
   );
};

export default HeroSection;
