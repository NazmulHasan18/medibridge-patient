import { registerUser } from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser", "user"],
  });
};
