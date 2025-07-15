import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import TransactionFilter from "@/components/transaction-filters";
import TransactionList from "@/components/transaction-list";
import { Filter } from "@/components/ui/filters";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { endOfMonth } from "date-fns";
import React from "react";

const getDates: (dateRange: string) => {
  startDate: number;
  endDate: number;
} = (dateRange: string) => {
  const [month, quarter] = dateRange.split("_");
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const currentYear = new Date().getFullYear();
  const monthIndex: number = monthMap[month];

  const startDay = quarter === "01" ? 1 : 16;
  const startDate = new Date(currentYear, monthIndex, startDay);

  const endDate =
    quarter === "01"
      ? new Date(currentYear, monthIndex, 15)
      : endOfMonth(new Date(currentYear, monthIndex));

  return { startDate: startDate.getTime(), endDate: endDate.getTime() };
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const token = await convexAuthNextjsToken();
  const params = await searchParams;

  const parsedSearchParams = Array.from(Object.entries(params)).map((param) => {
    const filter = JSON.parse(param[1]) as Filter;
    return filter;
  });

  const preLoadedTransactions = await preloadQuery(
    api.transactions.getTransactions,
    {
      types: parsedSearchParams.find((f) => f.type === "Type")?.value,
      categories: parsedSearchParams.find((f) => f.type.includes("Category"))
        ?.value,
      dates: parsedSearchParams
        .find((f) => f.type === "Date Range")
        ?.value.map((dateRange: string) => {
          const { startDate, endDate } = getDates(dateRange);
          return [startDate, endDate];
        }),
    },
    { token }
  );

  return (
    <React.Fragment>
      <section className="flex w-full flex-row justify-between items-center">
        <h1 className="font-bold text-2xl tracking-tighter">Transactions</h1>
        <div className="flex items-center gap-2">
          <TransactionFilter />
          <AddTransactionDialog />
        </div>
      </section>

      <TransactionList preloadedTransactions={preLoadedTransactions} />
    </React.Fragment>
  );
}
