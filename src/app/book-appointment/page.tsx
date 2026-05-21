import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";
import React from "react";

const bookAppointment = () => {
  return (
    <div className="bg-white p-10 col-span-2">
      <div className="w-fit text-center mx-auto">
        <h1 className="text-4xl font-semibold">Appointment</h1>
        <p className="text-2xl font-bold">Get Your Appointment</p>
        <div className="w-full h-1 bg-black mb-10"></div>
      </div>
      <AppointmentForm></AppointmentForm>
    </div>
  );
};

export default bookAppointment;
