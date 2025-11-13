import {
  ProductCard,
  InputField,
  Button,
  SellerTile,
  UserTile,
} from "./components/componentsExport.js";
import { BrowserRouter, Router, Route, Routes } from "react-router";
import {
  AdminDashboard,
  AdminOrders,
  AdminProducts,
  AdminUsers,
  DefaultDashboard,
  LoginScreen,
  SellerDashboard,
  SignupScreen,
} from "./screens/screenExport.js";
import { ToastContainer } from "react-toastify";
import Layout from "./screens/layout/layout.jsx";
import adminRoutes from "./routes/adminRoutes.jsx";
import AdminHome from "./screens/adminScreens/AdminHome.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<SignupScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="admin-dashboard" element={<AdminDashboard />}>
              <Route path="" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="default-dashboard" element={<DefaultDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
