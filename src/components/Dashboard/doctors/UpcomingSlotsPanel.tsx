import type { DoctorSlot } from "@/types/schedule.types";
import moment from "moment";

type UpcomingSlotsPanelProps = {
  slots: DoctorSlot[];
  isLoading?: boolean;
};

export const UpcomingSlotsPanel = ({ slots, isLoading = false }: UpcomingSlotsPanelProps) => {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Upcoming available slots</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Public slot listing for booking and availability checks.
      </p>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading slots...</p>
        ) : slots.length ? (
          slots.map((slot) => (
            <article key={slot.id} className="rounded-md border border-border p-4">
              <p className="font-medium">
                {moment(slot.startTime).format("YYYY-MM-DD")} · {moment(slot.startTime).format("HH:MM A")} -{" "}
                {moment(slot.endTime).format("HH:MM A")}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {slot.isBooked ? "Booked" : "Available"}
              </p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No slots found for the selected date.</p>
        )}
      </div>
    </section>
  );
};
