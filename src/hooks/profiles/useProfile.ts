import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type ProfileUpdate = {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
};

export const updateUserProfile = async (userId: number, payload: Partial<ProfileUpdate>, token?: string) => {
  const { data } = await axiosInstance.patch(`/user/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateUserProfile = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: Partial<ProfileUpdate> }) =>
      updateUserProfile(userId, data, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: () => toast.error("Failed to update User"),
  });
};
