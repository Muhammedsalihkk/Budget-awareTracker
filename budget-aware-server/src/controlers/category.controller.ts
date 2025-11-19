import tryCatch from "../utils/trycatch";
import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { sendSuccess } from "../utils/response";
import { AuthRequest } from "../types";

const categoryController = {
  createCategory: tryCatch(async (req: AuthRequest, res: Response) => {
    const { name, color } = req.body;
    const category = await categoryService.createCategoryService(
      req.user.id,
      name,
      color
    );

    if (!category) {
      throw new Error("Failed to create category");
    }

    sendSuccess(res, "Category created successfully", category, 201);
  }),

  getAllCategories: tryCatch(async (req: AuthRequest, res: Response) => {
    const categories = await categoryService.getCategoriesService(req.user.id);

    if (!categories) {
      throw new Error("Failed to fetch categories");
    }

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

    if (!updatedCategory) {
      throw new Error("Failed to update category");
    }

    sendSuccess(res, "Category updated successfully", updatedCategory);
  }),

  deleteCategory: tryCatch(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategoryService(
      req.user.id,
      id
    );

    if (!deletedCategory) {
      throw new Error("Failed to delete category");
    }

    sendSuccess(res, "Category deleted successfully");
  }),
};

export default categoryController;
