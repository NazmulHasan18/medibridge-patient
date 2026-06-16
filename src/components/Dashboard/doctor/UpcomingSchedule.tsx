import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Video, MapPin } from "lucide-react";
import { DoctorUpcomingScheduleItem } from "@/types/dashboard.types";

interface Props {
  data?: DoctorUpcomingScheduleItem[];
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export function UpcomingSchedule({ data }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Upcoming schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No upcoming slots</p>
        ) : (
          <div className="space-y-2">
            {data.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <span className="text-xs font-medium text-muted-foreground min-w-[68px]">
                  {formatTime(slot.startTime)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{slot.appointment?.patientName ?? "Patient"}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    {slot.appointment?.consultationType === "ONLINE" ? (
                      <>
                        <Video className="w-3 h-3 text-emerald-500" />
                        Online consultation
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 text-slate-400" />
                        In-person visit
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
