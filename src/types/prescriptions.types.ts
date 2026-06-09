// ─── Medicine ─────────────────────────────────────────────────────────────────

import { Appointment, Doctor, Patient } from "./appointment.types";

export interface PrescriptionMedicine {
  id?: number;
  medicineName: string;
  dosage: Dosage;
  frequency: Frequency;
  duration: Duration;
  instruction?: string;
}

// ─── Nested relations returned from API ───────────────────────────────────────

export interface DoctorInfo {
  id: number;
  user: {
    name: string;
    email: string;
    profilePhoto?: string;
  };
  specialization?: {
    name: string;
  };
  // Add more fields if your Doctor model has them (bmdc, phone, etc.)
  bmdc?: string;
  phone?: string;
  designation?: string;
  currentWorkingHospital?: string;
}

export interface PatientInfo {
  id: number;
  user: {
    name: string;
    email: string;
    profilePhoto?: string;
  };
  dateOfBirth?: string;
  bloodGroup?: string;
  gender?: string;
}

export interface AppointmentInfo {
  id?: number;
  appointmentDate?: string;
  consultationType?: string; // "ONLINE" | "IN_PERSON"
}

// ─── Full Prescription ────────────────────────────────────────────────────────

export interface Prescription {
  id: number;
  publicId: string;
  appointmentId: number;
  doctorId: number;
  patientId: number;
  diagnosis?: string;
  advice?: string;
  followUpDate?: string;
  content?: Record<string, unknown>; // Tiptap JSON
  createdAt: string;
  updatedAt: string;
  medicines: PrescriptionMedicine[];
  doctor: Doctor;
  patient: Patient;
  appointment: Appointment;
}

// ─── Form / Request types ─────────────────────────────────────────────────────

export interface CreatePrescriptionPayload {
  appointmentId: number;
  patientId: number;
  diagnosis?: string;
  advice?: string;
  followUpDate?: string;
  content?: Record<string, unknown>;
  medicines: PrescriptionMedicine[];
}

export interface UpdatePrescriptionPayload {
  diagnosis?: string;
  advice?: string;
  followUpDate?: string;
  content?: Record<string, unknown>;
  medicines?: PrescriptionMedicine[];
}

// ─── Frequency shortcuts (used in the smart medicine input) ───────────────────

export const FREQUENCY_PRESETS = [
  { label: "Once daily", value: "OD" },
  { label: "Twice daily", value: "BD" },
  { label: "Three times daily", value: "TDS" },
  { label: "Four times daily", value: "QDS" },
  { label: "Every morning", value: "Morning" },
  { label: "Every night", value: "Night" },
  { label: "Before meal", value: "AC" },
  { label: "After meal", value: "PC" },
  { label: "SOS / As needed", value: "SOS" },
] as const;
export type Frequency = (typeof FREQUENCY_PRESETS)[number]["value"];

export const DURATION_PRESETS = [
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "14 days",
  "1 month",
  "2 months",
  "3 months",
  "Continuous",
] as const;

export type Duration = (typeof DURATION_PRESETS)[number];

export const DOSAGE_PRESETS = [
  "1 tablet",
  "2 tablets",
  "½ tablet",
  "5ml",
  "10ml",
  "1 capsule",
  "2 capsules",
  "1 sachet",
  "Apply locally",
] as const;

export type Dosage = (typeof DOSAGE_PRESETS)[number];
