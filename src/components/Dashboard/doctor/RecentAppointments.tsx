import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { List } from "lucide-react";
import { DoctorRecentAppointmentItem } from "@/types/dashboard.types";

interface Props {
  data?: DoctorRecentAppointmentItem[];
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  COMPLETED: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  PAID: {
    label: "Paid",
    className:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  },
  REFUNDED: {
    label: "Refunded",
    className:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export function RecentAppointments({ data }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <List className="w-4 h-4 text-muted-foreground" />
          Recent appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No recent appointments</p>
        ) : (
          <div className="space-y-3">
            {data.map((appt, i) => {
              const status = STATUS_STYLES[appt.appointmentStatus] ?? {
                label: appt.appointmentStatus,
                className: "bg-muted text-muted-foreground border-border",
              };
              return (
                <div
                  key={appt.id}
                  className={`flex items-center gap-3 ${
                    i < data.length - 1 ? "pb-3 border-b border-border" : ""
                  }`}
                >
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage
                      src={appt.patient.user.profileImage ?? undefined}
                      alt={appt.patient.user.name}
                    />
                    <AvatarFallback className="text-xs font-medium">
                      {getInitials(appt.patientName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{appt.patientName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(appt.appointmentDate)} ·{" "}
                      {appt.consultationType === "ONLINE" ? "Online" : "In-person"}
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${status.className}`}>
                    {status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
