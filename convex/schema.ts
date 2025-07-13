import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const incomeTransaction = v.object({
  type: v.literal("income"),
  name: v.string(),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),
});

const expenseTransaction = v.object({
  type: v.literal("expense"),
  name: v.string(),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),
});

const savingsTransaction = v.object({
  type: v.literal("savings"),
  name: v.string(),
  amount: v.number(),
  category: v.string(),
  description: v.string(),
  date: v.number(),
});

const transaction = v.union(
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
  transactions: defineTable(transaction),
});
