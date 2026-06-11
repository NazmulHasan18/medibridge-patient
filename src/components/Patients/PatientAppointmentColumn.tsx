import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointment.types";

export const patientAppointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "appointmentDate",
    header: "Appointment Date",
    cell: ({ row }) => format(new Date(row.original.appointmentDate), "dd MMM yyyy"),
  },
  {
    accessorKey: "consultationType",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.original.consultationType === "ONLINE"
            ? "bg-blue-100 text-blue-700"
            : "bg-purple-100 text-purple-700",
        )}
      >
        {row.original.consultationType}
      </Badge>
    ),
  },
  {
    accessorKey: "appointmentStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.appointmentStatus;

      return (
        <Badge
          className={cn(
            status === "COMPLETED" && "bg-green-100 text-green-700",
            status === "CONFIRMED" && "bg-blue-100 text-blue-700",
            status === "PENDING" && "bg-yellow-100 text-yellow-700",
            status === "CANCELLED" && "bg-red-100 text-red-700",
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "relation",
    header: "Relation",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="max-w-[220px] truncate" title={row.original.notes || ""}>
        {row.original.notes || "—"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
];
