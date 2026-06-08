// app/doctor/appointments/[publicId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Video, CreditCard, ClipboardCheck, StickyNote, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAppointmentByPublicId } from "@/apis/appointment.api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

interface Props {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function AppointmentDetailPageAdmin({ params }: Props) {
  const session = await getServerSession(authOptions);

  const { publicId } = await params;

  const response = await getAppointmentByPublicId(session?.token as string, publicId);
  const appointment = response.data;
  if (!appointment) notFound();

  const { doctor, payment, meeting, doctorSlots } = appointment;

  const age = Math.floor(
    (Date.now() - new Date(appointment.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );

  const fmt = (d: string | Date) =>
    new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d));

  const fmtTime = (d: string | Date) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const statusVariant: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
    COMPLETED: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5 py-6">
      {/* Back */}
      <Link
        href="/doctor/appointments"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to appointments
      </Link>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">
            Appointment #{appointment.publicId.slice(0, 9).toUpperCase()}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Booked on {fmt(appointment.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              appointment.consultationType === "ONLINE"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700",
            )}
          >
            {appointment.consultationType}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              statusVariant[appointment.appointmentStatus],
            )}
          >
            {appointment.appointmentStatus}
          </span>
        </div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Consultation fee",
            value: `৳${doctor.consultationFee}`,
            sub: (
              <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                Paid
              </span>
            ),
          },
          {
            label: "Appointment date",
            value: fmt(appointment.appointmentDate),
            sub: doctorSlots ? `${fmtTime(doctorSlots.startTime)} – ${fmtTime(doctorSlots.endTime)}` : "—",
          },
          {
            label: "Patient age",
            value: `${age}y`,
            sub: `Born ${fmt(appointment.dateOfBirth)}`,
          },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-medium">{value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
      {/* Patient + Doctor */}
      <div className="grid grid-cols-2 gap-4">
        <DetailCard title="Patient" icon={<ClipboardCheck className="h-3.5 w-3.5" />}>
          <div className="mb-4 flex items-center gap-3 border-b pb-4">
            <Avatar initials="NH" variant="teal" />
            <div>
              <p className="font-medium">{appointment.patientName}</p>
              <p className="text-xs text-muted-foreground">
                {appointment.relation} · {appointment.gender}
              </p>
            </div>
          </div>
          <InfoRow label="Date of birth" value={fmt(appointment.dateOfBirth)} />
          <InfoRow label="Age" value={`${age} years`} />
          <InfoRow label="Gender" value={appointment.gender} />
          <InfoRow label="Relation" value={appointment.relation} />
        </DetailCard>

        <DetailCard title="Doctor" icon={<Video className="h-3.5 w-3.5" />}>
          <div className="mb-4 flex items-center gap-3 border-b pb-4">
            <Avatar initials="DP" variant="blue" />
            <div>
              <p className="font-medium">{doctor.user.name}</p>
              <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
            </div>
          </div>
          <InfoRow label="Qualification" value={doctor.qualification} />
          <InfoRow label="Experience" value={`${doctor.experience} years`} />
          <InfoRow label="Email" value={doctor.user.email} highlight />
        </DetailCard>
      </div>
      {/* Payment + Meeting */}
      <div className="grid grid-cols-2 gap-4">
        <DetailCard title="Payment" icon={<CreditCard className="h-3.5 w-3.5" />}>
          <InfoRow label="Amount" value={`৳${payment?.amount}`} />
          <InfoRow label="Gateway" value={payment?.gateway ?? "—"} />
          <InfoRow
            label="Status"
            value={
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                {payment?.paymentStatus}
              </span>
            }
          />
          <div className="mt-3 border-t pt-3">
            <p className="text-xs text-muted-foreground">Transaction ID</p>
            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{payment?.transactionId}</p>
          </div>
        </DetailCard>

        <DetailCard title="Meeting" icon={<Video className="h-3.5 w-3.5" />}>
          {meeting ? (
            <>
              <InfoRow
                label="Meeting time"
                value={`${fmt(meeting.meetingTime)} · ${fmtTime(meeting.meetingTime)}`}
              />
              <InfoRow
                label="Event ID"
                value={<span className="font-mono text-xs">{meeting.eventId}</span>}
              />
              <div className="mt-3 border-t pt-3">
                <p className="mb-2 text-xs text-muted-foreground">Meeting link</p>
                <Link
                  href={meeting.meetingLink}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-blue-600 hover:bg-muted"
                >
                  {meeting.meetingLink.replace("https://", "")}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No meeting scheduled.</p>
          )}
        </DetailCard>
      </div>
      {/* Notes */}
      {appointment.notes && (
        <DetailCard title="Notes" icon={<StickyNote className="h-3.5 w-3.5" />}>
          <p className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">{appointment.notes}</p>
        </DetailCard>
      )}
      {/* Actions
      <DetailCard title="Actions" icon={<ClipboardCheck className="h-3.5 w-3.5" />}>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <CalendarClock className="mr-1.5 h-4 w-4" /> Reschedule
          </Button>
          <Button variant="outline" size="sm">
            <ClipboardCheck className="mr-1.5 h-4 w-4" /> Update status
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            disabled={appointment.appointmentStatus === "CANCELLED"}
          >
            <CalendarX className="mr-1.5 h-4 w-4" /> Cancel appointment
          </Button>
        </div>
      </DetailCard> */}
    </div>
  );
}

// — small helpers (can live in same file or separate components) —

function DetailCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="mb-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </p>
      {children}
    </div>
  );
}

function Avatar({ initials, variant }: { initials: string; variant: "blue" | "teal" }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium",
        variant === "blue" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700",
      )}
    >
      {initials}
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between border-b py-2 last:border-0 last:pb-0 first:pt-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-right text-sm font-medium", highlight && "text-blue-600")}>{value}</span>
    </div>
  );
}
