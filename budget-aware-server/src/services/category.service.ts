import mongoose from "mongoose";
import { Category } from "../models/index";

const categoryService = {
  createCategoryService: async (userId: string, name: string, color: string) => {
    try {
      const existingCategory = await Category.findOne({ user: userId, name, isDeleted: false });
      if (existingCategory) throw new Error("Category already exists");
      const category = await Category.create({ name, color, user: userId });
      return category;
    } catch (error) {
      throw error;
    }
  },

  getCategoriesService: async (userId: string) => {
    try {
      const userid=new mongoose.Types.ObjectId(userId);
      const categories = await Category.find({ user: userid, isDelete: false });
      
      return categories;
    } catch (error) {
      throw error;
    }
  },

  updateCategoryService: async (userId: string, categoryId: string, name: string, color: string) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, user: userId, isDelete: false },
        { name, color },
        { new: true }
      );
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  },

  deleteCategoryService: async (userId: string, categoryId: string) => {
    try {
      const deletedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, user: userId },
        { isDelete: true },
        { new: true }
      );
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;
