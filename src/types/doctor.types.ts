// types/doctor.ts
export type DoctorUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string | null;
  publicId: string;
};

export type Doctor = {
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
  user: DoctorUser;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type DoctorResponse = {
  success: boolean;
  message: string;
  data: {
    data: Doctor[];
    meta: PaginationMeta;
    specializations: string[];
  };
};
