import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createBudget = createAsyncThunk(
  "budget/create",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axiosInstance.post("/budgets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getBudgets = createAsyncThunk(
  "budget/getAll",
  async (month, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.get(`/budgets/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateBudget = createAsyncThunk(
  "budget/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.put(`/budgets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteBudget = createAsyncThunk(
  "budget/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.delete(`/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export default {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};
