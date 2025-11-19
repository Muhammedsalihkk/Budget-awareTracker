import mongoose, { Schema } from "mongoose";
import { IBudget } from "../types";

const budgetSchema = new Schema<IBudget>(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDelete: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
