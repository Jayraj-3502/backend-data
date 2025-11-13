import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SideNavifation() {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin-dashboard/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin-dashboard/orders",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/admin-dashboard/customers",
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-200 flex flex-col fixed">
      {/* Logo / Header */}
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        MyStore
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer or Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 py-2 rounded-md text-white hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
}
