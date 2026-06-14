import { TransactionItem } from "./transaction.types";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export interface PaymentItem {
  publicId: string;
  amount: number;
  gateway: string;
  transactionId: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  appointment: {
    publicId: string;
    appointmentDate: string;
    doctor: {
      user: { name: string; profileImage: string | null };
      specialization: string;
    };
  };
}

export interface PaymentDetail extends PaymentItem {
  transactions: TransactionItem[];
}

export interface PaymentListParams {
  page?: number;
  limit?: number;
  paymentStatus?: PaymentStatus;
  from?: string;
  to?: string;
}
