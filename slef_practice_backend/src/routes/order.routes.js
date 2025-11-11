import express from "express";
import { addOrder } from "../controllers/order.controller";

const orderRoute = express.Router();

orderRoute.route("/order").post(addOrder);

export default orderRoute;
