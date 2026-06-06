"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "../Form/FormSelect";
import { useDoctors } from "@/hooks/doctor/useDoctor";
import { useDoctorSlots } from "@/hooks/doctor/useDoctorSchedule";
import { useCreateAppointment } from "@/hooks/appointments/useAppointment";

const consultationTypeOptions = [
  { text: "Video Consultation", value: "ONLINE" },
  { text: "In-person Consultation", value: "OFFLINE" },
];

const genderOptions = [
  { text: "Male", value: "MALE" },
  { text: "Female", value: "FEMALE" },
  { text: "Other", value: "OTHER" },
];

const FormSchema = z.object({
  doctorId: z.number().min(1, { message: "Doctor is required." }),
  slotId: z.number().default(0),
  patientName: z.string().min(2, { message: "Patient name is required." }),
  relation: z.string().min(1, { message: "Relation is required." }),
  gender: z.string(),
  dateOfBirth: z.string(),
  consultationType: z.enum(["ONLINE", "OFFLINE"], {
    required_error: "Consultation type is required.",
  }),
  appointmentDate: z.string().min(1, { message: "Appointment date is required." }),
  notes: z.string().max(500, { message: "Notes cannot exceed 500 characters." }).optional(),
  category: z.string().min(1, { message: "Category is required." }),
  doctor: z.string().min(1, { message: "Doctor is required." }),
});

const AppointmentForm = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const doctorIdFromUrl = searchParams.get("doctorId") ?? "";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doctorId: 0,
      slotId: 0,
      patientName: session?.user?.name ?? "",
      relation: "Self",
      gender: "",
      dateOfBirth: "",
      consultationType: "ONLINE",
      appointmentDate: "",
      notes: "",
      category: "",
      doctor: "",
    },
  });

  const activeCategory = form.watch("category");
  const selectedDoctorPublicId = form.watch("doctor");
  const selectedAppointmentDate = form.watch("appointmentDate");

  const allDoctorsQuery = useDoctors({ page: 1, limit: 100 });
  const filteredDoctorsQuery = useDoctors({
    page: 1,
    limit: 100,
    specialization: activeCategory || undefined,
  });

  const doctors = useMemo(
    () => (activeCategory ? filteredDoctorsQuery.data?.data?.data : allDoctorsQuery.data?.data?.data) ?? [],
    [activeCategory, allDoctorsQuery.data?.data?.data, filteredDoctorsQuery.data?.data?.data],
  );
  const categories =
    allDoctorsQuery.data?.data?.specializations?.map((item) => ({ text: item, value: item })) || [];

  const doctorOptions = doctors.map((doc) => ({
    text: `${doc.user.name} • ${doc.specialization}`,
    value: doc.publicId,
  }));

  const selectedDoctor = useMemo(
    () => doctors.find((doc) => doc.publicId === selectedDoctorPublicId) ?? null,
    [doctors, selectedDoctorPublicId],
  );

  const {
    data: slotsData,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
  } = useDoctorSlots(selectedDoctor?.user?.publicId, selectedAppointmentDate || undefined, true);

  const availableSlots = slotsData?.data ?? [];
  const slotOptions = availableSlots
    .filter((slot) => !slot.isBooked)
    .map((slot) => ({
      text: `${moment(slot.startTime).format("hh:mm A")} - ${moment(slot.endTime).format("hh:mm A")}`,
      value: slot.id,
    }));

  useEffect(() => {
    if (session?.user?.name) {
      form.setValue("patientName", session.user.name, { shouldValidate: true });
    }
  }, [form, session]);

  useEffect(() => {
    if (!doctorIdFromUrl || !allDoctorsQuery.data?.data?.data.length) return;

    const prefilledDoctor = allDoctorsQuery.data.data.data.find(
      (doctor) => doctor.publicId === doctorIdFromUrl,
    );

    if (prefilledDoctor) {
      form.setValue("doctorId", prefilledDoctor.id, { shouldValidate: true });
      form.setValue("doctor", prefilledDoctor.publicId, { shouldValidate: true });
      form.setValue("category", prefilledDoctor.specialization, { shouldValidate: true });
    }
  }, [allDoctorsQuery.data, doctorIdFromUrl, form]);

  useEffect(() => {
    if (selectedDoctor) {
      form.setValue("doctorId", selectedDoctor.id, { shouldValidate: true });
      form.setValue("category", selectedDoctor.specialization, { shouldValidate: true });
    }
  }, [form, selectedDoctor]);

  useEffect(() => {
    form.setValue("slotId", 0, { shouldValidate: true });
  }, [form, selectedDoctorPublicId, selectedAppointmentDate]);

  useEffect(() => {
    if (allDoctorsQuery.isError) {
      toast.error(
        allDoctorsQuery.error instanceof Error ? allDoctorsQuery.error.message : "Failed to load doctors",
      );
    }
  }, [allDoctorsQuery.error, allDoctorsQuery.isError]);

  useEffect(() => {
    if (isSlotsError) {
      toast.error("Failed to load available doctor slots.");
    }
  }, [isSlotsError]);

  const authToken = session?.user?.token ?? session?.token;

  const createAppointment = useCreateAppointment();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!authToken) {
      toast.error("User token not found");
      return;
    }

    const payload = {
      doctorId: selectedDoctor?.id ?? 0,
      slotId: Number(data.slotId ?? 0),
      patientName: data.patientName,
      relation: data.relation,
      gender: data.gender,
      dateOfBirth: new Date(data.dateOfBirth),
      consultationType: data.consultationType,
      appointmentDate: new Date(data.appointmentDate),
      notes: data.notes || undefined,
    };
    createAppointment.mutate({ payload, token: authToken });
  }

  const isLoadingDoctors = allDoctorsQuery.isLoading || filteredDoctorsQuery.isLoading;
  const isFetchingDoctors = allDoctorsQuery.isFetching || filteredDoctorsQuery.isFetching;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid gap-4 md:grid-cols-2 ${isFetchingDoctors ? "opacity-60" : "opacity-100"}`}
      >
        <FormInput
          name="patientName"
          form={form}
          label="Patient Name"
          placeholder="Enter patient name"
          className="p-6"
        />
        <FormInput
          name="relation"
          form={form}
          label="Relation"
          placeholder="Self / Spouse / Son"
          className="p-6"
        />
        <FormSelect
          form={form}
          items={genderOptions}
          label="Gender"
          name="gender"
          placeholder="Select gender"
          className="p-6"
        />
        <FormInput
          name="dateOfBirth"
          form={form}
          label="Date of Birth"
          type="date"
          placeholder="Select date of birth"
          className="p-6"
        />
        <FormSelect
          form={form}
          items={consultationTypeOptions}
          label="Consultation Type"
          name="consultationType"
          placeholder="Select consultation type"
          className="p-6"
        />
        <FormInput
          name="appointmentDate"
          form={form}
          label="Appointment Date"
          type="date"
          placeholder="Select appointment date"
          className="p-6"
        />
        <FormSelect
          form={form}
          items={categories}
          label="Select Category"
          name="category"
          placeholder="Select your category"
          className="p-6"
        />
        <FormSelect
          form={form}
          items={doctorOptions}
          label="Select Doctor"
          name="doctor"
          placeholder="Select your doctor"
          className="p-6"
        />

        <FormSelect
          form={form}
          items={slotOptions}
          label="Available Time Slot"
          name="slotId"
          placeholder={
            selectedDoctor && selectedAppointmentDate
              ? slotOptions.length
                ? "Select an available slot"
                : "No available slots for this date"
              : "Choose doctor and date first"
          }
          className="p-6"
        />

        <div className="md:col-span-2 rounded-2xl border border-dashed border-blue-400 bg-blue-50/60 p-4 text-sm text-foreground dark:bg-blue-950/30">
          <p className="font-semibold">Selected doctor details</p>
          {selectedDoctor ? (
            <>
              <p className="mt-1">Doctor: {selectedDoctor.user.name}</p>
              <p>Specialization: {selectedDoctor.specialization}</p>
              <p>Consultation fee: ৳{selectedDoctor.consultationFee}</p>
              <p className="text-muted-foreground">
                Available slots are loaded for the selected appointment date.
              </p>
            </>
          ) : (
            <p className="mt-1 text-muted-foreground">Choose a doctor to view the consultation fee.</p>
          )}
        </div>

        <FormItem className="md:col-span-2">
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <textarea
              {...form.register("notes")}
              rows={4}
              className="w-full rounded-2xl border border-blue-400 bg-background p-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-blue-400"
              placeholder="Add any notes for the appointment"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button
          type="submit"
          className="mx-auto w-fit md:col-span-2"
          disabled={isLoadingDoctors || isSlotsLoading}
        >
          {isLoadingDoctors || isSlotsLoading ? "Loading..." : "Submit Appointment"}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
