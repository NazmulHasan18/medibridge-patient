import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // your configured axios instance
import {
  CreatePrescriptionPayload,
  Prescription,
  UpdatePrescriptionPayload,
} from "@/types/prescriptions.types";
import { AxiosError } from "axios";

// ─── Query key factory ────────────────────────────────────────────────────────

export const prescriptionKeys = {
  all: ["prescriptions"] as const,
  mine: () => [...prescriptionKeys.all, "my"] as const,
  byAppointment: (appointmentId: number) => [...prescriptionKeys.all, "appointment", appointmentId] as const,
  byId: (publicId: string) => [...prescriptionKeys.all, publicId] as const,
};

// ─── Fetchers ─────────────────────────────────────────────────────────────────

const fetchPrescriptionByAppointment = async (
  appointmentId: number,
  token?: string,
): Promise<Prescription> => {
  const { data } = await axiosInstance.get(`/prescriptions/appointment/${appointmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

const fetchPrescriptionById = async (publicId: string, token?: string): Promise<Prescription> => {
  const { data } = await axiosInstance.get(`/prescriptions/${publicId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

const createPrescription = async (
  payload: CreatePrescriptionPayload,
  token?: string,
): Promise<Prescription> => {
  const { data } = await axiosInstance.post("/prescriptions", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

const updatePrescription = async ({
  publicId,
  payload,
  token,
}: {
  publicId: string;
  payload: UpdatePrescriptionPayload;
  token?: string;
}): Promise<Prescription> => {
  const { data } = await axiosInstance.patch(`/prescriptions/${publicId}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function usePrescriptionByAppointment(appointmentId: number, enabled = true, token?: string) {
  return useQuery({
    queryKey: prescriptionKeys.byAppointment(appointmentId),
    queryFn: () => fetchPrescriptionByAppointment(appointmentId, token),
    enabled: !!appointmentId && enabled,
    staleTime: 1000 * 60 * 5, // 5 min — prescriptions don't change often
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });
}

export function usePrescriptionById(publicId: string, enabled = true, token?: string) {
  return useQuery({
    queryKey: prescriptionKeys.byId(publicId),
    queryFn: () => fetchPrescriptionById(publicId, token),
    enabled: !!publicId && enabled,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreatePrescription(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePrescriptionPayload) => createPrescription(payload, token),
    onSuccess: (data) => {
      queryClient.setQueryData(prescriptionKeys.byAppointment(data.appointmentId), data);
      queryClient.setQueryData(prescriptionKeys.byId(data.publicId), data);
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.mine() });
    },
  });
}

export function useUpdatePrescription(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publicId, payload }: { publicId: string; payload: UpdatePrescriptionPayload }) =>
      updatePrescription({ publicId, payload, token }),
    onSuccess: (data) => {
      queryClient.setQueryData(prescriptionKeys.byAppointment(data.appointmentId), data);
      queryClient.setQueryData(prescriptionKeys.byId(data.publicId), data);
    },
  });
}
