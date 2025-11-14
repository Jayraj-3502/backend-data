import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SideNavifation({
  sideMenuItems = [],
  sideMenuHeading = "",
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin-dashboard/home",
    },
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
      name: "Users",
      icon: <FaUsers />,
      path: "/admin-dashboard/users",
    },
    {
      name: "Sellers",
      icon: <FaUsers />,
      path: "/admin-dashboard/sellers",
    },
  ];

  return (
    <div className="h-screen w-64 bg-blue-600 text-gray-200 flex flex-col fixed">
      {/* Logo / Header */}
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        {sideMenuHeading}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sideMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "text-white hover:bg-gray-800 hover:text-white"
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
