import { Info } from "@/components/Profiles/Info";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/helpers/authOptions";
import { getMe } from "@/hooks/auth/useGetMe";
import { BadgeCheck, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

const AdminProfile = async () => {
  const session = await getServerSession(authOptions);

  const { data: user } = await getMe(session?.user?.token || session?.token);

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
      </div>
    </div>
  );
};

export default AdminProfile;
