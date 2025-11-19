import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  allProductsWithDetails,
  sellerTotalFilter,
} from "../controllers/seller.controller.js";

const sellerRoute = express.Router();

sellerRoute.route("/total-filter").get(authMiddleware, sellerTotalFilter);
sellerRoute.route("/products").post(allProductsWithDetails);

export default sellerRoute;
