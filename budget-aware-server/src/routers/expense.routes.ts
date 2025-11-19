import { Router } from "express";
import expensecontroller from "../controlers/expense.controller";
import { validateJoi } from "../middlewares/validate.joi";
import { validations } from "../validations";


const router = Router();

router.post("/",validateJoi(validations.expense),expensecontroller.addExpense);
router.get("/:month", expensecontroller.getExpensesByMonth)

export default router;
