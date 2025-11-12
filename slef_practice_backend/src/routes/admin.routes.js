import express from "express";
import {
  sellerDetailsForAdmin,
  topSellerBasedOnAmount,
  topUsersBasedOnOrder,
  totalFilter,
  userDetailsForAdmin,
} from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.route("/").get(totalFilter);
adminRoute.route("/users").get(userDetailsForAdmin);
adminRoute.route("/seller").get(sellerDetailsForAdmin);
adminRoute.route("/topusersbyorder").get(topUsersBasedOnOrder);
adminRoute.route("/topsellerbyamount").get(topSellerBasedOnAmount);

export default adminRoute;
