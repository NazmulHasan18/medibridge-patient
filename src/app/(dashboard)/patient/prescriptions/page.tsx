import { Pill } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function PatientPrescriptionsPage() {
  return (
    <SectionPage
      title="Prescriptions"
      description="Track active medications, refill availability, and instructions."
      icon={Pill}
      items={[
        { title: "Atorvastatin 20mg", meta: "Take once daily after dinner", status: "Refill" },
        { title: "Vitamin D3", meta: "Weekly dose for 8 weeks", status: "Active" },
        { title: "Cetirizine 10mg", meta: "Use as needed for allergy symptoms", status: "Optional" },
      ]}
    />
  );
}
