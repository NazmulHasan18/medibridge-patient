"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useDeleteDoctor, useDoctorById, useUpdateDoctor } from "@/hooks/doctor/useDoctorDetails";

export default function DoctorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, status } = useSession();

  const doctorId = params?.id as string;
  const { data, isLoading, error } = useDoctorById(doctorId, session?.token);
  const updateDoctorMutation = useUpdateDoctor(session?.token);
  const deleteDoctorMutation = useDeleteDoctor(session?.token);

  const doctor = data?.data;

  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    consultationFee: "",
    qualification: "",
    bio: "",
  });

  useEffect(() => {
    if (doctor) {
      setForm({
        specialization: doctor.specialization ?? "",
        experience: String(doctor.experience ?? 0),
        consultationFee: String(doctor.consultationFee ?? 0),
        qualification: doctor.qualification ?? "",
        bio: doctor.bio ?? "",
      });
    }
  }, [doctor]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!doctor || !session?.token) return;

    updateDoctorMutation.mutate({
      id: doctorId,
      payload: {
        specialization: form.specialization.trim(),
        experience: Number(form.experience) || doctor.experience,
        consultationFee: Number(form.consultationFee) || doctor.consultationFee,
        qualification: form.qualification.trim(),
        bio: form.bio.trim(),
      },
    });
  };

  const handleDelete = () => {
    if (!doctorId || !window.confirm("Delete this doctor profile?")) return;

    deleteDoctorMutation.mutate(doctorId, {
      onSuccess: () => router.push("/admin/doctors"),
    });
  };

  if (status === "loading" || isLoading) {
    return <div className="p-6 text-muted-foreground">Loading doctor profile...</div>;
  }

  if (error || !doctor) {
    return <div className="p-6 text-destructive">Failed to load doctor details.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-muted">
              {doctor.user.profileImage ? (
                <Image
                  src={doctor.user.profileImage}
                  alt={doctor.user.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                  {doctor.user.name.charAt(0)}
                </span>
              )}
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Doctor profile</p>
              <h1 className="text-3xl font-bold">{doctor.user.name}</h1>
              <p className="text-muted-foreground">{doctor.user.email}</p>
              <p className="text-sm text-muted-foreground">Phone: {doctor.user.phone}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteDoctorMutation.isPending}>
              {deleteDoctorMutation.isPending ? "Deleting..." : "Delete Doctor"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Doctor information</h2>
          <dl className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div>
              <dt className="font-medium text-foreground">Specialization</dt>
              <dd>{doctor.specialization}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Experience</dt>
              <dd>{doctor.experience} years</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Consultation fee</dt>
              <dd>৳{doctor.consultationFee}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Qualification</dt>
              <dd>{doctor.qualification}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-foreground">Bio</dt>
              <dd>{doctor.bio}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Edit doctor</h2>
          <form className="mt-4 space-y-4" onSubmit={handleUpdate}>
            <label className="block space-y-1 text-sm">
              <span className="font-medium">Specialization</span>
              <input
                value={form.specialization}
                onChange={(event) => handleChange("specialization", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="font-medium">Experience (years)</span>
              <input
                type="number"
                min="0"
                value={form.experience}
                onChange={(event) => handleChange("experience", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="font-medium">Consultation fee</span>
              <input
                type="number"
                min="0"
                value={form.consultationFee}
                onChange={(event) => handleChange("consultationFee", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="font-medium">Qualification</span>
              <input
                value={form.qualification}
                onChange={(event) => handleChange("qualification", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="font-medium">Bio</span>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(event) => handleChange("bio", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </label>

            <Button type="submit" className="w-full" disabled={updateDoctorMutation.isPending}>
              {updateDoctorMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
