import { Stethoscope } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function AdminDoctorsPage() {
  return (
    <SectionPage
      title="Doctors"
      description="Review doctors, departments, availability, and profile approvals."
      icon={Stethoscope}
      items={[
        { title: "Dr. Sarah Ahmed", meta: "Cardiology - 12 slots this week", status: "Active" },
        { title: "Dr. Imran Khan", meta: "Pediatrics - profile update submitted", status: "Review" },
        { title: "Dr. Nadia Islam", meta: "Telemedicine - evening schedule", status: "Active" },
      ]}
    />
  );
}
