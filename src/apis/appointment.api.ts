import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import {
  AppointmentStatus,
  CreateAppointmentPayload,
  GetAppointmentByPublicIdResponse,
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

  return fetcher<GetAppointmentsResponse>(`/appointment/appointments?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentByPublicId = (
  token: string,
  publicId: string,
): Promise<GetAppointmentByPublicIdResponse> => {
  return fetcher<GetAppointmentByPublicIdResponse>(`/appointment/${publicId}`, {
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

export const updateAppointmentStatus = (token: string, data: { id: string; status: AppointmentStatus }) =>
  axiosInstance.patch(
    `/appointment/${data.id}/status`,
    {
      appointmentStatus: data.status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
export const rescheduleAppointment = (data: { id: string; slotId: number; date: string }, token?: string) =>
  axiosInstance.patch(
    `/appointment/${data.id}/reschedule`,
    {
      newSlotId: data.slotId,
      newAppointmentDate: new Date(data.date),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
