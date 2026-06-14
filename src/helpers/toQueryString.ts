export const toQueryString = <T extends object>(params: T) => {
  const query = Object.entries(params as Record<string, unknown>)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");

  return query ? `?${query}` : "";
};
