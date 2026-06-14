import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher"; // adjust to your actual fetcher path
import { toQueryString } from "@/helpers/toQueryString";
import { ApiResponse } from "@/types/common.types";
import { TransactionItem, TransactionListParams, TransactionSummary } from "@/types/transaction.types";

// ─── Query key factory ────────────────────────────────────────────────────────

export const patientKeys = {
  all: ["patient"] as const,

  transactions: () => [...patientKeys.all, "transactions"] as const,
  transactionList: (params: TransactionListParams) =>
    [...patientKeys.transactions(), "list", params] as const,
  transactionDetail: (publicId: string) => [...patientKeys.transactions(), "detail", publicId] as const,
  transactionSummary: () => [...patientKeys.transactions(), "summary"] as const,
};

export const useGetMyTransactions = (params: TransactionListParams = {}, token?: string) => {
  return useQuery({
    queryKey: patientKeys.transactionList(params),
    queryFn: () =>
      fetcher<ApiResponse<TransactionItem[]>>(`/transactions${toQueryString(params)}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
};

export const useGetTransactionDetail = (publicId: string, token?: string) => {
  return useQuery({
    queryKey: patientKeys.transactionDetail(publicId),
    queryFn: () =>
      fetcher<ApiResponse<TransactionItem>>(`/transactions/${publicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token && !!publicId,
  });
};

export const useGetTransactionSummary = (token?: string) => {
  return useQuery({
    queryKey: patientKeys.transactionSummary(),
    queryFn: () =>
      fetcher<ApiResponse<TransactionSummary>>("/transactions/summary", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};
