import { fetcher } from "@/lib/fetcher";
import { User } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";

export const getMe = async (token?: string) =>
  await fetcher<{ data: User }>("/auth/me", { headers: { Authorization: `Bearer ${token}` } });

export const useGetMe = (token?: string) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => await getMe(token),
  });
};
