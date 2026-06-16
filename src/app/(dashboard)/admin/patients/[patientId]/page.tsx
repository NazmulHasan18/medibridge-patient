import PatientDetails from "@/components/Patients/PatientDetails";
import React from "react";

const PatientDetailsPage = async ({ params }: { params: Promise<{ patientId: string }> }) => {
  const patientId = (await params).patientId;
  console.log(patientId);
  return (
    <div>
      <PatientDetails patientId={patientId}></PatientDetails>
    </div>
  );
};

export default PatientDetailsPage;
