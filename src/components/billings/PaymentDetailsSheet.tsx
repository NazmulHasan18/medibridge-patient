"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, Hash, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useGetPaymentDetail } from "@/hooks/payments/usePayment";
import { PaymentStatusBadge, TransactionStatusBadge, TransactionTypeBadge } from "./BillingBadge";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

interface PaymentDetailSheetProps {
  publicId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDetailSheet({ publicId, open, onOpenChange }: PaymentDetailSheetProps) {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data, isLoading } = useGetPaymentDetail(publicId ?? "", token);
  const payment = data?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            Payment Details
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : payment ? (
          <div className="space-y-5">
            {/* Amount hero */}
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <p className="text-3xl font-bold tracking-tight">{formatCurrency(payment.amount)}</p>
              <div className="mt-1.5 flex items-center justify-center gap-2">
                <PaymentStatusBadge status={payment.paymentStatus} />
                <Badge variant="secondary" className="text-xs">
                  {payment.gateway}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <DetailRow
                icon={<Hash className="h-3.5 w-3.5" />}
                label="Transaction ID"
                value={<span className="font-mono text-xs break-all">{payment.transactionId}</span>}
              />
              <DetailRow
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Paid on"
                value={format(new Date(payment.createdAt), "PPP, p")}
              />
              {payment.appointment && (
                <>
                  <Separator />
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Appointment
                  </p>
                  <DetailRow
                    icon={<Stethoscope className="h-3.5 w-3.5" />}
                    label="Doctor"
                    value={payment.appointment.doctor.user.name}
                  />
                  <DetailRow
                    icon={<Calendar className="h-3.5 w-3.5" />}
                    label="Date"
                    value={format(new Date(payment.appointment.appointmentDate), "PPP")}
                  />
                  <DetailRow label="Specialization" value={payment.appointment.doctor.specialization} />
                </>
              )}
            </div>

            {/* Related transactions */}
            {payment.transactions?.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Ledger entries
                  </p>
                  <div className="space-y-2">
                    {payment.transactions.map((tx) => (
                      <div
                        key={tx.publicId}
                        className="flex items-center justify-between rounded-lg border bg-card px-3 py-2.5 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <TransactionTypeBadge type={tx.type} />
                          <TransactionStatusBadge status={tx.status} />
                        </div>
                        <span className="font-medium">{formatCurrency(tx.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">Payment not found.</p>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
