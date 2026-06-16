import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { AdminTopDoctorItem } from "@/types/dashboard.types";

interface Props {
  data?: AdminTopDoctorItem[];
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const RANK_COLORS = [
  "text-amber-500",
  "text-slate-400",
  "text-amber-700",
  "text-muted-foreground",
  "text-muted-foreground",
];

export function TopDoctors({ data }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Trophy className="w-4 h-4 text-muted-foreground" />
          Top doctors
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No data available</p>
        ) : (
          <div className="space-y-3">
            {data.map((item, i) => (
              <div
                key={item.doctor?.id ?? i}
                className={`flex items-center gap-3 ${
                  i < data.length - 1 ? "pb-3 border-b border-border" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium w-5 text-center ${RANK_COLORS[i] ?? "text-muted-foreground"}`}
                >
                  {i + 1}
                </span>
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage
                    src={item.doctor?.user.profileImage ?? undefined}
                    alt={item.doctor?.user.name}
                  />
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(item.doctor?.user.name ?? "?")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.doctor?.user.name ?? "Unknown"}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.doctor?.specialization}</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                  {item.completedAppointments} done
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
