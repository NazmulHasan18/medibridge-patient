import { PaymentItem } from "./payment.types";
import { TransactionItem } from "./transaction.types";

export interface PatientOverview {
  appointments: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
  financials: {
    totalSpent: number;
    walletBalance: number;
  };
}

export type RecentActivityItem =
  | ({ kind: "payment" } & PaymentItem)
  | ({ kind: "transaction" } & TransactionItem);
