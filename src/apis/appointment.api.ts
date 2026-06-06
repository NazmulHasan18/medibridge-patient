import axiosInstance from "@/lib/axios";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

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

export const createAppointment = async (payload: CreateAppointmentPayload, token: string) => {
  const { data } = await axiosInstance.post(`/appointment`, payload, {
    headers: authHeaders(token),
  });

  return data;
};
