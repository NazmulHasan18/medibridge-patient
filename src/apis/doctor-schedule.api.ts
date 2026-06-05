import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import {
  CreateSchedulePayload,
  GenerateSlotsResponse,
  ScheduleDetailResponse,
  ScheduleListResponse,
  SlotListResponse,
  UpdateSchedulePayload,
} from "@/types/schedule.types";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getDoctorSchedules = (publicId: string) =>
  fetcher<ScheduleListResponse>(`/doctors-schedule/${publicId}`);

export const getDoctorScheduleById = (publicId: string, scheduleId: string) =>
  fetcher<ScheduleDetailResponse>(`/doctors-schedule/${publicId}/${scheduleId}`);

export const createDoctorSchedule = async (
  publicId: string,
  payload: CreateSchedulePayload,
  token: string,
) => {
  const { data } = await axiosInstance.post(`/doctors-schedule/${publicId}`, payload, {
    headers: authHeaders(token),
  });

  return data;
};

export const updateDoctorSchedule = async (
  publicId: string,
  scheduleId: number,
  payload: UpdateSchedulePayload,
  token: string,
) => {
  const { data } = await axiosInstance.patch(`/doctors-schedule/${publicId}/${scheduleId}`, payload, {
    headers: authHeaders(token),
  });

  return data;
};

export const deleteDoctorSchedule = async (publicId: string, scheduleId: number, token: string) => {
  const { data } = await axiosInstance.delete(`/doctors-schedule/${publicId}/${scheduleId}`, {
    headers: authHeaders(token),
  });

  return data;
};

export const generateDoctorSlots = async (
  publicId: string,
  scheduleId: string,
  dates: string[],
  token: string,
) => {
  const { data } = await axiosInstance.post<GenerateSlotsResponse>(
    `/doctors-schedule/${publicId}/${scheduleId}/slots/generate`,
    { dates },
    { headers: authHeaders(token) },
  );

  return data;
};

export const getDoctorSlots = (publicId: string, date?: string, available?: boolean) => {
  const query = new URLSearchParams();

  if (date) query.set("date", date);
  if (typeof available === "boolean") query.set("available", String(available));

  return fetcher<SlotListResponse>(
    `/doctors-schedule/${publicId}/get/slots${query.toString() ? `?${query.toString()}` : ""}`,
  );
};

export const cancelDoctorSlot = async (publicId: string, slotId: string, token: string) => {
  const { data } = await axiosInstance.patch(`/doctors-schedule/${publicId}/slots/${slotId}/cancel`, null, {
    headers: authHeaders(token),
  });

  return data;
};
