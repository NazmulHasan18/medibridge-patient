// Client Component — TanStack Query
"use client";

import { getAllSpecialization, getAvailableDoctors, getDoctors } from "@/apis/doctor.api";
import { useQuery } from "@tanstack/react-query";

export const useDoctors = (
  params: {
    search?: string;
    specialization?: string;
    page?: number;
    limit: number;
    enabled?: boolean;
  },
  options?: RequestInit,
) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getDoctors(params, options),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
    enabled: params.enabled,
  });
};

export const useGetAvailableDoctors = (params: {
  appointmentDate: string | Date;
  specialization: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAvailableDoctors(params),
    placeholderData: (prev) => prev,
    enabled: params.enabled,
  });
};
export const useGetAllSpecializations = () => {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: () => getAllSpecialization(),
  });
};
