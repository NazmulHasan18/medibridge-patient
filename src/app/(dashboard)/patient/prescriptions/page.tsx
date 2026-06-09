"use client";

import { Pill } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, FileDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Prescription } from "@/types/prescriptions.types";
import { useMyPrescriptions } from "@/hooks/prescriptions/usePrescription";
import { downloadPrescriptionPDF } from "@/components/Prescriptions/PrescriptionPDF";
import { toast } from "react-toastify";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

// ─── Columns ──────────────────────────────────────────────────────────────────

const prescriptionColumnsPatient: ColumnDef<Prescription>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient;
      const appt = row.original.appointment;
      return (
        <div>
          <p className="font-medium">{patient.user.name}</p>
          <p className="text-xs text-muted-foreground">{patient.user.email}</p>
          {appt.gender && <p className="text-xs text-muted-foreground capitalize">{appt.gender}</p>}
        </div>
      );
    },
  },
  {
    id: "appointment",
    header: "Appointment",
    cell: ({ row }) => {
      const appt = row.original.appointment;
      return (
        <div>
          <p className="font-medium">{format(new Date(appt.appointmentDate), "dd MMM yyyy")}</p>
          <span
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium",
              appt.consultationType === "ONLINE"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700",
            )}
          >
            {appt.consultationType}
          </span>
        </div>
      );
    },
  },
  {
    id: "diagnosis",
    header: "Diagnosis",
    cell: ({ row }) => {
      const diagnosis = row.original.diagnosis;
      if (!diagnosis) return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <p className="text-sm max-w-[180px] truncate" title={diagnosis}>
          {diagnosis}
        </p>
      );
    },
  },
  {
    id: "medicines",
    header: "Medicines",
    cell: ({ row }) => {
      const meds = row.original.medicines;
      if (!meds?.length) return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {meds.slice(0, 2).map((m, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {m.medicineName}
            </Badge>
          ))}
          {meds.length > 2 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{meds.length - 2} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "followUp",
    header: "Follow-up",
    cell: ({ row }) => {
      const followUpDate = row.original.followUpDate;
      if (!followUpDate) return <span className="text-muted-foreground text-xs">—</span>;
      const isPast = new Date(followUpDate) < new Date();
      return (
        <span
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium",
            isPast ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700",
          )}
        >
          {format(new Date(followUpDate), "dd MMM yyyy")}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    header: "Written On",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function PrescriptionsListPageDoctor() {
  const { data: session } = useSession();
  const role = session?.user?.role as "DOCTOR" | "PATIENT";
  const token = session?.token || session?.user.token;
  const [page, setPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useMyPrescriptions(page, 10, token);

  const prescriptions = data?.prescriptions ?? [];
  const meta = data?.meta;

  const handleDownload = async (prescription: Prescription) => {
    setDownloadingId(prescription.publicId);
    try {
      await downloadPrescriptionPDF(prescription);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <SectionPage
        title="Prescriptions"
        description="Create, renew, and review patient prescriptions."
        icon={Pill}
      />
      <DataTable
        columns={prescriptionColumnsPatient}
        data={prescriptions}
        isLoading={isLoading}
        errorMessage={isError ? "Failed to load prescriptions." : undefined}
        className="overflow-x-scroll"
        emptyMessage="No prescriptions found."
        actions={(prescription) => (
          <>
            {/* View / Edit */}
            <Button asChild variant="outline" size="icon" aria-label="View Prescription">
              <Link
                href={`/${role.toLocaleLowerCase()}/appointments/${prescription.appointment.publicId}/prescription`}
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Button>

            {/* Download PDF */}
            <Button
              variant="outline"
              size="icon"
              aria-label="Download PDF"
              onClick={() => handleDownload(prescription)}
              disabled={downloadingId === prescription.publicId}
            >
              {downloadingId === prescription.publicId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
        pagination={
          meta
            ? {
                page: meta.page,
                pageSize: meta.limit,
                totalItems: meta.total,
                totalPages: meta.totalPages,
                onPageChange: setPage,
              }
            : undefined
        }
      />
    </div>
  );
}
