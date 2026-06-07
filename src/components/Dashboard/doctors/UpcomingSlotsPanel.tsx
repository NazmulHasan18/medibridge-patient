import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useCancelDoctorSlot, useDeleteFutureUnbookedSlots } from "@/hooks/doctor/useDoctorSchedule";
import { PaginationMeta } from "@/types/doctor.types";
import type { DoctorSlot } from "@/types/schedule.types";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarX, Loader2, Trash2 } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

type UpcomingSlotsPanelProps = {
  slots: DoctorSlot[];
  isLoading?: boolean;
  setDate: Dispatch<SetStateAction<string | undefined>>;
  publicId: string;
  meta?: PaginationMeta;
  setPage: Dispatch<SetStateAction<number>>;
};

export const UpcomingSlotsPanel = ({
  slots,
  isLoading = false,
  setDate,
  publicId,
  meta,
  setPage,
}: UpcomingSlotsPanelProps) => {
  const { data: session } = useSession();

  const token = session?.token || session?.user.token;

  const cancelSlotMutation = useCancelDoctorSlot(token);

  const deleteSlotsMutation = useDeleteFutureUnbookedSlots(token);

  const slotColumns: ColumnDef<DoctorSlot>[] = [
    {
      id: "sl",
      header: "SL",
      cell: ({ row }) => row.index + 1,
    },
    {
      id: "time",
      header: "Time",
      cell: ({ row }) => {
        const slot = row.original;

        return (
          <span>
            {moment(new Date(slot.startTime)).format("hh:mm a")} -{" "}
            {moment(new Date(slot.endTime)).format("hh:mm a")}
          </span>
        );
      },
    },
    {
      accessorFn: (row) => row?.schedule?.day,
      header: "Day",
    },
    {
      accessorFn: (row) => row?.schedule?.slotDuration,
      header: "Duration",
      cell: ({ getValue }) => `${getValue<number>()} min`,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const { isBooked, isCancelled } = row.original;

        if (isCancelled) {
          return <span className="text-red-500 font-medium">Cancelled</span>;
        }

        if (isBooked) {
          return <span className="text-yellow-500 font-medium">Booked</span>;
        }

        return <span className="text-green-500 font-medium">Available</span>;
      },
    },
  ];

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Upcoming available slots</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Public slot listing for booking and availability checks.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start md:items-end gap-2">
          <div className="flex justify-center items-center gap-1">
            <span className="text-sm text-nowrap">Select Date :</span>
            <Input
              aria-label="select-date"
              className=""
              name="date"
              type="date"
              placeholder="Select Date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Input>
          </div>
          <Button
            variant="destructive"
            size={"sm"}
            disabled={deleteSlotsMutation.isPending}
            onClick={() => {
              const confirmed = window.confirm("Are you sure you want to delete all future unbooked slots?");

              if (!confirmed) return;
              deleteSlotsMutation.mutate({
                publicId,
              });
            }}
          >
            {deleteSlotsMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Future Slots
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading slots...</p>
        ) : slots.length ? (
          <DataTable
            columns={slotColumns}
            data={slots}
            isLoading={isLoading}
            emptyMessage="No Slots found."
            actions={(slot) => (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={cancelSlotMutation.isPending && cancelSlotMutation.variables?.slotId === slot.id}
                  onClick={() =>
                    cancelSlotMutation.mutate({
                      publicId,
                      slotId: slot.id,
                    })
                  }
                >
                  {cancelSlotMutation.isPending && cancelSlotMutation.variables?.slotId === slot.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CalendarX className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
            pagination={
              meta
                ? {
                    page: meta.page,
                    pageSize: meta.limit,
                    totalItems: meta.total,
                    totalPages: meta.totalPages,
                    onPageChange: setPage,
                  }
                : undefined
            }
          />
        ) : (
          <p className="text-sm text-muted-foreground">No slots found for the selected date.</p>
        )}
      </div>
    </section>
  );
};
