"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FileText, ClipboardList, AlertCircle } from "lucide-react";

// ─── This page is mounted at:
// /dashboard/doctor/appointments/[appointmentId]/prescription
// Adjust path to match your routing structure.

// For doctor role, we need the appointment details to pre-fill doctor/patient info.
// You likely already have this from your appointment detail page — pass it as props
// or fetch it here. This example shows a self-contained fetch pattern.

import { usePrescriptionByAppointment } from "@/hooks/prescriptions/usePrescription";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import PrescriptionEditor from "@/components/Prescriptions/PrescriptionEditor";
import PrescriptionView from "@/components/Prescriptions/PrescriptionView";
import { useGetAppointmentById } from "@/hooks/appointments/useAppointment";

// ─────────────────────────────────────────────────────────────────────────────

export default function PrescriptionPage() {
  const params = useParams();
  const appointmentId = String(params.publicId);
  const { data: session } = useSession();
  const role = session?.user?.role;

  const {
    data: appointmentRes,
    isLoading: apptLoading,
    error: apptError,
  } = useGetAppointmentById(appointmentId, session?.token);

  const appointment = appointmentRes?.data;

  const { data: existingPrescription, isLoading: prescLoading } = usePrescriptionByAppointment(
    Number(appointment?.id),
    !!appointment?.id,
    session?.token,
  );

  const isLoading = apptLoading || prescLoading;
  const isDoctor = role === "DOCTOR";

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (apptError) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load appointment details.</AlertDescription>
      </Alert>
    );
  }

  // Extract doctor and patient info from appointment
  const doctorInfo = appointment?.doctor;
  const patientInfo = appointment?.patient;
  const appointmentInfo = appointment;

  return (
    <ScrollArea className="h-full">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Prescription
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Appointment #{appointmentId} ·{" "}
              {appointment?.patient?.user.name && (
                <span className="font-medium text-foreground">{appointment.patient.user.name}</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {appointment?.consultationType && (
              <Badge variant="outline">
                {appointment.consultationType === "ONLINE" ? "🌐 Online" : "🏥 In-person"}
              </Badge>
            )}
            {existingPrescription && (
              <Badge className="bg-green-100 text-green-700 border-green-300">Prescription written</Badge>
            )}
          </div>
        </div>

        {/* ── Tabs: Write vs Preview ── */}
        {isDoctor ? (
          <Tabs defaultValue={existingPrescription ? "preview" : "write"} className="space-y-4">
            <TabsList>
              <TabsTrigger value="write" className="gap-1.5">
                <ClipboardList className="h-3.5 w-3.5" />
                {existingPrescription ? "Edit" : "Write"}
              </TabsTrigger>
              {existingPrescription && (
                <TabsTrigger value="preview" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Preview
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="write">
              <div className="rounded-xl border bg-card p-6">
                <PrescriptionEditor
                  appointmentId={Number(appointment?.id)}
                  patientId={Number(patientInfo?.id)}
                  existingPrescription={existingPrescription}
                  doctorInfo={doctorInfo}
                  patientInfo={patientInfo}
                  appointmentInfo={appointmentInfo}
                />
              </div>
            </TabsContent>

            {existingPrescription && (
              <TabsContent value="preview">
                <div className="rounded-xl border bg-card p-6">
                  <PrescriptionView prescription={existingPrescription} />
                </div>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          // Patient view — read-only
          <div className="rounded-xl border bg-card p-6">
            {existingPrescription ? (
              <PrescriptionView prescription={existingPrescription} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-4 opacity-20" />
                <p className="font-medium">No prescription yet</p>
                <p className="text-sm mt-1">
                  Your doctor hasn&apos;t written a prescription for this appointment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
