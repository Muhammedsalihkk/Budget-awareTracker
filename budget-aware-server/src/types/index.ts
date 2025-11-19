import { NextFunction, Request, Response } from "express";
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  
}

export interface ICategory extends Document  {
  name: string;
  color: string;
  user: mongoose.Types.ObjectId;
  isDelete:boolean
}

export interface IBudget extends Document  {
  category:mongoose.Types.ObjectId;
  amount: number;
  month: string;
  user: mongoose.Types.ObjectId;
  isDelete:boolean
}

export interface IExpense extends Document  {
  category: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  user: mongoose.Types.ObjectId;
  isDelete:boolean
}
export interface AuthRequest extends Request {
  user?: { id: string };
}
export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;