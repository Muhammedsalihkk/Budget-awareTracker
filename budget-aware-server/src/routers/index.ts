import { Router } from "express";
import authRoutes from "./auth.routes";
import budgetRoutes from "./budget.routes";
import categoryRoutes from "./category.routes";
import expenseRoutes from "./expense.routes";
import reportRoutes from "./report.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.use("/auth", authRoutes);
router.use(authMiddleware)
router.use("/categories",categoryRoutes);
router.use("/budgets", budgetRoutes);
router.use("/expenses", expenseRoutes);
router.use("/reports", reportRoutes);

export default router;
