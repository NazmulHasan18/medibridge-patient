import { Activity, CalendarCheck, CreditCard, Pill } from "lucide-react";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

export default function PatientPage() {
  return (
    <DashboardOverview
      eyebrow="Personal health"
      title="Patient Dashboard"
      description="View your appointments, medical records, prescriptions, and billing updates in one secure place."
      stats={[
        { label: "Appointments", value: "3", detail: "Next visit on Monday", icon: CalendarCheck },
        { label: "Records", value: "12", detail: "2 new lab results", icon: Activity },
        { label: "Prescriptions", value: "4", detail: "1 refill available", icon: Pill },
        { label: "Billing", value: "$120", detail: "Due this week", icon: CreditCard },
      ]}
      activityTitle="Upcoming care"
      activities={[
        { title: "General consultation", meta: "June 8, 2026 - 9:30 AM", status: "Confirmed" },
        { title: "Blood test report", meta: "Uploaded by diagnostics team", status: "New" },
        { title: "Pharmacy refill", meta: "Atorvastatin 20mg", status: "Available" },
      ]}
      sideTitle="Health reminders"
      sideItems={[
        "Complete your pre-visit questionnaire.",
        "Bring recent test reports to your appointment.",
        "Review prescription instructions before refill.",
      ]}
    />
  );
}
