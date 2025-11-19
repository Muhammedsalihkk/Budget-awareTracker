import { createSlice } from "@reduxjs/toolkit";
import {
  getMonthlySummary,
  getCategoryWiseSummary,
  getBudgetVsExpense,
} from "../services/reportApi";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    monthlySummary: null,
    categorySummary: null,
    budgetVsExpense: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMonthlySummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthlySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySummary = action.payload?.data || null;
      })
      .addCase(getMonthlySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      })

      .addCase(getCategoryWiseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryWiseSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.categorySummary = action.payload?.data || null;
      })
      .addCase(getCategoryWiseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      })

      .addCase(getBudgetVsExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudgetVsExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.budgetVsExpense = action.payload?.data || [];
      })
      .addCase(getBudgetVsExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      });
  },
});

export default reportSlice.reducer;
