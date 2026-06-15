"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Wallet, Calendar, User, ShieldCheck, BadgeCheck } from "lucide-react";
import { User as TUser } from "@/types/auth.types";
import { Info } from "./Info";

interface Props {
  user: TUser;
}

export default function UserProfileView({ user }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <Avatar className="h-28 w-28">
            <AvatarImage
              src={
                user?.profileImage
                  ? user?.profileImage
                  : "https://res.cloudinary.com/dkcyn8e99/image/upload/v1781484624/defaultAvatar_gkq3wo.webp"
              }
            />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>

            <div className="mt-2 flex justify-center gap-2">
              <Badge>{user?.role}</Badge>

              <Badge variant={user?.status === "ACTIVE" ? "default" : "destructive"}>{user?.status}</Badge>

              {user?.isVerified && <Badge variant="secondary">Verified</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Info icon={<Mail size={18} />} label="Email" value={user.email} />

            <Info icon={<Phone size={18} />} label="Phone" value={user.phone} />

            <Info icon={<MapPin size={18} />} label="Address" value={user.address} />

            <Info icon={<User size={18} />} label="Registration" value={user.regType} />

            <Info icon={<ShieldCheck size={18} />} label="Referral Code" value={user.referralCode} />

            <Info icon={<BadgeCheck size={18} />} label="Verified" value={user.isVerified ? "Yes" : "No"} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Info icon={<Wallet size={18} />} label="Balance" value={`৳${user.wallet?.balance ?? 0}`} />

            <Info
              icon={<Wallet size={18} />}
              label="Total Earned"
              value={`৳${user.wallet?.totalEarned ?? 0}`}
            />

            <Info
              icon={<Wallet size={18} />}
              label="Total Spent"
              value={`৳${user.wallet?.totalSpent ?? 0}`}
            />
          </CardContent>
        </Card>
      </div>

      {user.patient && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <Info label="Patient ID" value={user.patient.publicId} />

            <Info label="Created" value={format(new Date(user.patient.createdAt), "dd MMM yyyy")} />
          </CardContent>
        </Card>
      )}

      {user.doctor && (
        <Card>
          <CardHeader>
            <CardTitle>Doctor Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <Info label="Specialization" value={user.doctor.specialization} />

            <Info label="Experience" value={`${user.doctor.experience} Years`} />

            <Info label="Consultation Fee" value={`৳${user.doctor.consultationFee}`} />

            <Info label="Qualification" value={user.doctor.qualification} />

            <div className="md:col-span-2">
              <Info label="Bio" value={user.doctor.bio} />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <Info
            icon={<Calendar size={18} />}
            label="Created At"
            value={format(new Date(user.createdAt), "dd MMM yyyy hh:mm a")}
          />

          <Info
            icon={<Calendar size={18} />}
            label="Updated At"
            value={format(new Date(user.updatedAt), "dd MMM yyyy hh:mm a")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
