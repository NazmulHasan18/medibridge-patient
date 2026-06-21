import { Appointment } from "@/types/appointment.types";
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
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDoctorSlots } from "@/hooks/doctor/useDoctorSchedule";
import { useRescheduleAppointment } from "@/hooks/appointments/useAppointment";
import { useSession } from "next-auth/react";

// components/appointments/RescheduleDialog.tsx
interface Props {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
}

export function RescheduleDialog({ appointment, open, onClose }: Props) {
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  // Fetch available slots for the doctor on a new date
  const [targetDate, setTargetDate] = useState<string>("");

  const { data } = useSession();
  const token = data?.token || data?.user.token;

  const { data: slotRes, isLoading: slotsLoading } = useDoctorSlots({
    publicId: data?.user?.doctor?.publicId,
    date: targetDate,
    available: true,
    page: 1,
    limit: 50,
  });

  const slots = slotRes?.data.data;

  const reschedule = useRescheduleAppointment(token);

  // Reset on open
  useEffect(() => {
    if (open) {
      setSelectedSlotId(null);
      setTargetDate("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!appointment || !selectedSlotId || !targetDate) return;
    reschedule.mutate(
      {
        id: appointment.publicId,
        slotId: selectedSlotId,
        date: targetDate,
      },
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
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Patient: <span className="font-medium">{appointment?.patientName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>New Date</Label>
            <Input
              type="date"
              value={targetDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setTargetDate(e.target.value);
                setSelectedSlotId(null);
              }}
            />
          </div>

          {targetDate && (
            <div className="space-y-1.5">
              <Label>Available Slots</Label>
              {slotsLoading ? (
                <p className="text-sm text-muted-foreground">Loading slots...</p>
              ) : !slots?.length ? (
                <p className="text-sm text-muted-foreground">No available slots for this date.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots?.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={cn(
                        "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                        selectedSlotId === slot.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary hover:text-primary",
                      )}
                    >
                      {new Date(slot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={reschedule.isPending || !selectedSlotId}>
            {reschedule.isPending ? "Rescheduling..." : "Reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
