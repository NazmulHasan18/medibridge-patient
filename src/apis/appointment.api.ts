import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import {
  CreateAppointmentPayload,
  GetAppointmentsResponse,
  MyAppointmentParams,
} from "@/types/appointment.types";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const createAppointment = async (payload: CreateAppointmentPayload, token: string) => {
  const { data } = await axiosInstance.post(`/appointment`, payload, {
    headers: authHeaders(token),
  });

  return data;
};

export const getMyAppointment = (
  token: string,
  params: MyAppointmentParams = {},
): Promise<GetAppointmentsResponse> => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  return fetcher<GetAppointmentsResponse>(`/appointment/my-appointments?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelMyAppointment = async (id: string, token: string) => {
  const { data } = await axiosInstance.patch(`/appointment/${id}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
