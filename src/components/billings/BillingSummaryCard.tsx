"use client";

import { Wallet, TrendingDown, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useGetTransactionSummary } from "@/hooks/transactions/useTransactions";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export function BillingSummaryCards() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isLoading } = useGetTransactionSummary(token);
  const summary = data?.data;

  const cards = [
    {
      label: "Wallet Balance",
      value: summary ? formatCurrency(summary.currentBalance) : null,
      icon: Wallet,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      borderClass: "border-blue-100 dark:border-blue-900",
    },
    {
      label: "Total Spent",
      value: summary ? formatCurrency(summary.totalSpent) : null,
      icon: TrendingDown,
      iconClass: "text-rose-600",
      bgClass: "bg-rose-50 dark:bg-rose-950/40",
      borderClass: "border-rose-100 dark:border-rose-900",
    },
    {
      label: "Total Refunded",
      value: summary ? formatCurrency(summary.totalRefunded) : null,
      icon: TrendingUp,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
      borderClass: "border-emerald-100 dark:border-emerald-900",
    },
    {
      label: "Transactions",
      value: summary ? Object.values(summary.byStatus).reduce((a, b) => a + b, 0) : null,
      icon: Activity,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-50 dark:bg-violet-950/40",
      borderClass: "border-violet-100 dark:border-violet-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {cards.map(({ label, value, icon: Icon, iconClass, bgClass, borderClass }) => (
        <Card key={label} className={`border ${borderClass} shadow-none`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs text-muted-foreground">{label}</p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-6 w-20" />
                ) : (
                  <p className="mt-0.5 text-xl font-semibold tracking-tight">{value ?? "—"}</p>
                )}
              </div>
              <div className={`shrink-0 rounded-lg p-2 ${bgClass}`}>
                <Icon className={`h-4 w-4 ${iconClass}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
