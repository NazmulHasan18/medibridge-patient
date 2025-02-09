import { Card, CardContent } from "@/components/ui/card";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import testimonials from "../../../data/testimonialsData";
import Image from "next/image";

const Testimonials = () => {
   return (
      <section className="bg-blue-200">
         <div className="container mx-auto p-5 md:p-10">
            <div className="flex flex-col mb-5 items-center justify-center">
               <h1 className="text-4xl font-semibold">Testimonials</h1>
               <p className="text-2xl">Hear from our patients</p>
               <div className="w-full md:w-36 h-1 bg-black"></div>
            </div>
            <div>
               {" "}
               <Carousel className="w-full">
                  <CarouselContent>
                     {testimonials.map((data) => (
                        <CarouselItem key={data.id}>
                           <div className="p-1">
                              <Card className="bg-transparent border-0 shadow-none w-3/5 mx-auto text-center">
                                 <CardContent className="space-y-4">
                                    <h2>Condition: {data.condition}</h2>
                                    <p>{data.testimonial}</p>
                                    <Image
                                       src={data.image}
                                       alt={data.name}
                                       width={150}
                                       height={150}
                                       className="border-white border-2 mx-auto rounded-2xl"
                                    ></Image>
                                    <div>
                                       <p>{data.name}</p>
                                       <p>Age: {data.age}</p>
                                    </div>
                                 </CardContent>
                              </Card>
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
               </Carousel>
            </div>
         </div>
      </section>
   );
};

export default Testimonials;
