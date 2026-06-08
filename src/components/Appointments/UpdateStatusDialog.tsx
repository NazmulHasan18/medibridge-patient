import axiosInstance from "@/lib/axios";
import { Appointment } from "@/types/appointment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

// components/appointments/UpdateStatusDialog.tsx
const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;
type AppointmentStatus = (typeof STATUSES)[number];

interface Props {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
}

export function UpdateStatusDialog({ appointment, open, onClose }: Props) {
  const [status, setStatus] = useState<AppointmentStatus | "">("");

  const queryClient = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: (data: { id: string; status: AppointmentStatus }) =>
      axiosInstance.patch(`/appointments/${data.id}/status`, {
        appointmentStatus: data.status,
      }),
    onSuccess: () => {
      toast.success("Appointment status updated");
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      onClose();
    },
    onError: () => toast.error("Failed to update status"),
  });

  // Reset on open
  useEffect(() => {
    if (appointment) setStatus(appointment.appointmentStatus as AppointmentStatus);
  }, [appointment]);

  const handleSubmit = () => {
    if (!appointment || !status) return;
    updateStatus.mutate({ id: appointment.publicId, status });
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
