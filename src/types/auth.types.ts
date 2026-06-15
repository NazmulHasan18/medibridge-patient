import { Doctor } from "./doctor.types";
import { Patient } from "./patient.types";

export type RegisterUserPayload = {
  address: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: File;
};
export type LoginUserPayload = {
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  status: string;
  isVerified?: boolean;
  regType: string;
  referralCode: string;
  wallet?: {
    balance: number;
    totalEarned: number;
    totalSpent: number;
  };
  profileImage: string | null;
  publicId: string;
  patient?: Patient;
  doctor?: Doctor;
  createdAt: Date;
  updatedAt: Date;
};
