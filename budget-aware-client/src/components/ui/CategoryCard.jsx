import React from "react";
import { Progress } from "antd";

const CategoryCard = ({ name, color, spent, limit }) => {
  const isOver = spent > limit;
  const remaining = limit - spent;

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: color }}
          ></span>
          <span className="font-semibold text-gray-800">{name}</span>
        </div>

        {isOver && (
          <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 font-semibold rounded-full">
            OVER BUDGET
          </span>
        )}
      </div>

      <div className="mt-3 mb-2">
        <Progress
          percent={limit > 0 ? Math.min((spent / limit) * 100, 100) : 0}
          strokeColor={isOver ? "#ff4d4f" : color}
          trailColor="#f0f0f0"
          showInfo={false}
        />
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className="text-gray-500">Spent: ₹{spent}</span>

        <span
          className={`font-semibold ${
            isOver ? "text-red-500" : "text-green-600"
          }`}
        >
          {isOver ? `-₹${Math.abs(remaining)}` : `₹${remaining}`}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
