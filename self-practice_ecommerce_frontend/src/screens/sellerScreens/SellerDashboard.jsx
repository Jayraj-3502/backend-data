import { Outlet } from "react-router-dom";
import SideNavifation from "../../components/navbar/SideNavigation";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBoxOpen, FaUsers } from "react-icons/fa6";

export default function SellerDashboard() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/seller-dashboard/home",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/seller-dashboard/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/seller-dashboard/orders",
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
    <div className="flex">
      <SideNavifation sideMenuHeading="Seller" sideMenuItems={menuItems} />
      <main className="ml-64 flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}
