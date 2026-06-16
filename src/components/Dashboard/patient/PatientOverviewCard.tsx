"use client";

import { CalendarCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useGetPatientOverview } from "@/hooks/dashboard/useDashboard";

export function PatientOverviewCards() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isLoading } = useGetPatientOverview(token);
  const overview = data?.data;

  const appointmentCards = [
    {
      label: "Total",
      value: overview?.appointments.total,
      icon: CalendarCheck,
      iconClass: "text-blue-500",
    },
    {
      label: "Upcoming",
      value: overview?.appointments.upcoming,
      icon: Clock,
      iconClass: "text-amber-500",
    },
    {
      label: "Completed",
      value: overview?.appointments.completed,
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
    },
    {
      label: "Cancelled",
      value: overview?.appointments.cancelled,
      icon: XCircle,
      iconClass: "text-rose-500",
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {appointmentCards.map(({ label, value, icon: Icon, iconClass }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
              <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                {isLoading ? (
                  <Skeleton className="mt-0.5 h-5 w-8" />
                ) : (
                  <p className="text-lg font-semibold leading-none">{value ?? 0}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
