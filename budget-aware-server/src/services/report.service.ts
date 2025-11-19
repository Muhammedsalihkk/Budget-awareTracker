import { Expense, Budget, Category } from "../models/index";
import mongoose from "mongoose";

const reportService = {
  monthlyExpenseSummaryService: async (userId: string, month: string) => {
    try {
      const [year, monthNum] = month.split("-");

      const startDate = new Date(Number(year), Number(monthNum) - 1, 1);
      const endDate = new Date(Number(year), Number(monthNum), 1);

      const expenses = await Expense.find({
        user: userId,
        isDelete: false,
        date: { $gte: startDate, $lt: endDate },
      }).populate("category");

      const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

      return { totalSpent, expenses };
    } catch (error) {
      throw error;
    }
  },
  categoryWiseSummaryService: async (userId: string, month: string) => {
    try {
      const [year, monthNum] = month.split("-");

      const startDate = new Date(Number(year), Number(monthNum) - 1, 1);
      const endDate = new Date(Number(year), Number(monthNum), 1);

      const expenses = await Expense.find({
        user: userId,
        isDelete: false,
        date: { $gte: startDate, $lt: endDate },
      }).populate("category");

      const summary: Record<string, number> = {};

      expenses.forEach((exp) => {
        const categoryName = (exp.category as any)?.name || "Other";
        summary[categoryName] = (summary[categoryName] || 0) + exp.amount;
      });

      return summary;
    } catch (error) {
      throw error;
    }
  },

budgetVsExpenseService: async (userId: string, month: string) => {
  try {
    const [year, monthNum] = month.split("-");
    const startDate = new Date(Number(year), Number(monthNum) - 1, 1);
    const endDate = new Date(Number(year), Number(monthNum), 1);

const result = await Category.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(userId),
      isDelete: false,
    },
  },

  {
    $lookup: {
      from: "budgets",
      let: { catId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$category", "$$catId"] },
                { $eq: ["$user", new mongoose.Types.ObjectId(userId)] },
                { $eq: ["$isDelete", false] },
                { $eq: ["$month", month] },
              ],
            },
          },
        },
      ],
      as: "budgetData",
    },
  },

  {
    $lookup: {
      from: "expenses",
      let: { catId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$category", "$$catId"] },
                { $eq: ["$user", new mongoose.Types.ObjectId(userId)] },
                { $eq: ["$isDelete", false] },
                { $gte: ["$date", startDate] },
                { $lt: ["$date", endDate] },
              ],
            },
          },
        },
      ],
      as: "expenses",
    },
  },

  {
    $addFields: {
      budget: {
        $ifNull: [{ $arrayElemAt: ["$budgetData.amount", 0] }, 0],
      },
      spent: { $sum: "$expenses.amount" },
    },
  },

  {
    $addFields: {
      remaining: { $subtract: ["$budget", "$spent"] },
      isOver: { $gt: ["$spent", "$budget"] },
    },
  },

  {
    $project: {
      _id: 0,
      category: "$$ROOT",
      budget: 1,
      spent: 1,
      remaining: 1,
      isOver: 1,
    },
  },
]);


    return result;
  } catch (error) {
    throw error;
  }
}

};

export default reportService;
