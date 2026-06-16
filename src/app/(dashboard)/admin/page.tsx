"use client";

import { useSession } from "next-auth/react";
import {
  useGetAdminDashboardStats,
  useGetAdminAppointmentBreakdown,
  useGetAdminUserRoleBreakdown,
  useGetAdminRevenueChart,
  useGetAdminRecentAppointments,
  useGetAdminRecentTransactions,
  useGetAdminTopDoctors,
} from "@/hooks/dashboard/useDashboard";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AdminStatsGrid } from "@/components/Dashboard/admin/AdminStatsGrid";
import { RevenueChart } from "@/components/Dashboard/admin/RevenueChart";
import { AdminAppointmentBreakdown } from "@/components/Dashboard/admin/AdminAppointmentBreakdown";
import { UserRoleBreakdown } from "@/components/Dashboard/admin/UserRoleBreakdown";
import { TopDoctors } from "@/components/Dashboard/admin/TopDoctors";
import { AdminRecentAppointments } from "@/components/Dashboard/admin/AdminRecentAppointments";
import { AdminRecentTransactions } from "@/components/Dashboard/admin/AdminRecentTransactions";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const [revenueGroupBy, setRevenueGroupBy] = useState<"day" | "week" | "month">("day");

  const { data: stats, isLoading: statsLoading } = useGetAdminDashboardStats(undefined, token);
  const { data: breakdown, isLoading: breakdownLoading } = useGetAdminAppointmentBreakdown(token);
  const { data: roleBreakdown, isLoading: roleLoading } = useGetAdminUserRoleBreakdown(token);
  const { data: revenueChart, isLoading: revenueLoading } = useGetAdminRevenueChart(
    { groupBy: revenueGroupBy },
    token,
  );
  const { data: recentAppointments, isLoading: apptLoading } = useGetAdminRecentAppointments(5, token);
  const { data: recentTransactions, isLoading: txLoading } = useGetAdminRecentTransactions(5, token);
  const { data: topDoctors, isLoading: doctorsLoading } = useGetAdminTopDoctors(5, token);

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
          <h1 className="text-xl font-medium">Admin dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
        </div>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      ) : (
        <AdminStatsGrid stats={stats?.data} />
      )}

      <div>
        {revenueLoading ? (
          <Skeleton className="h-72 rounded-lg" />
        ) : (
          <RevenueChart
            data={revenueChart?.data}
            groupBy={revenueGroupBy}
            onGroupByChange={setRevenueGroupBy}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {breakdownLoading ? (
          <Skeleton className="h-64 rounded-lg" />
        ) : (
          <AdminAppointmentBreakdown data={breakdown?.data} />
        )}
        {roleLoading ? (
          <Skeleton className="h-64 rounded-lg" />
        ) : (
          <UserRoleBreakdown data={roleBreakdown?.data} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctorsLoading ? <Skeleton className="h-80 rounded-lg" /> : <TopDoctors data={topDoctors?.data} />}
        {apptLoading ? (
          <Skeleton className="h-80 rounded-lg col-span-2" />
        ) : (
          <AdminRecentAppointments data={recentAppointments?.data} />
        )}
      </div>

      <div>
        {txLoading ? (
          <Skeleton className="h-72 rounded-lg" />
        ) : (
          <AdminRecentTransactions data={recentTransactions?.data} />
        )}
      </div>
    </div>
  );
}
