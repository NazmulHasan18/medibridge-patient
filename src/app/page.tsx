import HeroSection from "@/components/HeroSection/HeroSection";
import Appointment from "@/components/HomePage/Appointment";
import Blogs from "@/components/HomePage/Blogs";
import InfoCard from "@/components/HomePage/InfoCard";
import Introduction from "@/components/HomePage/Introduction";
import OurDoctorsSection from "@/components/HomePage/OurDoctorsSection";
import OurServices from "@/components/HomePage/OurServices";
import Testimonials from "@/components/HomePage/Testimonials";
import WhyWe from "@/components/HomePage/WhyWe";
import InteractiveBackground from "@/components/Interactive/InteractiveBackground";
import React from "react";

const Main = () => {
  return (
    <main>
      <HeroSection></HeroSection>
      <div>
        <InteractiveBackground>
          <div className="container mx-auto lg:p-10 p-5">
            <InfoCard />
            <Introduction />
          </div>
        </InteractiveBackground>
      </div>
      <OurServices></OurServices>
      <WhyWe></WhyWe>
      <Appointment></Appointment>
      <OurDoctorsSection></OurDoctorsSection>
      <Testimonials></Testimonials>
      <Blogs></Blogs>
    </main>
  );
};

export default Main;
