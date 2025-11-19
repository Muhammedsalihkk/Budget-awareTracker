import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createExpense = createAsyncThunk(
  "expense/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/expenses", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

