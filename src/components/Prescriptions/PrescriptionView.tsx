"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileDown, Loader2, Stethoscope, User, Pill, ClipboardList, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { downloadPrescriptionPDF } from "./PrescriptionPDF";
import { FREQUENCY_PRESETS, Prescription } from "@/types/prescriptions.types";
import { toast } from "react-toastify";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface PrescriptionViewProps {
  prescription: Prescription;
}

// ─── Small info row helper ────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-muted-foreground min-w-[110px] shrink-0">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function PrescriptionView({ prescription }: PrescriptionViewProps) {
  const [downloading, setDownloading] = useState(false);
  const { doctor, patient, appointment, medicines } = prescription;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPrescriptionPDF(prescription);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Top bar ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-semibold text-lg">Prescription</h3>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Hash className="h-3 w-3" />
            {prescription.publicId.slice(0, 12).toUpperCase()}
            <span className="mx-1">·</span>
            {format(new Date(prescription.createdAt), "dd MMM yyyy")}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={handleDownload} disabled={downloading}>
          {downloading ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <FileDown className="h-3.5 w-3.5 mr-1.5" />
          )}
          Download PDF
        </Button>
      </div>

      <Separator />

      {/* ── Doctor & Patient info ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Doctor */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            <Stethoscope className="h-3.5 w-3.5 text-primary" />
            Prescribing Doctor
          </div>
          <p className="font-semibold text-base">Dr. {doctor.user.name}</p>
          {doctor.specialization && (
            <Badge variant="secondary" className="text-xs">
              {doctor.specialization}
            </Badge>
          )}
          <div className="space-y-1 pt-1">
            <InfoRow label="Email" value={doctor.user.email} />
            {/* {doctor.bmdc && <InfoRow label="BMDC Reg" value={doctor.bmdc} />}
            {doctor.phone && <InfoRow label="Phone" value={doctor.phone} />}
            {doctor.currentWorkingHospital && (
              <InfoRow label="Hospital" value={doctor.currentWorkingHospital} />
            )} */}
          </div>
        </div>

        {/* Patient */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            <User className="h-3.5 w-3.5 text-emerald-500" />
            Patient
          </div>
          <p className="font-semibold text-base">{patient.user.name}</p>
          <div className="space-y-1 pt-1">
            <InfoRow label="Email" value={patient.user.email} />
            {appointment.gender && <InfoRow label="Gender" value={appointment.gender} />}
            {appointment.dateOfBirth && (
              <InfoRow
                label="Date of Birth"
                value={format(new Date(appointment.dateOfBirth), "dd MMM yyyy")}
              />
            )}
            {/* {patient.bloodGroup && <InfoRow label="Blood Group" value={patient.bloodGroup} />} */}
          </div>
        </div>
      </div>

      {/* ── Appointment meta ── */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm bg-muted/40 rounded-lg p-3">
        <InfoRow
          label="Appointment Date"
          value={format(new Date(appointment.appointmentDate), "dd MMM yyyy, hh:mm a")}
        />
        <InfoRow label="Type" value={appointment.consultationType} />
        <InfoRow label="Prescription Date" value={format(new Date(prescription.createdAt), "dd MMM yyyy")} />
      </div>

      {/* ── Diagnosis ── */}
      {prescription.diagnosis && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-primary" />
            Diagnosis / Chief Complaint
          </div>
          <div className="text-sm text-foreground bg-muted/30 rounded-lg p-3 whitespace-pre-wrap">
            {prescription.diagnosis}
          </div>
        </div>
      )}

      {/* ── Medicines ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <Pill className="h-4 w-4 text-primary" />
          Medicines
          <Badge variant="secondary" className="ml-1 text-xs">
            {medicines.length}
          </Badge>
        </div>

        <div className="rounded-lg border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Medicine</div>
            <div className="col-span-2">Dosage</div>
            <div className="col-span-2">Frequency</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Instruction</div>
          </div>

          {/* Rows */}
          {medicines.map((med, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 gap-2 px-4 py-3 text-sm border-t items-start ${
                i % 2 === 1 ? "bg-muted/20" : ""
              }`}
            >
              <div className="col-span-1 text-muted-foreground font-semibold text-xs pt-0.5">{i + 1}.</div>
              <div className="col-span-3 font-semibold">{med.medicineName}</div>
              <div className="col-span-2 text-muted-foreground">{med.dosage}</div>
              <div className="col-span-2">
                <Badge variant="outline" className="text-xs font-mono">
                  {med.frequency} - {FREQUENCY_PRESETS.find((data) => data.value === med.frequency)?.label}
                </Badge>
              </div>
              <div className="col-span-2 text-muted-foreground">{med.duration}</div>
              <div className="col-span-2 text-xs text-muted-foreground italic">{med.instruction || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Advice ── */}
      {prescription.advice && (
        <div className="space-y-2">
          <div className="text-sm font-semibold">Advice / Instructions</div>
          <div className="text-sm text-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 whitespace-pre-wrap">
            {prescription.advice}
          </div>
        </div>
      )}

      {/* ── Follow-up ── */}
      {prescription.followUpDate && (
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Follow-up on <strong>{format(new Date(prescription.followUpDate), "dd MMMM yyyy")}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
