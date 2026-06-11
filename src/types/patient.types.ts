import { Appointment } from "./appointment.types";
import { PaginationMeta } from "./doctor.types";

export interface PatientUser {
  id: number;
  publicId: string;
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
  profileImage: string | null;
}

export interface Patient {
  id: number;
  publicId: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: PatientUser;
  appointments?: Appointment[];
}
export type PatientResponse = {
  success: boolean;
  message: string;
  data: Patient[];
  meta?: PaginationMeta;
};
export type PatientIdAppointmentResponse = {
  success: boolean;
  message: string;
  data: Patient;
  meta?: PaginationMeta;
};
