"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DoctorSchedule } from "@/types/schedule.types";
import { ChevronLeft, ChevronRight, RefreshCw, X } from "lucide-react";
import { useState } from "react";

type GenerateSlotsPanelProps = {
  dates: string;
  onDatesChange: (value: string) => void;
  onGenerate: (scheduleId: number) => void;
  isGenerating?: boolean;
  schedules?: DoctorSchedule[];
};

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const GenerateSlotsPanel = ({
  dates,
  onDatesChange,
  onGenerate,
  isGenerating = false,
  schedules,
}: GenerateSlotsPanelProps) => {
  const [day, setDay] = useState("");
  const [scheduleId, setScheduleId] = useState<null | number>(null);

  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  // selectedDates is a Set stored as sorted comma-separated string via `dates` prop
  const selectedSet = new Set(dates ? dates.split(",").filter(Boolean) : []);

  const toggleDate = (dateStr: string) => {
    const next = new Set(selectedSet);
    if (next.has(dateStr)) {
      next.delete(dateStr);
    } else {
      next.add(dateStr);
    }
    onDatesChange([...next].sort().join(","));
  };

  const removeDate = (dateStr: string) => {
    const next = new Set(selectedSet);
    next.delete(dateStr);
    onDatesChange([...next].sort().join(","));
  };

  const changeMonth = (dir: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const { firstDay, daysInMonth } = getMonthMatrix(year, month);
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const sortedSelected = [...selectedSet].sort();

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Generate slots</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Generate future appointment slots for selected dates.
      </p>

      {!schedules?.length ? (
        <p className="mt-1 text-sm text-muted-foreground">Please add some schedule first.</p>
      ) : (
        <div className="mt-4 space-y-4">
          <h3 className="font-semibold">Select any schedule</h3>
          <div className="flex flex-wrap gap-2">
            {schedules.map((schedule) => (
              <Button
                key={schedule.id}
                variant={scheduleId === schedule.id ? "default" : "outline"}
                onClick={() => {
                  setScheduleId(schedule.id);
                  setDay(schedule.day);
                }}
                className="mr-2"
              >
                {schedule.day}
              </Button>
            ))}
          </div>

          {scheduleId && (
            <p className="text-sm">
              Schedule selected for <span className="text-green-500">{day}</span>
            </p>
          )}

          {/* Calendar */}
          {scheduleId && (
            <div className="rounded-md border border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 rounded hover:bg-accent"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">
                  {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 rounded hover:bg-accent"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 p-2 gap-y-1">
                {DAY_NAMES.map((n) => (
                  <div key={n} className="text-center text-xs text-muted-foreground py-1 font-medium">
                    {n}
                  </div>
                ))}

                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = i + 1;
                  const dateStr = toDateStr(year, month, d);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const isPast = new Date(year, month, d) < today;
                  new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isSelected = selectedSet.has(dateStr);
                  const isToday = dateStr === todayStr;

                  return (
                    <div key={d} className="flex justify-center">
                      <button
                        disabled={isPast}
                        onClick={() => toggleDate(dateStr)}
                        className={`w-8 h-8 rounded-full text-sm transition-colors
                          ${isSelected ? "bg-primary text-primary-foreground" : ""}
                          ${isToday && !isSelected ? "font-semibold text-blue-500" : ""}
                          ${!isSelected && !isPast ? "hover:bg-accent" : ""}
                          ${isPast ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        {d}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected date chips */}
          {sortedSelected.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sortedSelected.map((dateStr) => (
                <span
                  key={dateStr}
                  className="flex items-center gap-1 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 text-xs rounded-full px-3 py-1"
                >
                  {dateStr}
                  <button
                    onClick={() => removeDate(dateStr)}
                    className="ml-1 hover:text-blue-800 dark:hover:text-blue-100"
                    aria-label={`Remove ${dateStr}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <Button
            onClick={() => onGenerate(scheduleId as number)}
            className="w-full"
            disabled={isGenerating || !scheduleId || sortedSelected.length === 0}
          >
            <RefreshCw className={cn("h-4 w-4", isGenerating && "animate-spin")} />
            {isGenerating ? "Generating..." : "Generate slots"}
          </Button>
        </div>
      )}
    </section>
  );
};
