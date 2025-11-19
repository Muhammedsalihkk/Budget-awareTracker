import { Router } from "express";
import categoryController from "../controlers/category.controller";
import { validateJoi } from "../middlewares/validate.joi";
import { validations } from "../validations";

const router = Router();
router.post("/",validateJoi(validations.category), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:id",categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
