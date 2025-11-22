import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getMonthlySummary = createAsyncThunk(
  "reports/monthlySummary",
  async (month, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.get(`/reports/summary/${month}`,{        headers: {
          Authorization: `Bearer ${token}`,
        }});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getCategoryWiseSummary = createAsyncThunk(
  "reports/categorySummary",
  async (month, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.get(
        `/reports/category-summary/${month}`,{
                  headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getBudgetVsExpense = createAsyncThunk(
  "reports/budgetVsExpense",
  async (month, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.get(
        `/reports/budget-vs-expense/${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
