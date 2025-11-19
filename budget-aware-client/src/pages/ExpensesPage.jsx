import React from "react";
import ExpenseCard from "../components/ui/Card.jsx ";

const ExpensesPage = () => {
  const expenses = [
    {
      id: 1,
      category: "Food",
      amount: 250,
      date: "2024-11-15",
      description: "Lunch at Kerala Cafe",
    },
    {
      id: 2,
      category: "Rent",
      amount: 1200,
      date: "2024-11-01",
      description: "Apartment rent",
    },
    {
      id: 3,
      category: "Travel",
      amount: 100,
      date: "2024-11-12",
      description: "Bus to Kochi",
    },
    {
      id: 4,
      category: "Entertainment",
      amount: 150,
      date: "2024-11-08",
      description: "Movie night",
    },
    {
      id: 2,
      category: "Rent",
      amount: 1200,
      date: "2024-11-01",
      description: "Apartment rent",
    },
    {
      id: 3,
      category: "Travel",
      amount: 100,
      date: "2024-11-12",
      description: "Bus to Kochi",
    },
    {
      id: 4,
      category: "Entertainment",
      amount: 150,
      date: "2024-11-08",
      description: "Movie night",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Expense Summary
        </h2>
        <p className="text-gray-600 mt-2 text-sm font-medium">
          Keep track of your everyday spending with clarity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expenses.map((exp) => (
          <ExpenseCard key={exp.id} {...exp} />
        ))}
      </div>

      {expenses.length === 0 && (
        <p className="mt-6 text-center text-gray-500 text-sm">
          No expenses recorded yet.
        </p>
      )}
    </div>
  );
};

export default ExpensesPage;
