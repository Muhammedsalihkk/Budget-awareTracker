import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/services/categoryApi";
import { createExpense } from "../redux/services/expenseApi";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  category: Yup.string()
    .length(24, "Invalid category")
    .required("Category is required"),
  amount: Yup.number()
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  date: Yup.date().required("Date is required"),
});

const AddExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const initialValues = {
    category: "",
    amount: "",
    date: new Date().toISOString().substring(0, 10),
  };

  const handleSubmit = async (values, { resetForm }) => {
    const res = await dispatch(createExpense(values));

    if (res.meta.requestStatus === "fulfilled") {
      const result = res.payload;

      if (result?.isOver) {
        toast.error(result?.message || "Over budget!");
      } else {
        toast.success(result?.message || "Within budget!");
      }

      resetForm();
    } else {
      toast.error(res.payload?.message || "Failed to add expense");
    }
  };

  return (
    <div className="md:mt-20 max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
        Add New Expense
      </h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>

              <select
                name="category"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => {
                  if (e.target.value === "__add_new__") {
                    navigate("/settings/categories");
                    return;
                  }
                  setFieldValue("category", e.target.value);
                }}
              >
                <option value="">Select Category</option>

                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}

                <option value="__add_new__" className="font-bold text-indigo-600">
                  + Add Category
                </option>
              </select>

              <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <Field
                type="number"
                name="amount"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter amount"
              />
              <ErrorMessage name="amount" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Field
                type="date"
                name="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="date" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-40 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Expense"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddExpensePage;
