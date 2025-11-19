import { useEffect, useState } from "react";
import CustomButton from "../components/ui/Button";
import CustomInput from "../components/ui/Input";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} from "../redux/services/budgetApi";

import { getCategories } from "../redux/services/categoryApi";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const BudgetsTab = () => {
  const dispatch = useDispatch();

  const { budgets, loading, error } = useSelector((state) => state.budget);
  const { categories } = useSelector((state) => state.category);


  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );

  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    dispatch(getBudgets(month));
    dispatch(getCategories());
  }, [dispatch, month]);

  const getBudgetByCategory = (categoryId) => {
    return budgets.find((b) => b.category._id === categoryId);
  };
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this budget?");
    if (!ok) return;

    const res = await dispatch(deleteBudget(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Budget deleted!");
      dispatch(getBudgets(month)); 
    } else {
      toast.error("Failed to delete budget");
    }
  };

  const handleAddOrUpdate = async (categoryId, amount) => {
    if (!amount) {
      toast.error("Amount is required");
      return;
    }

    const existing = getBudgetByCategory(categoryId);
    let res;
    if (existing) {
      res = await dispatch(
        updateBudget({
          id: existing._id,
          formData: { amount: Number(amount) },
        })
      );

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Budget updated!");
      } else {
        toast.error("Failed to update");
        return;
      }
    } else {
      res = await dispatch(
        createBudget({
          category: categoryId,
          amount: Number(amount),
          month,
        })
      );

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Budget added!");
      } else {
        toast.error("Failed to add");
        return;
      }
    }

    await dispatch(getBudgets(month));

    setEditingId(null);
    setEditAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-3xl font-bold text-gray-800">Manage Budgets</h2>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
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
        <div className="space-y-4">
          {categories.map((cat) => {
            const budget = getBudgetByCategory(cat._id);

            return (
              <div
                key={cat._id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-4 border"
              >
                <div className="flex-1 text-center md:text-left">
                  <span className="text-lg font-semibold text-gray-800">
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-center">
                  {editingId === cat._id ? (
                    <CustomInput
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-28 text-center"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {budget ? `₹${budget.amount}` : "—"}
                    </span>
                  )}

                  {editingId === cat._id ? (
                    <CheckIcon
                      className="w-6 h-6 text-green-600 cursor-pointer"
                      onClick={() => handleAddOrUpdate(cat._id, editAmount)}
                    />
                  ) : (
                    <PencilSquareIcon
                      className="w-6 h-6 text-blue-500 cursor-pointer"
                      onClick={() => {
                        setEditingId(cat._id);
                        setEditAmount(budget ? budget.amount : "");
                      }}
                    />
                  )}

                  {budget && (
                    <TrashIcon
                      className="w-6 h-6 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(budget._id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetsTab;
