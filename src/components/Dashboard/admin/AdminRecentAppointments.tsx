import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { AdminRecentAppointmentItem } from "@/types/dashboard.types";

interface Props {
  data?: AdminRecentAppointmentItem[];
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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function AdminRecentAppointments({ data }: Props) {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          Recent appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No appointments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Patient</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Doctor</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Type</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">Date</th>
                  <th className="text-left text-xs text-muted-foreground font-medium pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((appt, i) => {
                  const status = STATUS_STYLES[appt.appointmentStatus] ?? {
                    label: appt.appointmentStatus,
                    className: "bg-muted text-muted-foreground border-border",
                  };
                  return (
                    <tr key={appt.id} className={i < data.length - 1 ? "border-b border-border" : ""}>
                      <td className="py-2.5 pr-4">
                        <p className="font-medium truncate max-w-[120px]">{appt.patientName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {appt.patient.user.email}
                        </p>
                      </td>
                      <td className="py-2.5 pr-4">
                        <p className="truncate max-w-[120px]">Dr. {appt.doctor.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {appt.doctor.specialization}
                        </p>
                      </td>
                      <td className="py-2.5 pr-4 text-xs text-muted-foreground">
                        {appt.consultationType === "ONLINE" ? "Online" : "In-person"}
                      </td>
                      <td className="py-2.5 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(appt.appointmentDate)}
                      </td>
                      <td className="py-2.5">
                        <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${status.className}`}>
                          {status.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
