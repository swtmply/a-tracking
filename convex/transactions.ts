import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const incomeTransaction = v.object({
  type: v.literal("income"),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),
});

const expenseTransaction = v.object({
  type: v.literal("expense"),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),
});

const savingsTransaction = v.object({
  type: v.literal("savings"),
  amount: v.number(),
  category: v.string(),
  location: v.string(),
  description: v.string(),
  date: v.number(),
});

export const transactionSchema = v.union(
  incomeTransaction,
  expenseTransaction,
  savingsTransaction
);

export const getTransactions = query({
  args: {
    types: v.optional(v.array(v.string())),
    categories: v.optional(v.array(v.string())),
    dates: v.optional(v.array(v.array(v.number()))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const filteredTransactions = transactions.filter((transaction) => {
      if (args.types) {
        const types = args.types.map((type) => {
          if (type === "expenses") return "expense";
          return type;
        });
        if (!types.includes(transaction.type)) {
          return false;
        }
      }

      if (args.categories && !args.categories.includes(transaction.category)) {
        return false;
      }

      if (args.dates && args.dates.length > 0) {
        const transactionDate = new Date(transaction.date).getTime();
        return args.dates.some((date) => {
          return transactionDate >= date[0] && transactionDate <= date[1];
        });
      }

      return true;
    });

    return filteredTransactions;
  },
});

export const addTransaction = mutation({
  args: {
    data: transactionSchema,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    try {
      if (args.data.type === "savings") {
        await ctx.db.insert("transactions", {
          type: "savings",
          amount: args.data.amount,
          category: args.data.category,
          description: args.data.description,
          date: args.data.date,
          userId,
          location: args.data.location,
        });
      }

      if (args.data.type === "expense") {
        await ctx.db.insert("transactions", {
          type: args.data.type,
          amount: args.data.amount,
          category: args.data.category,
          description: args.data.description,
          date: args.data.date,
          userId,
        });

        await ctx.db.patch(userId, {
          balance: user.balance - args.data.amount,
        });
      }

      if (args.data.type === "income") {
        await ctx.db.insert("transactions", {
          type: args.data.type,
          amount: args.data.amount,
          category: args.data.category,
          description: args.data.description,
          date: args.data.date,
          userId,
        });

        await ctx.db.patch(userId, {
          balance: user.balance + args.data.amount,
        });
      }

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
      return {
        success: false,
        error: "An unknown error occurred",
      };
    }
  },
});

export const deleteTransaction = mutation({
  args: {
    transactionId: v.id("transactions"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    try {
      await ctx.db.delete(args.transactionId);
      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
      return {
        success: false,
        error: "An unknown error occurred",
      };
    }
  },
});

export const getTransactionSumarry = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // filter for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const filteredTransactions = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const totalIncome = filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const totalExpense = filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const totalSavings = filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === "savings") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const balance = totalIncome - totalExpense - totalSavings;

    return {
      success: true,
      data: {
        totalIncome,
        totalExpense,
        totalSavings,
        balance,
      },
    };
  },
});
