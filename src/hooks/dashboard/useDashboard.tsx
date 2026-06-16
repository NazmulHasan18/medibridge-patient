import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/common.types";
import {
  AdminDashboardStatsResponse,
  AdminRecentAppointmentsResponse,
  AdminRecentTransactionsResponse,
  AdminTopDoctorsResponse,
  AppointmentStatusBreakdownResponse,
  DoctorDashboardStatsResponse,
  DoctorRecentAppointmentsResponse,
  DoctorUpcomingScheduleResponse,
  PatientOverview,
  RecentActivityItem,
  RevenueChartResponse,
  UserRoleBreakdownResponse,
} from "@/types/dashboard.types";

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

// =========================== DOCTOR DASHBOARD HOOKS ===========================

export const useGetDoctorDashboardStats = (
  query?: { startDate?: string; endDate?: string },
  token?: string,
) => {
  const params = new URLSearchParams();
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  const queryString = params.toString();

  return useQuery({
    queryKey: ["doctor-dashboard-stats", query],
    queryFn: () =>
      fetcher<DoctorDashboardStatsResponse>(
        `/dashboard/doctor/stats${queryString ? `?${queryString}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    enabled: !!token,
  });
};

export const useGetDoctorAppointmentBreakdown = (token?: string) => {
  return useQuery({
    queryKey: ["doctor-appointment-breakdown"],
    queryFn: () =>
      fetcher<AppointmentStatusBreakdownResponse>("/dashboard/doctor/appointment-breakdown", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetDoctorRecentAppointments = (limit?: number, token?: string) => {
  const queryString = limit ? `?limit=${limit}` : "";

  return useQuery({
    queryKey: ["doctor-recent-appointments", limit],
    queryFn: () =>
      fetcher<DoctorRecentAppointmentsResponse>(`/dashboard/doctor/recent-appointments${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetDoctorUpcomingSchedule = (limit?: number, token?: string) => {
  const queryString = limit ? `?limit=${limit}` : "";

  return useQuery({
    queryKey: ["doctor-upcoming-schedule", limit],
    queryFn: () =>
      fetcher<DoctorUpcomingScheduleResponse>(`/dashboard/doctor/upcoming-schedule${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

// =========================== ADMIN DASHBOARD HOOKS ===========================

export const useGetAdminDashboardStats = (
  query?: { startDate?: string; endDate?: string },
  token?: string,
) => {
  const params = new URLSearchParams();
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  const queryString = params.toString();

  return useQuery({
    queryKey: ["admin-dashboard-stats", query],
    queryFn: () =>
      fetcher<AdminDashboardStatsResponse>(`/dashboard/admin/stats${queryString ? `?${queryString}` : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminAppointmentBreakdown = (token?: string) => {
  return useQuery({
    queryKey: ["admin-appointment-breakdown"],
    queryFn: () =>
      fetcher<AppointmentStatusBreakdownResponse>("/dashboard/admin/appointment-breakdown", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminUserRoleBreakdown = (token?: string) => {
  return useQuery({
    queryKey: ["admin-user-role-breakdown"],
    queryFn: () =>
      fetcher<UserRoleBreakdownResponse>("/dashboard/admin/user-role-breakdown", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminRevenueChart = (
  query?: { startDate?: string; endDate?: string; groupBy?: "day" | "week" | "month" },
  token?: string,
) => {
  const params = new URLSearchParams();
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  if (query?.groupBy) params.append("groupBy", query.groupBy);
  const queryString = params.toString();

  return useQuery({
    queryKey: ["admin-revenue-chart", query],
    queryFn: () =>
      fetcher<RevenueChartResponse>(`/dashboard/admin/revenue-chart${queryString ? `?${queryString}` : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminRecentAppointments = (limit?: number, token?: string) => {
  const queryString = limit ? `?limit=${limit}` : "";

  return useQuery({
    queryKey: ["admin-recent-appointments", limit],
    queryFn: () =>
      fetcher<AdminRecentAppointmentsResponse>(`/dashboard/admin/recent-appointments${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminRecentTransactions = (limit?: number, token?: string) => {
  const queryString = limit ? `?limit=${limit}` : "";

  return useQuery({
    queryKey: ["admin-recent-transactions", limit],
    queryFn: () =>
      fetcher<AdminRecentTransactionsResponse>(`/dashboard/admin/recent-transactions${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};

export const useGetAdminTopDoctors = (limit?: number, token?: string) => {
  const queryString = limit ? `?limit=${limit}` : "";

  return useQuery({
    queryKey: ["admin-top-doctors", limit],
    queryFn: () =>
      fetcher<AdminTopDoctorsResponse>(`/dashboard/admin/top-doctors${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled: !!token,
  });
};
