import { useEffect, useState } from "react";
import CustomButton from "../components/ui/Button";
import CustomInput from "../components/ui/Input";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../redux/services/categoryApi";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CategoriesTab = () => {
  const [showDialog, setShowDialog] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#FF5733",
  });

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editColor, setEditColor] = useState("");

  const dispatch = useDispatch();

  const { error, loading, categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required!");
      return;
    }

    const res = await dispatch(
      createCategory({
        name: newCategory.name,
        color: newCategory.color,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Category added successfully!");
      setNewCategory({ name: "", color: "#FF5733" });
      setShowDialog(false);
      dispatch(getCategories());
    } else {
      toast.error(res.payload?.message || "Failed to add category");
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditValue(category.name);
    setEditColor(category.color);
  };

  const handleSaveEdit = async (category) => {
    if (!editValue.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const res = await dispatch(
      updateCategory({
        id: category._id,
        formData: { name: editValue, color: editColor },
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Category updated!");
      setEditingId(null);
    } else {
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (!ok) return;

    const res = await dispatch(deleteCategory(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Category deleted!");
      dispatch(getCategories());
    } else {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Categories</h2>

        {categories?.length > 0 && (
          <CustomButton
            variant="default"
            size="sm"
            icon={<PlusIcon className="w-5 h-5" />}
            onClick={() => setShowDialog(true)}
          />
        )}
      </div>
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="bg-white rounded-lg shadow p-4">
          {categories?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                No categories found. Add your first one!
              </p>

              <CustomButton
                label="Add Category"
                variant="primary"
                icon={<PlusIcon className="w-5 h-5" />}
                onClick={() => setShowDialog(true)}
              />
            </div>
          ) : (
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg hover:bg-gray-50 transition gap-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />

                    {editingId === cat._id ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border px-2 py-1 rounded w-full sm:w-auto"
                        />

                        <div className="flex flex-wrap gap-2">
                          {[
                            "#FF5733",
                            "#3498DB",
                            "#2ECC71",
                            "#F1C40F",
                            "#9B59B6",
                          ].map((c) => (
                            <div
                              key={c}
                              className={`w-6 h-6 rounded-full cursor-pointer border ${
                                editColor === c ? "ring-2 ring-indigo-500" : ""
                              }`}
                              style={{ backgroundColor: c }}
                              onClick={() => setEditColor(c)}
                            />
                          ))}

                          <input
                            type="color"
                            value={editColor}
                            onChange={(e) => setEditColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-700 font-medium">
                        {cat.name}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 self-end sm:self-auto">
                    {editingId === cat._id ? (
                      <CheckIcon
                        className="w-6 h-6 cursor-pointer text-green-600 hover:text-green-800"
                        onClick={() => handleSaveEdit(cat)}
                      />
                    ) : (
                      <PencilSquareIcon
                        className="w-6 h-6 cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => startEdit(cat)}
                      />
                    )}

                    <TrashIcon
                      className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(cat._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md mx-auto shadow-xl space-y-4">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Create New Category
            </h3>

            <CustomInput
              label="Category Name"
              name="categoryName"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />

            <div>
              <label className="block text-sm mb-1 text-gray-700">Color</label>
              <div className="flex flex-wrap gap-2">
                {["#FF5733", "#3498DB", "#2ECC71", "#F1C40F", "#9B59B6"].map(
                  (color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${
                        newCategory.color === color
                          ? "ring-2 ring-indigo-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategory({ ...newCategory, color })}
                    />
                  )
                )}

                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, color: e.target.value })
                  }
                  className="w-10 h-10 rounded-md cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 pt-4">
              <CustomButton
                label="Cancel"
                variant="outline"
                className="w-1/2"
                onClick={() => setShowDialog(false)}
              />
              <CustomButton
                label="Add"
                variant="primary"
                className="w-1/2"
                onClick={handleAdd}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
