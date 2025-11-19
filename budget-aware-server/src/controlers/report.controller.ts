import { Request, Response } from "express";
import reportService from "../services/report.service";
import { sendSuccess } from "../utils/response";
import { AuthRequest } from "../types";
import tryCatch from "../utils/trycatch";

export const reportController = {
  monthlyExpenseSummary: tryCatch(async (req: AuthRequest, res: Response) => {
    const { month } = req.params;

    const data = await reportService.monthlyExpenseSummaryService(
      req.user.id,
      month
    );

    if (!data) {
      throw new Error("Failed to fetch monthly summary");
    }

    sendSuccess(res, "Monthly summary fetched", data);
  }),

  categoryWiseSummary: tryCatch(async (req: AuthRequest, res: Response) => {
    const { month } = req.params;

    const data = await reportService.categoryWiseSummaryService(
      req.user.id,
      month
    );

    if (!data) {
      throw new Error("Failed to fetch category-wise summary");
    }

    sendSuccess(res, "Category-wise summary fetched", data);
  }),

  budgetVsExpense: tryCatch(async (req: AuthRequest, res: Response) => {
    const { month } = req.params;

    const data = await reportService.budgetVsExpenseService(
      req.user.id,
      month
    );

    if (!data) {
      throw new Error("Failed to fetch budget vs expense");
    }

    sendSuccess(res, "Budget vs expense fetched", data);
  }),
};
