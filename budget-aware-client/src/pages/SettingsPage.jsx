import { useState } from "react";
import CategoriesTab from "./CategoriesTab";
import BudgetsTab from "./BudgetsTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("CategoriesTab");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="flex gap-6 border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("CategoriesTab")}
          className={`pb-2 border-b-2 ${
            activeTab === "CategoriesTab"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500"
          }`}
        >
          CategoriesTab
        </button>
        <button
          onClick={() => setActiveTab("BudgetsTab")}
          className={`pb-2 border-b-2 ${
            activeTab === "BudgetsTab"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500"
          }`}
        >
          BudgetsTab
        </button>
      </div>

      <div>
        {activeTab === "CategoriesTab" && <CategoriesTab />}
        {activeTab === "BudgetsTab" && <BudgetsTab />}
      </div>
    </div>
  );
};

export default SettingsPage;
