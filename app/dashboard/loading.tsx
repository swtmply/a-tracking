import { SummaryCardsLoading } from "@/components/summary-cards";
import { TransactionListLoading } from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export default function DashboardLoading() {
  return (
    <React.Fragment>
      <section className="flex w-full flex-row justify-between items-center">
        <h1 className="font-bold text-2xl tracking-tighter">Dashboard</h1>
        <Button disabled>
          <Plus />
          Add Transaction
        </Button>
      </section>

      <SummaryCardsLoading />

      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl tracking-tighter">
          Recent Transactions
        </h2>
        <TransactionListLoading />
      </section>
    </React.Fragment>
  );
}
