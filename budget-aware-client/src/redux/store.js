import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import budgetReducer from "./slices/budgetSlice";
import expenseReducer from "./slices/expenseSlice"
import reportReducer from "./slices/reportSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category:categoryReducer,
    budget:budgetReducer,
    expense:expenseReducer,
    report:reportReducer
  },
});

export default store;