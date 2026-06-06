import { createAppointment, CreateAppointmentPayload } from "@/apis/appointment.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, token }: { payload: CreateAppointmentPayload; token?: string }) =>
      createAppointment(payload, token || ""),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      toast.success(data.message);
      if (data?.data?.paymentUrl) {
        window.open(data.data.paymentUrl, "_blank");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
