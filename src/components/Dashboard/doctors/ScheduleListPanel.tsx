import { deleteDoctorSchedule } from "@/apis/doctor-schedule.api";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/helpers/authOptions";
import type { DoctorSchedule } from "@/types/schedule.types";
import { Edit, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

type ScheduleListPanelProps = {
  schedules: DoctorSchedule[];
  isLoading?: boolean;
  summary: string;
  setUpdateData: Dispatch<SetStateAction<DoctorSchedule | undefined>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

export const ScheduleListPanel = async ({
  schedules,
  isLoading = false,
  summary,
  setEdit,
  setUpdateData,
}: ScheduleListPanelProps) => {
  const data = await getServerSession(authOptions);
  const authToken = data?.token;

  const publicId = data?.user?.publicId;

  const handleDeleteSchedule = async (scheduleId: number) => {
    if (!publicId || !authToken) {
      toast.error("Please login again we are getting some issue.");
      return;
    }

    await deleteDoctorSchedule(publicId, scheduleId, authToken)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Available schedules</h2>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading schedules...</p>
        ) : schedules.length ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-md border border-border p-4 flex justify-between items-center gap-4"
            >
              <article className="border-r flex-1">
                <p className="font-medium">Schedule #{schedule.id}</p>
                <p className="text-sm text-muted-foreground">
                  Day {schedule.day} · {schedule.startTime} to {schedule.endTime}
                </p>
                <p className="text-sm text-muted-foreground">
                  Slot duration: {schedule.slotDuration} minutes
                </p>
              </article>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setEdit(true);
                    setUpdateData(schedule);
                  }}
                >
                  <Edit />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDeleteSchedule(schedule.id)}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No schedules found for this doctor.</p>
        )}
      </div>
    </section>
  );
};
