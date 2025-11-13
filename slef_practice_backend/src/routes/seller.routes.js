import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { sellerTotalFilter } from "../controllers/seller.controller.js";

const sellerRoute = express.Router();

sellerRoute.route("/total-filter").get(authMiddleware, sellerTotalFilter);

export default sellerRoute;
