import SectionBar from "@/utils/SectionBar";
import React from "react";

const Introduction = () => {
   const introductionData = {
      title: "Welcome to Medibridge",
      description:
         "Medibridge connects you to trusted healthcare providers for a seamless and convenient medical experience. Whether it's booking appointments, receiving prescriptions, accessing lab reports, or consulting with doctors via telemedicine, we make healthcare accessible from the comfort of your home.",
      uniqueValue: [
         "Ease of Access: Book appointments and access healthcare services with just a few clicks.",
         "Affordable Healthcare: Medibridge ensures that medical care is affordable and within your reach.",
         "Trusted Professionals: Our network consists of certified doctors and healthcare professionals who are committed to providing the best care.",
         "Telemedicine: Consult with doctors remotely, saving time and effort, all while maintaining quality healthcare.",
      ],
   };

   return (
      <section className="py-16 px-6 md:px-16 text-center">
         <h2 className="text-3xl font-bold mb-4">{introductionData.title}</h2>
         <p className="text-lg sm:text-xl mb-8">{introductionData.description}</p>
         <ul className="space-y-4 text-lg sm:text-xl">
            {introductionData.uniqueValue.map((point, index) => (
               <li key={index} className="flex items-center space-x-3">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 text-primary"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     strokeWidth="2"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
               </li>
            ))}
         </ul>
      </section>
   );
};

export default Introduction;
