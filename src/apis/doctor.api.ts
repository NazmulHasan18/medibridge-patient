import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import { DoctorDetailResponse, DoctorResponse, UpdateDoctorPayload } from "@/types/doctor.types";

export type DoctorParams = {
  search?: string;
  specialization?: string;
  page?: number;
  limit?: number;
};

export const getDoctors = (params: DoctorParams = {}): Promise<DoctorResponse> => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  return fetcher<DoctorResponse>(`/doctors?${query}`);
};

export const getDoctorById = (id: string, token: string): Promise<DoctorDetailResponse> => {
  return fetcher<DoctorDetailResponse>(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDoctor = async (id: string, payload: UpdateDoctorPayload, token: string) => {
  const { data } = await axiosInstance.patch(`/doctors/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteDoctor = async (id: string, token: string) => {
  const { data } = await axiosInstance.delete(`/doctors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
