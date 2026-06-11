import { Users } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";
import PatientList from "@/components/Patients/PatientList";

export default function DoctorPatientsPage() {
  return (
    <div>
      <SectionPage
        title="Patients"
        description="Access assigned patient summaries and current treatment status."
        icon={Users}
      />
      <PatientList></PatientList>
    </div>
  );
}
