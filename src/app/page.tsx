import HeroSection from "@/components/HeroSection/HeroSection";
import Appointment from "@/components/HomePage/Appointment";
import InfoCard from "@/components/HomePage/InfoCard";
import Introduction from "@/components/HomePage/Introduction";
import OurServices from "@/components/HomePage/OurServices";

export default function Home() {
   return (
      <div>
         <HeroSection></HeroSection>
         <div className="container mx-auto p-10">
            <InfoCard></InfoCard>
            <Introduction></Introduction>
         </div>
         <OurServices></OurServices>
         <Appointment></Appointment>
         <h1>Home Page</h1>
      </div>
   );
}
