import { ApiError } from "@/helpers/ApiError";

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message || "Request failed", res.status, data);
  }

  return data;
};
