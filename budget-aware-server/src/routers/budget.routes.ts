import { Router } from "express";
import budgetController from "../controlers/budget.controller";
import { validateJoi } from "../middlewares/validate.joi";
import { validations } from "../validations";

const router = Router();
router.post("/",validateJoi(validations.budget), budgetController.createBudget);
router.get("/:month", budgetController.getBudgets);
router.put("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudget);

export default router;
