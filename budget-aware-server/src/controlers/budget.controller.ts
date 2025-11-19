import { Request, Response } from "express";
import budgetService from "../services/budget.service";
import { sendSuccess } from "../utils/response";
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

    if (!budget) {
      throw new Error("Failed to create budget");
    }

    sendSuccess(res, "Budget created successfully", budget, 201);
  }),

  getBudgets: tryCatch(async (req: AuthRequest, res: Response) => {
    const month = req.params.month;
    const userId = req.user.id;
    const budgets = await budgetService.getBudgetsService(userId, month);

    if (!budgets) {
      throw new Error("Failed to fetch budgets");
    }

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

    if (!updated) {
      throw new Error("Failed to update budget");
    }

    sendSuccess(res, "Budget updated successfully", updated);
  }),

  deleteBudget: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;



    const deleted = await budgetService.deleteBudgetService(req.user.id, id);

    if (!deleted) {
      throw new Error("Failed to delete budget");
    }

    sendSuccess(res, "Budget deleted successfully");
  }),
};

export default budgetController;
