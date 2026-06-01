import { UserCog } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function PatientProfilePage() {
  return (
    <SectionPage
      title="Patient Profile"
      description="Keep personal information, emergency contacts, and care preferences up to date."
      icon={UserCog}
      items={[
        { title: "Personal details", meta: "Name, phone, address, and date of birth", status: "Complete" },
        { title: "Emergency contact", meta: "Primary contact information", status: "Added" },
        { title: "Health preferences", meta: "Language, reminders, and communication settings", status: "Enabled" },
      ]}
    />
  );
}
