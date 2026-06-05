import { CalendarCheck } from "lucide-react";

export const DoctorScheduleHeader = () => {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary">
          <CalendarCheck className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold">Schedule & Slots</h1>
          <p className="mt-1 text-muted-foreground">
            Create weekly schedules, generate appointment slots, and review upcoming availability.
          </p>
        </div>
      </div>
    </section>
  );
};
