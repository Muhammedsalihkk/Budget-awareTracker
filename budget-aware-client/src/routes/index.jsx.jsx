import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ReportsPage from "../pages/ReportsPage";
import CategoriesTab from "../pages/CategoriesTab";
import AddExpensePage from "../pages/AddExpensePage";
import ExpensesPage from "../pages/ExpensesPage";

import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import Sidebar from "../components/layout/Sidebar";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Sidebar />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="categories" element={<CategoriesTab />} />
        <Route path="add-expense" element={<AddExpensePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="profile" element={<Profile/>} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
