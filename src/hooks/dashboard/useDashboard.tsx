import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/common.types";
import { PatientOverview, RecentActivityItem } from "@/types/dashboard.types";

// ─── Query key factory ────────────────────────────────────────────────────────

export const patientKeys = {
  all: ["patient"] as const,
  dashboard: () => [...patientKeys.all, "dashboard"] as const,
  overview: () => [...patientKeys.dashboard(), "overview"] as const,
  recentActivity: (limit: number) => [...patientKeys.dashboard(), "recent-activity", limit] as const,
};

export const useGetPatientOverview = (token?: string) => {
  return useQuery({
    queryKey: patientKeys.overview(),
    queryFn: () =>
      fetcher<ApiResponse<PatientOverview>>("/dashboard/patient/overview", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetRecentActivity = (limit = 10, token?: string) => {
  return useQuery({
    queryKey: patientKeys.recentActivity(limit),
    queryFn: () =>
      fetcher<ApiResponse<RecentActivityItem[]>>(`/dashboard/patient/recent-activity?limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};
