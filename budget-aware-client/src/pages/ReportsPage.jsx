import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlySummary,
  getCategoryWiseSummary,
  getBudgetVsExpense,
} from "../redux/services/reportApi";

const ReportsPage = () => {
  const dispatch = useDispatch();

  const { monthlySummary, categorySummary, budgetVsExpense, loading, error } =
    useSelector((state) => state.report);

  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    dispatch(getMonthlySummary(month));
    dispatch(getCategoryWiseSummary(month));
    dispatch(getBudgetVsExpense(month));
  }, [dispatch, month]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Monthly Reports
      </h2>

      <div className="flex items-center justify-between mb-6">
        <label className="text-lg font-medium">Select Month:</label>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 border rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white p-4 rounded shadow flex justify-between"
            >
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
          <div className="max-h-90 overflow-y-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-indigo-50 border-b sticky top-0 z-10">
                <tr className="text-gray-600 uppercase text-xs">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Spent</th>
                  <th className="px-4 py-3">Remaining</th>
                </tr>
              </thead>

              <tbody>
                {budgetVsExpense?.map((item, idx) => {
                  const remaining = item.budget - item.spent;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 border-b transition-colors duration-200"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.category.name}
                      </td>
                      <td className="px-4 py-3">₹{item.budget}</td>
                      <td className="px-4 py-3">₹{item.spent}</td>

                      <td
                        className={`px-4 py-3 font-semibold ${
                          remaining < 0 ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {remaining >= 0
                          ? `₹${remaining}`
                          : `-₹${Math.abs(remaining)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
