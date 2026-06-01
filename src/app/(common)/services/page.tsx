import React from "react";
import { CalendarCheck, FileText, Stethoscope, BedDouble, Users2, ShieldCheck } from "lucide-react";

const services = [
   {
      icon: <CalendarCheck className="text-blue-600 w-8 h-8" />,
      title: "Appointment Scheduling",
      description: "Book, reschedule, and manage appointments with real-time availability and notifications.",
   },
   {
      icon: <FileText className="text-green-600 w-8 h-8" />,
      title: "Electronic Health Records (EHR)",
      description: "Store and retrieve patient medical histories, prescriptions, and diagnostics securely.",
   },
   {
      icon: <Stethoscope className="text-purple-600 w-8 h-8" />,
      title: "Billing & Invoicing",
      description: "Automated billing for treatments, with insurance claims and payment tracking.",
   },
   {
      icon: <BedDouble className="text-red-500 w-8 h-8" />,
      title: "Inpatient & Outpatient Management",
      description: "Manage admissions, discharges, bed occupancy, and patient flow efficiently.",
   },
   {
      icon: <Users2 className="text-yellow-500 w-8 h-8" />,
      title: "Doctor & Staff Management",
      description: "Assign roles, manage schedules, and organize departments with ease.",
   },
   {
      icon: <ShieldCheck className="text-indigo-600 w-8 h-8" />,
      title: "Access Control",
      description: "Role-based permissions ensure data privacy and proper access across the system.",
   },
];

const ServicesPage = () => {
   return (
      <div className="min-h-screen bg-background p-6 text-foreground">
         <div className="max-w-6xl mx-auto space-y-12">
            {/* Header */}
            <section className="text-center py-10">
               <h1 className="text-4xl font-bold text-blue-600 mb-4">Our Services</h1>
               <p className="text-lg text-muted-foreground">Enhancing healthcare through smart digital solutions.</p>
            </section>

            {/* Services Grid */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {services.map((service, index) => (
                  <div
                     key={index}
                     className="space-y-3 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                     <div>{service.icon}</div>
                     <h3 className="text-xl font-semibold">{service.title}</h3>
                     <p className="text-muted-foreground">{service.description}</p>
                  </div>
               ))}
            </section>
         </div>
      </div>
   );
};

export default ServicesPage;
