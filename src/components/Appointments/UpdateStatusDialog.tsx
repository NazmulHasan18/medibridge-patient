import { Appointment, AppointmentStatus, STATUSES } from "@/types/appointment.types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useUpdateAppointmentStatus } from "@/hooks/appointments/useAppointment";
import { useSession } from "next-auth/react";

// components/appointments/UpdateStatusDialog.tsx

interface Props {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
}

export function UpdateStatusDialog({ appointment, open, onClose }: Props) {
  const [status, setStatus] = useState<AppointmentStatus | "">("");

  const { data } = useSession();

  const token = (data?.token || data?.user.token) as string;

  const updateStatus = useUpdateAppointmentStatus(token);

  // Reset on open
  useEffect(() => {
    if (appointment) setStatus(appointment.appointmentStatus as AppointmentStatus);
  }, [appointment]);

  const handleSubmit = () => {
    if (!appointment || !status) return;
    updateStatus.mutate(
      { id: appointment.publicId, status },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Appointment Status</DialogTitle>
          <DialogDescription>
            Patient: <span className="font-medium">{appointment?.patientName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as AppointmentStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateStatus.isPending || status === appointment?.appointmentStatus}
          >
            {updateStatus.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
