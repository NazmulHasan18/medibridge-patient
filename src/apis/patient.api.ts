import { fetcher } from "@/lib/fetcher";
import { FetchPatientsQuery, PatientResponse } from "@/types/patient.types";

export const getMyPatient = (token?: string) =>
  fetcher<PatientResponse>(`/patients/my`, { headers: { Authorization: `Bearer ${token}` } });

export const getAllPatient = (params: FetchPatientsQuery, token?: string) => {
  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  ).toString();
  return fetcher<PatientResponse>(`/patients/all?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
