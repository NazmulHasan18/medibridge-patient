import { Settings } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function AdminSettingsPage() {
  return (
    <SectionPage
      title="Settings"
      description="Configure dashboard access, hospital departments, and notification preferences."
      icon={Settings}
      items={[
        { title: "Role permissions", meta: "Admin, doctor, and patient access policies", status: "Configured" },
        { title: "Department list", meta: "8 clinical departments enabled", status: "Active" },
        { title: "Notification rules", meta: "Email and appointment reminders", status: "Enabled" },
      ]}
    />
  );
}
