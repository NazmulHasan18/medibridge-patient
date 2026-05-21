import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseMedical, HeadsetIcon } from "lucide-react";
import { Button } from "../ui/button";

const Appointment = () => {
  return (
    <section className="bg-gray-200">
      <div className="container mx-auto p-10">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 items-center bg-white rounded-md">
          <Image
            src={"/images/appointment3.jpg"}
            width={600}
            height={800}
            alt="appointment image"
            className="hidden lg:block rounded-l-md"
          ></Image>
          <div className=" p-10 col-span-2">
            <h1 className="text-4xl font-semibold">Appointment</h1>
            <p className="text-2xl font-bold">Get Your Appointment</p>
            <div className="w-36 h-1 bg-black mb-10"></div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-blue-900">Need expert medical advice today?</h2>
                <p className="mt-3 max-w-2xl text-lg text-gray-600">
                  Connect with our trusted doctors for personalized care, clear guidance, and the right next
                  step for your health.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
                <Link href="/book-appointment">
                  <Button className="lg:text-lg lg:px-7 lg:py-6" variant="outline" size="lg">
                    <BriefcaseMedical className="text-xl" /> Book an Appointment
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button className="lg:text-lg lg:px-7 lg:py-6" variant="default" size="lg">
                    <HeadsetIcon size={40} />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
