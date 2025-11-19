import { Link, Outlet, useLocation } from "react-router-dom";

const SettingsPage = () => {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="flex gap-6 border-b pb-2 mb-4">
        <Link
          to="/settings/categories"
          className={`pb-2 border-b-2 ${
            current === "/settings/categories"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Categories
        </Link>

        <Link
          to="/settings/budgets"
          className={`pb-2 border-b-2 ${
            current === "/settings/budgets"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Budgets
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
