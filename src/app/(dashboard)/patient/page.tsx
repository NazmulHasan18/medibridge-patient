// import { Activity, CalendarCheck, CreditCard, Pill } from "lucide-react";
// import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import { RecentActivityFeed } from "@/components/Dashboard/patients/RecentActivityFeed";
import { PatientOverviewCards } from "@/components/Dashboard/patients/PatientOverviewCard";

export default function PatientPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Personal health</p>
        <div className="mt-2 max-w-3xl space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            View your appointments, medical records, prescriptions, and billing updates in one secure place.
          </p>
        </div>
      </section>
      <PatientOverviewCards></PatientOverviewCards>
      <RecentActivityFeed />
    </div>
  );
}
