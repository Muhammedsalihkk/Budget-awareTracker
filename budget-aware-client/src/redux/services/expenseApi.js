import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createExpense = createAsyncThunk(
  "expense/create",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.post("/expenses", formData, {
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
