import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { User, GetUsersParams, ApiResponse, UserMeta, UserRole } from "../../types/user.types";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

async function getToken(): Promise<string | undefined> {
  const session = await getSession();
  console.log(session);
  return session?.token || session?.user.token;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? "Request failed");
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Keys                                                                */
/* ------------------------------------------------------------------ */

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: GetUsersParams) => [...userKeys.lists(), params] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
};

/* ------------------------------------------------------------------ */
/*  Queries                                                             */
/* ------------------------------------------------------------------ */

export function useUsers(params: GetUsersParams) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") query.set(k, String(v));
  });

  return useQuery<{ data: User[]; meta: UserMeta }>({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const res = await apiFetch<User[]>(`/user?${query.toString()}`);
      return { data: res.data, meta: res.meta! };
    },
    placeholderData: keepPreviousData,
  });
}

export function useUserById(id: number | null) {
  return useQuery<User>({
    queryKey: userKeys.detail(id!),
    queryFn: async () => {
      const res = await apiFetch<User>(`/user/${id}`);
      return res.data;
    },
    enabled: id !== null,
  });
}

/* ------------------------------------------------------------------ */
/*  Mutations                                                           */
/* ------------------------------------------------------------------ */

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: UserRole }) =>
      apiFetch(`/user/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.lists() }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/user/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.lists() }),
  });
}

export function useRestoreUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiFetch(`/user/${id}/restore`, { method: "PATCH" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.lists() }),
  });
}
