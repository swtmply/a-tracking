import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const incomeTransaction = v.object({
  type: v.literal("income"),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),

  userId: v.id("users"),
});

const expenseTransaction = v.object({
  type: v.literal("expense"),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),

  userId: v.id("users"),
});

const savingsTransaction = v.object({
  type: v.literal("savings"),
  amount: v.number(),
  category: v.string(),
  location: v.string(),
  description: v.string(),
  date: v.number(),

  userId: v.id("users"),
});

export const transactionSchema = v.union(
  incomeTransaction,
  expenseTransaction,
  savingsTransaction
);

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    image: v.string(),
    email: v.string(),
    balance: v.number(),
  }).index("email", ["email"]),
  transactions: defineTable(transactionSchema).index("userId", ["userId"]),
});
