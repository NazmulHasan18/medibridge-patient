import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PaymentStatus } from "@/types/payment.types";
import { TransactionStatus, TransactionType } from "@/types/transaction.types";

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400  dark:border-amber-800",
  },
  SUCCESS: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  FAILED: {
    label: "Failed",
    className:
      "bg-rose-100   text-rose-700   border-rose-200   dark:bg-rose-950/40   dark:text-rose-400   dark:border-rose-800",
  },
  REFUNDED: {
    label: "Refunded",
    className:
      "bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400   dark:border-blue-800",
  },
};

const txStatusConfig: Record<TransactionStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400  dark:border-amber-800",
  },
  SUCCESS: {
    label: "Success",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  FAILED: {
    label: "Failed",
    className:
      "bg-rose-100   text-rose-700   border-rose-200   dark:bg-rose-950/40   dark:text-rose-400   dark:border-rose-800",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-rose-100   text-rose-700   border-rose-200   dark:bg-rose-950/40   dark:text-rose-400   dark:border-rose-800",
  },
};

const txTypeConfig: Record<TransactionType, { label: string; className: string }> = {
  APPOINTMENT_PAYMENT: {
    label: "Appointment Payment",
    className:
      "bg-rose-50    text-rose-600    border-rose-200    dark:bg-rose-950/30    dark:text-rose-400    dark:border-rose-800",
  },
  REFUND: {
    label: "Refund",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  ADMIN_ADJUSTMENT: {
    label: "Refund",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  COIN_USAGE: {
    label: "Refund",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  REFERRAL_BONUS: {
    label: "Refund",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  WALLET_TOPUP: {
    label: "Refund",
    className:
      "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config?.className)}>
      {config?.label}
    </Badge>
  );
}

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  const config = txStatusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config?.className)}>
      {config?.label}
    </Badge>
  );
}

export function TransactionTypeBadge({ type }: { type: TransactionType }) {
  const config = txTypeConfig[type];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config?.className)}>
      {config?.label}
    </Badge>
  );
}
