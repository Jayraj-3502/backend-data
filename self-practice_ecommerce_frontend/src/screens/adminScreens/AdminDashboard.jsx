import { useEffect, useState } from "react";
import UserMainCard from "../../components/cards/admin/UserMainCard";
import {
  SellerDetailsForAdmin,
  UserDetailsForAdmin,
} from "../../components/componentsExport";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersData, getAllUsersData } from "../../feature/admin.store";
import SellerMainCard from "../../components/cards/admin/SellerMainCard";
import SideNavifation from "../../components/navbar/SideNavigation";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <SideNavifation />
      <main className="ml-64 flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
        {/* All your page routes will render here */}
      </main>
    </div>
  );
}
