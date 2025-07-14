"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { ArrowDownRight, ArrowUpRight, PiggyBank, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type ArrayElementType<T> = T extends readonly (infer E)[] ? E : never;
type Transaction = ArrayElementType<
  FunctionReturnType<typeof api.transactions.getTransactions>
>;

export default function TransactionList({
  preloadedTransactions,
}: {
  preloadedTransactions: Preloaded<typeof api.transactions.getTransactions>;
}) {
  const transactions = usePreloadedQuery(preloadedTransactions);

  if (!Array.isArray(transactions)) {
    return <div>{transactions.error}</div>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const deleteTransactionMutation = useMutation(
    api.transactions.deleteTransaction
  );

  return (
    <Card className="py-2">
      <CardContent className="px-2">
        <div
          key={transaction._id}
          className="flex items-center justify-between p-3 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full ${
                transaction.type === "income"
                  ? "bg-green-500/20"
                  : transaction.type === "expense"
                    ? "bg-red-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-500" />
              ) : transaction.type === "expense" ? (
                <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-500" />
              ) : (
                <PiggyBank className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              )}
            </div>
            <div>
              <div className="font-semibold capitalize">{transaction.type}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {transaction.category}
                {transaction.type === "savings" ? (
                  <span> • {transaction.location}</span>
                ) : (
                  transaction.description && (
                    <span> • {transaction.description}</span>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`font-medium ${
                transaction.type === "income"
                  ? "text-green-600 dark:text-green-500"
                  : transaction.type === "expense"
                    ? "text-red-600 dark:text-red-500"
                    : "text-blue-600 dark:text-blue-500"
              }`}
            >
              {transaction.type === "income"
                ? "+"
                : transaction.type === "expense"
                  ? "-"
                  : "💰"}

              {Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(transaction.amount)}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-600 dark:hover:text-red-500 cursor-pointer"
              onClick={() =>
                deleteTransactionMutation({ transactionId: transaction._id })
              }
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
