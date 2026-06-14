import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher"; // adjust to your actual fetcher path
import { toQueryString } from "@/helpers/toQueryString";
import { ApiResponse } from "@/types/common.types";
import { PaymentDetail, PaymentItem, PaymentListParams } from "@/types/payment.types";

// ─── Query key factory ────────────────────────────────────────────────────────

export const patientKeys = {
  all: ["patient"] as const,

  payments: () => [...patientKeys.all, "payments"] as const,
  paymentList: (params: PaymentListParams) => [...patientKeys.payments(), "list", params] as const,
  paymentDetail: (publicId: string) => [...patientKeys.payments(), "detail", publicId] as const,
  paymentByAppointment: (appointmentPublicId: string) =>
    [...patientKeys.payments(), "by-appointment", appointmentPublicId] as const,
};

export const useGetMyPayments = (params: PaymentListParams = {}, token?: string) => {
  return useQuery({
    queryKey: patientKeys.paymentList(params),
    queryFn: () =>
      fetcher<ApiResponse<PaymentItem[]>>(`/payments${toQueryString(params)}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
    placeholderData: (prev) => prev,
  });
};

export const useGetPaymentDetail = (publicId: string, token?: string) => {
  return useQuery({
    queryKey: patientKeys.paymentDetail(publicId),
    queryFn: () =>
      fetcher<ApiResponse<PaymentDetail>>(`/payments/${publicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token && !!publicId,
  });
};

export const useGetPaymentByAppointment = (appointmentPublicId: string, token?: string) => {
  return useQuery({
    queryKey: patientKeys.paymentByAppointment(appointmentPublicId),
    queryFn: () =>
      fetcher<ApiResponse<PaymentDetail>>(`/payments/appointment/${appointmentPublicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token && !!appointmentPublicId,
  });
};
