import { Expense } from "../models/index";

const expenseService = {
  createExpenseService: async (
    userId: string,
    category: string,
    amount: number,
    date: Date
  ) => {
    try {
      const expense = await Expense.create({
        category,
        amount,
        date,
        user: userId,
      });
      return expense;
    } catch (error) {
      throw error;
    }
  },
getExpensesByMonthService: async (userId: string, month: string) => {
  try {
    const [year, monthNum] = month.split("-");
    const startDate = new Date(Number(year), Number(monthNum) - 1, 1);
    const endDate = new Date(Number(year), Number(monthNum), 1);
    const expenses = await Expense.find({
      user: userId,
      isDeleted: false,
      date: { $gte: startDate, $lt: endDate },
    }).populate("category");

    return expenses;
  } catch (error) {
    throw error;
  }
},
};

export default expenseService;
