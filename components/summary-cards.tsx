"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePreloadedQuery } from "convex/react";
import { Skeleton } from "./ui/skeleton";

export default function SummaryCards({
  preloadedSummary,
}: {
  preloadedSummary: Preloaded<typeof api.transactions.getTransactionSumarry>;
}) {
  const summary = usePreloadedQuery(preloadedSummary);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-500">
            {Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(summary?.data?.totalIncome || 0)}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-500">
            {Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(summary?.data?.totalExpense || 0)}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">
            {Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(summary?.data?.totalSavings || 0)}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <DollarSign
            className={cn(
              "h-4 w-4",
              summary?.data?.balance || 0 >= 0
                ? "text-green-600 dark:text-green-500"
                : "text-red-600 dark:text-red-500"
            )}
          />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              `text-2xl font-bold`,
              summary?.data?.balance || 0 >= 0
                ? "text-green-600 dark:text-green-500"
                : "text-red-600 dark:text-red-500"
            )}
          >
            {Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(summary?.data?.balance || 0)}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
    </section>
  );
}

export function SummaryCardsLoading() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 rounded w-16" />
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 rounded w-24 mb-2" />
            <Skeleton className="h-3 rounded w-32" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
