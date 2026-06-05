import { ScheduleForm } from "@/components/Dashboard/doctors/ScheduleForm";
import type { DayOfWeek, DoctorSchedule } from "@/types/schedule.types";

type UpdateSchedulePanelProps = {
  onSubmit: (values: { day: DayOfWeek; startTime: string; endTime: string; slotDuration: number }) => void;
  isSubmitting?: boolean;
  data?: DoctorSchedule;
};

export const UpdateSchedulePanel = ({ onSubmit, isSubmitting, data }: UpdateSchedulePanelProps) => {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Update weekly schedule ({data?.day})</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Use this form to update a recurring doctor schedule.
      </p>
      <ScheduleForm onSubmit={onSubmit} isSubmitting={isSubmitting} data={data} />
    </section>
  );
};
