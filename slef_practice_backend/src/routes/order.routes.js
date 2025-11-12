import express from "express";
import {
  addOrder,
  getOrdersForAdmin,
  getOrdersForSeller,
  getOrdersForUser,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.route("/add").post(authMiddleware, addOrder);
orderRoute.route("/update").post(authMiddleware, updateOrderStatus);
orderRoute.route("/userorders").get(authMiddleware, getOrdersForUser);
orderRoute.route("/sellerorders").get(authMiddleware, getOrdersForSeller);
orderRoute.route("/adminorders").get(authMiddleware, getOrdersForAdmin);

export default orderRoute;
