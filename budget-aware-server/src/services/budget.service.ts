import { Budget } from "../models/index";

const budgetService = {
  createBudgetService: async (
    userId: string,
    category: string,
    amount: number,
    month: string
  ) => {
    const existing = await Budget.findOne({
      user: userId,
      category,
      month,
      isDelete: false,
    });

    if (existing) throw new Error("Budget for this month already exists");

    const budget = await Budget.create({
      user: userId,
      category,
      amount,
      month,
    });

    return budget;
  },

  getBudgetsService: async (userId: string, month: string) => {
    const budgets = await Budget.find({
      user: userId,
      month,
      isDelete: false,
    }).populate("category");

    return budgets;
  },

  updateBudgetService: async (
    userId: string,
    budgetId: string,
    amount: number
  ) => {
    const updated = await Budget.findOneAndUpdate(
      { _id: budgetId, user: userId, isDelete: false },
      { amount },
      { new: true }
    ).populate("category");
    return updated;
  },

  deleteBudgetService: async (userId: string, budgetId: string) => {
    const deleted = await Budget.findOneAndUpdate(
      { _id: budgetId, user: userId },
      { isDelete: true },
      { new: true }
    );
    return deleted;
  },
};

export default budgetService;
