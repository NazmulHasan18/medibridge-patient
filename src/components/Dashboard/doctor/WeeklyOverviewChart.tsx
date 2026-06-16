"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { DoctorRecentAppointmentItem } from "@/types/dashboard.types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  data?: DoctorRecentAppointmentItem[];
}

export function WeeklyOverviewChart({ data }: Props) {
  const counts: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  (data ?? []).forEach((appt) => {
    const day = DAYS[new Date(appt.appointmentDate).getDay()];
    counts[day] = (counts[day] ?? 0) + 1;
  });

  const chartData = DAYS.map((day) => ({ day, appointments: counts[day] }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-muted-foreground" />
          Weekly overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={22}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "hsl(var(--muted-foreground))",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "hsl(var(--muted-foreground))",
              }}
            />

            <Tooltip
              cursor={{
                fill: "hsl(var(--primary))",
                opacity: 0.08,
              }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                color: "hsl(var(--foreground))",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
            <Bar dataKey="appointments" fill="hsl(var(--chart-4))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
