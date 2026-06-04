"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Stethoscope } from "lucide-react";
// Edit2, Eye, Trash2
// import { DataTable } from "@/components/ui/data-table";
// import { useAdminDoctors } from "@/hooks/doctor/useAdminDoctors";
// import { cn } from "@/lib/utils";
// import { Doctor } from "@/types/doctor.types";
// import { ColumnDef } from "@tanstack/react-table";
// import { isAxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useState } from "react";

// const PAGE_SIZE = 10;

// const doctorColumns: ColumnDef<Doctor>[] = [
//   {
//     id: "doctor",
//     header: "Doctor",
//     cell: ({ row }) => {
//       const doctor = row.original;

//       return (
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-muted">
//             {doctor.user.profileImage ? (
//               <Image
//                 src={doctor.user.profileImage}
//                 alt={doctor.user.name}
//                 fill
//                 sizes="44px"
//                 className="object-cover"
//               />
//             ) : (
//               <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
//                 {doctor.user.name.charAt(0)}
//               </span>
//             )}
//           </div>
//           <div className="min-w-0">
//             <p className="truncate font-medium text-foreground">{doctor.user.name}</p>
//             <p className="truncate text-xs text-muted-foreground">{doctor.user.email}</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "specialization",
//     header: "Specialization",
//   },
//   {
//     accessorKey: "experience",
//     header: "Experience",
//     cell: ({ row }) => `${row.original.experience} yrs`,
//   },
//   {
//     accessorKey: "consultationFee",
//     header: "Fee",
//     cell: ({ row }) => `৳${row.original.consultationFee}`,
//   },
//   {
//     id: "phone",
//     header: "Phone",
//     cell: ({ row }) => row.original.user.phone,
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Joined",
//     cell: ({ row }) =>
//       new Intl.DateTimeFormat("en", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }).format(new Date(row.original.createdAt)),
//   },
//   {
//     accessorKey: "deletedAt",
//     header: "Status",
//     cell: ({ row }) => (
//       <p
//         className={cn(
//           "rounded-sm p-2 border text-center",
//           row.original.deletedAt ? "bg-red-400 dark:bg-red-800" : "bg-green-400 dark:bg-green-700",
//         )}
//       >
//         {row.original.deletedAt ? "Deleted" : "Active"}
//       </p>
//     ),
//   },
// ];

export default function PatientAppointmentPage() {
  // const [page, setPage] = useState(1);
  // const { data: session, status } = useSession();
  // const { data, isError, isLoading, error } = useAdminDoctors(session?.token, {
  //   page,
  //   limit: PAGE_SIZE,
  // });

  // const doctors = data?.data.data ?? [];
  // const meta = data?.data.meta;

  // const errorMessage =
  //   isAxiosError<{ message?: string }>(error) && error.response?.data?.message
  //     ? error.response.data.message
  //     : isError
  //       ? "Failed to fetch doctors."
  //       : undefined;

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

      {/* <DataTable
        columns={doctorColumns}
        data={doctors}
        isLoading={status === "loading" || isLoading}
        errorMessage={errorMessage}
        emptyMessage="No doctors found."
        actions={(doctor) => (
          <>
            <Button asChild variant="outline" size="icon" aria-label="View doctor">
              <Link href={`/admin/doctors/${doctor.publicId}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" aria-label="Edit doctor">
              <Link href={`/admin/doctors/${doctor.publicId}`}>
                <Edit2 className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" aria-label="Delete doctor">
              <Trash2 className="h-4 w-4" />
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
      /> */}
    </div>
  );
}
