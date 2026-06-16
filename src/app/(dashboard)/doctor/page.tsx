"use client";

import { useSession } from "next-auth/react";
import {
  useGetDoctorDashboardStats,
  useGetDoctorAppointmentBreakdown,
  useGetDoctorRecentAppointments,
  useGetDoctorUpcomingSchedule,
} from "@/hooks/dashboard/useDashboard";

import { Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "@/components/Dashboard/doctor/StatsGrid";
import { AppointmentBreakdownChart } from "@/components/Dashboard/doctor/AppointmentBreakdownChart";
import { WeeklyOverviewChart } from "@/components/Dashboard/doctor/WeeklyOverviewChart";
import { UpcomingSchedule } from "@/components/Dashboard/doctor/UpcomingSchedule";
import { RecentAppointments } from "@/components/Dashboard/doctor/RecentAppointments";

export default function DoctorDashboardPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data: stats, isLoading: statsLoading } = useGetDoctorDashboardStats(undefined, token);
  const { data: breakdown, isLoading: breakdownLoading } = useGetDoctorAppointmentBreakdown(token);
  const { data: recentAppointments, isLoading: recentLoading } = useGetDoctorRecentAppointments(5, token);
  const { data: upcomingSchedule, isLoading: scheduleLoading } = useGetDoctorUpcomingSchedule(5, token);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Good morning, {session?.user?.name} 👋</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          On Duty
        </span>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : (
        <StatsGrid stats={stats?.data} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {breakdownLoading ? (
          <Skeleton className="h-64 rounded-lg" />
        ) : (
          <AppointmentBreakdownChart data={breakdown?.data} />
        )}
        {recentLoading ? (
          <Skeleton className="h-64 rounded-lg" />
        ) : (
          <WeeklyOverviewChart data={recentAppointments?.data} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scheduleLoading ? (
          <Skeleton className="h-80 rounded-lg" />
        ) : (
          <UpcomingSchedule data={upcomingSchedule?.data} />
        )}
        {recentLoading ? (
          <Skeleton className="h-80 rounded-lg" />
        ) : (
          <RecentAppointments data={recentAppointments?.data} />
        )}
      </div>
    </div>
  );
}
