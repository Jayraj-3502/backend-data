import { useDispatch, useSelector } from "react-redux";
import SellerMainCard from "../../components/cards/admin/SellerMainCard";
import UserMainCard from "../../components/cards/admin/UserMainCard";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

import {
  SellerDetailsForAdmin,
  UserDetailsForAdmin,
} from "../../components/componentsExport";
import { useEffect } from "react";
import {
  getAllSellersData,
  getAllUsersData,
  getFilterDetails,
  getTopSellerData,
  getTopUsersData,
} from "../../feature/admin.store";
import UserListTile from "./components/UserListTile";
import SellerListTile from "./components/SellerListTile";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { allUsers, allSellers, allFilterData, topUsers, topSeller } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsersData());
    dispatch(getAllSellersData());
    dispatch(getFilterDetails());
    dispatch(getTopUsersData());
    dispatch(getTopSellerData());
    console.log("this is running");
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Monitor your business metrics and performance
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Order Count"
            value={allFilterData?.totalordersold || 0}
            icon={<FaShoppingCart />}
            color="blue"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${(+allFilterData?.totalorderrevenue || 0).toFixed(2)}`}
            icon={<FaDollarSign />}
            color="green"
          />
          <StatsCard
            title="Total Products"
            value={allFilterData?.totalproductcount || 0}
            icon={<FaBoxOpen />}
            color="purple"
          />
        </div>

        {/* Details Sections */}
        <div className="">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-x">
              <h1 className="text-3xl font-bold">Top Buyers</h1>
              <hr className="my-3" />
              <UserListTile data={topUsers} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <h1 className="text-3xl font-bold">Top Sellers</h1>
              <hr className="my-3" />
              <SellerListTile data={topSeller} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title = "", value = 0, icon = "", color = "" }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-${color}-50 opacity-50`}></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-4 rounded-xl bg-linear-to-br from-${color}-500 to-${color}-600 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-2xl">{icon}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-800 ">{value}</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 bg-linear-to-br from-${color}-500 to-${color}-600 opacity-10 rounded-full transform group-hover:scale-150 transition-transform duration-500`}
      ></div>
    </div>
  );
}
