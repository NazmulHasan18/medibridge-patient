export const DAY_OF_WEEK_OPTIONS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export type DayOfWeek = (typeof DAY_OF_WEEK_OPTIONS)[number];

export type DoctorSchedule = {
  id: number;
  publicId: string;
  doctorId: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type DoctorSlot = {
  id: number;
  publicId: string;
  doctorId: number;
  scheduleId: number;
  slotDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status?: string;
  schedule?: DoctorSchedule;
};

export type ScheduleListResponse = {
  success: boolean;
  message: string;
  data: DoctorSchedule[];
};

export type ScheduleDetailResponse = {
  success: boolean;
  message: string;
  data: DoctorSchedule;
};

export type SlotListResponse = {
  success: boolean;
  message: string;
  data: DoctorSlot[];
};

export type GenerateSlotsResponse = {
  success: boolean;
  message: string;
  data: {
    created: number;
    skipped: string[];
    timingChanged?: boolean;
  };
};

export type CreateSchedulePayload = {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive?: boolean;
};

export type UpdateSchedulePayload = CreateSchedulePayload;
