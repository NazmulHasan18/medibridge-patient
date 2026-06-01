import { CalendarCheck, ClipboardList, Pill, Users } from "lucide-react";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

const DoctorPage = () => {
  return (
    <DashboardOverview
      eyebrow="Clinical workspace"
      title="Doctor Dashboard"
      description="Track your schedule, patient queue, prescriptions, and follow-up work without leaving the care flow."
      stats={[
        { label: "Today's Visits", value: "14", detail: "3 video consultations", icon: CalendarCheck },
        { label: "Waiting Patients", value: "6", detail: "Average wait 12 minutes", icon: Users },
        { label: "Open Notes", value: "9", detail: "2 marked urgent", icon: ClipboardList },
        { label: "Prescriptions", value: "22", detail: "4 renewals pending", icon: Pill },
      ]}
      activityTitle="Patient queue"
      activities={[
        { title: "Ayesha Rahman", meta: "10:30 AM - follow-up consultation", status: "Checked in" },
        { title: "Tanvir Hasan", meta: "11:00 AM - lab review", status: "Pending" },
        { title: "Mim Akter", meta: "11:30 AM - telemedicine", status: "Online" },
      ]}
      sideTitle="Clinical reminders"
      sideItems={[
        "Review high-risk lab results before noon.",
        "Complete unsigned notes from yesterday.",
        "Prepare prescription renewals for pharmacy handoff.",
      ]}
    />
  );
};

export default DoctorPage;
