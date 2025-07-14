"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

export default function TransactionList({
  transactions,
}: {
  transactions: Preloaded<typeof api.transactions.getTransactions>;
}) {
  const transactionsData = usePreloadedQuery(transactions);

  return <pre>{JSON.stringify(transactionsData, null, 2)}</pre>;
}
