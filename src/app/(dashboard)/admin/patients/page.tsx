import { Users } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function AdminPatientsPage() {
  return (
    <SectionPage
      title="Patients"
      description="Track patient registrations, profiles, and care coordination status."
      icon={Users}
      items={[
        { title: "Ayesha Rahman", meta: "Patient ID MB-2048 - profile complete", status: "Active" },
        { title: "Tanvir Hasan", meta: "Patient ID MB-2051 - insurance pending", status: "Pending" },
        { title: "Mim Akter", meta: "Patient ID MB-2054 - new registration", status: "New" },
      ]}
    />
  );
}
