"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { CreateSchedulePanel } from "@/components/Dashboard/doctors/CreateSchedulePanel";
import { DoctorScheduleHeader } from "@/components/Dashboard/doctors/DoctorScheduleHeader";
import { GenerateSlotsPanel } from "@/components/Dashboard/doctors/GenerateSlotsPanel";
import { ScheduleListPanel } from "@/components/Dashboard/doctors/ScheduleListPanel";
import { UpcomingSlotsPanel } from "@/components/Dashboard/doctors/UpcomingSlotsPanel";
import {
  useCreateDoctorSchedule,
  useDoctorSchedules,
  useDoctorSlots,
  useGenerateDoctorSlots,
  useUpdateDoctorSchedule,
} from "@/hooks/doctor/useDoctorSchedule";
import type { DayOfWeek, DoctorSchedule } from "@/types/schedule.types";
import { toast } from "react-toastify";
import { UpdateSchedulePanel } from "@/components/Dashboard/doctors/UpdateSchedulePanel";

export default function DoctorSchedulePage() {
  const [edit, setEdit] = useState(false);
  const [updateData, setUpdateData] = useState<DoctorSchedule>();
  const { data: session } = useSession();
  const publicId = session?.user?.publicId;
  const authToken = session?.token ?? session?.user?.token;

  const [dates, setDates] = useState("2026-06-08,2026-06-09");

  const { data: schedulesData, isLoading: schedulesLoading } = useDoctorSchedules(publicId);
  const { data: slotsData, isLoading: slotsLoading } = useDoctorSlots(publicId, "2026-06-08", true);
  const createSchedule = useCreateDoctorSchedule(authToken);
  const updateSchedule = useUpdateDoctorSchedule(authToken);
  const generateSlots = useGenerateDoctorSlots(authToken);

  const schedules = useMemo(() => schedulesData?.data ?? [], [schedulesData?.data]);
  const slots = useMemo(() => slotsData?.data ?? [], [slotsData?.data]);

  const scheduleSummary = useMemo(() => {
    if (!schedules.length) return "No schedules created yet.";
    return `${schedules.length} weekly schedule${schedules.length > 1 ? "s" : ""} available.`;
  }, [schedules.length]);

  const handleCreateSchedule = async (values: {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    slotDuration: number;
  }) => {
    if (!publicId || !authToken) {
      toast.error("Please login again we are getting some issue.");
      return;
    }

    createSchedule.mutate({
      publicId,
      payload: {
        day: values.day,
        startTime: values.startTime,
        endTime: values.endTime,
        slotDuration: values.slotDuration,
        isActive: true,
      },
    });
  };
  const handleUpdateSchedule = async (values: {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    slotDuration: number;
  }) => {
    console.log("Schedule submit values:", values);
    console.log(publicId, session);
    if (!publicId || !updateData?.id || !authToken) {
      toast.error("Please login again we are getting some issue.");
      return;
    }

    updateSchedule.mutate({
      publicId,
      scheduleId: updateData?.id,
      payload: {
        day: values.day,
        startTime: values.startTime,
        endTime: values.endTime,
        slotDuration: values.slotDuration,
        isActive: true,
      },
    });

    setEdit(false);
    setUpdateData(undefined);
  };

  const handleGenerateSlots = async () => {
    if (!publicId || !authToken || !schedules[0]) return;

    const selectedDates = dates
      .split(",")
      .map((date) => date.trim())
      .filter(Boolean);

    generateSlots.mutate({ publicId, scheduleId: String(schedules[0].id), dates: selectedDates });
  };

  return (
    <div className="space-y-6 p-6">
      <DoctorScheduleHeader />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {edit ? (
          <UpdateSchedulePanel
            onSubmit={handleUpdateSchedule}
            isSubmitting={createSchedule.isPending}
            data={updateData}
          />
        ) : (
          <CreateSchedulePanel onSubmit={handleCreateSchedule} isSubmitting={createSchedule.isPending} />
        )}
        <GenerateSlotsPanel
          dates={dates}
          onDatesChange={setDates}
          onGenerate={handleGenerateSlots}
          isGenerating={generateSlots.isPending}
        />
      </div>

      <ScheduleListPanel
        schedules={schedules}
        isLoading={schedulesLoading}
        summary={scheduleSummary}
        setEdit={setEdit}
        setUpdateData={setUpdateData}
      />
      <UpcomingSlotsPanel slots={slots} isLoading={slotsLoading} />
    </div>
  );
}
