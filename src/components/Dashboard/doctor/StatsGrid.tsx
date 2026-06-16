import { Calendar, Clock, Hourglass, CircleCheck, Users, Wallet } from "lucide-react";
import { DoctorDashboardStats } from "@/types/dashboard.types";

const formatCurrency = (amount: number) => {
  if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}k`;
  return `৳${amount}`;
};

const completionRate = (completed: number, total: number) =>
  total > 0 ? Math.round((completed / total) * 100) : 0;

interface Props {
  stats?: DoctorDashboardStats;
}

export function StatsGrid({ stats }: Props) {
  const cards = [
    {
      label: "Total appointments",
      value: stats?.totalAppointments ?? 0,
      sub: "All time",
      icon: Calendar,
      iconClass: "text-blue-500",
    },
    {
      label: "Today",
      value: stats?.todayAppointments ?? 0,
      sub: `${stats?.upcomingAppointments ?? 0} remaining`,
      icon: Clock,
      iconClass: "text-violet-500",
    },
    {
      label: "Pending",
      value: stats?.pendingAppointments ?? 0,
      sub: "Awaiting confirm",
      icon: Hourglass,
      iconClass: "text-amber-500",
    },
    {
      label: "Completed",
      value: stats?.completedAppointments ?? 0,
      sub: `${completionRate(
        stats?.completedAppointments ?? 0,
        stats?.totalAppointments ?? 0,
      )}% completion rate`,
      icon: CircleCheck,
      iconClass: "text-emerald-500",
    },
    {
      label: "Patients",
      value: stats?.totalPatients ?? 0,
      sub: "Unique patients",
      icon: Users,
      iconClass: "text-sky-500",
    },
    {
      label: "Earnings",
      value: formatCurrency(stats?.totalEarnings ?? 0),
      sub: "Total earned",
      icon: Wallet,
      iconClass: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <card.icon className={`w-3.5 h-3.5 ${card.iconClass}`} />
            {card.label}
          </div>
          <p className="text-2xl font-medium">{card.value}</p>
          <p className="text-[11px] text-muted-foreground">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
