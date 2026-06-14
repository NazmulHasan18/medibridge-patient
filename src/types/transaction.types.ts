import { PaymentStatus } from "./payment.types";

export type TransactionType =
  | "APPOINTMENT_PAYMENT"
  | "REFERRAL_BONUS"
  | "REFUND"
  | "ADMIN_ADJUSTMENT"
  | "WALLET_TOPUP"
  | "COIN_USAGE";
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface TransactionItem {
  publicId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  previousBalance: number;
  currentBalance: number;
  note: string | null;
  createdAt: string;
  appointment?: {
    publicId: string;
    appointmentDate: string;
    doctor: {
      user: { name: string; profileImage: string | null };
      specialization: string;
    };
  } | null;
  payment?: {
    publicId: string;
    gateway: string;
    paymentStatus: PaymentStatus;
  } | null;
}

export interface TransactionSummary {
  currentBalance: number;
  totalSpent: number;
  totalRefunded: number;
  breakdown: Record<TransactionType, { count: number; amount: number }>;
  byStatus: Record<TransactionStatus, number>;
}

export interface TransactionListParams {
  page?: number;
  limit?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  from?: string;
  to?: string;
}
