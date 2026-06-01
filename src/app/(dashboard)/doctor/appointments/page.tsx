import { ClipboardList } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorAppointmentsPage() {
  return (
    <SectionPage
      title="Appointments"
      description="Follow today’s queue and upcoming patient consultations."
      icon={ClipboardList}
      items={[
        { title: "Ayesha Rahman", meta: "10:30 AM - follow-up consultation", status: "Checked in" },
        { title: "Tanvir Hasan", meta: "11:00 AM - lab review", status: "Pending" },
        { title: "Mim Akter", meta: "11:30 AM - video consultation", status: "Online" },
      ]}
    />
  );
}
