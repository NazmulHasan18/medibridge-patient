import { CreditCard } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function PatientBillingPage() {
  return (
    <SectionPage
      title="Billing"
      description="View invoices, pending payments, and recent transactions."
      icon={CreditCard}
      items={[
        { title: "Consultation invoice", meta: "General consultation - June 8, 2026", status: "Due" },
        { title: "Diagnostics payment", meta: "CBC and lipid profile", status: "Paid" },
        { title: "Telemedicine fee", meta: "Video consultation booking", status: "Pending" },
      ]}
    />
  );
}
