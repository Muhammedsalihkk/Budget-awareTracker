import tryCatch from "../utils/trycatch";
import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { sendSuccess, sendError } from "../utils/response";
import { AuthRequest } from "../types";

const categoryController = {
  createCategory: tryCatch(async (req: AuthRequest, res: Response) => {
    const { name, color } = req.body;

    const category = await categoryService.createCategoryService(
      req.user.id,
      name,
      color
    );
    sendSuccess(res, "Category created successfully", category, 201);
  }),
  getAllCategories: tryCatch(async (req: AuthRequest, res: Response) => {
    const categories = await categoryService.getCategoriesService(req.user.id);
    sendSuccess(res, "Categories fetched successfully", categories);
  }),
  updateCategory: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, color } = req.body;

    const updatedCategory = await categoryService.updateCategoryService(
      req.user.id,
      id,
      name,
      color
    );

    sendSuccess(res, "Category updated successfully", updatedCategory);
  }),

  deleteCategory: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategoryService(
      req.user.id,
      id
    );

    sendSuccess(res, "Category deleted successfully");
  }),
};
export default categoryController;
