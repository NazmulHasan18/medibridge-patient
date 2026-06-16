import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight } from "lucide-react";
import { AdminRecentTransactionItem } from "@/types/dashboard.types";

interface Props {
  data?: AdminRecentTransactionItem[];
}

const TX_TYPE_LABELS: Record<string, string> = {
  APPOINTMENT_PAYMENT: "Appointment",
  REFERRAL_BONUS: "Referral bonus",
  REFUND: "Refund",
  ADMIN_ADJUSTMENT: "Adjustment",
  WALLET_TOPUP: "Wallet top-up",
  COIN_USAGE: "Coin usage",
};

const TX_STATUS_STYLES: Record<string, string> = {
  SUCCESS:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  PENDING:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  FAILED: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  CANCELLED:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function AdminRecentTransactions({ data }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
          Recent transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">User</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Type</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Amount</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">
                    Balance after
                  </th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Date</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((tx, i) => (
                  <tr key={tx.id} className={i < data.length - 1 ? "border-b border-border" : ""}>
                    <td className="py-2.5 pr-4">
                      <p className="font-medium truncate max-w-[120px]">{tx.user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {tx.user.role.toLowerCase().replace("_", " ")}
                      </p>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                      {TX_TYPE_LABELS[tx.type] ?? tx.type}
                    </td>
                    <td className="py-2.5 pr-4 font-medium whitespace-nowrap">{formatCurrency(tx.amount)}</td>
                    <td className="py-2.5 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                      {formatCurrency(tx.currentBalance)}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant="outline"
                        className={`text-[11px] px-2 py-0.5 ${
                          TX_STATUS_STYLES[tx.status] ?? "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tx.status.charAt(0) + tx.status.slice(1).toLowerCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
