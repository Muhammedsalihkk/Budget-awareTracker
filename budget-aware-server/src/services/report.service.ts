import { Expense, Budget } from "../models/index";
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

    const result = await Budget.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          isDelete: false,
          month, 
        },
      },

      {
        $lookup: {
          from: "expenses",
          let: { categoryId: "$category" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$categoryId"] },
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
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },

      {
        $addFields: {
          spent: { $sum: "$expenses.amount" },
        },
      },

      {
        $addFields: {
          remaining: { $subtract: ["$amount", "$spent"] },
          isOver: { $gt: ["$spent", "$amount"] },
        },
      },

      {
        $project: {
          _id: 0,
          category: "$categoryDetails",
          budget: "$amount",
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
