import { Edit2, User, UserCog } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";
import UpdateUserProfile from "@/components/Profiles/UpdateUserProfile";
import UserProfileView from "@/components/Profiles/ViewUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";
import { getMe } from "@/hooks/auth/useGetMe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function PatientProfilePage() {
  const session = await getServerSession(authOptions);

  const { data: user } = await getMe(session?.user?.token || session?.token);

  return (
    <div>
      <SectionPage
        title="Patient Profile"
        description="Keep personal information, emergency contacts, and care preferences up to date."
        icon={UserCog}
      />

      <h3 className="text-2xl font-bold my-6">Edit Profile Information:</h3>
      <Tabs defaultValue="view-profile" className="space-y-4">
        <TabsList className="h-9">
          <TabsTrigger value="view-profile" className="gap-1.5 text-xs sm:text-sm">
            <User className="h-3.5 w-3.5" />
            View
          </TabsTrigger>
          <TabsTrigger value="edit-profile" className="gap-1.5 text-xs sm:text-sm">
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view-profile" className="mt-0">
          <UserProfileView user={user}></UserProfileView>
        </TabsContent>

        <TabsContent value="edit-profile" className="mt-0">
          <UpdateUserProfile user={user}></UpdateUserProfile>
        </TabsContent>
      </Tabs>
    </div>
  );
}
