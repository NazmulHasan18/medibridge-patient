import { FileText } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function AdminReportsPage() {
  return (
    <SectionPage
      title="Reports"
      description="Review operational reports, appointment trends, and billing summaries."
      icon={FileText}
      items={[
        { title: "Monthly appointment trend", meta: "Generated for May 2026", status: "Ready" },
        { title: "Doctor utilization report", meta: "Department capacity review", status: "Draft" },
        { title: "Outpatient billing summary", meta: "Finance team upload", status: "Review" },
      ]}
    />
  );
}
