"use client";

import { useGetMyPatient } from "@/hooks/patient/usePatient";
import { useSession } from "next-auth/react";
import React from "react";
import { DataTable } from "../ui/data-table";
import { patientColumns } from "./PatientColumn";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

const PatientList = () => {
  const { data: session } = useSession();

  const role = session?.user.role as string;
  const { data, isLoading, isError } = useGetMyPatient(session?.token || session?.user.token);
  const patients = data?.data || [];

  return (
    <div className="my-10">
      <DataTable
        columns={patientColumns}
        data={patients}
        isLoading={isLoading}
        errorMessage={isError ? "Failed to load patients." : undefined}
        emptyMessage="No patients found."
        className="overflow-x-auto"
        actions={(patient) => (
          <>
            <Button asChild variant="outline" size="icon">
              <Link href={`/${role.toLowerCase()}/patients/${patient.publicId}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </>
        )}
        //   pagination={
        //     meta
        //       ? {
        //           page: meta.page,
        //           pageSize: meta.limit,
        //           totalItems: meta.total,
        //           totalPages: meta.totalPages,
        //           onPageChange: setPage,
        //         }
        //       : undefined
        //   }
      />
    </div>
  );
};

export default PatientList;
