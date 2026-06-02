import { Plus, Stethoscope } from "lucide-react";
// import SectionPage from "@/components/Dashboard/SectionPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDoctorsPage() {
  return (
    // <SectionPage
    //   title="Doctors"
    //   description="Review doctors, departments, availability, and profile approvals."
    //   icon={Stethoscope}
    //   items={[
    //     { title: "Dr. Sarah Ahmed", meta: "Cardiology - 12 slots this week", status: "Active" },
    //     { title: "Dr. Imran Khan", meta: "Pediatrics - profile update submitted", status: "Review" },
    //     { title: "Dr. Nadia Islam", meta: "Telemedicine - evening schedule", status: "Active" },
    //   ]}
    // />
    <div>
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary">
            <Stethoscope className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Doctors</h1>
            <p className="mt-1 text-muted-foreground">
              Review doctors, departments, availability, and profile approvals.
            </p>
          </div>
          <div>
            <Link href="/admin/doctors/create">
              <Button>
                <Plus className="h-6 w-6"></Plus> Add Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
