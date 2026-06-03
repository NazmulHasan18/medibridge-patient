"use client";

import { deleteDoctor, getDoctorById, updateDoctor } from "@/apis/doctor.api";
import type { UpdateDoctorPayload } from "@/types/doctor.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDoctorById = (id?: string, token?: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id as string, token as string),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
};

export const useUpdateDoctor = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDoctorPayload }) =>
      updateDoctor(id, payload, token as string),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctor", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      toast.success("Doctor updated successfully");
    },
  });
};

export const useDeleteDoctor = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDoctor(id, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      toast.success("Doctor deleted successfully");
    },
  });
};
