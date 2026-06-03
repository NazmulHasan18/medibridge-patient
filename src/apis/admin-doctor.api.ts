import { fetcher } from "@/lib/fetcher";
import { AdminDoctorsResponse } from "@/types/doctor.types";

export type AdminDoctorParams = {
  search?: string;
  specialization?: string;
  page?: number;
  limit?: number;
};

export const getAdminDoctors = (
  token: string,
  params: AdminDoctorParams = {},
): Promise<AdminDoctorsResponse> => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  return fetcher<AdminDoctorsResponse>(`/doctors/fetch?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
