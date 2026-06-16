"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useGetRecentActivity } from "@/hooks/dashboard/useDashboard";
import { PaymentStatusBadge, TransactionTypeBadge } from "@/components/billings/BillingBadge";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export function RecentActivityFeed() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isLoading } = useGetRecentActivity(8, token);
  const items = data?.data ?? [];

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-4 pb-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No recent activity.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => {
                if (item.kind === "payment") {
                  return (
                    <div
                      key={`pay-${item.publicId}`}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
                        <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.appointment?.doctor.user.name ?? "Payment"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(item.createdAt), "dd MMM, p")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                        <PaymentStatusBadge status={item.paymentStatus} />
                      </div>
                    </div>
                  );
                }

                // transaction
                const isDebit = item.type === "APPOINTMENT_PAYMENT";
                return (
                  <div
                    key={`tx-${item.publicId}`}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isDebit ? "bg-rose-50 dark:bg-rose-950/40" : "bg-emerald-50 dark:bg-emerald-950/40"
                      }`}
                    >
                      {isDebit ? (
                        <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                      ) : (
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.note ?? (isDebit ? "Debit" : "Credit")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.createdAt), "dd MMM, p")}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-sm font-semibold ${
                          isDebit
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isDebit ? "−" : "+"}
                        {formatCurrency(item.amount)}
                      </span>
                      <TransactionTypeBadge type={item.type} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
