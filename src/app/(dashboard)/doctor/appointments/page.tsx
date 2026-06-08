"use client";
import { CalendarClock, ClipboardCheck, ClipboardList, Eye } from "lucide-react";
import SectionPage from "@/components/Dashboard/SectionPage";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appointment.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMyAppointment } from "@/hooks/appointments/useAppointment";
import { isAxiosError } from "axios";
import { UpdateStatusDialog } from "@/components/Appointments/UpdateStatusDialog";
import { RescheduleDialog } from "@/components/Appointments/RescheduleDialog";

// appointmentColumns for Doctor view
const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const dob = new Date(row.original.dateOfBirth);
      const age = Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      return (
        <div>
          <p className="font-medium">{row.original.patientName}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.relation} · {row.original.gender} · {age}y
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "consultationType",
    header: "Type",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-md px-2 py-1 text-xs font-medium",
          row.original.consultationType === "ONLINE"
            ? "bg-blue-100 text-blue-700"
            : "bg-purple-100 text-purple-700",
        )}
      >
        {row.original.consultationType}
      </span>
    ),
  },
  {
    id: "slot",
    header: "Schedule",
    cell: ({ row }) => {
      const slot = row.original.doctorSlots;
      const date = new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(row.original.appointmentDate));

      if (!slot) return <span>{date}</span>;

      const start = new Date(slot.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const end = new Date(slot.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div>
          <p className="font-medium">{date}</p>
          <p className="text-xs text-muted-foreground">
            {start} – {end}
          </p>
        </div>
      );
    },
  },
  {
    id: "payment",
    header: "Fee",
    cell: ({ row }) => {
      const payment = row.original.payment;
      return (
        <div>
          <p className="font-medium">৳{row.original.doctor.consultationFee}</p>
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
        </div>
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
        <Link href={row.original.meeting.meetingLink} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            Join
          </Button>
        </Link>
      ) : (
        <span className="text-muted-foreground text-xs">Not set</span>
      ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.notes || "—"}</span>,
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

export default function DoctorAppointmentsPage() {
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  const { data, isError, isLoading, error } = useMyAppointment(session?.token, { page, limit: 10 });
  const [statusTarget, setStatusTarget] = useState<Appointment | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);

  const appointments = data?.data ?? [];
  const meta = data?.meta;

  const errorMessage =
    isAxiosError<{ message?: string }>(error) && error.response?.data?.message
      ? error.response.data.message
      : isError
        ? "Failed to fetch Appointments."
        : undefined;

  return (
    <div>
      <SectionPage
        title="Appointments"
        description="Follow today’s queue and upcoming patient consultations."
        icon={ClipboardList}
      />
      <div className="pt-5">
        <DataTable
          columns={appointmentColumns}
          data={appointments}
          isLoading={status === "loading" || isLoading}
          errorMessage={errorMessage}
          emptyMessage="No doctors found."
          actions={(appointment) => (
            <>
              <Button asChild variant="outline" size="icon" aria-label="View Appointment">
                <Link href={`/doctor/appointments/${appointment.publicId}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="Update Status"
                onClick={() => setStatusTarget(appointment)}
                disabled={appointment.appointmentStatus === "CANCELLED"}
              >
                <ClipboardCheck className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                aria-label="Reschedule Appointment"
                onClick={() => setRescheduleTarget(appointment)}
                disabled={
                  appointment.appointmentStatus === "CANCELLED" ||
                  appointment.appointmentStatus === "COMPLETED"
                }
              >
                <CalendarClock className="h-4 w-4" />
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
        <UpdateStatusDialog
          appointment={statusTarget}
          open={!!statusTarget}
          onClose={() => setStatusTarget(null)}
        />
        <RescheduleDialog
          appointment={rescheduleTarget}
          open={!!rescheduleTarget}
          onClose={() => setRescheduleTarget(null)}
        />
      </div>
    </div>
  );
}
