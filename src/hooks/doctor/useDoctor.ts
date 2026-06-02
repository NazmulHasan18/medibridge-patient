// Client Component — TanStack Query
"use client";

import { getDoctors } from "@/apis/doctor.api";
import { useQuery } from "@tanstack/react-query";

export const useDoctors = (params: {
  search?: string;
  specialization?: string;
  page?: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getDoctors(params),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
};
