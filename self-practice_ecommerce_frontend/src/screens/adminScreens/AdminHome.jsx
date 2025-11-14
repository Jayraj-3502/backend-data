import { useDispatch, useSelector } from "react-redux";
import SellerMainCard from "../../components/cards/admin/SellerMainCard";
import UserMainCard from "../../components/cards/admin/UserMainCard";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";

import {
  SellerDetailsForAdmin,
  UserDetailsForAdmin,
} from "../../components/componentsExport";
import { useEffect } from "react";
import {
  getAllSellersData,
  getAllUsersData,
  getFilterDetails,
} from "../../feature/admin.store";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { allUsers, allSellers, allFilterData } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllUsersData());
    dispatch(getAllSellersData());
    dispatch(getFilterDetails());
    console.log("this is running");
  }, []);
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-5 overflow-y-auto">
        <StatsCard
          title="Total Order Count"
          value={allFilterData?.totalordersold}
          icon="icon"
        />
        <StatsCard
          title="Total Revenue"
          value={(+allFilterData?.totalorderrevenue).toFixed(2)}
          icon="icon"
        />
        <StatsCard
          title="Total Products"
          value={allFilterData?.totalproductcount}
          icon="icon"
        />
      </div>
      <UserDetailsForAdmin />
      <SellerDetailsForAdmin />
      <UserMainCard
        displayData={allUsers}
        cardText="Order in number"
        moneyText="Total order amount"
      />
      <SellerMainCard displayData={allSellers} />{" "}
    </div>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4 w-[300px] max-w-[300px]">
      <div className="text-4xl text-blue-600">{icon}</div>
      <div>
        <h3 className="text-gray-600">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
