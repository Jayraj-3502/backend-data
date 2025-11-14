import express from "express";
import {
  getAllOrdersDetails,
  getAllProductDetails,
  sellerDetailsForAdmin,
  topSellerBasedOnAmount,
  topUsersBasedOnOrder,
  totalFilter,
  userDetailsForAdmin,
} from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.route("/allfilter").get(totalFilter);
adminRoute.route("/users").get(userDetailsForAdmin);
adminRoute.route("/seller").get(sellerDetailsForAdmin);
adminRoute.route("/topusersbyorder").get(topUsersBasedOnOrder);
adminRoute.route("/topsellerbyamount").get(topSellerBasedOnAmount);
adminRoute.route("/allproducts").get(getAllProductDetails);
adminRoute.route("/allorders").get(getAllOrdersDetails);

export default adminRoute;
