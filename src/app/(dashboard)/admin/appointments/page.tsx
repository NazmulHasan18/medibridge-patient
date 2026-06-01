import { CalendarCheck } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function AdminAppointmentsPage() {
  return (
    <SectionPage
      title="Appointments"
      description="Manage appointment requests, confirmations, and departmental capacity."
      icon={CalendarCheck}
      items={[
        { title: "Cardiology consultation", meta: "Dr. Sarah Ahmed - today at 2:00 PM", status: "Confirmed" },
        { title: "Pediatrics follow-up", meta: "Dr. Imran Khan - today at 4:30 PM", status: "Pending" },
        { title: "Telemedicine review", meta: "Dr. Nadia Islam - tomorrow at 10:00 AM", status: "Online" },
      ]}
    />
  );
}
