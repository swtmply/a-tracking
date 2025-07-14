import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTransactions = query({
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

    return transactions;
  },
});

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
      } else {
        await ctx.db.insert("transactions", {
          type: args.data.type,
          amount: args.data.amount,
          category: args.data.category,
          description: args.data.description,
          date: args.data.date,
          userId,
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
