import { Pill } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";

export default function DoctorPrescriptionsPage() {
  return (
    <SectionPage
      title="Prescriptions"
      description="Create, renew, and review patient prescriptions."
      icon={Pill}
      items={[
        { title: "Atorvastatin 20mg", meta: "Renewal requested by Ayesha Rahman", status: "Pending" },
        { title: "Metformin 500mg", meta: "Tanvir Hasan - dosage review", status: "Review" },
        { title: "Amoxicillin 250mg", meta: "Mim Akter - completed course", status: "Closed" },
      ]}
    />
  );
}
