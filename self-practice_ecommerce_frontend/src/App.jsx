import { BrowserRouter, Route, Routes } from "react-router";
import {
  AdminDashboard,
  AdminOrders,
  AdminProducts,
  AdminSellers,
  AdminUsers,
  DefaultDashboard,
  DefaultHomeScreen,
  LoginScreen,
  ProductDetailsScreen,
  ProfileScreen,
  SellerDashboard,
  SellerHome,
  SellerOrders,
  SellerProducts,
  SignupScreen,
} from "./screens/screenExport.js";
import { ToastContainer } from "react-toastify";
import Layout from "./screens/layout/layout.jsx";
import AdminHome from "./screens/adminScreens/AdminHome.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<SignupScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="dashboard" element={<DefaultDashboard />}>
              <Route path="home" element={<DefaultHomeScreen />} />
              <Route path="details/:id" element={<ProductDetailsScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
            </Route>
            <Route path="admin-dashboard" element={<AdminDashboard />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sellers" element={<AdminSellers />} />
            </Route>
            <Route path="seller-dashboard" element={<SellerDashboard />}>
              <Route path="home" element={<SellerHome />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="orders" element={<SellerOrders />} />
            </Route>
            <Route path="default-dashboard" element={<DefaultDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
