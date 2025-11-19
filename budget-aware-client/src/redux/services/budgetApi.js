import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const createBudget = createAsyncThunk(
  "budget/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/budgets", formData);
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
      const response = await axiosInstance.get(`/budgets/${month}`);
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
      const response = await axiosInstance.put(`/budgets/${id}`, formData);
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
      const response = await axiosInstance.delete(`/budgets/${id}`);
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
