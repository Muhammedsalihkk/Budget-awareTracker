import tryCatch from "../utils/trycatch";
import { Request, Response } from "express";
import { Expense } from "../models/expense.model";
import { sendSuccess, sendError } from "../utils/response";
import { AuthRequest } from "../types";
import expenseService from "../services/expense.service";

const expenseController = {
  addExpense: tryCatch(async (req: AuthRequest, res: Response) => {
    const { category, amount, date } = req.body;

    const expense = await expenseService.createExpenseService(
      req.user.id,
      category,
      amount,
      date
    );

    sendSuccess(res, "Expense added successfully", expense, 201);
  }),

  getExpensesByMonth: tryCatch(async (req: AuthRequest, res: Response) => {
    const { month } = req.params;
    const expenses = await expenseService.getExpensesByMonthService(
      req.user.id,
      month
    );

    sendSuccess(res, `Expenses for ${month}`, expenses);
  }),

  deleteExpense: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const deletedExpense = await expenseService.deleteExpenseByIdService(
      req.user.id,
      id
    );

    if (!deletedExpense) {
      return sendError(res, "Expense not found", 404);
    }

    sendSuccess(res, `Expense ${id} deleted successfully`);
  }),
};
export default expenseController;