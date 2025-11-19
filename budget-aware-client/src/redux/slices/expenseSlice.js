import { createSlice } from "@reduxjs/toolkit";
import {
  createExpense
} from "../services/expenseApi";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload?.data;
        if (created) state.expenses.push(created);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to create expense";
      })
  },
});

export default expenseSlice.reducer;
