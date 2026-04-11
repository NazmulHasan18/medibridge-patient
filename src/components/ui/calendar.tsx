"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 rounded-2xl border border-gray-200 shadow-md bg-white", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        // caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label:
          "text-base font-semibold text-gray-900 flex justify-center w-full pt-1 relative items-center mb-2",
        nav: "flex items-center gap-2 absolute left-0 right-0 justify-between px-2 top-5 z-50",
        nav_button: cn(
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          "h-8 w-8 bg-white p-0 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition",
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7",
        row: "grid grid-cols-7 mt-1",
        head_cell: "text-gray-400 text-center text-xs font-medium pb-2 uppercase tracking-wide",
        cell: "text-center text-sm p-0 relative flex items-center justify-center",
        day: cn(
          "hover:bg-accent hover:text-accent-foreground",
          "h-9 w-9 p-0 font-normal rounded-full transition-colors duration-150",
          "hover:bg-violet-50 hover:text-violet-700",
          "focus:bg-violet-100 focus:outline-none",
        ),
        day_selected: "bg-violet-600 text-white hover:bg-violet-700 hover:text-white focus:bg-violet-700",
        day_today: "border border-violet-500 text-violet-600 font-semibold",
        day_outside: "text-gray-300 opacity-50",
        day_disabled: "text-gray-300 opacity-40 cursor-not-allowed",
        day_range_start: "rdp-day_range_start",
        day_range_end: "rdp-day_range_end",
        day_range_middle: "bg-violet-100 text-violet-800",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("h-4 w-4 text-gray-600", chevronClass)} {...rest} />
          ) : (
            <ChevronRight className={cn("h-4 w-4 text-gray-600", chevronClass)} {...rest} />
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
