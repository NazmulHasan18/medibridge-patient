import HeroSection from "@/components/HeroSection/HeroSection";
import Appointment from "@/components/HomePage/Appointment";
import Blogs from "@/components/HomePage/Blogs";
import InfoCard from "@/components/HomePage/InfoCard";
import Introduction from "@/components/HomePage/Introduction";
import OurDoctors from "@/components/HomePage/OurDoctors";
import OurServices from "@/components/HomePage/OurServices";
import Testimonials from "@/components/HomePage/Testimonials";
import WhyWe from "@/components/HomePage/WhyWe";

export default function Home() {
   return (
      <div>
         <HeroSection></HeroSection>
         <div className="container mx-auto lg:p-10 p-5">
            <InfoCard></InfoCard>
            <Introduction></Introduction>
         </div>
         <OurServices></OurServices>
         <WhyWe></WhyWe>
         <Appointment></Appointment>
         <OurDoctors></OurDoctors>
         <Testimonials></Testimonials>
         <Blogs></Blogs>
      </div>
   );
}
