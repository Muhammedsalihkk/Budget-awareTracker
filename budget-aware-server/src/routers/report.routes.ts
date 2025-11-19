import { Router } from "express";
import { reportController } from "../controlers/report.controller";


const router = Router();

router.get("/summary/:month", reportController.monthlyExpenseSummary);
router.get("/category-summary/:month", reportController.categoryWiseSummary);
router.get("/budget-vs-expense/:month", reportController.budgetVsExpense);

export default router;
