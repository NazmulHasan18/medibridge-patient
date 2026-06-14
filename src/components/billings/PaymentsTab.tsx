"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { PaymentItem, PaymentStatus } from "@/types/payment.types";
import { useGetMyPayments } from "@/hooks/payments/usePayment";
import { PaymentStatusBadge } from "./BillingBadge";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import { PaymentDetailSheet } from "./PaymentDetailsSheet";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const PAYMENT_STATUS_OPTIONS: { label: string; value: PaymentStatus | "ALL" }[] = [
  { label: "All statuses", value: "ALL" },
  { label: "Completed", value: "SUCCESS" },
  { label: "Pending", value: "PENDING" },
  { label: "Failed", value: "FAILED" },
  { label: "Refunded", value: "REFUNDED" },
];

export function PaymentsTab() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "ALL">("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetMyPayments(
    {
      page,
      limit: 10,
      ...(statusFilter !== "ALL" && { paymentStatus: statusFilter }),
    },
    token,
  );

  const payments = data?.data ?? [];
  const meta = data?.meta;

  const columns: ColumnDef<PaymentItem>[] = [
    {
      header: "Doctor",
      cell: ({ row }) => {
        const appt = row.original.appointment;
        return (
          <div className="flex items-center gap-2.5">
            {appt?.doctor.user.profileImage ? (
              <Image
                src={appt.doctor.user.profileImage}
                alt={appt.doctor.user.name}
                className="h-8 w-8 rounded-full object-cover"
                width={600}
                height={600}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                {appt?.doctor.user.name?.[0] ?? "?"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{appt?.doctor.user.name ?? "—"}</p>
              <p className="truncate text-xs text-muted-foreground">{appt?.doctor.specialization ?? "—"}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Appointment Date",
      cell: ({ row }) => {
        const date = row.original.appointment?.appointmentDate;
        return (
          <span className="text-sm text-muted-foreground">
            {date ? format(new Date(date), "dd MMM yyyy") : "—"}
          </span>
        );
      },
    },
    {
      header: "Amount",
      cell: ({ row }) => <span className="text-sm font-semibold">{formatCurrency(row.original.amount)}</span>,
    },
    {
      header: "Gateway",
      cell: ({ row }) => (
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{row.original.gateway}</span>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => <PaymentStatusBadge status={row.original.paymentStatus} />,
    },
    {
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "dd MMM yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            setSelectedId(row.original.publicId);
            setSheetOpen(true);
          }}
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span>
            {meta?.total ?? 0} payment{meta?.total !== 1 ? "s" : ""}
          </span>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as PaymentStatus | "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-xs">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={payments}
        isLoading={isLoading || isFetching}
        emptyMessage="No payments yet."
      />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-1 text-sm text-muted-foreground">
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Detail sheet */}
      <PaymentDetailSheet publicId={selectedId} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
