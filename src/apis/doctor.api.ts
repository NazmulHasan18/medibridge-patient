import { fetcher } from "@/lib/fetcher";
import { DoctorResponse } from "@/types/doctor.types";

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
