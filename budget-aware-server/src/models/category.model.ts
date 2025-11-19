import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types";

const categorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
