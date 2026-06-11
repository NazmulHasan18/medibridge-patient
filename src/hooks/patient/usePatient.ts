import { fetcher } from "@/lib/fetcher";
import { PatientIdAppointmentResponse, PatientResponse } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPatient = (token?: string) => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: () =>
      fetcher<PatientResponse>(`/patients/my`, { headers: { Authorization: `Bearer ${token}` } }),
  });
};
export const useGetPatientDetails = (patientId: string, token?: string) => {
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: () =>
      fetcher<PatientIdAppointmentResponse>(`/patients/appointment/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
  });
};
