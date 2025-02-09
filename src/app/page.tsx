import HeroSection from "@/components/HeroSection/HeroSection";
import Appointment from "@/components/HomePage/Appointment";
import InfoCard from "@/components/HomePage/InfoCard";
import Introduction from "@/components/HomePage/Introduction";

export default function Home() {
   return (
      <div>
         <HeroSection></HeroSection>
         <div className="container mx-auto p-10">
            <InfoCard></InfoCard>
            <Introduction></Introduction>
            <Appointment></Appointment>
         </div>
         <h1>Home Page</h1>
      </div>
   );
}
