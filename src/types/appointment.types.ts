export type CreateAppointmentPayload = {
  doctorId: number;
  slotId: number;
  patientName: string;
  relation: string;
  gender: string;
  dateOfBirth: Date;
  consultationType: "ONLINE" | "OFFLINE";
  appointmentDate: Date;
  notes?: string | undefined;
};
export interface GetAppointmentsResponse {
  success: boolean;
  message: string;
  data: Appointment[];
  meta: Meta;
}

export interface Appointment {
  id: number;
  publicId: string;
  doctorId: number;
  patientId: number;
  userId: number;
  patientName: string;
  relation: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string;
  consultationType: "ONLINE" | "OFFLINE";
  appointmentStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  appointmentDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;

  doctor: Doctor;
  payment: Payment | null;
  meeting: Meeting | null;
  doctorSlots: DoctorSlot | null;
}

export interface Doctor {
  id: number;
  publicId: string;
  userId: number;
  specialization: string;
  experience: number;
  consultationFee: number;
  qualification: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  user: {
    name: string;
    email: string;
  };
}

export interface Payment {
  id: number;
  publicId: string;
  appointmentId: number;
  amount: number;
  gateway: string;
  transactionId: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
}

export interface Meeting {
  id: number;
  appointmentId: number;
  meetingLink: string;
  meetingTime: string;
  eventId: string | null;
  createdAt: string;
}

export interface DoctorSlot {
  id: number;
  doctorId: number;
  scheduleId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isCancelled: boolean;
  createdAt: string;
  appointmentId: number | null;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type MyAppointmentParams = {
  status?: string;
  page?: number;
  limit?: number;
};
