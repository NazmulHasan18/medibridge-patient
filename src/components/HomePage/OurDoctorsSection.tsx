import { Doctor } from "@/types/doctor.types";
import { OurDoctorsClient } from "./OurDoctorsClient";

interface DoctorsResponse {
  data: {
    data: Doctor[];
    specializations: string[];
  };
}

async function getInitialDoctors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctors?page=1&limit=6`,
    { next: { revalidate: 60 } }, // ISR: re-fetched at most once/min, still SSR on first load
  );

  if (!res.ok) {
    // Fail soft — client can still retry via react-query
    return { doctors: [] as Doctor[], specializations: [] as string[] };
  }

  const json: DoctorsResponse = await res.json();
  return {
    doctors: json.data?.data ?? [],
    specializations: json.data?.specializations ?? [],
  };
}

// This stays a Server Component — no "use client" here.
// The doctor list for the default "All" tab is rendered on the server,
// so it's in the initial HTML for SEO/perf; tab switches hydrate client-side.
export default async function OurDoctorsSection() {
  const { doctors, specializations } = await getInitialDoctors();

  return <OurDoctorsClient initialDoctors={doctors} specializations={specializations} />;
}
