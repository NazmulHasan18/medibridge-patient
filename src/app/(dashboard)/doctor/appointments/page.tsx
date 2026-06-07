import { ClipboardList } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorAppointmentsPage() {
  return (
    <div>
      <SectionPage
        title="Appointments"
        description="Follow today’s queue and upcoming patient consultations."
        icon={ClipboardList}
      />
      <div></div>
    </div>
  );
}
