import { CalendarCheck } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function PatientAppointmentsPage() {
  return (
    <SectionPage
      title="My Appointments"
      description="View upcoming visits, telemedicine sessions, and appointment history."
      icon={CalendarCheck}
      items={[
        { title: "General consultation", meta: "June 8, 2026 - 9:30 AM", status: "Confirmed" },
        { title: "Cardiology follow-up", meta: "June 14, 2026 - 11:00 AM", status: "Scheduled" },
        { title: "Video consultation", meta: "June 20, 2026 - 5:00 PM", status: "Online" },
      ]}
    />
  );
}
