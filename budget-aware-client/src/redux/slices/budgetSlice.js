import { createSlice } from "@reduxjs/toolkit";
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../services/budgetApi";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budgets: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload?.data || [];
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to load budgets";
      })

      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload?.data;
        if (created) state.budgets.push(created);
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to create budget";
      })

      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data;
        if (!updated) return;
        state.budgets = (state.budgets || []).map((b) =>
          b && b._id === updated._id ? updated : b
        );
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update budget";
      })

      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id || action.meta?.arg;
        if (!id) return;
        state.budgets = (state.budgets || []).filter(
          (b) => b && b._id !== id
        );
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to delete budget";
      });
  },
});

export default budgetSlice.reducer;
