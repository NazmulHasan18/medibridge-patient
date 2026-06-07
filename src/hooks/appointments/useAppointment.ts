import { cancelMyAppointment, createAppointment, getMyAppointment } from "@/apis/appointment.api";
import { CreateAppointmentPayload, MyAppointmentParams } from "@/types/appointment.types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, token }: { payload: CreateAppointmentPayload; token?: string }) =>
      createAppointment(payload, token || ""),
    onSuccess: (data) => {
      const paymentWindow = window.open("", "_blank");

      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      toast.success(data.message);
      if (paymentWindow && data?.data?.paymentUrl) {
        paymentWindow.location.href = data.data.paymentUrl;
      } else {
        paymentWindow?.close();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMyAppointment = (token: string | undefined, params: MyAppointmentParams = {}) => {
  return useQuery({
    queryKey: ["appointment", params],
    queryFn: () => getMyAppointment(token as string, params),
    enabled: Boolean(token),
  });
};

export const useCancelAppointment = (token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancel-appointment"],
    mutationFn: ({ id }: { id: string }) => cancelMyAppointment(id, token as string),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      toast.success("Appointment cancelled successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
};
