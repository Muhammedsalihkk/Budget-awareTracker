import tryCatch from "../utils/trycatch";
import { Request, Response } from "express";
import { AuthRequest } from "../types";
import expenseService from "../services/expense.service";
import { sendSuccess } from "../utils/response";

const expenseController = {
  addExpense: tryCatch(async (req: AuthRequest, res: Response) => {
    const { category, amount, date } = req.body;

    const expense = await expenseService.createExpenseService(
      req.user.id,
      category,
      amount,
      date
    );

    if (!expense) {
      throw new Error("Failed to create expense");
    }

    sendSuccess(res, "Expense added successfully", expense, 201);
  }),

  getExpensesByMonth: tryCatch(async (req: AuthRequest, res: Response) => {
    const { month } = req.params;

    const expenses = await expenseService.getExpensesByMonthService(
      req.user.id,
      month
    );

    if (!expenses) {
      throw new Error("Failed to fetch expenses");
    }

    sendSuccess(res, `Expenses for ${month}`, expenses);
  }),

};

export default expenseController;
