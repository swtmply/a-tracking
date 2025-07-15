import React from "react";

import { AddTransactionDialog } from "@/components/add-transaction-dialog";

import TransactionList from "@/components/transaction-list";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import SummaryCards from "@/components/summary-cards";
import Link from "next/link";

export default async function DashboardPage() {
  const token = await convexAuthNextjsToken();
  const preLoadedTransactions = await preloadQuery(
    api.transactions.getTransactions,
    {},
    { token }
  );

  const preLoadedSummary = await preloadQuery(
    api.transactions.getTransactionSumarry,
    {},
    { token }
  );

  return (
    <React.Fragment>
      <section className="flex w-full flex-row justify-between items-center">
        <h1 className="font-bold text-2xl tracking-tighter">Dashboard</h1>
        <AddTransactionDialog />
      </section>

      <SummaryCards preloadedSummary={preLoadedSummary} />

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl tracking-tighter">
            Recent Transactions
          </h2>

          <Link href="/dashboard/transactions">
            <span className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              See All Transactions
            </span>
          </Link>
        </div>
        <TransactionList preloadedTransactions={preLoadedTransactions} />
      </section>
    </React.Fragment>
  );
}
