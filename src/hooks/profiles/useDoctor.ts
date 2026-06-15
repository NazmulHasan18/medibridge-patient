import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type doctorUpdate = {
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  bio?: string | undefined;
};

export const updateDoctor = async (userId: number, payload: Partial<doctorUpdate>, token?: string) => {
  const { data } = await axiosInstance.patch(`/user/${userId}/doctor`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateDoctorProfile = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: Partial<doctorUpdate> }) =>
      updateDoctor(userId, data, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("Doctor updated successfully");
    },
    onError: () => toast.error("Failed to update Doctor"),
  });
};
