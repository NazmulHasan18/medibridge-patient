"use client";

import { BillingSummaryCards } from "@/components/billings/BillingSummaryCard";
import { PaymentsTab } from "@/components/billings/PaymentsTab";
import { TransactionsTab } from "@/components/billings/TransactionsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Activity } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight lg:text-2xl">Billing & Payments</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Track your payments, transactions, and wallet balance.
        </p>
      </div>

      {/* Summary cards */}
      <BillingSummaryCards />

      {/* Tabs */}
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList className="h-9">
          <TabsTrigger value="payments" className="gap-1.5 text-xs sm:text-sm">
            <CreditCard className="h-3.5 w-3.5" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="transactions" className="gap-1.5 text-xs sm:text-sm">
            <Activity className="h-3.5 w-3.5" />
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-0">
          <PaymentsTab />
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          <TransactionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
