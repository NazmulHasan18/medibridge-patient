import {
  Users,
  Stethoscope,
  UserRound,
  Calendar,
  CircleCheck,
  Wallet,
  ShieldOff,
  Hourglass,
} from "lucide-react";
import { AdminDashboardStats } from "@/types/dashboard.types";

const formatCurrency = (amount: number) => {
  if (amount >= 1_000_000) return `৳${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `৳${(amount / 1_000).toFixed(1)}k`;
  return `৳${amount}`;
};

interface Props {
  stats?: AdminDashboardStats;
}

export function AdminStatsGrid({ stats }: Props) {
  const topCards = [
    {
      label: "Total users",
      value: stats?.totalUsers ?? 0,
      sub: `${stats?.activeUsers ?? 0} active`,
      icon: Users,
      iconClass: "text-blue-500",
    },
    {
      label: "Doctors",
      value: stats?.totalDoctors ?? 0,
      sub: "Registered doctors",
      icon: Stethoscope,
      iconClass: "text-violet-500",
    },
    {
      label: "Patients",
      value: stats?.totalPatients ?? 0,
      sub: "Registered patients",
      icon: UserRound,
      iconClass: "text-sky-500",
    },
    {
      label: "Total appointments",
      value: stats?.totalAppointments ?? 0,
      sub: `${stats?.todayAppointments ?? 0} today`,
      icon: Calendar,
      iconClass: "text-indigo-500",
    },
    {
      label: "Pending",
      value: stats?.pendingAppointments ?? 0,
      sub: "Awaiting action",
      icon: Hourglass,
      iconClass: "text-amber-500",
    },
    {
      label: "Completed",
      value: stats?.completedAppointments ?? 0,
      sub: "Successfully done",
      icon: CircleCheck,
      iconClass: "text-emerald-500",
    },
    {
      label: "Total revenue",
      value: formatCurrency(stats?.totalRevenue ?? 0),
      sub: `Refunded: ${formatCurrency(stats?.totalRefunded ?? 0)}`,
      icon: Wallet,
      iconClass: "text-rose-500",
    },
    {
      label: "Blocked users",
      value: stats?.blockedUsers ?? 0,
      sub: `${stats?.pendingUsers ?? 0} pending verify`,
      icon: ShieldOff,
      iconClass: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {topCards.map((card) => (
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
