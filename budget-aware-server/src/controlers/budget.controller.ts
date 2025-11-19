import { Request, Response } from "express";
import budgetService from "../services/budget.service";
import { sendSuccess, sendError } from "../utils/response";
import { AuthRequest } from "../types";
import tryCatch from "../utils/trycatch";

const budgetController = {
  createBudget: tryCatch(async (req: AuthRequest, res: Response) => {
    const { category, amount, month } = req.body;
    const budget = await budgetService.createBudgetService(
      req.user.id,
      category,
      amount,
      month
    );
    sendSuccess(res, "Budget created successfully", budget, 201);
  }),

  getBudgets: tryCatch(async (req: AuthRequest, res: Response) => {
    const month = req.params.month;
    const userId = req.user.id;

    const budgets = await budgetService.getBudgetsService(userId, month);

    sendSuccess(res, "Budgets fetched successfully", budgets);
  }),

  updateBudget: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body;
    const updated = await budgetService.updateBudgetService(
      req.user.id,
      id,
      amount
    );
    sendSuccess(res, "Budget updated successfully", updated);
  }),

  deleteBudget: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const deleted = await budgetService.deleteBudgetService(req.user.id, id);

    sendSuccess(res, "Budget deleted successfully");
  }),
};
export default budgetController;
