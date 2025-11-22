import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axiosInstance.post("/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create category" }
      );
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axiosInstance.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch categories" }
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axiosInstance.put(`/categories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update category" }
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete category" }
      );
    }
  }
);
