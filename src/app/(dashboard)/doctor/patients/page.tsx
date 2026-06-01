import { Users } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorPatientsPage() {
  return (
    <SectionPage
      title="Patients"
      description="Access assigned patient summaries and current treatment status."
      icon={Users}
      items={[
        { title: "Ayesha Rahman", meta: "Hypertension follow-up", status: "Stable" },
        { title: "Tanvir Hasan", meta: "Diabetes care plan", status: "Review" },
        { title: "Mim Akter", meta: "Post-surgery recovery", status: "Monitor" },
      ]}
    />
  );
}
