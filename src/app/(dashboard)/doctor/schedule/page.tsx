import { CalendarCheck } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorSchedulePage() {
  return (
    <SectionPage
      title="Schedule"
      description="See clinic sessions, telemedicine blocks, and available appointment windows."
      icon={CalendarCheck}
      items={[
        { title: "Morning clinic", meta: "9:00 AM - 12:30 PM", status: "Open" },
        { title: "Telemedicine block", meta: "2:00 PM - 4:00 PM", status: "Booked" },
        { title: "Evening follow-ups", meta: "6:00 PM - 7:30 PM", status: "Available" },
      ]}
    />
  );
}
