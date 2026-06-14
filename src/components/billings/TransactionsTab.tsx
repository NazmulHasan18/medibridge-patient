"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { TransactionItem, TransactionStatus, TransactionType } from "@/types/transaction.types";
import { useGetMyTransactions } from "@/hooks/transactions/useTransactions";
import { TransactionStatusBadge, TransactionTypeBadge } from "./BillingBadge";
import { DataTable } from "../ui/data-table";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const TX_TYPE_OPTIONS: { label: string; value: TransactionType | "ALL" }[] = [
  { label: "All types", value: "ALL" },
  { label: "Admin Adjustment", value: "ADMIN_ADJUSTMENT" },
  { label: "Appointment Payment", value: "APPOINTMENT_PAYMENT" },
  { label: "Coin Usage", value: "COIN_USAGE" },
  { label: "Referral Bonus", value: "REFERRAL_BONUS" },
  { label: "Refund", value: "REFUND" },
  { label: "Wallet Top-up", value: "WALLET_TOPUP" },
];

const TX_STATUS_OPTIONS: { label: string; value: TransactionStatus | "ALL" }[] = [
  { label: "All statuses", value: "ALL" },
  { label: "Success", value: "SUCCESS" },
  { label: "Pending", value: "PENDING" },
  { label: "Failed", value: "FAILED" },
];

export function TransactionsTab() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;

  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<TransactionType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "ALL">("ALL");

  const { data, isLoading, isFetching } = useGetMyTransactions(
    {
      page,
      limit: 10,
      ...(typeFilter !== "ALL" && { type: typeFilter }),
      ...(statusFilter !== "ALL" && { status: statusFilter }),
    },
    token,
  );

  const transactions = data?.data ?? [];
  const meta = data?.meta;

  const columns: ColumnDef<TransactionItem>[] = [
    {
      header: "Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          {row.original.type === "APPOINTMENT_PAYMENT" ? (
            <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
          ) : (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          )}
          <TransactionTypeBadge type={row.original.type} />
        </div>
      ),
    },
    {
      header: "Amount",
      cell: ({ row }) => {
        const isDebit = row.original.type === "REFUND";
        return (
          <span
            className={`text-sm font-semibold ${
              isDebit ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isDebit ? "−" : "+"}
            {formatCurrency(row.original.amount)}
          </span>
        );
      },
    },
    {
      header: "Balance After",
      cell: ({ row }) => (
        <span className="text-sm font-medium">{formatCurrency(row.original.currentBalance)}</span>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => <TransactionStatusBadge status={row.original.status} />,
    },
    {
      header: "Doctor",
      cell: ({ row }) => {
        const doctor = row.original.appointment?.doctor;
        return doctor ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{doctor.user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{doctor.specialization}</p>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        );
      },
    },
    {
      header: "Note",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.note ?? "—"}</span>,
    },
    {
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "dd MMM yyyy, p")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" />
          <span>
            {meta?.total ?? 0} transaction{meta?.total !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v as TransactionType | "ALL");
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TX_TYPE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v as TransactionStatus | "ALL");
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TX_STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={transactions}
        isLoading={isLoading || isFetching}
        emptyMessage="No transactions yet."
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
    </div>
  );
}
