import { useState } from "react";
import {
  HomeOutlined,
  BarChartOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const menu = [
  {
    section: "MAIN MENU",
    items: [
      { label: "Dashboard", icon: <HomeOutlined />, to: "/dashboard" },
      { label: "Reports", icon: <BarChartOutlined />, to: "/reports" },
    ],
  },
  {
    section: "EXPENSES",
    items: [
      { label: "Add Expense", icon: <MessageOutlined />, to: "/add-expense" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      {
        label: "Settings",
        icon: <SettingOutlined />,
        to: "/settings/categories",
      },
    ],
  },
];

const mobileMenu = [
  { icon: <HomeOutlined />, label: "Home", to: "/dashboard" },
  { icon: <BarChartOutlined />, label: "Reports", to: "/reports" },
  { icon: <MessageOutlined />, label: "Add Expense", to: "/add-expense" },
  { icon: <UserOutlined />, label: "Profile", to: "/profile" },
  { icon: <SettingOutlined />, label: "Settings", to: "/settings/categories" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed md:static top-0 left-0 h-screen bg-white shadow-md rounded-r-3xl p-5 w-72 flex flex-col transition-transform duration-300 z-40 overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {open && (
          <button
            className="md:hidden self-end mb-4 text-indigo-600"
            onClick={() => setOpen(false)}
          >
            <CloseOutlined />
          </button>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl text-lg font-bold">
            B
          </div>
          <h2 className="text-lg font-semibold">Budget Tracker</h2>
        </div>

        {menu.map((section, idx) => (
          <div key={idx} className="mb-6">
            <p className="text-xs font-semibold text-gray-400 mb-2">
              {section.section}
            </p>

            {section.items.map((item, itemIdx) => (
              <NavLink
                key={itemIdx}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isActive || window.location.pathname === item.to
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}

        <div
          className="mt-auto bg-gray-100 rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all"
          onClick={() => navigate("/profile")}
        >
          <div className="bg-indigo-200 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {profile?.email.split("")[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {profile?.email.split("@")[0]}
            </span>
            <span className="text-xs text-gray-500">{profile?.email}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl md:hidden z-50">
        <div className="flex justify-around items-center py-3 px-2 max-w-screen-xl mx-auto">
          {mobileMenu.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105
        ${
          isActive || window.location.pathname.startsWith(item.to)
            ? "bg-indigo-100 text-indigo-600 font-semibold"
            : "text-gray-600 hover:bg-gray-100"
        }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  );
};

export default Sidebar;
