"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { UserRoleBreakdownItem } from "@/types/dashboard.types";

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: "#8b5cf6",
  ADMIN: "#3b82f6",
  DOCTOR: "#10b981",
  PATIENT: "#f59e0b",
};

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super admin",
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  PATIENT: "Patient",
};

interface Props {
  data?: UserRoleBreakdownItem[];
}

export function UserRoleBreakdown({ data }: Props) {
  const chartData = (data ?? []).map((item) => ({
    role: ROLE_LABELS[item.role] ?? item.role,
    count: item.count,
    color: ROLE_COLORS[item.role] ?? "#6b7280",
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          User roles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="role"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "0.5px solid hsl(var(--border))",
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
