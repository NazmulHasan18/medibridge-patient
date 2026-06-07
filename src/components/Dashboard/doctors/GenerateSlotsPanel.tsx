"use client";
import { Button } from "@/components/ui/button";
import { DoctorSchedule } from "@/types/schedule.types";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

type GenerateSlotsPanelProps = {
  dates: string;
  onDatesChange: (value: string) => void;
  onGenerate: (scheduleId: number) => void;
  isGenerating?: boolean;
  schedules?: DoctorSchedule[];
};

export const GenerateSlotsPanel = ({
  dates,
  onDatesChange,
  onGenerate,
  isGenerating = false,
  schedules,
}: GenerateSlotsPanelProps) => {
  const [day, setDay] = useState("");
  const [scheduleId, setScheduleId] = useState<null | number>(null);

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Generate slots</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Generate future appointment slots for selected dates.
      </p>
      {schedules?.length === 0 || !schedules ? (
        <p className="mt-1 text-sm text-muted-foreground">Please Add some schedule first.</p>
      ) : (
        <div className="mt-4 space-y-4">
          <h3 className="font-semibold">Select Any Schedule</h3>
          {schedules?.map((schedule) => (
            <Button
              key={schedule.id}
              variant={"outline"}
              onClick={() => {
                setScheduleId(schedule?.id);
                setDay(schedule.day);
                console.log(day, scheduleId);
              }}
              className="mr-2"
            >
              {schedule.day}
            </Button>
          ))}
          {scheduleId ? (
            <p>
              You have selected schedule for <span className="text-green-500"> {day}</span>{" "}
            </p>
          ) : (
            ""
          )}
          <label className="block space-y-1 text-sm">
            <span>Dates (comma separated)</span>
            <input
              value={dates}
              onChange={(event) => onDatesChange(event.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="2026-06-08,2026-06-09"
            />
          </label>
          <Button
            onClick={() => onGenerate(scheduleId as number)}
            className="w-full"
            disabled={isGenerating || !scheduleId}
          >
            <RefreshCw className="h-4 w-4" /> {isGenerating ? "Generating..." : "Generate slots"}
          </Button>
        </div>
      )}
    </section>
  );
};
