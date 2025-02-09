import React from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Image from "next/image";

const Appointment = () => {
   return (
      <section className="bg-gray-200">
         <div className="container mx-auto p-10">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 ">
               <Image
                  src={"/images/appointment3.jpg"}
                  width={600}
                  height={800}
                  alt="appointment image"
                  className="hidden lg:block"
               ></Image>
               <div className="bg-white p-10 col-span-2">
                  <h1 className="text-4xl font-semibold">Appointment</h1>
                  <p className="text-2xl font-bold">Get Your Appointment</p>
                  <div className="w-36 h-1 bg-black mb-10"></div>
                  <AppointmentForm></AppointmentForm>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Appointment;
