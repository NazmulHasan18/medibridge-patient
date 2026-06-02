// lib/api/fetcher.ts
export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }

  return res.json();
};
