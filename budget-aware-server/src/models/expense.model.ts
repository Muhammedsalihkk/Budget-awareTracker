import mongoose, { Schema } from "mongoose";
import { IExpense } from "../types";

const expenseSchema = new Schema<IExpense>(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
