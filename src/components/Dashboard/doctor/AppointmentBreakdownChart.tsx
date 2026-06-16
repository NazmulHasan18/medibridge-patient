"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutIcon } from "lucide-react";
import { AppointmentStatusBreakdownItem } from "@/types/dashboard.types";

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#10b981",
  CONFIRMED: "#3b82f6",
  PENDING: "#f59e0b",
  CANCELLED: "#ef4444",
  PAID: "#8b5cf6",
  REFUNDED: "#6b7280",
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completed",
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
  PAID: "Paid",
  REFUNDED: "Refunded",
};

interface Props {
  data?: AppointmentStatusBreakdownItem[];
}

export function AppointmentBreakdownChart({ data }: Props) {
  const chartData = (data ?? []).map((item) => ({
    name: STATUS_LABELS[item.status] ?? item.status,
    value: item.count,
    color: STATUS_COLORS[item.status] ?? "#6b7280",
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <DonutIcon className="w-4 h-4 text-muted-foreground" />
          Appointment breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "0.5px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
