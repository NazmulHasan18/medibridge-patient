"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, FileText } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useGetPatientAllAppointments, useGetPatientDetails } from "@/hooks/patient/usePatient";
import { DataTable } from "../ui/data-table";
import { patientAppointmentColumns } from "./PatientAppointmentColumn";
import { useState } from "react";

const PatientDetails = ({ patientId }: { patientId: string }) => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);

  const token = session?.token || session?.user?.token;
  const role = session?.user.role;
  const {
    data: docPatientRes,
    isLoading: docPatientLoading,
    isError: docPatientError,
  } = useGetPatientDetails(patientId, token, role === "DOCTOR");
  const {
    data: adminPatientRes,
    isLoading: adminPatientLoading,
    isError: adminPatientError,
  } = useGetPatientAllAppointments(
    patientId,
    { page, limit: 10 },
    token,
    role === "ADMIN" || role === "SUPER_ADMIN",
  );

  const patient = role === "DOCTOR" ? docPatientRes?.data : adminPatientRes?.data.patient;
  const isLoading = role === "DOCTOR" ? docPatientLoading : adminPatientLoading;
  const isError = role === "DOCTOR" ? docPatientError : adminPatientError;

  const appointments = role === "DOCTOR" ? patient?.appointments : adminPatientRes?.data.appointments;
  const meta = role === "DOCTOR" ? docPatientRes?.meta : adminPatientRes?.meta;

  return (
    <div className="space-y-6">
      {/* Patient Profile */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border">
              <Image
                src={patient?.user?.profileImage || "/avatar.png"}
                alt={patient?.user?.name || "Patient"}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid flex-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{patient?.user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{patient?.user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{patient?.user?.phone || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p>{patient?.user?.address || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p>{patient?.createdAt ? format(new Date(patient.createdAt), "dd MMM yyyy") : "-"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p>{appointments?.length || 0}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment History */}

      <DataTable
        title="Patient's Appointments"
        columns={patientAppointmentColumns}
        data={appointments || []}
        isLoading={isLoading}
        errorMessage={isError ? "Failed to load appointments." : undefined}
        emptyMessage="No appointment history found."
        actions={(appointment) => (
          <>
            {/* View Appointment */}
            <Button asChild variant="outline" size="icon">
              <Link
                href={`/${role === "SUPER_ADMIN" ? "admin" : role?.toLowerCase()}/appointments/${appointment.publicId}`}
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Button>

            {role === "DOCTOR" && (
              <Button asChild variant="outline" size="icon">
                <Link href={`/doctor/appointments/${appointment.publicId}/prescription`}>
                  <FileText className="h-4 w-4" />
                </Link>
              </Button>
            )}
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
};

export default PatientDetails;
