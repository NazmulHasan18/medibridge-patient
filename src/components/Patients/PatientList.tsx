"use client";

import { useGetAllPatient, useGetMyPatient } from "@/hooks/patient/usePatient";
import { useSession } from "next-auth/react";
import { DataTable } from "../ui/data-table";
import { patientColumns } from "./PatientColumn";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import clsx from "clsx";
import { Label } from "../ui/label";

const PatientList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const role = session?.user.role as string;
  const token = session?.token || session?.user?.token;

  const {
    data: myPatients,
    isLoading: myPatientsLoading,
    isError: myPatientsError,
  } = useGetMyPatient(token, role === "DOCTOR");

  const {
    data: allPatients,
    isLoading: allPatientsLoading,
    isError: allPatientsError,
  } = useGetAllPatient({ page, limit: 10, searchTerm }, token, role === "ADMIN" || role === "SUPER_ADMIN");

  const patients = role === "DOCTOR" ? myPatients?.data || [] : allPatients?.data || [];

  const meta = role === "DOCTOR" ? null : allPatients?.meta;

  const loading = role === "DOCTOR" ? myPatientsLoading : allPatientsLoading;

  const error = role === "DOCTOR" ? myPatientsError : allPatientsError;

  return (
    <div className="my-10">
      <DataTable
        columns={patientColumns}
        data={patients}
        title="Patients"
        headerAction={
          <>
            {role !== "DOCTOR" && (
              <div className="flex items-center justify-center gap-2">
                <Label>Search: </Label>
                <Input
                  id="searchTerms"
                  className={clsx(
                    "focus-visible:ring-0",
                    "rounded-full border-slate-400 bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-slate-400 hover:bg-accent",
                  )}
                  type="search"
                  placeholder="Enter Patient Name"
                  onChange={(e) => {
                    if (e.target.value.length >= 3) {
                      setSearchTerm(e.target.value);
                    } else if (e.target.value.length === 0) {
                      setSearchTerm("");
                    }
                  }}
                />
              </div>
            )}
          </>
        }
        isLoading={loading}
        errorMessage={error ? "Failed to load patients." : undefined}
        emptyMessage="No patients found."
        className="overflow-x-auto"
        actions={(patient) => (
          <>
            <Button asChild variant="outline" size="icon">
              <Link
                href={`/${role === "SUPER_ADMIN" ? "admin" : role.toLowerCase()}/patients/${patient.publicId}`}
              >
                <Eye className="h-4 w-4" />
              </Link>
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
};

export default PatientList;
