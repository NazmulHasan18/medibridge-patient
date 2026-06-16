import { getAllPatient, getMyPatient } from "@/apis/patient.api";
import { fetcher } from "@/lib/fetcher";
import {
  FetchPatientsQuery,
  PatientIdAllAppointmentResponse,
  PatientIdAppointmentResponse,
} from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPatient = (token?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: () => getMyPatient(token),
    enabled,
  });
};
export const useGetAllPatient = (params: FetchPatientsQuery, token?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["patient", params.page, params.limit, params.searchTerm],
    queryFn: () => getAllPatient(params, token),
    enabled,
  });
};
export const useGetPatientDetails = (patientId: string, token?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: () =>
      fetcher<PatientIdAppointmentResponse>(`/patients/appointment/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled,
  });
};
export const useGetPatientAllAppointments = (
  patientId: string,
  params: { page: number; limit: number },
  token?: string,
  enabled?: boolean,
) => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: () =>
      fetcher<PatientIdAllAppointmentResponse>(`/patients/all-appointment/${patientId}?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    enabled,
  });
};
