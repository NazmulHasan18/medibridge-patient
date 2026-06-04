import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";
import React from "react";

const bookAppointment = () => {
  return (
    <div className="col-span-2 bg-background p-10 text-foreground">
      <div className="w-fit">
        <h1 className="text-4xl font-semibold">Appointment</h1>
        <p className="text-2xl font-bold text-muted-foreground">Get Your Appointment</p>
        <div className="mb-5 h-1 w-full bg-primary"></div>
      </div>

      <AppointmentForm></AppointmentForm>
    </div>
  );
};

export default bookAppointment;
