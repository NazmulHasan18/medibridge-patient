"use client";

import { getAdminDoctors, type AdminDoctorParams } from "@/apis/admin-doctor.api";
import { useQuery } from "@tanstack/react-query";

export const useAdminDoctors = (token: string | undefined, params: AdminDoctorParams = {}) => {
  return useQuery({
    queryKey: ["admin-doctors", params],
    queryFn: () => getAdminDoctors(token as string, params),
    enabled: Boolean(token),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
};
