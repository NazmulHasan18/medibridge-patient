import { Patient } from "@/types/patient.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";

export const patientColumns: ColumnDef<Patient>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user.name",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex items-center gap-3">
          {patient.user.profileImage && (
            <Image
              src={patient.user.profileImage}
              alt={patient.user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}

          <div>
            <p className="font-medium">{patient.user.name}</p>
            <p className="text-xs text-muted-foreground">{patient.user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.original.user.phone ?? "—"}</span>,
  },
  {
    accessorKey: "user.address",
    header: "Address",
    cell: ({ row }) => <span>{row.original.user.address ?? "—"}</span>,
  },
  {
    id: "joined",
    header: "Joined",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
];
