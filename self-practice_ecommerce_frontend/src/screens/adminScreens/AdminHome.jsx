import { useDispatch, useSelector } from "react-redux";
import SellerMainCard from "../../components/cards/admin/SellerMainCard";
import UserMainCard from "../../components/cards/admin/UserMainCard";
import {
  SellerDetailsForAdmin,
  UserDetailsForAdmin,
} from "../../components/componentsExport";
import { useEffect } from "react";
import { getAllSellersData, getAllUsersData } from "../../feature/admin.store";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { allUsers, allSellers } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsersData());
    dispatch(getAllSellersData());
    console.log("this is running");
  }, []);
  return (
    <div>
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
