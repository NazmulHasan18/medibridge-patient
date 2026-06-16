"use client";

import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UpdateSchedulePayload } from "@/types/schedule.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DAY_OF_WEEK_OPTIONS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const scheduleSchema = z.object({
  day: z.enum(DAY_OF_WEEK_OPTIONS),
  startTime: z.string(),
  endTime: z.string(),
  slotDuration: z.coerce.number().min(15),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

type ScheduleFormProps = {
  onSubmit: (values: ScheduleFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  data?: UpdateSchedulePayload;
};

export const ScheduleForm = ({ onSubmit, isSubmitting = false, data }: ScheduleFormProps) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      day: data?.day ?? "MONDAY",
      startTime: data?.startTime ?? "",
      endTime: data?.endTime ?? "",
      slotDuration: data?.slotDuration ?? 30,
    },
  });
  useEffect(() => {
    form.reset({
      day: data?.day ?? "MONDAY",
      startTime: data?.startTime ?? "",
      endTime: data?.endTime ?? "",
      slotDuration: data?.slotDuration ?? 30,
    });
  }, [data, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormSelect
          form={form}
          name="day"
          label="Day of week"
          placeholder="Select a day"
          items={DAY_OF_WEEK_OPTIONS.map((day) => ({ text: day, value: day }))}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput form={form} name="startTime" label="Start time" placeholder="" type="time" />

          <FormInput form={form} name="endTime" label="End time" placeholder="" type="time" />
        </div>

        <FormInput
          form={form}
          name="slotDuration"
          label="Slot duration (minutes)"
          placeholder="30"
          type="number"
        />

        {!data ? (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Plus className="h-4 w-4" />

            {isSubmitting ? "Creating..." : "Create schedule"}
          </Button>
        ) : (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Edit className="h-4 w-4" />

            {isSubmitting ? "Updating..." : "Update schedule"}
          </Button>
        )}
      </form>
    </Form>
  );
};
