import { CalendarCheck, FileText, Stethoscope, Users } from "lucide-react";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

const AdminPage = () => {
  return (
    <DashboardOverview
      eyebrow="Hospital operations"
      title="Admin Dashboard"
      description="Monitor appointments, doctors, patients, and operational reports from one coordinated workspace."
      stats={[
        { label: "Appointments", value: "128", detail: "24 scheduled for today", icon: CalendarCheck },
        { label: "Active Doctors", value: "36", detail: "8 departments covered", icon: Stethoscope },
        { label: "Patients", value: "2.4k", detail: "156 new this month", icon: Users },
        { label: "Reports", value: "18", detail: "5 need admin review", icon: FileText },
      ]}
      activityTitle="Recent activity"
      activities={[
        { title: "Cardiology schedule updated", meta: "Dr. Sarah Ahmed added two afternoon slots", status: "Updated" },
        { title: "New patient registration", meta: "Patient ID MB-2048 completed onboarding", status: "New" },
        { title: "Billing report generated", meta: "May outpatient billing summary is ready", status: "Ready" },
      ]}
      sideTitle="Admin priorities"
      sideItems={[
        "Confirm pending doctor profile approvals.",
        "Review today's appointment load by department.",
        "Check weekly reports before publishing.",
      ]}
    />
  );
};

export default AdminPage;
