import { DollarOutlined, CalendarOutlined, EditOutlined } from "@ant-design/icons";

const categoryColors = {
  Food: "bg-green-100 text-green-700",
  Rent: "bg-red-100 text-red-700",
  Travel: "bg-blue-100 text-blue-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-700",
};

const ExpenseCard = ({ id, category, amount, date, description }) => {
  return (
    <div className="relative group p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <button className="absolute top-3 right-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <EditOutlined className="hover:text-indigo-600" />
      </button>

      <div className={`w-max px-3 py-1 text-xs rounded-full font-medium ${categoryColors[category]}`}>
        {category}
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <DollarOutlined className="text-indigo-600" />
          <span className="text-lg font-semibold text-gray-800">₹{amount}</span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
          <CalendarOutlined />
          <span>{date}</span>
        </div>

        <p className="mt-4 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
