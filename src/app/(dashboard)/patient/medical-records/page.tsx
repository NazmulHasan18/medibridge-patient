import { Activity } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function PatientMedicalRecordsPage() {
  return (
    <SectionPage
      title="Medical Records"
      description="Review lab results, visit notes, and shared clinical documents."
      icon={Activity}
      items={[
        { title: "Complete blood count", meta: "Uploaded by diagnostics team", status: "New" },
        { title: "Cardiology visit note", meta: "Reviewed by Dr. Sarah Ahmed", status: "Shared" },
        { title: "Vaccination record", meta: "Updated on May 28, 2026", status: "Current" },
      ]}
    />
  );
}
