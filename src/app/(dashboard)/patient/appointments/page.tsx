"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarX, Eye, Plus, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCancelAppointment, useMyAppointment } from "@/hooks/appointments/useAppointment";
import { isAxiosError } from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appointment.types";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table";

const PAGE_SIZE = 10;

const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.patientName}</p>
        <p className="text-xs text-muted-foreground">{row.original.relation}</p>
      </div>
    ),
  },
  {
    id: "doctor",
    header: "Doctor",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.doctor.user.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.doctor.specialization}</p>
      </div>
    ),
  },
  {
    accessorKey: "consultationType",
    header: "Consultation",
  },
  {
    accessorKey: "appointmentDate",
    header: "Appointment Date",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(row.original.appointmentDate)),
  },
  {
    id: "slot",
    header: "Time Slot",
    cell: ({ row }) => {
      const slot = row.original.doctorSlots;

      if (!slot) return "-";

      return `${new Date(slot.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${new Date(slot.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    },
  },
  {
    id: "fee",
    header: "Fee",
    cell: ({ row }) => `৳${row.original.doctor.consultationFee}`,
  },
  {
    id: "payment",
    header: "Payment",
    cell: ({ row }) => {
      const payment = row.original.payment;

      return (
        <span
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium",
            payment?.paymentStatus === "SUCCESS"
              ? "bg-green-100 text-green-700"
              : payment?.paymentStatus === "FAILED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700",
          )}
        >
          {payment?.paymentStatus ?? "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "appointmentStatus",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-md px-2 py-1 text-xs font-medium",
          row.original.appointmentStatus === "CONFIRMED"
            ? "bg-green-100 text-green-700"
            : row.original.appointmentStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : row.original.appointmentStatus === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700",
        )}
      >
        {row.original.appointmentStatus}
      </span>
    ),
  },
  {
    id: "meeting",
    header: "Meeting",
    cell: ({ row }) =>
      row.original.meeting ? (
        <Link
          href={row.original.meeting.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          <Button variant="outline" size="sm">
            Join
          </Button>
        </Link>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(row.original.createdAt)),
  },
];

export default function PatientAppointmentPage() {
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  const { data, isError, isLoading, error } = useMyAppointment(session?.token, { page, limit: PAGE_SIZE });
  const cancelAppointment = useCancelAppointment(session?.token);

  const appointments = data?.data ?? [];
  const meta = data?.meta;
  const errorMessage =
    isAxiosError<{ message?: string }>(error) && error.response?.data?.message
      ? error.response.data.message
      : isError
        ? "Failed to fetch Appointments."
        : undefined;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary">
            <Stethoscope className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="mt-1 text-muted-foreground">
              View upcoming visits, telemedicine sessions, and appointment history.
            </p>
          </div>
          <div>
            <Link href="/patient/appointments/create">
              <Button>
                <Plus className="h-5 w-5" /> Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DataTable
        columns={appointmentColumns}
        data={appointments}
        isLoading={status === "loading" || isLoading}
        errorMessage={errorMessage}
        emptyMessage="No doctors found."
        actions={(appointment) => (
          <>
            <Button asChild variant="outline" size="icon" aria-label="View Appointment">
              <Link href={`/patient/appointments/${appointment.publicId}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="px-2"
              aria-label="Cancel Appointment"
              disabled={cancelAppointment.isPending}
              onClick={() => cancelAppointment.mutate({ id: appointment.publicId })}
            >
              <CalendarX className="h-4 w-4" />
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
