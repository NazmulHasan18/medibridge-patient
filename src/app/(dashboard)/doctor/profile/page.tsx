import { UserCog } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorProfilePage() {
  return (
    <SectionPage
      title="Doctor Profile"
      description="Maintain professional details, department assignment, and availability preferences."
      icon={UserCog}
      items={[
        { title: "Professional information", meta: "Specialty, degree, and consultation fee", status: "Complete" },
        { title: "Availability", meta: "Weekly schedule and telemedicine windows", status: "Active" },
        { title: "Profile image", meta: "Shown on public doctor listings", status: "Published" },
      ]}
    />
  );
}
