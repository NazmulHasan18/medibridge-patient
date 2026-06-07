"use client";

import {
  cancelDoctorSlot,
  createDoctorSchedule,
  deleteDoctorSchedule,
  deleteFutureUnbookedSlots,
  generateDoctorSlots,
  getDoctorScheduleById,
  getDoctorSchedules,
  getDoctorSlots,
  updateDoctorSchedule,
} from "@/apis/doctor-schedule.api";
import { CreateSchedulePayload, UpdateSchedulePayload } from "@/types/schedule.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDoctorSchedules = (publicId?: string) =>
  useQuery({
    queryKey: ["doctor-schedules", publicId],
    queryFn: () => getDoctorSchedules(publicId as string),
    enabled: Boolean(publicId),
    staleTime: 60_000,
  });

export const useDoctorScheduleById = (publicId?: string, scheduleId?: string) =>
  useQuery({
    queryKey: ["doctor-schedule", publicId, scheduleId],
    queryFn: () => getDoctorScheduleById(publicId as string, scheduleId as string),
    enabled: Boolean(publicId && scheduleId),
  });

export const useDoctorSlots = ({
  publicId,
  date,
  available,
  page = 1,
  limit = 10,
}: {
  publicId?: string;
  date?: string;
  available?: boolean;
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["doctor-slots", publicId, date, available, page, limit],
    queryFn: () => getDoctorSlots(publicId as string, date, available, page, limit),
    enabled: Boolean(publicId),
  });

export const useCreateDoctorSchedule = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publicId, payload }: { publicId: string; payload: CreateSchedulePayload }) =>
      createDoctorSchedule(publicId, payload, token as string),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules", variables.publicId] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateDoctorSchedule = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publicId,
      scheduleId,
      payload,
    }: {
      publicId: string;
      scheduleId: number;
      payload: UpdateSchedulePayload;
    }) => updateDoctorSchedule(publicId, scheduleId, payload, token as string),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-schedule", variables.publicId, variables.scheduleId],
      });
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules", variables.publicId] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteDoctorSchedule = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publicId, scheduleId }: { publicId: string; scheduleId: number }) =>
      deleteDoctorSchedule(publicId, scheduleId, token as string),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules", variables.publicId] });
    },
  });
};

export const useGenerateDoctorSlots = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publicId,
      scheduleId,
      dates,
    }: {
      publicId: string;
      scheduleId: number;
      dates: string[];
    }) => generateDoctorSlots(publicId, scheduleId, dates, token as string),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctor-slots", variables.publicId] });
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules", variables.publicId] });
      toast.success("Slot generating completed");
    },
  });
};

export const useDeleteFutureUnbookedSlots = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publicId, scheduleId }: { publicId: string; scheduleId?: number }) =>
      deleteFutureUnbookedSlots(token as string, publicId, scheduleId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", variables.publicId],
      });

      queryClient.invalidateQueries({
        queryKey: ["doctor-schedules", variables.publicId],
      });

      toast.success("Future slots deleted successfully");
    },

    onError: (err) => {
      toast.error(err.message || "Failed to delete slots");
    },
  });
};

export const useCancelDoctorSlot = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publicId, slotId }: { publicId: string; slotId: number }) =>
      cancelDoctorSlot(token as string, publicId, slotId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", variables.publicId],
      });

      toast.success("Slot cancelled successfully");
    },

    onError: (err) => {
      toast.error(err.message || "Failed to cancel slot");
    },
  });
};
