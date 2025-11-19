import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportsPage from "../pages/ReportsPage";
import CategoriesTab from "../pages/CategoriesTab";
import BudgetsTab from "../pages/BudgetsTab"
import AddExpensePage from "../pages/AddExpensePage";

import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../pages/Profile";

import Sidebar from "../components/layout/Sidebar";
import PrivateRoute from "./PrivateRoute";
import ServerErrorPage from "../pages/ServerErrorPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Sidebar />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="add-expense" element={<AddExpensePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />}>
            <Route path="categories" element={<CategoriesTab />} />
            <Route path="budgets" element={<BudgetsTab />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
