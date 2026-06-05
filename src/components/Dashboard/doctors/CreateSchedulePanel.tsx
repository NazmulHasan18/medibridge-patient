import { ScheduleForm } from "@/components/Dashboard/doctors/ScheduleForm";
import type { DayOfWeek } from "@/types/schedule.types";

type CreateSchedulePanelProps = {
  onSubmit: (values: { day: DayOfWeek; startTime: string; endTime: string; slotDuration: number }) => void;
  isSubmitting?: boolean;
};

export const CreateSchedulePanel = ({ onSubmit, isSubmitting }: CreateSchedulePanelProps) => {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Create weekly schedule</h2>
      <p className="mt-1 text-sm text-muted-foreground">Use this form to add a recurring doctor schedule.</p>
      <ScheduleForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </section>
  );
};
