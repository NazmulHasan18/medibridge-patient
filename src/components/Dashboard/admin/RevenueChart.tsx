"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { RevenueChartItem } from "@/types/dashboard.types";

interface Props {
  data?: RevenueChartItem[];
  groupBy: "day" | "week" | "month";
  onGroupByChange: (val: "day" | "week" | "month") => void;
}

const formatCurrency = (v: number) => {
  if (v >= 1000) return `৳${(v / 1000).toFixed(1)}k`;
  return `৳${v}`;
};

const GROUP_LABELS: Record<string, string> = {
  day: "Daily",
  week: "Weekly",
  month: "Monthly",
};

export function RevenueChart({ data, groupBy, onGroupByChange }: Props) {
  const chartData = (data ?? []).map((item) => ({
    ...item,
    revenue: Math.round(item.revenue),
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            Revenue overview
          </CardTitle>
          <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
            {(["day", "week", "month"] as const).map((g) => (
              <button
                key={g}
                onClick={() => onGroupByChange(g)}
                className={`text-xs px-2.5 py-1 rounded-sm transition-colors ${
                  groupBy === g
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {GROUP_LABELS[g]}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              yAxisId="revenue"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={formatCurrency}
            />
            <YAxis
              yAxisId="appointments"
              orientation="right"
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
              formatter={(value, name) =>
                name === "revenue" ? [formatCurrency(value as number), "Revenue"] : [value, "Appointments"]
              }
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="appointments"
              type="monotone"
              dataKey="appointments"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
