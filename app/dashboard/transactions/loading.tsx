import { TransactionListLoading } from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import { Plus, SlidersHorizontal } from "lucide-react";
import React from "react";

export default function TransactionsLoading() {
  return (
    <React.Fragment>
      <section className="flex w-full flex-row justify-between items-center">
        <h1 className="font-bold text-2xl tracking-tighter">Transactions</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            role="combobox"
            className="transition group items-center rounded-sm flex gap-1.5"
          >
            <SlidersHorizontal className="shrink-0 transition-all text-muted-foreground group-hover:text-primary" />
            Filter
          </Button>

          <Button disabled>
            <Plus />
            Add Transaction
          </Button>
        </div>
      </section>

      <TransactionListLoading />
    </React.Fragment>
  );
}
