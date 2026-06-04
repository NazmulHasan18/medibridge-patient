import { Doctor } from "@/types/doctor.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <Card className="text-center bg-transparent border-blue-400">
    <CardHeader className="bg-transparent">
      <div className="rounded-full h-[200px] overflow-hidden flex items-center justify-center w-fit mx-auto border-[6px] border-primary mb-4">
        {doctor.user?.profileImage ? (
          <Image src={doctor.user.profileImage} alt={doctor.user.name} height={190} width={190} />
        ) : (
          <User className="w-52 h-52" />
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <CardTitle>{doctor.user.name}</CardTitle>
      <CardDescription>{doctor.experience} years +</CardDescription>
      <CardTitle>{doctor.specialization}</CardTitle>
      <CardDescription>{doctor.bio}</CardDescription>
      <Link href={`/patient/appointments/create?doctorId=${doctor.publicId}`}>
        <Button>Book Appointment</Button>
      </Link>
    </CardContent>
  </Card>
);
