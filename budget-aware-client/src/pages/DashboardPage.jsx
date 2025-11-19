import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/ui/CategoryCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlySummary,
  getCategoryWiseSummary,
  getBudgetVsExpense,
} from "../redux/services/reportApi";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const today = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(today);

  const { budgetVsExpense, loading } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getMonthlySummary(selectedMonth));
    dispatch(getCategoryWiseSummary(selectedMonth));
    dispatch(getBudgetVsExpense(selectedMonth));
  }, [dispatch, selectedMonth]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{selectedMonth}</h1>
          <p className="text-sm text-gray-500">
            Your personal spending overview
          </p>
        </div>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded-lg bg-white shadow-sm text-gray-700"
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24">
          {budgetVsExpense?.length > 0 ? (
            budgetVsExpense.map((item, idx) => (
              <CategoryCard
                key={idx}
                name={item.category.name}
                color={item.category.color}
                spent={item.spent}
                limit={item.budget}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">
              No data available for this month.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => navigate("/add-expense")}
        title="Add Expense"
        className="fixed bottom-20 right-6 bg-indigo-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-indigo-700 hover:scale-110 transition"
      >
        <PlusOutlined className="text-3xl" />
      </button>
    </div>
  );
};

export default DashboardPage;
