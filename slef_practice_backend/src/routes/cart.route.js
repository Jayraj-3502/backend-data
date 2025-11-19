import express from "express";
import {
  addToCart,
  getCartData,
  removeFromCart,
} from "../controllers/cart.controller.js";

const cartRoute = express.Router();

cartRoute.route("/add").post(addToCart);
cartRoute.route("/remove").post(removeFromCart);
cartRoute.route("/:id").get(getCartData);

export default cartRoute;
